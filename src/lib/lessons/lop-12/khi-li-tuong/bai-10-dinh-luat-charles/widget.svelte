<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { MINUS, formatFixed, formatNumber, intText } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import Cylinder from '../_shared/cylinder.svelte';
  import GasGraph from '../_shared/gas-graph.svelte';
  import { toKelvin } from '../_shared/gas.js';
  import { PRESSURES, T_MAX, T_MIN, fitLine, ratioOf, record, volumeAt } from './engine.js';

  const COLORS = { 1: '#2563eb', 2: '#7c3aed' };

  let celsius = $state(25);
  let pressure = $state(1);
  let axis = $state('t');
  /** @type {import('./engine.js').Reading[]} */
  let table = $state([]);

  const volume = $derived(volumeAt(celsius, pressure));
  const color = (/** @type {number} */ p) => (p === 2 ? COLORS[2] : COLORS[1]);
  /** @param {number} c */
  const xOf = (c) => (axis === 't' ? c : toKelvin(c));

  const fits = $derived(
    PRESSURES.map((p) => ({ p, fit: fitLine(table, p) })).filter(
      (f) => f.fit && table.filter((r) => r.pressure === f.p).length >= 3,
    ),
  );

  const lines = $derived(
    fits.flatMap(({ p, fit }) => {
      if (!fit) return [];
      /** @param {number} c */
      const at = (c) => ({ x: xOf(c), y: fit.intercept + fit.slope * c });
      return [
        { points: [at(fit.zero), at(T_MIN)], color: color(p), dashed: true },
        { points: [at(T_MIN), at(T_MAX)], color: color(p), label: `${formatNumber(p)}·10⁵ Pa` },
      ];
    }),
  );
  const marks = $derived([
    ...table.map((r) => ({ x: xOf(r.celsius), y: r.volume, color: color(r.pressure) })),
    { x: xOf(celsius), y: volume, color: color(pressure), hollow: true },
  ]);

  function save() {
    table = record(table, { celsius, volume, pressure });
  }

  const note = $derived.by(() => {
    const fit = fits.find((f) => f.p === pressure)?.fit;
    if (!fit)
      return `Đã ghi ${table.filter((r) => r.pressure === pressure).length} số đo ở áp suất này. Đun nóng hoặc làm lạnh khí đến các nhiệt độ khác nhau và ghi ít nhất 3 số đo.`;
    const zero = Math.round(fit.zero);
    const ratios = table
      .filter((r) => r.pressure === pressure)
      .map((r) => formatFixed(ratioOf(r), 3))
      .join('; ');
    return axis === 't'
      ? `Các điểm nằm trên một đường thẳng. Kéo dài (nét đứt), đường thẳng cắt trục nhiệt độ tại khoảng ${intText(zero)} °C: ở đó thể tích khí bằng 0. Đó là độ không tuyệt đối, ${MINUS}273 °C hay 0 K.`
      : `Trong thang Kelvin, đường thẳng đi qua gốc toạ độ: V tỉ lệ thuận với T. Tỉ số V/T của các số đo: ${ratios} (cm³/K), gần như không đổi.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <Cylinder
        fill={volume / 45}
        warmth={(celsius - T_MIN) / (T_MAX - T_MIN)}
        gauge={pressure / 3}
        gaugeText={`${formatFixed(pressure, 1)} · 10⁵ Pa`}
        flame={celsius > 30}
        weight
      />
      <p class="px-2 text-center text-sm text-slate-700" aria-live="polite">
        t = {intText(celsius)} °C (T = {formatNumber(toKelvin(celsius))} K), V = {formatFixed(
          volume,
          1,
        )} cm³
      </p>
    </div>
    <div class="{card} p-2">
      <GasGraph
        {lines}
        {marks}
        xMin={axis === 't' ? -300 : 0}
        xMax={axis === 't' ? 200 : 450}
        yMax={45}
        xTicks={axis === 't' ? [-273, -100, 0, 100, 200] : [0, 100, 200, 300, 400]}
        yTicks={[10, 20, 30, 40]}
        xLabel={axis === 't' ? 't (°C)' : 'T (K)'}
        yLabel="V (cm³)"
        label={`Đồ thị thể tích theo nhiệt độ ${axis === 't' ? 'Celsius' : 'Kelvin'} với ${table.length} số đo đã ghi.`}
      />
    </div>
  </div>

  <SliderField
    label="Nhiệt độ của khí"
    bind:value={celsius}
    min={T_MIN}
    max={T_MAX}
    step={5}
    unit="°C"
    format={(v) => intText(v)}
  />
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Áp suất giữ không đổi"
      options={PRESSURES.map((p) => ({ value: p, label: `${formatNumber(p)}·10⁵ Pa` }))}
      bind:value={pressure}
    />
    <SegmentedControl
      label="Trục nhiệt độ"
      options={[
        { value: 't', label: 't (°C)' },
        { value: 'T', label: 'T (K)' },
      ]}
      bind:value={axis}
    />
  </div>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={save}>Ghi số đo</button>
    <button type="button" class={button.quiet} onclick={() => (table = [])}>Xoá bảng</button>
  </div>

  {#if table.length > 0}
    <div class="{card} overflow-x-auto p-2">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="pb-1 text-left text-xs text-slate-500">Bảng số đo</caption>
        <thead>
          <tr class="text-slate-500">
            <th scope="col">p (10⁵ Pa)</th>
            <th scope="col">t (°C)</th>
            <th scope="col">T (K)</th>
            <th scope="col">V (cm³)</th>
            <th scope="col">V/T</th>
          </tr>
        </thead>
        <tbody>
          {#each table as r (`${r.pressure}-${r.celsius}`)}
            <tr style:color={color(r.pressure)}>
              <td>{formatNumber(r.pressure)}</td>
              <td>{intText(r.celsius)}</td>
              <td>{formatNumber(toKelvin(r.celsius))}</td>
              <td>{formatFixed(r.volume, 1)}</td>
              <td>{formatFixed(ratioOf(r), 3)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  <FeedbackNote tone={fits.some((f) => f.p === pressure) ? 'ok' : 'info'} text={note} />
</div>
