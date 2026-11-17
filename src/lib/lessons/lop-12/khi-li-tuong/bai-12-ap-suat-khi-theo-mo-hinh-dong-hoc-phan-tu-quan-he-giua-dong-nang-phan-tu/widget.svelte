<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import GasGraph from '../_shared/gas-graph.svelte';
  import { curve } from '../_shared/gas.js';
  import {
    DENSITY,
    GASES,
    histogram,
    massOf,
    maxwell,
    meanEnergy,
    meanSquare,
    pressureOf,
    speedsOf,
    unitSample,
  } from './engine.js';

  const V_MAX = 4000;
  const unit = unitSample(12);

  let kelvin = $state(300);
  let gasId = $state('n2');

  const gas = $derived(GASES.find((g) => g.id === gasId) ?? GASES[1]);
  const speeds = $derived(speedsOf(unit, kelvin, gas.molar));
  const sampleMs = $derived(speeds.reduce((s, v) => s + v * v, 0) / speeds.length);
  const ms = $derived(meanSquare(kelvin, gas.molar));
  const vrms = $derived(Math.sqrt(ms));
  const energy = $derived(meanEnergy(kelvin));
  const pressure = $derived(pressureOf(DENSITY, massOf(gas.molar), ms));

  const theory = $derived(curve((v) => maxwell(v, kelvin, gas.molar) * 100 * 100, 0, V_MAX, 120));

  const note = $derived(
    `Ở ${formatNumber(kelvin)} K, mỗi phân tử ${gas.name} có tốc độ khác nhau, nhưng trung bình bình phương tốc độ là $\\overline{v^2} \\approx$ ${formatNumber(Math.round(ms / 1000) * 1000)} m²/s² (mẫu ${formatNumber(speeds.length)} phân tử cho ${formatNumber(Math.round(sampleMs / 1000) * 1000)} m²/s²). Động năng trung bình $\\overline{E}_\\text{đ} = \\tfrac{3}{2}kT$ = ${formatFixed(energy * 1e21, 2)}·10⁻²¹ J chỉ phụ thuộc nhiệt độ: đổi chất khí, $\\overline{E}_\\text{đ}$ giữ nguyên còn tốc độ thay đổi. Tăng T thì phân bố dời sang phải, dẹt ra, và áp suất tăng tỉ lệ với T.`,
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <GasGraph
      lines={[
        { points: histogram(speeds, V_MAX), color: '#94a3b8' },
        { points: theory, color: '#4f46e5' },
        {
          points: [
            { x: vrms, y: 0 },
            { x: vrms, y: 40 },
          ],
          color: '#e11d48',
          dashed: true,
        },
      ]}
      xMax={V_MAX}
      yMax={35}
      xTicks={[0, 1000, 2000, 3000, 4000]}
      yTicks={[10, 20, 30]}
      xLabel="v (m/s)"
      yLabel="% phân tử / 100 m/s"
      label={`Phân bố tốc độ phân tử ${gas.name} ở ${kelvin} K: phần lớn phân tử có tốc độ quanh ${formatNumber(Math.round(vrms))} m/s.`}
    />
    <p class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 pt-1 text-xs text-slate-600">
      <span
        ><span class="inline-block h-0.5 w-4 bg-slate-400 align-middle"></span> mẫu {formatNumber(
          speeds.length,
        )} phân tử</span
      >
      <span
        ><span class="inline-block h-0.5 w-4 bg-indigo-600 align-middle"></span> phân bố lí thuyết</span
      >
      <span
        ><span class="inline-block h-0.5 w-4 bg-rose-600 align-middle"></span>
        <Tex math={'\\sqrt{\\overline{v^2}}'} /></span
      >
    </p>
  </div>

  <SliderField label="Nhiệt độ khí" bind:value={kelvin} min={200} max={1000} step={20} unit="K" />
  <SegmentedControl
    label="Chất khí"
    options={GASES.map((g) => ({ value: g.id, label: g.name }))}
    bind:value={gasId}
  />

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4" aria-live="polite">
    <div class="{card} p-2">
      <dt class="text-slate-500">Khối lượng phân tử</dt>
      <dd class="font-semibold tabular-nums">
        {formatFixed(massOf(gas.molar) * 1e26, 2)}·10⁻²⁶ kg
      </dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500"><Tex math={'\\sqrt{\\overline{v^2}}'} /></dt>
      <dd class="font-semibold tabular-nums">{formatNumber(Math.round(vrms))} m/s</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">
        Động năng trung bình <Tex math={'\\overline{E}_\\text{đ}'} />
      </dt>
      <dd class="font-semibold tabular-nums">{formatFixed(energy * 1e21, 2)}·10⁻²¹ J</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">
        Áp suất <Tex math={'p = \\tfrac{1}{3}\\mu m\\overline{v^2}'} />
      </dt>
      <dd class="font-semibold tabular-nums">{formatNumber(pressure / 1000, 1)} kPa</dd>
    </div>
  </dl>
  <p class="text-xs text-slate-600">
    Bình kín có mật độ phân tử μ = 2,5·10²⁵ m⁻³ không đổi. Đường phân bố (phân bố Maxwell) chỉ để
    minh hoạ, không thuộc nội dung cần học.
  </p>
  <FeedbackNote tone="info" text={note} />
</div>
