<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import Cylinder from '../_shared/cylinder.svelte';
  import GasGraph from '../_shared/gas-graph.svelte';
  import {
    T_RANGE,
    T_STEP,
    V_RANGE,
    freeOf,
    isStuck,
    move,
    pointOf,
    processLine,
    rangeOf,
    ratioOf,
    stateAt,
  } from './engine.js';

  /** @type {Record<import('./engine.js').Fixed, string>} */
  const NAMES = { T: 'Đẳng nhiệt', p: 'Đẳng áp', V: 'Đẳng tích' };

  let n = $state(0.4);
  /** @type {import('./engine.js').Fixed} */
  let fixed = $state('T');
  let first = $state(stateAt(0.4, 10, 300));
  let now = $state(stateAt(0.4, 10, 300));
  let value = $state(10);

  const range = $derived(rangeOf(fixed, first, n));
  const free = $derived(freeOf(fixed));
  const stuck = $derived(isStuck(fixed, range));

  /** Starts a new process from the current state. */
  function begin() {
    first = now;
    value = free === 'V' ? now.V : now.T;
  }

  /** @param {string | number} f */
  function choose(f) {
    fixed = /** @type {import('./engine.js').Fixed} */ (f);
    begin();
  }

  /** @param {number} v */
  function slide(v) {
    now = move(fixed, first, v, n);
  }

  /** @param {string | number} v */
  function setN(v) {
    n = Number(v);
    now = stateAt(n, now.V, now.T);
    begin();
  }

  function reset() {
    now = stateAt(n, 10, 300);
    begin();
  }

  const axes = $derived(
    fixed === 'T'
      ? {
          xMax: 35,
          yMax: 450,
          xTicks: [5, 10, 20, 30],
          yTicks: [100, 200, 300, 400],
          x: 'V (l)',
          y: 'p (kPa)',
        }
      : fixed === 'p'
        ? {
            xMax: 650,
            yMax: 35,
            xTicks: [0, 200, 400, 600],
            yTicks: [10, 20, 30],
            x: 'T (K)',
            y: 'V (l)',
          }
        : {
            xMax: 650,
            yMax: 450,
            xTicks: [0, 200, 400, 600],
            yTicks: [100, 200, 300, 400],
            x: 'T (K)',
            y: 'p (kPa)',
          },
  );

  /** @param {import('./engine.js').State} s */
  const stateText = (s) =>
    `p = ${formatNumber(s.p, 1)} kPa, V = ${formatNumber(s.V, 1)} l, T = ${formatNumber(Math.round(s.T))} K`;

  const note = $derived.by(() => {
    const r1 = formatFixed(ratioOf(first), 2);
    const r2 = formatFixed(ratioOf(now), 2);
    const nr = formatFixed(n * 8.31, 2);
    const law =
      fixed === 'T'
        ? 'T không đổi nên pV không đổi (định luật Boyle).'
        : fixed === 'p'
          ? 'p không đổi nên V/T không đổi (định luật Charles).'
          : 'V không đổi nên p/T không đổi: áp suất tỉ lệ thuận với nhiệt độ tuyệt đối.';
    return `${law} Ở cả hai trạng thái, pV/T = ${r1} J/K và ${r2} J/K, đúng bằng nR = ${formatNumber(n)} · 8,31 = ${nr} J/K.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <Cylinder
        fill={now.V / 35}
        warmth={(now.T - T_RANGE.min) / (T_RANGE.max - T_RANGE.min)}
        gauge={now.p / 450}
        gaugeText={`${formatNumber(now.p, 0)} kPa`}
        flame={now.T > 320}
      />
      <dl class="grid grid-cols-3 gap-1 px-1 text-center text-sm tabular-nums" aria-live="polite">
        <div class="rounded-lg p-1 {fixed === 'T' ? 'bg-amber-50' : ''}">
          <dt class="text-slate-500">T (K)</dt>
          <dd class="font-semibold">{formatNumber(Math.round(now.T))}</dd>
        </div>
        <div class="rounded-lg p-1 {fixed === 'p' ? 'bg-amber-50' : ''}">
          <dt class="text-slate-500">p (kPa)</dt>
          <dd class="font-semibold">{formatNumber(now.p, 1)}</dd>
        </div>
        <div class="rounded-lg p-1 {fixed === 'V' ? 'bg-amber-50' : ''}">
          <dt class="text-slate-500">V (l)</dt>
          <dd class="font-semibold">{formatNumber(now.V, 1)}</dd>
        </div>
      </dl>
    </div>
    <div class="{card} p-2">
      <GasGraph
        lines={[{ points: processLine(fixed, first, n), color: '#4f46e5' }]}
        marks={[
          { ...pointOf(fixed, first), color: '#64748b', label: '1' },
          { ...pointOf(fixed, now), color: '#e11d48', label: '2' },
        ]}
        xMax={axes.xMax}
        yMax={axes.yMax}
        xTicks={axes.xTicks}
        yTicks={axes.yTicks}
        xLabel={axes.x}
        yLabel={axes.y}
        label={`Đồ thị quá trình ${NAMES[fixed].toLowerCase()} từ trạng thái 1 (${stateText(first)}) đến trạng thái 2 (${stateText(now)}).`}
      />
    </div>
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Quá trình (giữ không đổi)"
      options={[
        { value: 'T', label: 'Đẳng nhiệt (T)' },
        { value: 'p', label: 'Đẳng áp (p)' },
        { value: 'V', label: 'Đẳng tích (V)' },
      ]}
      value={fixed}
      onchange={choose}
    />
    <SegmentedControl
      label="Lượng khí"
      options={[
        { value: 0.2, label: '0,2 mol' },
        { value: 0.4, label: '0,4 mol' },
      ]}
      value={n}
      onchange={setN}
    />
  </div>
  <div>
    <fieldset disabled={stuck} class="min-w-0 disabled:opacity-60">
      <SliderField
        label={free === 'V' ? 'Thể tích khí' : 'Nhiệt độ khí'}
        bind:value
        min={free === 'V' ? V_RANGE.min : range.min}
        max={free === 'V' ? V_RANGE.max : range.max}
        step={free === 'V' ? 0.5 : T_STEP}
        unit={free === 'V' ? 'l' : 'K'}
        oninput={slide}
      />
    </fieldset>
    {#if stuck}
      <p class="mt-1 text-sm text-slate-600">
        Ở trạng thái này khí đã chạm giới hạn của xi lanh nên không đổi được nhiệt độ. Hãy bấm Làm
        lại hoặc chọn quá trình khác.
      </p>
    {/if}
  </div>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} onclick={begin}>
      Lấy trạng thái hiện tại làm trạng thái 1
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
