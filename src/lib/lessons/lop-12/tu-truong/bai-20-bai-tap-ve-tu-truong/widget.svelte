<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { TASKS, answerOf, dirWords, isRight, wrap } from './engine.js';

  const W = 340;
  const H = 260;
  const CX = W / 2;
  const CY = H / 2;
  /** Length of the answer arrow, and radius of the loop. */
  const ARROW = 78;
  const RING = 70;

  let at = $state(0);
  /** @type {import('./engine.js').Dir | null} */
  let dirGuess = $state(null);
  /** @type {'cw' | 'ccw' | null} */
  let turnGuess = $state(null);
  let arrowDeg = $state(45);
  let ringDeg = $state(45);
  let checked = $state(false);
  /** Indices of the tasks done right at the first check. */
  let solved = $state(/** @type {number[]} */ ([]));
  let tried = $state(false);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const task = $derived(TASKS[at]);
  const answer = $derived(answerOf(task));
  const guess = $derived(task.kind === 'loop' ? turnGuess : dirGuess);
  const right = $derived(isRight(task, guess));

  /** @param {number} deg @param {number} r */
  const polarPt = (deg, r) => ({
    x: CX + r * Math.cos((deg * Math.PI) / 180),
    y: CY - r * Math.sin((deg * Math.PI) / 180),
  });

  const handle = $state({ x: CX, y: CY });
  $effect(() => {
    const p = task.kind === 'loop' ? polarPt(ringDeg, RING) : polarPt(arrowDeg, ARROW);
    handle.x = p.x;
    handle.y = p.y;
  });

  function fresh() {
    checked = false;
  }

  const arrowDrag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const deg = (Math.atan2(CY - p.y, p.x - CX) * 180) / Math.PI;
      arrowDeg = wrap(Math.round(deg / 45) * 45);
      dirGuess = arrowDeg;
      fresh();
      return polarPt(arrowDeg, ARROW);
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      arrowDeg = wrap(arrowDeg + (big ? 90 : 45) * (dx || -dy));
      dirGuess = arrowDeg;
      fresh();
    },
  });

  /** @param {number} delta degrees moved along the ring, counterclockwise positive */
  function moveRing(delta) {
    const step = ((delta + 540) % 360) - 180;
    if (Math.abs(step) < 1) return;
    turnGuess = step > 0 ? 'ccw' : 'cw';
    ringDeg = wrap(ringDeg + step);
    fresh();
  }

  const ringDrag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const deg = (Math.atan2(CY - p.y, p.x - CX) * 180) / Math.PI;
      moveRing(deg - ringDeg);
      return polarPt(ringDeg, RING);
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => moveRing((big ? 45 : 15) * (dx || -dy)),
  });

  /** Tangent arrow on the ring, pointing the way of the guessed turn. */
  const ringArrow = $derived.by(() => {
    if (!turnGuess) return null;
    const s = turnGuess === 'ccw' ? 1 : -1;
    const a = (ringDeg * Math.PI) / 180;
    const p = polarPt(ringDeg, RING);
    const tx = -Math.sin(a) * s;
    const ty = -Math.cos(a) * s;
    return { x1: p.x - tx * 34, y1: p.y - ty * 34, x2: p.x - tx * 4, y2: p.y - ty * 4 };
  });

  /** @param {import('./engine.js').Dir} d */
  const fieldWords = (d) => (typeof d === 'number' ? `hướng ${dirWords(d)}` : dirWords(d));

  const prompt = $derived.by(() => {
    if (task.kind === 'force')
      return `Dòng điện trong dây chạy ${dirWords(task.current)}, cảm ứng từ ${fieldWords(task.field)}. Kéo đầu mũi tên (hoặc chọn ⊙, ⊗) để chỉ chiều lực từ tác dụng lên dây.`;
    if (task.kind === 'rod')
      return `Thanh dẫn trượt ${dirWords(task.velocity)} trên hai thanh ray nối kín, cảm ứng từ ${fieldWords(task.field)}. Kéo đầu mũi tên để chỉ chiều dòng điện cảm ứng trong thanh.`;
    return `${task.story} Cảm ứng từ ${fieldWords(task.field)}. Kéo nút tròn dọc theo vòng dây theo chiều dòng điện cảm ứng (nhìn từ phía em).`;
  });

  const why = $derived.by(() => {
    if (task.kind === 'force')
      return `Quy tắc bàn tay trái: đặt bàn tay trái sao cho các đường sức từ hướng vào lòng bàn tay, chiều từ cổ tay đến các ngón tay trùng với chiều dòng điện; ngón cái choãi ra 90° chỉ chiều lực từ: ${dirWords(/** @type {import('./engine.js').Dir} */ (answer))}.`;
    if (task.kind === 'rod') {
      const grows = task.velocity === 0;
      const out = (task.field === 'ra') !== grows;
      return `Thanh trượt ${grows ? 'ra xa' : 'lại gần'} đầu nối kín nên diện tích mạch, và từ thông qua mạch, ${grows ? 'tăng' : 'giảm'}. Theo định luật Lenz, từ trường cảm ứng ${grows ? 'ngược chiều' : 'cùng chiều'} với $\\vec{B}$, tức là ${out ? 'hướng ra' : 'hướng vào'} mặt phẳng hình vẽ, nên dòng điện cảm ứng chạy ${out ? 'ngược' : 'cùng'} chiều kim đồng hồ trong mạch: trong thanh, nó chạy ${dirWords(/** @type {import('./engine.js').Dir} */ (answer))}.`;
    }
    const grows = task.change === 'tang';
    const out = (task.field === 'ra') !== grows;
    return `Từ thông qua vòng dây ${grows ? 'tăng' : 'giảm'}. Theo định luật Lenz, từ trường cảm ứng ${grows ? 'ngược chiều' : 'cùng chiều'} với $\\vec{B}$, tức là ${out ? 'hướng ra' : 'hướng vào'} mặt phẳng hình vẽ; theo quy tắc nắm tay phải, dòng điện cảm ứng chạy ${answer === 'cw' ? 'cùng' : 'ngược'} chiều kim đồng hồ.`;
  });

  const note = $derived.by(() => {
    if (!checked) {
      if (guess === null) return prompt;
      const g =
        task.kind === 'loop'
          ? `chiều ${turnGuess === 'cw' ? 'cùng' : 'ngược'} chiều kim đồng hồ`
          : dirWords(/** @type {import('./engine.js').Dir} */ (dirGuess));
      return `Em đang chọn: ${g}. Bấm "Kiểm tra" khi đã chắc.`;
    }
    return right ? `Đúng. ${why}` : `Chưa đúng. ${why}`;
  });

  function check() {
    if (guess === null) return;
    checked = true;
    if (!tried && right && !solved.includes(at)) solved = [...solved, at];
    tried = true;
  }

  function next() {
    at = (at + 1) % TASKS.length;
    dirGuess = null;
    turnGuess = null;
    checked = false;
    tried = false;
  }

  /** A loop being pulled out of a field that fills only the left part. */
  const pulled = $derived(task.kind === 'loop' && task.story.startsWith('Khung'));
  /** Field symbol positions on a grid. */
  const grid = $derived.by(() => {
    /** @type {Array<{ x: number, y: number }>} */
    const out = [];
    const limit = pulled ? CX - 20 : W;
    for (let x = 25; x < limit; x += 45) for (let y = 22; y < H; y += 45) out.push({ x, y });
    return out;
  });
