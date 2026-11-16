<script>
  import MeterDial from '#lib/domain/meter-dial.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import GraphPanel from '../_shared/graph-panel.svelte';
  import { circuitCurrent, terminalVoltage } from '../_shared/circuit-math.js';

  const I_MAX = 8;
  const U_MAX = 12;

  let emf = $state(6);
  let r = $state(1);
  let outer = $state(5);

  const i = $derived(circuitCurrent(emf, r, outer));
  const u = $derived(terminalVoltage(emf, r, i));
  const drop = $derived(emf - u);
  const short = $derived(outer === 0);

  const line = $derived([
    { x: 0, y: emf },
    { x: emf / r, y: 0 },
  ]);
  const uShare = $derived((100 * u) / U_MAX);
  const dropShare = $derived((100 * drop) / U_MAX);

  const note = $derived.by(() => {
    if (short)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Đoản mạch! $R = 0$ nên $I = \\dfrac{\\mathscr{E}}{r} = ${numTex(i, 2)}$ A, rất lớn; hiệu điện thế giữa hai cực $U = 0$. Toàn bộ suất điện động “rơi” trên điện trở trong, pin nóng lên và nhanh hỏng.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `$I = \\dfrac{\\mathscr{E}}{R + r} = \\dfrac{${numTex(emf)}}{${numTex(outer)} + ${numTex(r)}} = ${numTex(i, 3)}$ A; $U = \\mathscr{E} - Ir = ${numTex(emf)} - ${numTex(drop, 2)} = ${numTex(u, 2)}$ V. ${outer < 3 * r ? 'Mạch ngoài có điện trở nhỏ nên dòng điện lớn, độ giảm thế trong nguồn đáng kể.' : 'Giảm $R$ để thấy $I$ tăng còn $U$ giảm.'}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-50"
      role="img"
      aria-label={`Mạch kín: nguồn suất điện động ${formatNumber(emf)} vôn, điện trở trong ${formatNumber(r)} ôm, mạch ngoài ${formatNumber(outer)} ôm. Ampe kế chỉ ${formatNumber(i, 2)} ampe, vôn kế mắc giữa hai cực nguồn chỉ ${formatNumber(u, 2)} vôn.`}
    >
      <g fill="none" stroke="#475569" stroke-width="2">
        <!-- loop: source at the bottom, ammeter left, resistor top -->
        <polyline points="70,150 30,150 30,40 150,40" />
        <polyline points="230,40 330,40 330,150 290,150" />
        <!-- voltmeter across the poles -->
        <polyline points="50,150 50,186 169,186" stroke="#0369a1" />
        <polyline points="191,186 310,186 310,150" stroke="#0369a1" />
      </g>
      <!-- source box: ideal cell and internal resistance -->
      <rect
        x="70"
        y="128"
        width="220"
        height="44"
        rx="8"
        fill="#fff7ed"
        stroke="#c2410c"
        stroke-dasharray="5 4"
      />
      <line x1="70" y1="150" x2="122" y2="150" stroke="#475569" stroke-width="2" />
      <line x1="122" y1="138" x2="122" y2="162" stroke="#0f172a" stroke-width="2" />
      <line x1="130" y1="143" x2="130" y2="157" stroke="#0f172a" stroke-width="5" />
      <line x1="130" y1="150" x2="190" y2="150" stroke="#475569" stroke-width="2" />
      <rect x="190" y="142" width="50" height="16" fill="#fed7aa" stroke="#c2410c" />
      <line x1="240" y1="150" x2="290" y2="150" stroke="#475569" stroke-width="2" />
      <text x="126" y="132" font-size="11" fill="#9a3412" text-anchor="middle">ℰ</text>
      <text x="215" y="137" font-size="11" fill="#9a3412" text-anchor="middle">r</text>
      <text x="74" y="145" font-size="13" font-weight="700" fill="#dc2626">+</text>
      <text x="276" y="145" font-size="13" font-weight="700" fill="#2563eb">−</text>
      <!-- outer resistor -->
      <rect x="150" y="30" width="80" height="20" fill="#e0e7ff" stroke="#4338ca" />
      <text x="190" y="22" font-size="12" font-weight="600" fill="#3730a3" text-anchor="middle"
        >R = {formatNumber(outer)} Ω</text
      >
      <!-- ammeter -->
      <circle cx="30" cy="95" r="14" fill="#fff" stroke="#475569" stroke-width="2" />
      <text x="30" y="100" font-size="13" font-weight="700" text-anchor="middle">A</text>
      <!-- voltmeter -->
      <circle cx="180" cy="186" r="11" fill="#fff" stroke="#0369a1" stroke-width="2" />
      <text x="180" y="190" font-size="11" font-weight="700" fill="#0369a1" text-anchor="middle"
        >V</text
      >
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Suất điện động ℰ" bind:value={emf} min={1.5} max={12} step={0.5} unit="V" />
    <SliderField label="Điện trở trong r" bind:value={r} min={0.5} max={4} step={0.5} unit="Ω" />
    <SliderField
      label="Điện trở mạch ngoài R"
      bind:value={outer}
      min={0}
      max={30}
      step={0.5}
      unit="Ω"
    />
  </div>
  <button type="button" class={button.quiet} onclick={() => (outer = 0)} disabled={short}>
    Nối tắt hai cực (đoản mạch)
  </button>

  <div class="grid grid-cols-2 gap-2">
    <div class="{card} p-2 text-center text-sm">
      <MeterDial letter="A" value={Math.min(i, 6.3)} range={6} division={0.1} labelStep={1} />
      <p class="font-semibold tabular-nums">I = {formatNumber(i, 2)} A</p>
    </div>
    <div class="{card} p-2 text-center text-sm">
      <MeterDial letter="V" value={u} range={12} division={0.2} labelStep={2} />
      <p class="font-semibold tabular-nums">U = {formatNumber(u, 2)} V</p>
    </div>
  </div>

  <div class="{card} space-y-1 p-3 text-sm">
    <p class="font-semibold text-slate-700">ℰ = U + Ir</p>
    <div class="flex h-6 w-full overflow-hidden rounded bg-slate-100" aria-hidden="true">
      <div class="bg-sky-500" style:width="{uShare}%"></div>
      <div class="bg-orange-400" style:width="{dropShare}%"></div>
    </div>
    <p class="text-slate-600">
      <span class="font-semibold text-sky-700">U = {formatNumber(u, 2)} V</span> ở mạch ngoài,
      <span class="font-semibold text-orange-700">Ir = {formatNumber(drop, 2)} V</span> mất trong nguồn
      (thang đo đến 12 V).
    </p>
  </div>

  <div class="{card} p-2">
    <GraphPanel
      xMin={0}
      xMax={I_MAX}
      yMin={0}
      yMax={U_MAX}
      xTicks={[0, 2, 4, 6, 8]}
      yTicks={[0, 3, 6, 9, 12]}
      xLabel="I (A)"
      yLabel="U (V)"
      label={`Đồ thị U theo I: đoạn thẳng đi xuống từ U = ${formatNumber(emf)} vôn khi I = 0; điểm đang xét I = ${formatNumber(i, 2)} ampe, U = ${formatNumber(u, 2)} vôn.`}
      lines={[{ points: line, color: '#0284c7' }]}
      marks={[{ x: i, y: u, big: true }]}
    />
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
