<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { jouleHeat, waterRise } from './engine.js';

  /** Water warmed by the resistor, kg, and its starting temperature, °C. */
  const MASS = 0.5;
  const START = 25;

  let r = $state(20);
  let i = $state(2);
  let t = $state(300);

  const q = $derived(jouleHeat(r, i, t));
  const rise = $derived(waterRise(q, MASS));
  const temp = $derived(Math.min(100, START + rise));
  const level = $derived((temp / 100) * 100);
</script>

<div class="space-y-3">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Điện trở R" bind:value={r} min={5} max={50} step={5} unit="Ω" />
    <SliderField
      label="Cường độ dòng điện I"
      bind:value={i}
      min={0.5}
      max={3}
      step={0.5}
      unit="A"
    />
    <SliderField label="Thời gian t" bind:value={t} min={0} max={600} step={30} unit="s" />
  </div>
  <div class="{card} flex items-center gap-4 p-3">
    <div
      class="relative h-32 w-8 overflow-hidden rounded-full border border-slate-300 bg-slate-100"
      role="img"
      aria-label={`Nhiệt kế chỉ ${formatNumber(temp, 1)} độ C`}
    >
      <div class="absolute bottom-0 w-full bg-rose-500" style:height="{level}%"></div>
    </div>
    <dl class="grid flex-1 grid-cols-1 gap-1 text-sm sm:grid-cols-3">
      <div>
        <dt class="text-slate-500">Nhiệt lượng Q = RI²t</dt>
        <dd class="font-semibold tabular-nums">{formatNumber(q)} J</dd>
      </div>
      <div>
        <dt class="text-slate-500">Công suất toả nhiệt RI²</dt>
        <dd class="font-semibold tabular-nums">{formatNumber(r * i * i)} W</dd>
      </div>
      <div>
        <dt class="text-slate-500">Nước 0,5 kg, ban đầu 25 °C</dt>
        <dd class="font-semibold tabular-nums">{formatNumber(temp, 1)} °C</dd>
      </div>
    </dl>
  </div>
  <FeedbackNote
    tone={START + rise >= 100 ? 'warn' : 'info'}
    text={`$Q = RI^2t = ${numTex(r)} \\cdot ${numTex(i)}^2 \\cdot ${numTex(t)} = ${numTex(q)}$ J; nhiệt độ nước tăng thêm $\\dfrac{Q}{mc} = \\dfrac{${numTex(q)}}{0{,}5 \\cdot 4\\,200} \\approx ${numTex(rise, 1)}$ °C (bỏ qua hao phí).${START + rise >= 100 ? ' Nước đã tới $100$ °C và bắt đầu sôi.' : ''} Tăng $I$ gấp đôi thì $Q$ tăng gấp bốn.`}
  />
</div>
