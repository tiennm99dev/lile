<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { SUPPLY, opampOut } from '../_shared/electronics.js';
  import OpampSymbol from '../_shared/opamp-symbol.svelte';
  import { devices, saturationInput, transferCurve } from './engine.js';

  const USAT = SUPPLY;
  const LED_R = 1000;
  const MODE_OPTIONS = [
    { value: 'comparator', label: 'So sánh' },
    { value: 'inverting', label: 'Khuếch đại đảo' },
    { value: 'non-inverting', label: 'Khuếch đại không đảo' },
  ];
  const MODE_NAMES = {
    comparator: 'mạch so sánh',
    inverting: 'mạch khuếch đại đảo',
    'non-inverting': 'mạch khuếch đại không đảo',
  };

  /** @type {import('../_shared/electronics.js').OpampMode} */
  let mode = $state('inverting');
  let uin = $state(0.4);
  let uref = $state(0.5);
  let r1 = $state(10);
  let rf = $state(50);

  const params = $derived({ uref, r1, rf, usat: USAT });
  const result = $derived(opampOut(mode, { ...params, uin }));
  const outs = $derived(devices(result.out, LED_R));
  const points = $derived(transferCurve(mode, params, -2, 2));

  /** @param {string | number} v */
  function setMode(v) {
    mode = v === 'comparator' || v === 'non-inverting' ? v : 'inverting';
  }

  /** @param {number} v */
  const volt = (v) => `${formatNumber(v, 2)} V`;

  // Transfer graph.
  const GW = 320;
  const GH = 200;
  const GL = 34;
  const GR = 10;
  const GT = 12;
  const GB = 24;
  const gx = linear(-2, 2, GL, GW - GR);
  const gy = linear(-14, 14, GH - GB, GT);
  const curve = $derived(pointsAttr(points.map((p) => ({ x: gx.map(p.x), y: gy.map(p.y) }))));

  const note = $derived.by(() => {
    if (mode === 'comparator') {
      const sign =
        result.out > 0
          ? `$U_+ > U_-$ nên $U_{ra} = +U_{bh} = +${USAT}$ V`
          : result.out < 0
            ? `$U_+ < U_-$ nên $U_{ra} = -U_{bh} = -${USAT}$ V`
            : '$U_+ = U_-$: đúng ngưỡng chuyển';
      return {
        tone: /** @type {const} */ ('info'),
        text: `Không có hồi tiếp: hệ số khuếch đại của op-amp rất lớn nên chỉ cần $U_+$ chênh $U_-$ một chút là lối ra bão hoà. ${sign}.`,
      };
    }
    const g = result.gain ?? 0;
    const formula =
      mode === 'inverting'
        ? `G = -\\dfrac{R_f}{R_1} = -\\dfrac{${rf}}{${r1}} = ${numTex(g, 2)}`
        : `G = 1 + \\dfrac{R_f}{R_1} = 1 + \\dfrac{${rf}}{${r1}} = ${numTex(g, 2)}`;
    if (result.saturated) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `$${formula}$. Theo công thức $U_{ra} = G \\cdot U_{vào} = ${numTex(result.ideal, 2)}$ V, vượt quá điện áp nguồn, nên lối ra bão hoà ở $${numTex(result.out, 2)}$ V. Mạch chỉ khuếch đại đúng khi $|U_{vào}| < ${numTex(saturationInput(g, USAT), 2)}$ V.`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `$${formula}$, nên $U_{ra} = G \\cdot U_{vào} = ${numTex(result.out, 2)}$ V${mode === 'inverting' ? ', ngược dấu với $U_{vào}$' : ', cùng dấu với $U_{vào}$'}.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mạch dùng op-amp"
    options={MODE_OPTIONS}
    value={mode}
    onchange={setMode}
  />

  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <svg
        viewBox="0 0 320 200"
        class="mx-auto block w-full max-w-sm"
        role="img"
        aria-label={`Sơ đồ ${MODE_NAMES[mode]}${mode === 'comparator' ? '' : `, R₁ = ${r1} kΩ, Rf = ${rf} kΩ`}. U vào ${volt(uin)}, U ra ${volt(result.out)}.`}
      >
        <OpampSymbol x={150} y={100} />
        <!-- Output. -->
        <line x1="230" x2="300" y1="100" y2="100" stroke="#334155" stroke-width="2" />
        <circle cx="300" cy="100" r="3.5" fill="#334155" />
        <text x="296" y="90" font-size="11" font-weight="600" fill="#334155" text-anchor="end"
          >U<tspan baseline-shift="sub" font-size="8">ra</tspan></text
        >
        <text x="300" y="120" font-size="10" fill="#4f46e5" text-anchor="end"
          >{volt(result.out)}</text
        >
        <text x="190" y="48" font-size="9" fill="#64748b">+{USAT} V</text>
        <text x="190" y="160" font-size="9" fill="#64748b">−{USAT} V</text>

        {#if mode === 'comparator'}
          <line x1="40" x2="150" y1="125" y2="125" stroke="#334155" stroke-width="2" />
          <circle cx="40" cy="125" r="3.5" fill="#334155" />
          <text x="12" y="145" font-size="11" fill="#334155"
            >U<tspan baseline-shift="sub" font-size="8">vào</tspan> = {volt(uin)}</text
          >
          <line x1="40" x2="150" y1="75" y2="75" stroke="#334155" stroke-width="2" />
          <circle cx="40" cy="75" r="3.5" fill="#334155" />
          <text x="12" y="65" font-size="11" fill="#334155"
            >U<tspan baseline-shift="sub" font-size="8">0</tspan> = {volt(uref)}</text
          >
        {:else}
          <!-- Feedback resistor from the output back to the inverting input. -->
          <polyline
            points="135,75 135,28 265,28 265,100"
            fill="none"
            stroke="#334155"
            stroke-width="2"
          />
          <rect
            x="180"
            y="21"
            width="40"
            height="14"
            fill="#fff"
            stroke="#334155"
            stroke-width="2"
          />
          <text x="200" y="16" font-size="10" fill="#334155" text-anchor="middle"
            >R<tspan baseline-shift="sub" font-size="8">f</tspan> = {rf} kΩ</text
          >
          <line x1="135" x2="150" y1="75" y2="75" stroke="#334155" stroke-width="2" />
          <circle cx="135" cy="75" r="3" fill="#334155" />
          {#if mode === 'inverting'}
            <line x1="20" x2="135" y1="75" y2="75" stroke="#334155" stroke-width="2" />
            <rect
              x="65"
              y="68"
              width="40"
              height="14"
              fill="#fff"
              stroke="#334155"
              stroke-width="2"
            />
            <text x="85" y="62" font-size="10" fill="#334155" text-anchor="middle"
              >R₁ = {r1} kΩ</text
            >
            <circle cx="20" cy="75" r="3.5" fill="#334155" />
            <text x="8" y="100" font-size="11" fill="#334155"
              >U<tspan baseline-shift="sub" font-size="8">vào</tspan></text
            >
            <polyline
              points="150,125 120,125 120,175"
              fill="none"
              stroke="#334155"
              stroke-width="2"
            />
            <line x1="108" x2="132" y1="175" y2="175" stroke="#334155" stroke-width="2" />
            <line x1="113" x2="127" y1="180" y2="180" stroke="#334155" stroke-width="2" />
          {:else}
            <line x1="100" x2="150" y1="125" y2="125" stroke="#334155" stroke-width="2" />
            <circle cx="100" cy="125" r="3.5" fill="#334155" />
            <text x="94" y="145" font-size="11" fill="#334155"
              >U<tspan baseline-shift="sub" font-size="8">vào</tspan></text
            >
            <polyline points="135,75 80,75 80,175" fill="none" stroke="#334155" stroke-width="2" />
            <rect
              x="73"
              y="88"
              width="14"
              height="40"
              fill="#fff"
              stroke="#334155"
              stroke-width="2"
            />
            <text x="66" y="112" font-size="10" fill="#334155" text-anchor="end">R₁ = {r1} kΩ</text>
            <line x1="68" x2="92" y1="175" y2="175" stroke="#334155" stroke-width="2" />
            <line x1="73" x2="87" y1="180" y2="180" stroke="#334155" stroke-width="2" />
          {/if}
        {/if}
      </svg>
    </div>

    <div class="{card} p-2">
      <svg
        viewBox="0 0 {GW} {GH}"
        class="mx-auto block w-full max-w-sm"
        role="img"
        aria-label={`Đặc tuyến U ra theo U vào của ${MODE_NAMES[mode]}, bão hoà ở cộng trừ ${USAT} V. Điểm hiện tại: U vào ${volt(uin)}, U ra ${volt(result.out)}.`}
      >
        {#each [-12, -6, 0, 6, 12] as t (t)}
          <line x1={GL} x2={GW - GR} y1={gy.map(t)} y2={gy.map(t)} stroke="#e2e8f0" />
          <text x={GL - 4} y={gy.map(t) + 4} font-size="10" fill="#475569" text-anchor="end"
            >{formatNumber(t)}</text
          >
        {/each}
        {#each [-2, -1, 0, 1, 2] as t (t)}
          <line x1={gx.map(t)} x2={gx.map(t)} y1={GT} y2={GH - GB} stroke="#e2e8f0" />
          <text x={gx.map(t)} y={GH - 8} font-size="10" fill="#475569" text-anchor="middle"
            >{formatNumber(t)}</text
          >
        {/each}
        <line x1={gx.map(0)} x2={gx.map(0)} y1={GT} y2={GH - GB} stroke="#334155" />
        <line x1={GL} x2={GW - GR} y1={gy.map(0)} y2={gy.map(0)} stroke="#334155" />
        <line
          x1={GL}
          x2={GW - GR}
          y1={gy.map(USAT)}
          y2={gy.map(USAT)}
          stroke="#dc2626"
          stroke-dasharray="4 3"
        />
        <line
          x1={GL}
          x2={GW - GR}
          y1={gy.map(-USAT)}
          y2={gy.map(-USAT)}
          stroke="#dc2626"
          stroke-dasharray="4 3"
        />
        <text x={GW - GR} y={gy.map(USAT) - 3} font-size="9" fill="#dc2626" text-anchor="end"
          >bão hoà +{USAT} V</text
        >
        <text x={GL + 4} y={gy.map(-USAT) + 11} font-size="9" fill="#dc2626">bão hoà −{USAT} V</text
        >
        <polyline points={curve} fill="none" stroke="#4f46e5" stroke-width="2.5" />
        <circle cx={gx.map(uin)} cy={gy.map(result.out)} r="5" fill="#e11d48" />
        <text x={GW - GR} y={gy.map(0) - 4} font-size="9" fill="#334155" text-anchor="end"
          >U vào (V)</text
        >
        <text x={gx.map(0) + 4} y={GT + 8} font-size="9" fill="#334155">U ra (V)</text>
      </svg>
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Điện áp vào U vào"
      bind:value={uin}
      min={-2}
      max={2}
      step={0.05}
      format={(v) => formatNumber(v, 2)}
      unit="V"
    />
    {#if mode === 'comparator'}
      <SliderField
        label="Điện áp so sánh U₀ (lối vào đảo)"
        bind:value={uref}
        min={-2}
        max={2}
        step={0.05}
        format={(v) => formatNumber(v, 2)}
        unit="V"
      />
    {:else}
      <SliderField label="Điện trở R₁" bind:value={r1} min={1} max={20} step={1} unit="kΩ" />
      <SliderField
        label="Điện trở hồi tiếp Rf"
        bind:value={rf}
        min={1}
        max={100}
        step={1}
        unit="kΩ"
      />
    {/if}
  </div>

  <div class="grid gap-2 sm:grid-cols-3" aria-live="polite">
    <div class="rounded-xl bg-slate-900 p-3 text-center">
      <p class="text-xs text-slate-300">Điện áp ra</p>
      <p class="font-mono text-2xl font-bold text-amber-300 tabular-nums">{volt(result.out)}</p>
      <p class="text-xs text-slate-300">
        {result.saturated ? 'Bão hoà' : mode === 'comparator' ? 'Đúng ngưỡng' : 'Chưa bão hoà'}
      </p>
    </div>
    <div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
      <svg viewBox="0 0 40 40" class="h-10 w-10 shrink-0" aria-hidden="true">
        <circle
          cx="20"
          cy="20"
          r="13"
          fill={outs.ledOn ? '#ef4444' : '#e5e7eb'}
          stroke="#7f1d1d"
          stroke-width="2"
        />
        {#if outs.ledOn}
          <circle cx="20" cy="20" r="18" fill="none" stroke="#fca5a5" stroke-width="3" />
        {/if}
      </svg>
      <p class="text-sm text-slate-700">
        LED nối tiếp điện trở {formatNumber(LED_R)} Ω:
        <strong
          >{outs.ledOn
            ? `sáng, I ≈ ${formatNumber(outs.ledCurrent * 1000, 1)} mA`
            : result.out > 0
              ? 'tắt (điện áp chưa đủ để LED sáng)'
              : 'tắt (phân cực ngược)'}</strong
        >
      </p>
    </div>
    <div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
      <svg viewBox="0 0 40 40" class="h-10 w-10 shrink-0" aria-hidden="true">
        <rect x="4" y="22" width="14" height="14" fill="#94a3b8" />
        <line
          x1="22"
          y1="12"
          x2="36"
          y2={outs.relayClosed ? 12 : 4}
          stroke="#334155"
          stroke-width="3"
        />
        <circle cx="22" cy="12" r="2.5" fill="#334155" />
        <circle cx="36" cy="12" r="2.5" fill="#334155" />
      </svg>
      <p class="text-sm text-slate-700">
        Relay (qua diode):
        <strong>{outs.relayClosed ? 'tiếp điểm đóng' : 'tiếp điểm mở'}</strong>
      </p>
    </div>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
