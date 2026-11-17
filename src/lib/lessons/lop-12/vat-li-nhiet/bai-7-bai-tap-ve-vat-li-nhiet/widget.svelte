<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { MINUS, fmt, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { MELTING, SPECIFIC_HEAT } from '../_shared/thermal.js';
  import { SUBSTANCES, isClose, mix } from './engine.js';

  const KINDS = /** @type {const} */ (['nhom', 'sat', 'dong', 'nuoc-da', 'nuoc']);
  const OPTIONS = KINDS.map((k) => ({ value: k, label: SUBSTANCES[k].name }));
  const uid = $props.id();

  let kind = $state(/** @type {import('./engine.js').Substance} */ ('dong'));
  let massA = $state(0.2);
  let tempA = $state(100);
  let massB = $state(0.5);
  let tempB = $state(20);
  let typed = $state('');
  let checked = $state(/** @type {null | { value: number, right: boolean }} */ (null));
  let shown = $state(false);

  const range = $derived(SUBSTANCES[kind]);
  const a = $derived({ substance: kind, mass: massA, temperature: tempA });
  const b = $derived({ substance: /** @type {const} */ ('nuoc'), mass: massB, temperature: tempB });
  const r = $derived(mix(a, b));
  const reveal = $derived(shown || checked?.right === true);

  /** @param {string | number} value */
  function pick(value) {
    kind = /** @type {import('./engine.js').Substance} */ (value);
    const span = SUBSTANCES[kind];
    tempA = kind === 'nuoc-da' ? -10 : kind === 'nuoc' ? 80 : 100;
    tempA = Math.min(span.max, Math.max(span.min, tempA));
    reset();
  }

  function reset() {
    checked = null;
    shown = false;
  }

  function check() {
    const value = readNumber(typed);
    if (value === null) return;
    checked = { value, right: isClose(value, r.temperature) };
  }

  /** Heat to bring all the ice to 0 °C and melt it, and the most the water gives cooling to 0 °C. */
  const iceBudget = $derived(
    kind === 'nuoc-da'
      ? {
          need: massA * SPECIFIC_HEAT['nuoc-da'] * -tempA + massA * MELTING['nuoc-da'].lambda,
          give: massB * SPECIFIC_HEAT.nuoc * tempB,
        }
      : null,
  );

  const solution = $derived.by(() => {
    const t = formatNumber(r.temperature, 1);
    if (iceBudget) {
      const head = `Làm nóng nước đá tới $0$ °C rồi làm tan hết cần $${fmt(Math.round(iceBudget.need))}$ J; nước hạ xuống $0$ °C toả ra tối đa $${fmt(Math.round(iceBudget.give))}$ J.`;
      if (r.temperature > 0)
        return `${head} Nhiệt lượng nước toả ra đủ làm tan hết nước đá, phần dư làm nóng cả hỗn hợp: $t \\approx ${t}$ °C.`;
      if (r.temperature < 0)
        return `${head} Nước đá lạnh quá: dù toàn bộ $${formatNumber(massB * 1000, 0)}$ g nước trong bình đông đặc, nước đá vẫn chưa nóng tới $0$ °C, nên cả khối nước đá cân bằng ở $t \\approx ${t}$ °C.`;
      if (r.iceMelted >= 0)
        return `${head} Không đủ để làm tan hết: hỗn hợp dừng ở $0$ °C, có $${formatNumber(r.iceMelted * 1000, 1)}$ g nước đá tan, còn $${formatNumber(r.iceLeft * 1000, 1)}$ g nước đá.`;
      return `${head} Nước đá lạnh quá: nước toả nhiệt rồi đông đặc thêm $${formatNumber(-r.iceMelted * 1000, 1)}$ g, hỗn hợp ở $0$ °C.`;
    }
    const hot = r.hotIsA ? `${range.name} (vật A)` : 'nước trong bình';
    const cold = r.hotIsA ? 'nước trong bình' : `${range.name} (vật A)`;
    return `${hot[0].toUpperCase()}${hot.slice(1)} toả nhiệt, ${cold} thu nhiệt: $Q_{\\text{toả}} = Q_{\\text{thu}} \\approx ${fmt(Math.round(r.heat))}$ J, nhiệt độ cân bằng $t \\approx ${t}$ °C.`;
  });

  const note = $derived.by(() => {
    if (checked?.right) return { tone: /** @type {const} */ ('ok'), text: `Đúng rồi! ${solution}` };
    if (shown) return { tone: /** @type {const} */ ('info'), text: solution };
    if (checked)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Chưa đúng: nhiệt độ cân bằng ${checked.value > r.temperature ? 'thấp' : 'cao'} hơn $${formatNumber(checked.value, 1)}$ °C. ${
          iceBudget
            ? 'So sánh nhiệt lượng nước toả ra khi hạ xuống $0$ °C với nhiệt lượng cần để làm tan hết nước đá.'
            : 'Viết $Q_{\\text{toả}} = Q_{\\text{thu}}$ rồi giải tìm $t$.'
        }`,
      };
    if (typed.trim() !== '' && readNumber(typed) === null)
      return { tone: /** @type {const} */ ('warn'), text: 'Nhập một số, ví dụ 22,9.' };
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Chọn vật A, khối lượng và nhiệt độ của hai vật, rồi dự đoán nhiệt độ cân bằng (sai lệch tối đa $0{,}5$ °C).',
    };
  });

  /** @param {number} v */
  function signed(v) {
    return formatNumber(v).replace('-', MINUS);
  }

  /** @param {number} t */
  function color(t) {
    const k = Math.max(0, Math.min(1, (t + 20) / 120));
    return `rgb(${Math.round(59 + 180 * k)}, ${Math.round(130 - 60 * k)}, ${Math.round(246 - 190 * k)})`;
  }
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 300 130"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label={`Vật A là ${formatNumber(massA)} kg ${range.name} ở ${formatNumber(tempA)} độ C, thả vào bình chứa ${formatNumber(massB)} kg nước ở ${formatNumber(tempB)} độ C.${reveal ? ` Nhiệt độ cân bằng ${formatNumber(r.temperature, 1)} độ C.` : ''}`}
    >
      <!-- body A -->
      {#if kind === 'nuoc-da'}
        {#each [0, 1, 2] as i (i)}
          <rect
            x={30 + i * 22}
            y={60 - (i % 2) * 10}
            width="20"
            height="20"
            rx="3"
            fill="#e0f2fe"
            stroke="#0284c7"
          />
        {/each}
      {:else if kind === 'nuoc'}
        <path d="M 30 40 L 34 100 L 86 100 L 90 40" fill="none" stroke="#334155" stroke-width="2" />
        <rect x="33" y="60" width="54" height="39" fill={color(tempA)} opacity="0.6" />
      {:else}
        <rect
          x="35"
          y="50"
          width="50"
          height="40"
          rx="3"
          fill={color(tempA)}
          stroke="#334155"
          stroke-width="2"
        />
      {/if}
      <text x="60" y="118" font-size="12" text-anchor="middle" fill="#334155" font-weight="600"
        >A: {signed(tempA)} °C</text
      >
      <path
        d="M 110 70 L 150 70"
        stroke="#64748b"
        stroke-width="2"
        marker-end="url(#{uid}-arrow)"
      />
      <defs>
        <marker
          id="{uid}-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
      </defs>
      <!-- calorimeter -->
      <rect
        x="170"
        y="25"
        width="90"
        height="80"
        rx="6"
        fill="#f1f5f9"
        stroke="#334155"
        stroke-width="3"
      />
      <rect
        x="176"
        y="50"
        width="78"
        height="50"
        fill={color(reveal ? r.temperature : tempB)}
        opacity="0.55"
      />
      <!-- thermometer -->
      <rect x="240" y="8" width="8" height="80" rx="4" fill="#fff" stroke="#334155" />
      <circle cx="244" cy="92" r="7" fill="#dc2626" />
      <text x="215" y="118" font-size="12" text-anchor="middle" fill="#334155" font-weight="600"
        >{reveal
          ? `t = ${formatNumber(r.temperature, 1)} °C`
          : `B: ${formatNumber(tempB)} °C · t = ?`}</text
      >
    </svg>
  </div>

  <SegmentedControl label="Vật A" options={OPTIONS} value={kind} onchange={pick} />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Khối lượng vật A"
      bind:value={massA}
      min={0.05}
      max={1}
      step={0.05}
      unit="kg"
      oninput={reset}
    />
    <SliderField
      label="Nhiệt độ vật A"
      bind:value={tempA}
      format={signed}
      min={range.min}
      max={range.max}
      step={5}
      unit="°C"
      oninput={reset}
    />
    <SliderField
      label="Khối lượng nước trong bình"
      bind:value={massB}
      min={0.1}
      max={1}
      step={0.05}
      unit="kg"
      oninput={reset}
    />
    <SliderField
      label="Nhiệt độ nước trong bình"
      bind:value={tempB}
      min={0}
      max={90}
      step={5}
      unit="°C"
      oninput={reset}
    />
  </div>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <div class="min-w-0 flex-1">
      <label for="{uid}-guess" class="mb-1 block text-sm font-semibold text-slate-700"
        >Dự đoán nhiệt độ cân bằng t (°C)</label
      >
      <input
        id="{uid}-guess"
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typed}
        oninput={() => (checked = null)}
      />
    </div>
    <button type="submit" class={button.primary}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={() => (shown = true)}>Xem lời giải</button>
  </form>

  <div aria-live="polite">
    <FeedbackNote tone={note.tone} text={note.text} />
  </div>
  <p class="text-xs text-slate-500">
    Bỏ qua nhiệt lượng bình nhận và nhiệt lượng toả ra môi trường. Nhiệt dung riêng (J/kg.K): nước {fmt(
      4200,
    )}, nước đá
    {fmt(2100)}, nhôm 880, sắt 440, đồng 390; λ của nước đá 3,34·10⁵ J/kg.
  </p>
</div>