</script>

<div class="space-y-3">
  <p class="text-sm font-semibold text-slate-600">
    Bài {at + 1}/{TASKS.length} · Đã làm đúng ngay lần đầu: {solved.length}
  </p>

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto w-full max-w-md touch-none select-none"
      role="group"
      aria-label={prompt}
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
      <g aria-hidden="true">
        {#if pulled}
          <rect x="0" y="0" width={CX - 8} height={H} fill="#ede9fe" />
        {/if}
        {#if typeof task.field === 'number'}
          <g transform="rotate({-task.field} {CX} {CY})">
            {#each [-150, -105, -60, -15, 30, 75, 120, 165] as dy (dy)}
              <line x1={CX - 220} y1={CY + dy} x2={CX + 220} y2={CY + dy} stroke="#c4b5fd" />
              {#each [-90, 90] as dx (dx)}
                <path
                  d="M {CX + dx - 6} {CY + dy - 5} L {CX + dx + 4} {CY + dy} L {CX + dx - 6} {CY +
                    dy +
                    5} Z"
                  fill="#7c3aed"
                />
              {/each}
            {/each}
          </g>
        {:else}
          {#each grid as d (`${d.x},${d.y}`)}
            {#if task.field === 'ra'}
              <circle cx={d.x} cy={d.y} r="6" fill="none" stroke="#7c3aed" stroke-width="1.5" />
              <circle cx={d.x} cy={d.y} r="1.8" fill="#7c3aed" />
            {:else}
              <path
                d="M {d.x - 5} {d.y - 5} L {d.x + 5} {d.y + 5} M {d.x - 5} {d.y + 5} L {d.x +
                  5} {d.y - 5}"
                stroke="#7c3aed"
                stroke-width="1.5"
              />
            {/if}
          {/each}
        {/if}
        <text
          x="8"
          y={H - 8}
          stroke="#fff"
          stroke-width="4"
          paint-order="stroke"
          class="fill-violet-700 text-[13px] font-semibold"
          >B{task.kind === 'loop' && !pulled
            ? task.change === 'tang'
              ? ' tăng'
              : ' giảm'
            : ''}</text
        >

        {#if task.kind === 'force'}
          {@const c = polarPt(task.current, 110)}
          {@const d = polarPt(task.current + 180, 110)}
          {@const off = polarPt(task.current - 90, 18)}
          {@const a1 = polarPt(task.current + 180, 95)}
          {@const a2 = polarPt(task.current + 180, 40)}
          <line
            x1={d.x}
            y1={d.y}
            x2={c.x}
            y2={c.y}
            stroke="#b45309"
            stroke-width="6"
            stroke-linecap="round"
          />
          <ForceArrow
            x1={a1.x + off.x - CX}
            y1={a1.y + off.y - CY}
            x2={a2.x + off.x - CX}
            y2={a2.y + off.y - CY}
            color="#92400e"
            label="I"
          />
        {:else if task.kind === 'rod'}
          {@const s = task.velocity === 0 ? 1 : -1}
          <line x1="30" y1={CY - 80} x2={W - 20} y2={CY - 80} stroke="#475569" stroke-width="4" />
          <line x1="30" y1={CY + 80} x2={W - 20} y2={CY + 80} stroke="#475569" stroke-width="4" />
          <line x1="30" y1={CY - 80} x2="30" y2={CY + 80} stroke="#475569" stroke-width="4" />
          <line
            x1={CX}
            y1={CY - 92}
            x2={CX}
            y2={CY + 92}
            stroke="#b45309"
            stroke-width="7"
            stroke-linecap="round"
          />
          <ForceArrow
            x1={CX + s * 14}
            y1={CY + 56}
            x2={CX + s * 70}
            y2={CY + 56}
            color="#0f172a"
            label="v"
          />
        {:else}
          <circle cx={CX} cy={CY} r={RING} fill="none" stroke="#b45309" stroke-width="5" />
          {#if pulled}
            <ForceArrow
              x1={CX + RING + 8}
              y1={CY}
              x2={CX + RING + 60}
              y2={CY}
              color="#0f172a"
              label="v"
            />
          {/if}
        {/if}

        {#if task.kind !== 'loop'}
          {#if dirGuess === 'ra' || dirGuess === 'vao'}
            <circle cx={CX} cy={CY} r="14" fill="#fff" stroke="#dc2626" stroke-width="3" />
            {#if dirGuess === 'ra'}
              <circle cx={CX} cy={CY} r="4" fill="#dc2626" />
            {:else}
              <path
                d="M {CX - 8} {CY - 8} L {CX + 8} {CY + 8} M {CX - 8} {CY + 8} L {CX + 8} {CY - 8}"
                stroke="#dc2626"
                stroke-width="3"
              />
            {/if}
          {:else}
            <ForceArrow
              x1={CX}
              y1={CY}
              x2={handle.x}
              y2={handle.y}
              color={dirGuess === null ? '#94a3b8' : '#dc2626'}
              dashed={dirGuess === null}
              label={task.kind === 'force' ? 'F' : 'I'}
            />
          {/if}
        {:else if ringArrow}
          <ForceArrow
            x1={ringArrow.x1}
            y1={ringArrow.y1}
            x2={ringArrow.x2}
            y2={ringArrow.y2}
            color="#dc2626"
            label="I"
          />
        {/if}
      </g>
      {#key at}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label={task.kind === 'loop'
            ? 'Nút trên vòng dây: kéo dọc vòng dây, hoặc phím mũi tên phải, lên để đi ngược chiều kim đồng hồ, trái, xuống để đi cùng chiều kim đồng hồ'
            : 'Đầu mũi tên trả lời: kéo hoặc dùng phím mũi tên để xoay từng 45 độ'}
          aria-valuemin="0"
          aria-valuemax="359"
          aria-valuenow={task.kind === 'loop' ? Math.round(ringDeg) : arrowDeg}
          aria-valuetext={task.kind === 'loop'
            ? turnGuess === null
              ? 'chưa chọn chiều'
              : turnGuess === 'cw'
                ? 'cùng chiều kim đồng hồ'
                : 'ngược chiều kim đồng hồ'
            : dirGuess === null
              ? 'chưa chọn hướng'
              : dirWords(dirGuess)}
          style="cursor:grab; outline:none"
          use:draggable={task.kind === 'loop' ? ringDrag : arrowDrag}
        >
          <circle
            class="drag-knob"
            cx={handle.x}
            cy={handle.y}
            r="10"
            fill="#fff"
            stroke="#dc2626"
            stroke-width="3"
          />
        </g>
      {/key}
    </svg>
    <figcaption class="px-2 pt-1 text-xs text-slate-500">
      Tím: đường sức từ (⊙ hướng ra, ⊗ hướng vào mặt phẳng hình vẽ). Nâu: dây dẫn. Đỏ: câu trả lời
      của em.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    {#if task.kind === 'force'}
      <button
        type="button"
        class={dirGuess === 'ra' ? button.secondary : button.quiet}
        aria-pressed={dirGuess === 'ra'}
        onclick={() => {
          dirGuess = 'ra';
          fresh();
        }}>⊙ Hướng ra</button
      >
      <button
        type="button"
        class={dirGuess === 'vao' ? button.secondary : button.quiet}
        aria-pressed={dirGuess === 'vao'}
        onclick={() => {
          dirGuess = 'vao';
          fresh();
        }}>⊗ Hướng vào</button
      >
    {/if}
    <button type="button" class={button.primary} disabled={guess === null} onclick={check}
      >Kiểm tra</button
    >
    <button type="button" class={button.quiet} onclick={next}>Bài tiếp</button>
  </div>

  <FeedbackNote tone={!checked ? 'info' : right ? 'ok' : 'warn'} text={note} />
</div>
