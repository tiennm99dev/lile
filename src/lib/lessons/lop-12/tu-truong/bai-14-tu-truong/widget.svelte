<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    BOUNDS,
    COIL,
    linesOf,
    needleAngle,
    northEnd,
    pushOut,
    strengthAt,
    strengthWord,
    wayOf,
    wiresOf,
  } from './engine.js';

  const W = 480;
  const H = 300;
  const S = W / (BOUNDS.xMax - BOUNDS.xMin);
  const sx = (/** @type {number} */ x) => (x - BOUNDS.xMin) * S;
  const sy = (/** @type {number} */ y) => (BOUNDS.yMax - y) * S;
  const fx = (/** @type {number} */ px) => px / S + BOUNDS.xMin;
  const fy = (/** @type {number} */ py) => BOUNDS.yMax - py / S;

  /** @type {import('./engine.js').SceneId} */
  let sceneId = $state('day-thang');
  let sign = $state(1);
  let showLines = $state(true);
  let showGrid = $state(false);
  let probe = $state({ x: 2, y: 1 });
  const handle = $state({ x: sx(2), y: sy(1) });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const wires = $derived(wiresOf(sceneId, sign));
  const lines = $derived(linesOf(sceneId, sign));
  const angle = $derived(needleAngle(wires, probe));
  const strength = $derived(strengthAt(wires, probe));
  const grid = $derived.by(() => {
    /** @type {Array<{ x: number, y: number, angle: number }>} */
    const out = [];
    for (let x = BOUNDS.xMin + 0.75; x < BOUNDS.xMax; x += 1.5) {
      for (let y = BOUNDS.yMin + 0.6; y < BOUNDS.yMax; y += 1.25) {
        const p = { x, y };
        if (wires.every((w) => Math.hypot(w.x - x, w.y - y) > 0.4)) {
          out.push({ x, y, angle: needleAngle(wires, p) });
        }
      }
    }
    return out;
  });

  /** @param {{ x: number, y: number }} p */
  function place(p) {
    const q = pushOut(wires, p);
    probe = q;
    handle.x = sx(q.x);
    handle.y = sy(q.y);
  }

  /** @param {string | number} v */
  function chooseScene(v) {
    sceneId = /** @type {import('./engine.js').SceneId} */ (v);
    place(v === 'ong-day' ? { x: 4.2, y: 0 } : { x: 2, y: 1 });
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const q = pushOut(wires, { x: fx(p.x), y: fy(p.y) });
      probe = q;
      return { x: sx(q.x), y: sy(q.y) };
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      const step = big ? 1 : 0.25;
      place({ x: probe.x + dx * step, y: probe.y - dy * step });
    },
  });

  /** @param {{ x: number, y: number }[]} l */
  function linePath(l) {
    return l
      .map((p, i) => `${i ? 'L' : 'M'} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`)
      .join(' ');
  }

  /**
   * Arrowheads along a field line, pointing along the field.
   * @param {{ x: number, y: number }[]} l @param {number} count
   */
  function arrows(l, count) {
    /** @type {string[]} */
    const out = [];
    for (let k = 1; k <= count; k++) {
      const i = Math.floor((k * l.length) / (count + 1));
      if (i < 1 || i >= l.length) continue;
      const a = l[i - 1];
      const b = l[i];
      const ang = Math.atan2(-(b.y - a.y), b.x - a.x);
      const tip = { x: sx(b.x), y: sy(b.y) };
      const back = (/** @type {number} */ d) =>
        `${(tip.x - 9 * Math.cos(ang + d)).toFixed(1)} ${(tip.y - 9 * Math.sin(ang + d)).toFixed(1)}`;
      out.push(`M ${back(0.45)} L ${tip.x.toFixed(1)} ${tip.y.toFixed(1)} L ${back(-0.45)} Z`);
    }
    return out;
  }

  const north = $derived(northEnd(sign));

  const status = $derived.by(() => {
    const head = `Cực Bắc (đầu đỏ) của kim nam châm thử chỉ ${wayOf(angle)}; từ trường ở đây ${strengthWord(strength)}.`;
    if (sceneId === 'day-thang') {
      const flow = sign > 0 ? 'đi ra khỏi mặt phẳng hình vẽ (⊙)' : 'đi vào mặt phẳng hình vẽ (⊗)';
      const turn = sign > 0 ? 'ngược chiều kim đồng hồ' : 'cùng chiều kim đồng hồ';
      return `${head} Dòng điện ${flow}: đường sức từ là những đường tròn đồng tâm quanh dây, chiều ${turn}. Ngón cái tay phải chỉ chiều dòng điện thì bốn ngón khum lại chỉ chiều đường sức từ.`;
    }
    const inside = Math.abs(probe.x) < COIL.half && Math.abs(probe.y) < COIL.radius;
    const where = inside
      ? 'Trong lòng ống dây, các kim đều chỉ cùng một hướng: từ trường gần như đều.'
      : 'Bên ngoài, đường sức từ giống của một thanh nam châm thẳng.';
    return `${head} ${where} Đường sức từ đi ra ở đầu bên ${north} (cực Bắc) và đi vào ở đầu kia (cực Nam). Khum tay phải theo chiều dòng điện trong các vòng dây thì ngón cái chỉ chiều đường sức từ trong lòng ống.`;
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Dòng điện"
      options={[
        { value: 'day-thang', label: 'Dây dẫn thẳng dài' },
        { value: 'ong-day', label: 'Ống dây' },
      ]}
      bind:value={sceneId}
      onchange={chooseScene}
    />
    <button type="button" class={button.secondary} onclick={() => (sign = -sign)}>
      Đảo chiều dòng điện
    </button>
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={showLines ? button.primary : button.quiet}
      aria-pressed={showLines}
      onclick={() => (showLines = !showLines)}>Đường sức từ</button
    >
    <button
      type="button"
      class={showGrid ? button.primary : button.quiet}
      aria-pressed={showGrid}
      onclick={() => (showGrid = !showGrid)}>Nhiều kim nam châm</button
    >
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="{sceneId === 'day-thang'
        ? 'Dây dẫn thẳng dài vuông góc với mặt phẳng hình vẽ'
        : 'Ống dây cắt dọc theo trục'}. {status}"
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />

      {#if showLines}
        <g aria-hidden="true">
          {#each lines as l, i (i)}
            <path d={linePath(l.points)} fill="none" stroke="#7c3aed" stroke-width="1.6" />
            {#each arrows(l.points, l.closed ? 2 : 3) as a, k (k)}
              <path d={a} fill="#7c3aed" />
            {/each}
          {/each}
        </g>
      {/if}

      {#if showGrid}
        <g aria-hidden="true">
          {#each grid as g (`${g.x},${g.y}`)}
            <g transform="translate({sx(g.x)} {sy(g.y)}) rotate({-g.angle})">
              <path d="M 11 0 L 0 -3.5 L 0 3.5 Z" fill="#dc2626" />
              <path d="M -11 0 L 0 -3.5 L 0 3.5 Z" fill="#2563eb" />
            </g>
          {/each}
        </g>
      {/if}

      <g aria-hidden="true">
        {#if sceneId === 'ong-day'}
          <rect
            x={sx(-COIL.half) - 8}
            y={sy(COIL.radius)}
            width={2 * COIL.half * S + 16}
            height={2 * COIL.radius * S}
            fill="#fde68a"
            fill-opacity="0.25"
            stroke="#b45309"
            stroke-dasharray="4 4"
          />
          <text
            x={sx(north === 'phải' ? COIL.half + 0.55 : -COIL.half - 0.55)}
            y={sy(0) + 6}
            text-anchor="middle"
            class="fill-red-600 text-[17px] font-bold">N</text
          >
          <text
            x={sx(north === 'phải' ? -COIL.half - 0.55 : COIL.half + 0.55)}
            y={sy(0) + 6}
            text-anchor="middle"
            class="fill-blue-600 text-[17px] font-bold">S</text
          >
        {/if}
        {#each wires as w, i (i)}
          <circle
            cx={sx(w.x)}
            cy={sy(w.y)}
            r={sceneId === 'day-thang' ? 11 : 7}
            fill="#fff"
            stroke="#b45309"
            stroke-width="2"
          />
          {#if w.current > 0}
            <circle cx={sx(w.x)} cy={sy(w.y)} r="2.5" fill="#b45309" />
          {:else}
            {@const d = sceneId === 'day-thang' ? 6 : 4}
            <path
              d="M {sx(w.x) - d} {sy(w.y) - d} L {sx(w.x) + d} {sy(w.y) + d} M {sx(w.x) - d} {sy(
                w.y,
              ) + d} L {sx(w.x) + d} {sy(w.y) - d}"
              stroke="#b45309"
              stroke-width="2"
            />
          {/if}
        {/each}
        {#if sceneId === 'day-thang'}
          <text
            x={sx(0)}
            y={sy(0) + 30}
            text-anchor="middle"
            stroke="#fff"
            stroke-width="4"
            paint-order="stroke"
            class="fill-amber-800 text-[14px] font-semibold"
            >I {sign > 0 ? 'hướng ra' : 'hướng vào'}</text
          >
        {/if}
      </g>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Kim nam châm thử: kéo hoặc dùng phím mũi tên để di chuyển"
        aria-valuemin="0"
        aria-valuemax="360"
        aria-valuenow={Math.round((angle + 360) % 360)}
        aria-valuetext="cực Bắc của kim chỉ {wayOf(angle)}, từ trường {strengthWord(strength)}"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={handle.x}
          cy={handle.y}
          r="19"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="2"
        />
        <g transform="translate({handle.x} {handle.y}) rotate({-angle})">
          <path d="M 16 0 L 0 -5 L 0 5 Z" fill="#dc2626" />
          <path d="M -16 0 L 0 -5 L 0 5 Z" fill="#2563eb" />
          <circle r="2.5" fill="#0f172a" />
        </g>
      </g>
    </svg>
    <figcaption class="px-2 pt-1 text-xs text-slate-500">
      ⊙: dòng điện hướng ra khỏi mặt phẳng hình vẽ; ⊗: dòng điện hướng vào mặt phẳng hình vẽ.
    </figcaption>
  </figure>

  <FeedbackNote tone="info" text={status} />
</div>
