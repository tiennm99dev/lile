<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import Cylinder from '../_shared/cylinder.svelte';
  import GasGraph from '../_shared/gas-graph.svelte';
  import { TEMPERATURES, V_MAX, V_MIN, isotherm, readingAt, record, spreadOf } from './engine.js';

  const COLORS = { 300: '#2563eb', 400: '#dc2626' };

  let volume = $state(30);
  let kelvin = $state(300);
  let axis = $state('pv');
  /** @type {import('./engine.js').Reading[]} */
  let table = $state([]);

  const pressure = $derived(readingAt(volume, kelvin));
  const color = (/** @type {number} */ k) => (k === 400 ? COLORS[400] : COLORS[300]);

  const counts = $derived(
    TEMPERATURES.map((k) => ({ k, n: table.filter((r) => r.kelvin === k).length })),
  );

  const lines = $derived(
    counts
      .filter((c) => c.n >= 3)
      .map((c) => ({
        points:
          axis === 'pv'
            ? isotherm(c.k)
            : [
                { x: 0, y: 0 },
                { x: 0.11, y: (0.11 * c.k * 30) / 300 },
              ],
        color: color(c.k),
        label: `${c.k} K`,
      })),
  );
  const marks = $derived([
    ...table.map((r) => ({
      x: axis === 'pv' ? r.volume : 1 / r.volume,
      y: r.pressure,
      color: color(r.kelvin),
    })),
    {
      x: axis === 'pv' ? volume : 1 / volume,
      y: pressure,
      color: color(kelvin),
      hollow: true,
    },
  ]);

  function save() {
    table = record(table, { volume, pressure, kelvin });
  }

  const note = $derived.by(() => {
    const here = table.filter((r) => r.kelvin === kelvin);
    if (here.length < 3)
      return `Đã ghi ${here.length} số đo ở ${kelvin} K. Nén hoặc kéo pít-tông đến các thể tích khác nhau và ghi ít nhất 3 số đo để thấy quy luật.`;
    const pv = here.map((r) => formatFixed(r.pressure * r.volume, 1)).join('; ');
    const spread = formatNumber(spreadOf(table, kelvin) * 100, 1);
    return `Ở ${kelvin} K, tích pV của các số đo là ${pv} (chênh lệch không quá ${spread} % do làm tròn số chỉ áp kế): pV gần như không đổi. ${
      axis === 'pv'
        ? 'Các điểm nằm trên một đường hypebol: đường đẳng nhiệt.'
        : 'Đồ thị p theo 1/V là một đoạn thẳng đi qua gốc toạ độ: p tỉ lệ nghịch với V.'
    }`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <Cylinder
        fill={volume / (V_MAX + 5)}
        warmth={kelvin === 400 ? 0.8 : 0.2}
        gauge={pressure / 4}
        gaugeText={`${formatFixed(pressure, 2)} · 10⁵ Pa`}
      />
      <p class="px-2 text-center text-sm text-slate-700" aria-live="polite">
        V = {formatNumber(volume)} cm³, p = {formatFixed(pressure, 2)}·10⁵ Pa, T = {kelvin} K
      </p>
    </div>
    <div class="{card} p-2">
      <GasGraph
        {lines}
        {marks}
        xMax={axis === 'pv' ? 45 : 0.11}
        yMax={4.5}
        xTicks={axis === 'pv' ? [10, 20, 30, 40] : [0.02, 0.04, 0.06, 0.08, 0.1]}
        yTicks={[1, 2, 3, 4]}
        xLabel={axis === 'pv' ? 'V (cm³)' : '1/V (cm⁻³)'}
        yLabel="p (10⁵ Pa)"
        label={`Đồ thị ${axis === 'pv' ? 'p theo V' : 'p theo 1/V'} với ${table.length} số đo đã ghi.`}
      />
    </div>
  </div>

  <SliderField
    label="Thể tích khí (dịch pít-tông)"
    bind:value={volume}
    min={V_MIN}
    max={V_MAX}
    step={1}
    unit="cm³"
  />
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Nhiệt độ giữ không đổi"
      options={TEMPERATURES.map((k) => ({ value: k, label: `${k} K` }))}
      bind:value={kelvin}
    />
    <SegmentedControl
      label="Đồ thị"
      options={[
        { value: 'pv', label: 'p theo V' },
        { value: 'inv', label: 'p theo 1/V' },
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
            <th scope="col">T (K)</th>
            <th scope="col">V (cm³)</th>
            <th scope="col">p (10⁵ Pa)</th>
            <th scope="col">pV</th>
          </tr>
        </thead>
        <tbody>
          {#each table as r (`${r.kelvin}-${r.volume}`)}
            <tr style:color={color(r.kelvin)}>
              <td>{r.kelvin}</td>
              <td>{formatNumber(r.volume)}</td>
              <td>{formatFixed(r.pressure, 2)}</td>
              <td>{formatFixed(r.pressure * r.volume, 1)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  <FeedbackNote
    tone={table.filter((r) => r.kelvin === kelvin).length >= 3 ? 'ok' : 'info'}
    text={note}
  />
</div>
