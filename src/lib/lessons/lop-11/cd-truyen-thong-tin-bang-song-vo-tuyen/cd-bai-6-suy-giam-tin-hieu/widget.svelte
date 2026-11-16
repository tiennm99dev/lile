<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex, sup } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    CABLES,
    GAIN,
    NOISE_LEVEL,
    fewestAmps,
    levelAt,
    levelProfile,
    powerAfter,
    scientific,
  } from './engine.js';

  const W = 360;
  const H = 230;
  const LEFT = 40;
  const RIGHT = 12;
  const TOP = 44;
  const BOTTOM = 26;
  const DB_MIN = -50;
  const MAX_AMPS = 5;

  const CABLE_OPTIONS = CABLES.map((c) => ({
    value: c.id,
    label: `${c.name} (${formatNumber(c.alpha)} dB/km)`,
  }));

  let cableId = $state(CABLES[0].id);
  let length = $state(60);
  let p1 = $state(2);
  /** @type {number[]} */
  let amps = $state([]);
  let probe = $state(30);

  const cable = $derived(CABLES.find((c) => c.id === cableId) ?? CABLES[0]);
  const profile = $derived(levelProfile(cable.alpha, length, amps));
  const probeAt = $derived(Math.min(probe, length));
  const probeDb = $derived(levelAt(cable.alpha, amps, probeAt));
  const outPower = $derived(powerAfter(p1, profile.output));
  const need = $derived(fewestAmps(cable.alpha, length));

  /** @param {number} x km */
  const px = (x) => LEFT + (x / length) * (W - LEFT - RIGHT);
  // The level axis runs from 0 dB, or higher when an amplifier lifts the
  // signal above its input level, down to DB_MIN.
  const dbTop = $derived(
    Math.max(0, Math.ceil(Math.max(...profile.points.map((p) => p.db)) / 10) * 10),
  );
  const dbTicks = $derived(
    Array.from({ length: (dbTop - DB_MIN) / 10 + 1 }, (_, i) => dbTop - i * 10).filter(
      (d) => dbTop - DB_MIN <= 60 || d % 20 === 0,
    ),
  );
  /** @param {number} db */
  const py = (db) => TOP + ((dbTop - Math.max(DB_MIN, db)) / (dbTop - DB_MIN)) * (H - TOP - BOTTOM);
  const graph = $derived(pointsAttr(profile.points.map((p) => ({ x: px(p.x), y: py(p.db) }))));
  const xTicks = $derived(
    Array.from({ length: Math.floor(length / 10) + 1 }, (_, i) => i * 10).filter(
      (x) => length <= 50 || x % 20 === 0,
    ),
  );

  function addAmp() {
    if (amps.length >= MAX_AMPS) return;
    const last = amps.length ? Math.max(...amps) : 0;
    amps = [...amps, Math.min(length - 1, Math.round((last + length) / 2))];
  }
  const removeAmp = () => (amps = amps.slice(0, -1));
  /** @param {string | number} v */
  function setCable(v) {
    cableId = String(v);
  }
  /** @param {number} v */
  function setLength(v) {
    amps = amps.map((a) => Math.min(a, v - 1));
  }

  /** @param {number} db */
  const dbText = (db) => `${formatNumber(db, 1)} dB`;
  /** True when a power in mW reads better as mantissa · 10^exponent. @param {number} mW */
  const tiny = (mW) => mW < 0.01 || mW >= 10000;
  /** @param {number} mW */
  function mwText(mW) {
    if (!tiny(mW)) return `${formatNumber(mW, 3)} mW`;
    const { mantissa, exponent } = scientific(mW);
    return `${formatNumber(mantissa, 2)}·10${exponent < 0 ? '⁻' : ''}${sup(Math.abs(exponent))} mW`;
  }
  /** @param {number} mW */
  function mwTex(mW) {
    if (!tiny(mW)) return numTex(mW, 3);
    const { mantissa, exponent } = scientific(mW);
    return `${numTex(mantissa, 2)} \\cdot 10^{${exponent}}`;
  }

  const note = $derived.by(() => {
    const out = `Đầu ra: mức $${numTex(profile.output, 1)}$ dB so với đầu vào, công suất $P_2 \\approx ${mwTex(outPower)}$ mW.`;
    if (!profile.clear) {
      const sunk = profile.before.some((b) => b < NOISE_LEVEL - 1e-9);
      return {
        tone: /** @type {const} */ ('warn'),
        text: sunk
          ? `Tín hiệu đã chìm xuống dưới mức nhiễu trước khi tới một bộ khuếch đại: bộ khuếch đại khuếch đại cả nhiễu, nên tín hiệu sau đó vẫn lẫn nhiễu. Đặt bộ khuếch đại sớm hơn. ${out}`
          : `Tín hiệu tới đầu thu dưới mức nhiễu $${NOISE_LEVEL}$ dB, không thu được. Cần ít nhất $${need}$ bộ khuếch đại $${GAIN}$ dB đặt đúng chỗ. ${out}`,
      };
    }
    if (amps.length > need) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Tín hiệu luôn trên mức nhiễu. Chỉ cần $${need}$ bộ khuếch đại; thử bớt để tiết kiệm. ${out}`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Tín hiệu luôn trên mức nhiễu suốt đường truyền. ${out}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl rounded-xl bg-slate-50"
      role="img"
      aria-label={`Mức tín hiệu dọc theo ${cable.name.toLowerCase()} dài ${length} km với ${amps.length} bộ khuếch đại. Mức thấp nhất ${dbText(profile.lowest)}, mức ở đầu ra ${dbText(profile.output)}.`}
    >
      <!-- The cable with its amplifiers. -->
      <rect x={LEFT - 30} y="12" width="26" height="18" rx="3" fill="#2563eb" />
      <text x={LEFT - 17} y="25" font-size="9" fill="#fff" text-anchor="middle">Phát</text>
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1="21"
        y2="21"
        stroke={cable.id === 'quang' ? '#f59e0b' : '#475569'}
        stroke-width="4"
      />
      {#each amps as a, i (i)}
        <polygon
          points="{px(a) - 7},12 {px(a) - 7},30 {px(a) + 8},21"
          fill="#059669"
          stroke="#fff"
        />
        <text x={px(a)} y="40" font-size="9" fill="#047857" text-anchor="middle">{i + 1}</text>
      {/each}
      <circle cx={px(probeAt)} cy="21" r="5" fill="#facc15" stroke="#334155" />

      <!-- Level graph. -->
      <rect
        x={LEFT}
        y={py(NOISE_LEVEL)}
        width={W - LEFT - RIGHT}
        height={py(DB_MIN) - py(NOISE_LEVEL)}
        fill="#fee2e2"
      />
      <text
        x={W - RIGHT - 4}
        y={py(NOISE_LEVEL) + 12}
        font-size="9"
        fill="#b91c1c"
        text-anchor="end">Vùng nhiễu</text
      >
      {#each dbTicks as d (d)}
        <line x1={LEFT} x2={W - RIGHT} y1={py(d)} y2={py(d)} stroke="#e2e8f0" />
        <text x={LEFT - 4} y={py(d) + 3} font-size="9" fill="#475569" text-anchor="end"
          >{formatNumber(d)}</text
        >
      {/each}
      {#each xTicks as x (x)}
        <text x={px(x)} y={H - 12} font-size="9" fill="#475569" text-anchor="middle">{x}</text>
      {/each}
      <text x={W - RIGHT} y={H - 2} font-size="9" fill="#64748b" text-anchor="end">x (km)</text>
      <text x="4" y={TOP - 4} font-size="9" fill="#64748b">dB</text>
      <polyline points={graph} fill="none" stroke="#2563eb" stroke-width="2" />
      <line
        x1={px(probeAt)}
        x2={px(probeAt)}
        y1={TOP}
        y2={H - BOTTOM}
        stroke="#ca8a04"
        stroke-dasharray="3 3"
      />
      <circle cx={px(probeAt)} cy={py(probeDb)} r="4" fill="#facc15" stroke="#334155" />
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Trên: đường truyền, các tam giác xanh là bộ khuếch đại (mỗi bộ +{GAIN} dB), chấm vàng là đồng hồ
      đo. Dưới: mức tín hiệu so với đầu vào; xuống dưới {formatNumber(NOISE_LEVEL)} dB thì tín hiệu chìm
      trong nhiễu.
    </p>
  </div>

  <SegmentedControl label="Loại cáp" options={CABLE_OPTIONS} value={cableId} onchange={setCable} />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Chiều dài cáp"
      bind:value={length}
      min={10}
      max={100}
      step={5}
      unit="km"
      oninput={setLength}
    />
    <SliderField label="Công suất đầu vào P₁" bind:value={p1} min={1} max={10} step={1} unit="mW" />
    <SliderField
      label="Vị trí đồng hồ đo"
      bind:value={probe}
      min={0}
      max={length}
      step={1}
      unit="km"
    />
  </div>

  <div class="rounded-xl bg-slate-900 p-3 text-center text-amber-300" aria-live="polite">
    <p class="text-xs text-slate-300">Đồng hồ dB ở {probeAt} km</p>
    <p class="font-mono text-2xl font-bold tabular-nums">{dbText(probeDb)}</p>
    <p class="text-sm text-slate-200">P ≈ {mwText(powerAfter(p1, probeDb))}</p>
  </div>

  <div class="space-y-2">
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.secondary}
        onclick={addAmp}
        disabled={amps.length >= MAX_AMPS}>Thêm bộ khuếch đại</button
      >
      <button type="button" class={button.quiet} onclick={removeAmp} disabled={amps.length === 0}
        >Bỏ bớt bộ khuếch đại</button
      >
    </div>
    {#each amps as _, i (i)}
      <SliderField
        label={`Vị trí bộ khuếch đại ${i + 1}`}
        bind:value={amps[i]}
        min={1}
        max={length - 1}
        step={1}
        unit="km"
      />
    {/each}
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
