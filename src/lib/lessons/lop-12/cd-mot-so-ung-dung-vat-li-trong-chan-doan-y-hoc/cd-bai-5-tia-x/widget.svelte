<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { sciTex } from '../_shared/science.js';
  import { beamPower, electronEnergy, lambdaMin, transmitted, wavelengthCurve } from './engine.js';

  let kV = $state(60);
  let mA = $state(5);
  let filterMm = $state(0);
  const FILTERS = [
    { value: 0, label: 'Không lọc' },
    { value: 2, label: 'Nhôm 2 mm' },
    { value: 4, label: 'Nhôm 4 mm' },
  ];

  const tube = $derived({ kV, mA, filterMm });
  const TOP = 0.15;
  /** The curve is drawn against the unfiltered beam at full current for this voltage. */
  const scale = $derived(
    Math.max(...wavelengthCurve({ kV, mA: 10, filterMm: 0 }, TOP).map((p) => p.y)),
  );
  const curve = $derived(wavelengthCurve(tube, TOP).map((p) => ({ x: p.x, y: p.y / scale })));
  const lmin = $derived(lambdaMin(kV));
  /** Beam power against the reference tube: 60 kV, 5 mA, no filter. */
  const REF = beamPower({ kV: 60, mA: 5, filterMm: 0 });
  const power = $derived(beamPower(tube) / REF);

  const SAMPLES = [
    { material: /** @type {const} */ ('mo-mem'), cm: 5, label: '5 cm mô mềm' },
    { material: /** @type {const} */ ('xuong'), cm: 1, label: '1 cm xương' },
    { material: /** @type {const} */ ('chi'), cm: 0.05, label: '0,5 mm chì' },
  ];
  const passes = $derived(SAMPLES.map((s) => ({ ...s, f: transmitted(tube, s.material, s.cm) })));
  /** @param {number} f */
  const pct = (f) => (f < 0.001 ? 'dưới 0,1%' : `${formatNumber(f * 100, 1)}%`);

  const glow = $derived(0.25 + (0.75 * mA) / 10);
  const streams = $derived(Math.max(1, Math.round(mA / 2.5)));
  const beamOpacity = $derived(Math.min(0.85, 0.15 + 0.25 * power));

  const note = $derived.by(() => {
    const head = `Mỗi electron đến anot có động năng $W_đ = eU = 1{,}6 \\cdot 10^{-19} \\cdot ${numTex(kV)} \\cdot 10^{3} \\approx ${sciTex(electronEnergy(kV * 1000))}$ J. Bước sóng ngắn nhất của tia X phát ra khoảng $${numTex(lmin, 3)}$ nm.`;
    const soft = passes[0].f;
    if (soft < 0.01) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${head} Với $U = ${kV}$ kV tia X còn mềm: gần như bị $5$ cm mô mềm hấp thụ hết, không xuyên qua được cơ thể để tới phim. Hãy tăng hiệu điện thế giữa anot và catot.`,
      };
    }
    const filt =
      filterMm > 0
        ? ` Bộ lọc nhôm đã hấp thụ phần tia X mềm (bước sóng dài), chùm tia còn lại cứng hơn.`
        : '';
    return {
      tone: /** @type {const} */ ('info'),
      text: `${head} Qua $5$ cm mô mềm còn ${pct(soft)} năng lượng chùm tia, qua $1$ cm xương còn ${pct(passes[1].f)}, qua lớp chì $0{,}5$ mm chỉ còn ${pct(passes[2].f)}.${filt}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Ống Cu-lít-giơ</h3>
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Ống Cu-lít-giơ: hiệu điện thế ${kV} kV giữa anot và catot, dòng điện trong ống ${mA} mA, ${filterMm ? `bộ lọc nhôm ${filterMm} mm` : 'không có bộ lọc'}. Chùm tia X đi ra qua cửa sổ phía dưới.`}
    >
      <rect x="20" y="36" width="300" height="96" rx="46" fill="#f8fafc" stroke="#94a3b8" />
      <!-- cathode cup and filament -->
      <path d="M 58 62 Q 44 84 58 106 L 66 106 Q 54 84 66 62 Z" fill="#64748b" />
      <path
        d="M 66 76 l 4 4 l -4 4 l 4 4 l -4 4"
        fill="none"
        stroke="#f97316"
        stroke-width="3"
        opacity={glow}
      />
      <!-- anode with slanted target -->
      <path d="M 250 66 L 300 66 L 300 104 L 266 104 Z" fill="#b45309" />
      <rect x="300" y="78" width="18" height="14" fill="#38bdf8" />
      <!-- electrons -->
      {#each Array.from({ length: streams }, (_, i) => i) as i (i)}
        <line
          x1="76"
          y1={80 + (i - (streams - 1) / 2) * 5}
          x2="252"
          y2={84 + (i - (streams - 1) / 2) * 3}
          stroke="#2563eb"
          stroke-dasharray="6 5"
          stroke-width="1.5"
        />
      {/each}
      <polygon points="246,84 236,79 236,89" fill="#2563eb" />
      <!-- X-ray beam -->
      <polygon points="258,96 232,190 300,190" fill="#a855f7" opacity={beamOpacity} />
      {#if filterMm > 0}
        <rect x="236" y="146" width="62" height={2 + filterMm} fill="#94a3b8" />
        <text x="302" y="152" font-size="10" fill="#475569">lọc Al</text>
      {/if}
      <text x="40" y="26" font-size="11" fill="#334155">Catot (K): dây vonfam nung nóng</text>
      <text x="246" y="26" font-size="11" fill="#334155">Anot (A)</text>
      <text x="124" y="74" font-size="11" fill="#1d4ed8">chùm electron</text>
      <text x="358" y="72" font-size="9" fill="#0369a1" text-anchor="end">nước làm nguội</text>
      <text x="200" y="180" font-size="11" fill="#7e22ce" text-anchor="end">tia X</text>
      <text x="40" y="154" font-size="11" fill="#334155">U = {kV} kV</text>
      <text x="40" y="170" font-size="11" fill="#334155">I = {mA} mA</text>
    </svg>
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Hiệu điện thế anot – catot U"
        bind:value={kV}
        min={20}
        max={120}
        step={5}
        unit="kV"
      />
      <SliderField
        label="Dòng điện trong ống (nung catot)"
        bind:value={mA}
        min={1}
        max={10}
        step={1}
        unit="mA"
      />
    </div>
    <SegmentedControl label="Bộ lọc ở cửa sổ ống" options={FILTERS} bind:value={filterMm} />
  </div>

  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <XyPlot
        lines={[{ points: curve, color: '#7c3aed' }]}
        marks={[{ x: lmin, y: 0, color: '#e11d48' }]}
        xMax={TOP}
        yMax={1.05}
        xTicks={[0.05, 0.1, 0.15]}
        yTicks={[0.5, 1]}
        xLabel="λ (nm)"
        yLabel="cường độ"
        label={`Phổ tia X: bắt đầu từ bước sóng ngắn nhất khoảng ${formatNumber(lmin, 3)} nm, cường độ toàn chùm gấp ${formatNumber(power, 2)} lần chùm 60 kV, 5 mA không lọc.`}
      />
      <p class="px-2 text-xs text-slate-500">
        Thang cường độ ứng với ống {kV} kV, 10 mA, không lọc. Cường độ toàn chùm: gấp {formatNumber(
          power,
          2,
        )} lần chùm 60 kV, 5 mA.
      </p>
    </div>
    <div class="{card} space-y-2 p-3">
      <p class="text-sm font-semibold text-slate-700">Phần năng lượng chùm tia đi qua</p>
      {#each passes as s (s.material)}
        <div>
          <div class="flex justify-between text-sm text-slate-700">
            <span>{s.label}</span><span class="tabular-nums">{pct(s.f)}</span>
          </div>
          <div class="h-3 w-full rounded bg-slate-100">
            <div
              class="h-3 rounded bg-violet-500"
              style="width: {Math.max(0, Math.min(100, s.f * 100))}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
