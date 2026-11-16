<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ChargeDot from '../_shared/charge-dot.svelte';
  import { makeBoard } from '../_shared/board.js';
  import { MEDIA, arrowPx, sciTex, sciText } from '../_shared/charges.js';
  import { compare, pairForce } from './engine.js';

  const board = makeBoard({ width: 360, height: 200, scale: 20 });
  const MEDIUM_OPTIONS = MEDIA.map((m) => ({ value: m.id, label: m.name }));

  let a = $state({ x: -4, y: 0 });
  let b = $state({ x: 4, y: 0 });
  let q1 = $state(2);
  let q2 = $state(-3);
  let mediumId = $state('chan-khong');
  let saved = $state(
    /** @type {{ q1: number, q2: number, r: number, eps: number } | null} */ (null),
  );
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const eps = $derived(MEDIA.find((m) => m.id === mediumId)?.eps ?? 1);
  const pair = $derived(pairForce({ ...a, q: q1 }, { ...b, q: q2 }, eps));
  // Attracting arrows point at each other: keep each under 40% of the gap so they never cross.
  const len = $derived(
    pair.none
      ? 0
      : Math.min(arrowPx(pair.force, 0.5, 80) + 14, pair.attract ? pair.r * 20 * 0.4 : 94),
  );
  // Direction of the force on q1: toward q2 when they attract.
  const dir = $derived(pair.attract ? pair.unit : { x: -pair.unit.x, y: -pair.unit.y });
  // Names sit above the middle of each arrow, not at the tips, so the two names
  // stay apart when attracting arrows meet in the gap.
  const nameDx = $derived(-(dir.x * len) / 2 - 10);
  const nameDy = $derived((dir.y * len) / 2 - 10);
  const now = $derived({ q1, q2, r: pair.r, eps });
  const change = $derived(
    saved && !pair.none && saved.q1 * saved.q2 !== 0 ? compare(now, saved) : null,
  );

  /**
   * @param {string} which 'a' or 'b'
   * @param {{ x: number, y: number }} p cm
   */
  function move(which, p) {
    const next = board.place(p);
    const other = which === 'a' ? b : a;
    if (Math.hypot(next.x - other.x, next.y - other.y) < 1) return;
    if (which === 'a') a = next;
    else b = next;
  }

  /** @param {string} which 'a' or 'b' */
  const dragOf = (which) => {
    const p = which === 'a' ? a : b;
    return {
      point: { x: board.px(p.x), y: board.py(p.y) },
      svg: () => svg,
      viewBox: { w: board.width, h: board.height },
      pad: 0,
      /** @param {{ x: number, y: number }} pt */
      projector: (pt) => {
        move(which, board.toCm(pt));
        return pt;
      },
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const cur = which === 'a' ? a : b;
        const s = big ? 2 : 0.5;
        move(which, { x: cur.x + dx * s, y: cur.y - dy * s });
      },
    };
  };

  /** @param {number} q */
  const paren = (q) => (q < 0 ? `(${numTex(q)})` : numTex(q));

  const note = $derived.by(() => {
    if (pair.none) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Một trong hai vật không mang điện ($q = 0$) nên không có lực điện giữa chúng.',
      };
    }
    const kind = pair.attract
      ? 'Hai điện tích trái dấu nên hút nhau'
      : 'Hai điện tích cùng dấu nên đẩy nhau';
    const law = `$F = \\dfrac{k|q_1q_2|}{\\varepsilon r^2} = \\dfrac{9 \\cdot 10^9 \\cdot |${paren(q1)} \\cdot ${paren(q2)}| \\cdot 10^{-12}}{${numTex(eps)} \\cdot (${numTex(pair.r / 100, 4)})^2} \\approx ${sciTex(pair.force)}$ N`;
    return {
      tone: /** @type {const} */ ('info'),
      text: `${kind}: ${law}. Hai lực $\\vec F_{12}$, $\\vec F_{21}$ cùng phương, ngược chiều, cùng độ lớn.`,
    };
  });

  const changeText = $derived.by(() => {
    if (!saved)
      return 'Bấm “Ghi nhớ lực này”, rồi đổi khoảng cách, điện tích hoặc môi trường để so sánh.';
    if (!change) return 'Hãy để cả hai điện tích khác 0 để so sánh.';
    /** @param {number} v */
    const times = (v) =>
      v === 1
        ? 'không đổi'
        : v > 1
          ? `tăng ${formatNumber(v, 3)} lần`
          : `giảm ${formatNumber(1 / v, 3)} lần`;
    return `So với lúc ghi nhớ: tích $|q_1q_2|$ làm $F$ ${times(change.charges)}, khoảng cách làm $F$ ${times(change.distance)}, môi trường làm $F$ ${times(change.medium)}. Tổng cộng $F$ ${times(change.ratio)}.`;
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {board.width} {board.height}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-xl bg-slate-50"
      role="group"
      aria-label={`Hai điện tích điểm cách nhau ${formatNumber(pair.r, 1)} xentimét trong ${MEDIA.find((m) => m.id === mediumId)?.name}. Lực tương tác ${pair.none ? 'bằng 0' : `${pair.attract ? 'hút' : 'đẩy'}, độ lớn ${sciText(pair.force)} niutơn`}.`}
    >
      <line
        x1={board.px(a.x)}
        y1={board.py(a.y)}
        x2={board.px(b.x)}
        y2={board.py(b.y)}
        stroke="#94a3b8"
        stroke-dasharray="4 4"
      />
      <text
        x={(board.px(a.x) + board.px(b.x)) / 2}
        y={Math.min((board.py(a.y) + board.py(b.y)) / 2 + 42, board.height - 4)}
        text-anchor="middle"
        font-size="12"
        fill="#475569">r = {formatNumber(pair.r, 1)} cm</text
      >
      {#if len > 0}
        <ForceArrow
          x1={board.px(a.x)}
          y1={board.py(a.y)}
          x2={board.px(a.x) + dir.x * len}
          y2={board.py(a.y) - dir.y * len}
          color="#7c3aed"
          label="F₂₁"
          labelDx={nameDx}
          labelDy={nameDy}
        />
        <ForceArrow
          x1={board.px(b.x)}
          y1={board.py(b.y)}
          x2={board.px(b.x) - dir.x * len}
          y2={board.py(b.y) + dir.y * len}
          color="#059669"
          label="F₁₂"
          labelDx={nameDx + dir.x * len}
          labelDy={nameDy - dir.y * len}
        />
      {/if}
      {#each ['a', 'b'] as which (which)}
        {@const p = which === 'a' ? a : b}
        {@const q = which === 'a' ? q1 : q2}
        <g
          class="drag-handle cursor-move outline-none"
          role="slider"
          tabindex="0"
          aria-label={`Điện tích ${which === 'a' ? 'q₁' : 'q₂'}: kéo hoặc dùng phím mũi tên`}
          aria-valuemin={-board.halfX}
          aria-valuemax={board.halfX}
          aria-valuenow={p.x}
          aria-valuetext={`Cách điện tích kia ${formatNumber(pair.r, 1)} xentimét`}
          use:draggable={dragOf(which)}
        >
          <ChargeDot cx={board.px(p.x)} cy={board.py(p.y)} {q} name={which === 'a' ? 'q₁' : 'q₂'} />
        </g>
      {/each}
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Kéo hai điện tích. Mũi tên là lực điện tác dụng lên mỗi điện tích (độ dài vẽ theo thang
      lôgarit).
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Điện tích q₁" bind:value={q1} min={-5} max={5} step={1} unit="µC" />
    <SliderField label="Điện tích q₂" bind:value={q2} min={-5} max={5} step={1} unit="µC" />
  </div>
  <SegmentedControl label="Môi trường" options={MEDIUM_OPTIONS} bind:value={mediumId} />
  <p class="text-sm text-slate-600">
    Hằng số điện môi ε = {formatNumber(eps)}; q₁ = {formatNumber(q1)} µC, q₂ = {formatNumber(q2)} µC.
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />
  <div class="{card} space-y-2 p-3 text-sm">
    <FeedbackNote tone={change ? 'ok' : 'info'} text={changeText} />
    <button type="button" class={button.secondary} onclick={() => (saved = { ...now })}>
      Ghi nhớ lực này
    </button>
  </div>
</div>
