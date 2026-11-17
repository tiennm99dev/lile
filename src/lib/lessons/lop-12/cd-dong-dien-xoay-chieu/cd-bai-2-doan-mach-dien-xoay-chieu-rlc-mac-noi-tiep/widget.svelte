<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { currentCurve, solve } from './engine.js';

  /** Effective voltage of the generator, V. */
  const U = 12;
  const F_MIN = 10;
  const F_MAX = 250;

  let R = $state(20);
  let L = $state(0.3);
  let Cmicro = $state(30);
  let f = $state(80);

  const c = $derived({ R, L, C: Cmicro * 1e-6, U });
  const s = $derived(solve({ ...c, f }));

  // Phasor diagram.
  const W = 360;
  const H = 240;
  const OX = 70;
  const OY = 120;
  const LONG = 105;
  const k = $derived(LONG / Math.max(s.UR, s.UL, s.UC, U));
  const tip = $derived({ x: OX + s.UR * k, y: OY - (s.UL - s.UC) * k });
  const arc = $derived.by(() => {
    const r = 30;
    if (Math.abs(s.phi) < 0.01) return '';
    const ex = OX + r * Math.cos(s.phi);
    const ey = OY - r * Math.sin(s.phi);
    return `M ${OX + r} ${OY} A ${r} ${r} 0 0 ${s.phi > 0 ? 0 : 1} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  });
  const deg = $derived((s.phi * 180) / Math.PI);

  // Resonance curve.
  const curve = $derived(currentCurve(c, F_MIN, F_MAX, 280));
  const yTop = $derived(s.Imax * 1.15);
  const yTicks = $derived(ticksUpTo(yTop));

  const note = $derived.by(() => {
    const head = `$Z_L = \\omega L \\approx ${numTex(s.ZL, 1)}\\ \\Omega$, $Z_C = \\dfrac{1}{\\omega C} \\approx ${numTex(s.ZC, 1)}\\ \\Omega$, $Z = \\sqrt{R^2 + (Z_L - Z_C)^2} \\approx ${numTex(s.Z, 1)}\\ \\Omega$, $I = \\dfrac{U}{Z} \\approx ${numTex(s.I, 3)}$ A.`;
    if (s.character === 'R') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${head} Cộng hưởng điện: $Z_L = Z_C$, $Z = R$, cường độ hiệu dụng lớn nhất $I_{\\max} = \\dfrac{U}{R} = ${numTex(s.Imax, 3)}$ A, $u$ cùng pha với $i$.`,
      };
    }
    const side =
      s.character === 'L'
        ? `$Z_L > Z_C$: $\\tan\\varphi > 0$, $u$ sớm pha $\\varphi \\approx ${numTex(deg, 1)}^\\circ$ so với $i$. Giảm $f$ để tới gần cộng hưởng.`
        : `$Z_L < Z_C$: $\\tan\\varphi < 0$, $u$ trễ pha $${numTex(Math.abs(deg), 1)}^\\circ$ so với $i$. Tăng $f$ để tới gần cộng hưởng.`;
    return {
      tone: /** @type {const} */ ('info'),
      text: `${head} ${side} Tần số cộng hưởng của mạch: $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}} \\approx ${numTex(s.f0, 1)}$ Hz.`,
    };
  });

  const diagramLabel = $derived(
    `Giản đồ vectơ: U_R ≈ ${formatNumber(s.UR, 2)} V cùng hướng với I, U_L ≈ ${formatNumber(s.UL, 2)} V hướng lên, U_C ≈ ${formatNumber(s.UC, 2)} V hướng xuống, tổng U = ${U} V lệch ${formatNumber(deg, 1)} độ so với I.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <p class="px-2 text-sm font-semibold text-slate-700">Giản đồ vectơ (giá trị hiệu dụng)</p>
      <svg
        viewBox="0 0 {W} {H}"
        class="mx-auto block w-full max-w-md select-none"
        role="img"
        aria-label={diagramLabel}
      >
        <line x1="20" x2={W - 14} y1={OY} y2={OY} stroke="#94a3b8" />
        <text x={W - 14} y={OY + 16} font-size="12" fill="#475569" text-anchor="end"
          >trục dòng điện I</text
        >
        {#if Math.abs(s.UL - s.UC) * k > 1 && s.UR * k > 1}
          <line
            x1={OX + s.UR * k}
            y1={OY}
            x2={tip.x}
            y2={tip.y}
            stroke="#94a3b8"
            stroke-dasharray="4 3"
          />
          <line x1={OX} y1={tip.y} x2={tip.x} y2={tip.y} stroke="#94a3b8" stroke-dasharray="4 3" />
        {/if}
        <ForceArrow x1={OX} y1={OY} x2={OX} y2={OY - s.UL * k} color="#ea580c" />
        <ForceArrow x1={OX} y1={OY} x2={OX} y2={OY + s.UC * k} color="#7c3aed" />
        <ForceArrow x1={OX} y1={OY} x2={OX + s.UR * k} y2={OY} color="#16a34a" />
        <ForceArrow x1={OX} y1={OY} x2={tip.x} y2={tip.y} color="#2563eb" />
        {#if arc}
          <path d={arc} fill="none" stroke="#2563eb" stroke-width="1.5" />
          <text x={OX + 36} y={OY + (s.phi > 0 ? -6 : 16)} font-size="12" fill="#2563eb">φ</text>
        {/if}
        <text x={OX - 8} y={OY - s.UL * k + 4} font-size="13" fill="#ea580c" text-anchor="end"
          >U<tspan font-size="9" dy="3">L</tspan></text
        >
        <text x={OX - 8} y={OY + s.UC * k + 4} font-size="13" fill="#7c3aed" text-anchor="end"
          >U<tspan font-size="9" dy="3">C</tspan></text
        >
        <text x={OX + s.UR * k} y={OY + 18} font-size="13" fill="#16a34a" text-anchor="middle"
          >U<tspan font-size="9" dy="3">R</tspan></text
        >
        <text x={tip.x + 8} y={tip.y + (tip.y > OY + 14 ? 12 : -6)} font-size="13" fill="#2563eb"
          >U</text
        >
      </svg>
    </div>
    <div class="{card} p-2">
      <p class="px-2 text-sm font-semibold text-slate-700">Đồ thị cộng hưởng: I theo f</p>
      <XyPlot
        lines={[{ points: curve, color: '#2563eb' }]}
        marks={[{ x: f, y: s.I, color: '#e11d48' }]}
        guides={[{ y: s.Imax, label: 'Imax = U/R', color: '#16a34a' }]}
        xMax={F_MAX}
        yMax={yTop}
        xTicks={[0, 50, 100, 150, 200, 250]}
        {yTicks}
        xLabel="f (Hz)"
        yLabel="I (A)"
        label={`Đồ thị cường độ hiệu dụng theo tần số, đỉnh tại f₀ ≈ ${formatNumber(s.f0, 1)} Hz; điểm đang xét: f = ${f} Hz, I ≈ ${formatNumber(s.I, 3)} A.`}
      />
    </div>
  </div>

  <div class="{card} overflow-x-auto p-2">
    <table class="w-full text-center text-sm tabular-nums">
      <thead>
        <tr class="text-slate-600">
          <th class="p-1">Z<sub>L</sub> (Ω)</th>
          <th class="p-1">Z<sub>C</sub> (Ω)</th>
          <th class="p-1">Z (Ω)</th>
          <th class="p-1">I (A)</th>
          <th class="p-1">U<sub>R</sub> (V)</th>
          <th class="p-1">U<sub>L</sub> (V)</th>
          <th class="p-1">U<sub>C</sub> (V)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="font-semibold text-slate-800">
          <td class="p-1">{formatNumber(s.ZL, 1)}</td>
          <td class="p-1">{formatNumber(s.ZC, 1)}</td>
          <td class="p-1">{formatNumber(s.Z, 1)}</td>
          <td class="p-1">{formatNumber(s.I, 3)}</td>
          <td class="p-1">{formatNumber(s.UR, 2)}</td>
          <td class="p-1">{formatNumber(s.UL, 2)}</td>
          <td class="p-1">{formatNumber(s.UC, 2)}</td>
        </tr>
      </tbody>
    </table>
    <p class="px-1 pt-1 text-xs text-slate-500">
      Điện áp hiệu dụng của nguồn luôn là U = {U} V. U<sub>R</sub> + U<sub>L</sub> + U<sub>C</sub> =
      {formatNumber(s.UR + s.UL + s.UC, 2)} V, khác U: các điện áp được cộng theo vectơ.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Điện trở R" bind:value={R} min={10} max={100} step={5} unit="Ω" />
    <SliderField
      label="Độ tự cảm L"
      bind:value={L}
      min={0.1}
      max={1}
      step={0.05}
      unit="H"
      format={(v) => formatNumber(v, 2)}
    />
    <SliderField label="Điện dung C" bind:value={Cmicro} min={5} max={50} step={1} unit="μF" />
    <SliderField label="Tần số f" bind:value={f} min={F_MIN} max={F_MAX} step={1} unit="Hz" />
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
