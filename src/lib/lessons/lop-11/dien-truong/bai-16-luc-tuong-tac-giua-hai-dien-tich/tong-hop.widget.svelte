<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import ChargeDot from '../_shared/charge-dot.svelte';
  import { makeBoard } from '../_shared/board.js';
  import { sciTex, sciText } from '../_shared/charges.js';
  import { resultant } from './engine.js';

  const board = makeBoard({ width: 360, height: 240, scale: 20 });
  /** Longest arrow, in px; the other arrows are drawn to the same scale. */
  const LONGEST = 80;

  /** @type {Array<{ x: number, y: number }>} */
  let spots = $state([
    { x: -4, y: -2.5 },
    { x: 4, y: -2.5 },
    { x: 0, y: 2.5 },
  ]);
  let q1 = $state(2);
  let q2 = $state(-2);
  let q0 = $state(1);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const charges = $derived([q1, q2, q0]);
  const res = $derived(
    resultant({ ...spots[0], q: q1 }, { ...spots[1], q: q2 }, { ...spots[2], q: q0 }),
  );
  // One scale for all three arrows, so the parallelogram is true to size.
  const perNewton = $derived.by(() => {
    const top = Math.max(res.f1Size, res.f2Size, res.size);
    return top > 0 ? LONGEST / top : 0;
  });
  const origin = $derived({ x: board.px(spots[2].x), y: board.py(spots[2].y) });
  /** @param {{ x: number, y: number }} f */
  const tip = (f) => ({ x: origin.x + f.x * perNewton, y: origin.y - f.y * perNewton });
  const t1 = $derived(tip(res.f1));
  const t2 = $derived(tip(res.f2));
  const tt = $derived(tip(res.total));

  const NAMES = ['q₁', 'q₂', 'q₀'];

  /** @param {number} i @param {{ x: number, y: number }} p cm */
  function move(i, p) {
    const next = board.place(p);
    const near = spots.some((s, j) => j !== i && Math.hypot(next.x - s.x, next.y - s.y) < 1);
    if (near) return;
    spots = spots.map((s, j) => (j === i ? next : s));
  }

  /** @param {number} i */
  const dragOf = (i) => ({
    point: { x: board.px(spots[i].x), y: board.py(spots[i].y) },
    svg: () => svg,
    viewBox: { w: board.width, h: board.height },
    pad: 0,
    /** @param {{ x: number, y: number }} pt */
    projector: (pt) => {
      move(i, board.toCm(pt));
      return pt;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const s = big ? 2 : 0.5;
      move(i, { x: spots[i].x + dx * s, y: spots[i].y - dy * s });
    },
  });

  const angle = $derived.by(() => {
    if (res.f1Size === 0 || res.f2Size === 0) return null;
    const c = (res.f1.x * res.f2.x + res.f1.y * res.f2.y) / (res.f1Size * res.f2Size);
    return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
  });

  const note = $derived.by(() => {
    const parts = `$F_{10} \\approx ${sciTex(res.f1Size)}$ N, $F_{20} \\approx ${sciTex(res.f2Size)}$ N`;
    const total = `$F \\approx ${sciTex(res.size)}$ N`;
    if (res.f1Size === 0 && res.f2Size === 0) return 'Không có lực điện nào tác dụng lên $q_0$.';
    if (angle === null) return `${parts}. Chỉ còn một lực nên ${total}.`;
    const how =
      angle < 1
        ? 'Hai lực cùng chiều: $F = F_{10} + F_{20}$.'
        : angle > 179
          ? 'Hai lực ngược chiều: $F = |F_{10} - F_{20}|$.'
          : Math.abs(angle - 90) < 1
            ? 'Hai lực vuông góc: $F = \\sqrt{F_{10}^2 + F_{20}^2}$.'
            : `Hai lực hợp với nhau góc khoảng $${formatNumber(angle, 0)}^\\circ$: cộng theo quy tắc hình bình hành.`;
    return `${parts}, ${total}. ${how}`;
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {board.width} {board.height}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-xl bg-slate-50"
      role="group"
      aria-label={`Ba điện tích. Lực tổng hợp tác dụng lên q0 có độ lớn ${sciText(res.size)} niutơn.`}
    >
      {#if perNewton > 0 && res.f1Size > 0 && res.f2Size > 0}
        <polyline
          points="{t1.x},{t1.y} {tt.x},{tt.y} {t2.x},{t2.y}"
          fill="none"
          stroke="#94a3b8"
          stroke-dasharray="4 4"
        />
      {/if}
      <ForceArrow x1={origin.x} y1={origin.y} x2={t1.x} y2={t1.y} color="#dc2626" label="F₁₀" />
      <ForceArrow x1={origin.x} y1={origin.y} x2={t2.x} y2={t2.y} color="#2563eb" label="F₂₀" />
      <ForceArrow x1={origin.x} y1={origin.y} x2={tt.x} y2={tt.y} color="#7c3aed" label="F" />
      {#each spots as s, i (i)}
        <g
          class="drag-handle cursor-move outline-none"
          role="slider"
          tabindex="0"
          aria-label={`Điện tích ${NAMES[i]}: kéo hoặc dùng phím mũi tên`}
          aria-valuemin={-board.halfX}
          aria-valuemax={board.halfX}
          aria-valuenow={s.x}
          aria-valuetext={`Toạ độ ${formatNumber(s.x)} và ${formatNumber(s.y)} xentimét`}
          use:draggable={dragOf(i)}
        >
          <ChargeDot cx={board.px(s.x)} cy={board.py(s.y)} q={charges[i]} name={NAMES[i]} r={11} />
        </g>
      {/each}
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Kéo q₀, q₁, q₂. Ba mũi tên vẽ cùng một tỉ lệ: F là đường chéo của hình bình hành dựng trên F₁₀
      và F₂₀.
    </p>
  </div>
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="q₁" bind:value={q1} min={-4} max={4} step={1} unit="µC" />
    <SliderField label="q₂" bind:value={q2} min={-4} max={4} step={1} unit="µC" />
    <SliderField label="q₀" bind:value={q0} min={-2} max={2} step={1} unit="µC" />
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
