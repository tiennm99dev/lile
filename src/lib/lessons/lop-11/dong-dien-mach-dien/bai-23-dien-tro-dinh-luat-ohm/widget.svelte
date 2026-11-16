<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import GraphPanel from '../_shared/graph-panel.svelte';
  import { COMPONENTS, characteristic, currentAt, resistanceAt } from './engine.js';

  /** @typedef {import('./engine.js').Component} Component */

  const COLORS = { 'dien-tro': '#4f46e5', den: '#d97706', diot: '#059669' };
  const TICKS_U = [-6, -4, -2, 0, 2, 4, 6];
  const TICKS_I = [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6];

  let kind = $state(/** @type {Component} */ ('dien-tro'));
  let u = $state(2);
  let showCurves = $state(false);
  /** Recorded (U, I) points, per component. */
  let records = $state(
    /** @type {Record<Component, Array<{ x: number, y: number }>>} */ ({
      'dien-tro': [],
      den: [],
      diot: [],
    }),
  );

  const i = $derived(currentAt(kind, u));
  const r = $derived(resistanceAt(kind, u));
  const name = $derived(COMPONENTS.find((c) => c.value === kind)?.label ?? '');
  const points = $derived(records[kind]);

  function record() {
    const list = records[kind].filter((p) => p.x !== u);
    records[kind] = [...list, { x: u, y: i }].sort((a, b) => a.x - b.x);
  }

  const lines = $derived(
    showCurves
      ? COMPONENTS.map((c) => ({
          points: characteristic(c.value, -6, 6),
          color: COLORS[c.value],
          dashed: c.value !== kind,
        }))
      : [],
  );
  const marks = $derived([
    ...points.map((p) => ({ x: p.x, y: p.y, color: COLORS[kind] })),
    { x: u, y: i, color: '#e11d48', big: true },
  ]);

  const note = $derived.by(() => {
    const reading = `$U = ${numTex(u)}$ V, $I = ${numTex(i, 3)}$ A`;
    if (kind === 'dien-tro')
      return {
        tone: /** @type {const} */ ('info'),
        text: `${reading}, $R = \\dfrac{U}{I} = ${numTex(r ?? 0, 1)}$ Ω. Điện trở không đổi: đặc tuyến là đường thẳng đi qua gốc toạ độ, đúng định luật Ohm.`,
      };
    if (kind === 'den')
      return {
        tone: /** @type {const} */ ('info'),
        text:
          u === 0
            ? 'Khi $U = 0$ thì không có dòng điện, dây tóc nguội.'
            : `${reading}, $R = \\dfrac{U}{I} = ${numTex(r ?? 0, 1)}$ Ω. Hiệu điện thế càng lớn, dây tóc càng nóng nên điện trở càng lớn: đặc tuyến cong dần về phía trục $U$.`,
      };
    if (u < 0)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${reading}. Điốt mắc ngược chiều: hầu như không có dòng điện đi qua.`,
      };
    if (r === null)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${reading}. Dưới khoảng $0{,}6$ V, dòng điện qua điốt còn rất nhỏ.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `${reading}, $\\dfrac{U}{I} = ${numTex(r, 1)}$ Ω. Điốt dẫn điện theo một chiều; thương số $\\dfrac{U}{I}$ thay đổi mạnh theo $U$, nên điốt không tuân theo định luật Ohm.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Linh kiện cần đo" options={COMPONENTS} bind:value={kind} />

  <div class="{card} p-2">
    <GraphPanel
      xMin={-6}
      xMax={6}
      yMin={-0.6}
      yMax={0.6}
      xTicks={TICKS_U}
      yTicks={TICKS_I}
      xLabel="U (V)"
      yLabel="I (A)"
      label={`Đặc tuyến vôn – ampe của ${name}: ${points.length} điểm đã ghi; điểm đang đo U = ${formatNumber(u)} vôn, I = ${formatNumber(i, 3)} ampe.`}
      {lines}
      {marks}
    />
    {#if showCurves}
      <ul class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 pt-1 text-sm">
        {#each COMPONENTS as c (c.value)}
          <li class="flex items-center gap-1.5">
            <span class="inline-block h-1 w-5 rounded" style:background-color={COLORS[c.value]}
            ></span>
            {c.label}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <SliderField label="Hiệu điện thế U" bind:value={u} min={-6} max={6} step={0.5} unit="V" />

  <dl class="grid grid-cols-3 gap-2 text-sm">
    <div class="{card} p-2">
      <dt class="text-slate-500">Vôn kế</dt>
      <dd class="font-semibold tabular-nums">{formatNumber(u)} V</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Ampe kế</dt>
      <dd class="font-semibold tabular-nums">{formatNumber(i, 3)} A</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">U/I</dt>
      <dd class="font-semibold tabular-nums">
        {r === null ? 'rất lớn' : `${formatNumber(r, 1)} Ω`}
      </dd>
    </div>
  </dl>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={record}>Ghi điểm đo</button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => (records[kind] = [])}
      disabled={points.length === 0}>Xoá các điểm</button
    >
    <button
      type="button"
      class={button.quiet}
      aria-pressed={showCurves}
      onclick={() => (showCurves = !showCurves)}
    >
      {showCurves ? 'Ẩn đặc tuyến' : 'So sánh ba đặc tuyến'}
    </button>
  </div>
  <p class="text-sm text-slate-600" aria-live="polite">
    Đã ghi {points.length} điểm cho {name.toLowerCase()}. Ghi ít nhất 6 điểm, cả U âm và U dương,
    rồi xem các điểm xếp thành hình gì.
  </p>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
