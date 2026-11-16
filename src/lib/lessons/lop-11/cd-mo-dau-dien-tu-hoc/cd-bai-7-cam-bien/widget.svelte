<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { SUPPLY, luxAt, luxText, ohmText } from '../_shared/electronics.js';
  import SensorSymbol from '../_shared/sensor-symbol.svelte';
  import { SENSORS, curve, reading, trend } from './engine.js';

  const U = SUPPLY;
  const SENSOR_OPTIONS = [
    { value: 'ldr', label: 'Điện trở quang' },
    { value: 'ntc', label: 'Điện trở nhiệt NTC' },
  ];
  const PLACE_OPTIONS = [
    { value: 'top', label: 'Cảm biến là R₁ (trên)' },
    { value: 'bottom', label: 'Cảm biến là R₂ (dưới)' },
  ];

  /** @type {'ldr' | 'ntc'} */
  let kind = $state('ldr');
  let place = $state('bottom');
  let fixedK = $state(10);
  let setting = $state(SENSORS.ldr.start);

  const sensor = $derived(SENSORS[kind]);
  const onTop = $derived(place === 'top');
  const config = $derived({ kind, onTop, fixed: fixedK * 1000, u: U });
  const now = $derived(reading(config, setting));
  const points = $derived(curve(config));

  /** @param {number} v */
  const settingText = (v) => (kind === 'ldr' ? luxText(luxAt(v)) : `${formatNumber(v)} °C`);
  /** @param {number} v */
  const voltText = (v) => `${formatNumber(v, 2)} V`;

  /** @param {string | number} v */
  function setKind(v) {
    kind = v === 'ntc' ? 'ntc' : 'ldr';
    setting = SENSORS[kind].start;
  }

  // Graph of the output voltage against the slider setting.
  const GW = 320;
  const GH = 180;
  const GL = 36;
  const GR = 12;
  const GT = 24;
  const GB = 30;
  const gx = $derived(linear(sensor.min, sensor.max, GL, GW - GR));
  const gy = linear(0, U, GH - GB, GT);
  const xTicks = $derived(kind === 'ldr' ? [0, 10, 20, 30, 40] : [0, 20, 40, 60, 80, 100]);
  /** @param {number} t */
  const xTickText = (t) => (kind === 'ldr' ? formatNumber(luxAt(t)) : formatNumber(t));
  const graph = $derived(pointsAttr(points.map((p) => ({ x: gx.map(p.x), y: gy.map(p.u) }))));

  const note = $derived.by(() => {
    const what = kind === 'ldr' ? 'độ rọi' : 'nhiệt độ';
    const name = kind === 'ldr' ? '$R_{LDR}$' : '$R_{NTC}$';
    const rises = trend(onTop) === 'up';
    const where = onTop
      ? `Cảm biến là $R_1$: điện trở của nó giảm thì phần điện áp trên $R_2$ cố định tăng`
      : `Cảm biến là $R_2$: điện trở của nó giảm thì phần điện áp trên chính nó giảm`;
    return `Khi ${what} tăng, ${name} giảm. ${where}, nên $U_{ra}$ ${rises ? 'tăng' : 'giảm'}. Hiện $U_{ra} = \\dfrac{U R_2}{R_1 + R_2} \\approx ${numTex(now.uout, 2)}$ V.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <svg
        viewBox="0 0 300 220"
        class="mx-auto block w-full max-w-sm"
        role="img"
        aria-label={`Mạch chia áp: nguồn ${U} V, R₁ là ${onTop ? sensor.name : `điện trở ${fixedK} kΩ`}, R₂ là ${onTop ? `điện trở ${fixedK} kΩ` : sensor.name}. Vôn kế đo điện áp trên R₂ chỉ ${voltText(now.uout)}.`}
      >
        <!-- Supply rail, ground rail and the battery. -->
        <polyline
          points="40,95 40,24 150,24 150,44"
          fill="none"
          stroke="#334155"
          stroke-width="2"
        />
        <polyline
          points="40,125 40,200 150,200 150,182"
          fill="none"
          stroke="#334155"
          stroke-width="2"
        />
        <line x1="26" x2="54" y1="100" y2="100" stroke="#334155" stroke-width="3" />
        <line x1="32" x2="48" y1="112" y2="112" stroke="#334155" stroke-width="5" />
        <line x1="40" x2="40" y1="100" y2="95" stroke="#334155" stroke-width="2" />
        <line x1="40" x2="40" y1="112" y2="125" stroke="#334155" stroke-width="2" />
        <text x="58" y="98" font-size="11" fill="#334155">+</text>
        <text x="46" y="140" font-size="11" fill="#334155">U = {U} V</text>

        <!-- R1 and R2. -->
        <g transform="translate(150 66)">
          {#if onTop}
            <SensorSymbol {kind} />
          {:else}
            <SensorSymbol kind="fixed" />
          {/if}
        </g>
        <text x="174" y="62" font-size="11" font-weight="600" fill="#334155">R₁</text>
        <text x="174" y="76" font-size="10" fill="#475569"
          >{onTop ? ohmText(now.rs) : `${fixedK} kΩ`}</text
        >
        <line x1="150" x2="150" y1="88" y2="138" stroke="#334155" stroke-width="2" />
        <circle cx="150" cy="113" r="3.5" fill="#334155" />
        <g transform="translate(150 160)">
          {#if onTop}
            <SensorSymbol kind="fixed" />
          {:else}
            <SensorSymbol {kind} />
          {/if}
        </g>
        <text x="174" y="156" font-size="11" font-weight="600" fill="#334155">R₂</text>
        <text x="174" y="170" font-size="10" fill="#475569"
          >{onTop ? `${fixedK} kΩ` : ohmText(now.rs)}</text
        >

        <!-- Voltmeter across R2. -->
        <polyline points="150,113 262,113 262,128" fill="none" stroke="#334155" stroke-width="2" />
        <polyline points="262,172 262,200 150,200" fill="none" stroke="#334155" stroke-width="2" />
        <circle cx="262" cy="150" r="22" fill="#fff" stroke="#4f46e5" stroke-width="2" />
        <text x="262" y="147" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle"
          >V</text
        >
        <text x="262" y="161" font-size="9" fill="#4f46e5" text-anchor="middle"
          >{voltText(now.uout)}</text
        >
        <text x="226" y="107" font-size="11" font-weight="600" fill="#334155"
          >U<tspan baseline-shift="sub" font-size="8">ra</tspan></text
        >
      </svg>
    </div>

    <div class="{card} p-2">
      <svg
        viewBox="0 0 {GW} {GH}"
        class="mx-auto block w-full max-w-sm"
        role="img"
        aria-label={`Đồ thị U ra theo ${sensor.quantity.toLowerCase()}: ${trend(onTop) === 'up' ? 'tăng dần' : 'giảm dần'}. Điểm hiện tại: ${settingText(setting)}, ${voltText(now.uout)}.`}
      >
        {#each [0, 3, 6, 9, 12] as t (t)}
          <line x1={GL} x2={GW - GR} y1={gy.map(t)} y2={gy.map(t)} stroke="#e2e8f0" />
          <text x={GL - 5} y={gy.map(t) + 4} font-size="10" fill="#475569" text-anchor="end"
            >{t}</text
          >
        {/each}
        {#each xTicks as t (t)}
          <text x={gx.map(t)} y={GH - GB + 14} font-size="10" fill="#475569" text-anchor="middle"
            >{xTickText(t)}</text
          >
        {/each}
        <line x1={GL} x2={GL} y1={GT} y2={GH - GB} stroke="#334155" stroke-width="1.5" />
        <line x1={GL} x2={GW - GR} y1={GH - GB} y2={GH - GB} stroke="#334155" stroke-width="1.5" />
        <text x="2" y="11" font-size="10" font-weight="600" fill="#334155"
          >U<tspan baseline-shift="sub" font-size="7">ra</tspan> (V)</text
        >
        <text
          x={GW - GR}
          y={GH - 2}
          font-size="10"
          font-weight="600"
          fill="#334155"
          text-anchor="end">{kind === 'ldr' ? 'E (lx, thang lôgarit)' : 't (°C)'}</text
        >
        <polyline points={graph} fill="none" stroke="#4f46e5" stroke-width="2.5" />
        <circle cx={gx.map(setting)} cy={gy.map(now.uout)} r="5" fill="#e11d48" />
      </svg>
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl label="Cảm biến" options={SENSOR_OPTIONS} value={kind} onchange={setKind} />
    <SegmentedControl label="Vị trí cảm biến" options={PLACE_OPTIONS} bind:value={place} />
    <SliderField
      label={sensor.quantity}
      bind:value={setting}
      min={sensor.min}
      max={sensor.max}
      step={1}
      format={settingText}
    />
    <SliderField label="Điện trở cố định" bind:value={fixedK} min={1} max={50} step={1} unit="kΩ" />
  </div>

  <div class="grid grid-cols-2 gap-2 rounded-xl bg-slate-900 p-3 text-center" aria-live="polite">
    <p class="text-sm text-slate-200">
      {kind === 'ldr' ? 'R của LDR' : 'R của NTC'}
      <span class="block font-mono text-xl font-bold text-amber-300">{ohmText(now.rs)}</span>
    </p>
    <p class="text-sm text-slate-200">
      Điện áp ra
      <span class="block font-mono text-xl font-bold text-amber-300">{voltText(now.uout)}</span>
    </p>
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
