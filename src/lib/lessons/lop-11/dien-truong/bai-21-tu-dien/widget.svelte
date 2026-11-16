<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { DIELECTRICS, capacitorState } from './engine.js';

  const W = 360;
  const H = 230;
  /** Centre of the plates, px. */
  const CX = 220;
  const CY = H / 2;
  /** Battery position, px. */
  const BX = 38;
  /** Charge drawn by one sign on a plate, C. */
  const PER_SIGN = 1e-9;
  const MAX_SIGNS = 40;
  /** Charge the challenge asks for, C. */
  const TARGET = 20e-9;
  const MODES = [
    { value: 'noi', label: 'Nối với nguồn' },
    { value: 'ngat', label: 'Ngắt khỏi nguồn' },
  ];

  let areaCm2 = $state(200);
  let gapMm = $state(2);
  let medium = $state('khong-khi');
  let u = $state(100);
  let mode = $state('noi');
  /** Charge kept on the plates once the source is cut off, C. */
  let kept = $state(/** @type {number | null} */ (null));
  let challenge = $state(false);

  const eps = $derived(DIELECTRICS.find((m) => m.value === medium)?.eps ?? 1);
  const s = $derived(
    capacitorState({
      eps,
      area: areaCm2 / 1e4,
      gap: gapMm / 1e3,
      u,
      kept: mode === 'ngat' ? kept : null,
    }),
  );

  /** @param {string | number} next */
  function setMode(next) {
    // Cutting the source off freezes the charge the plates hold right now.
    kept = next === 'ngat' ? s.q : null;
  }

  const plateLen = $derived(60 + ((areaCm2 - 50) / 350) * 220);
  const gapPx = $derived(18 * gapMm);
  const topY = $derived(CY - gapPx / 2 - 8);
  const bottomY = $derived(CY + gapPx / 2);
  const left = $derived(CX - plateLen / 2);
  const signs = $derived(Math.min(MAX_SIGNS, Math.round(s.q / PER_SIGN)));
  const signXs = $derived(
    Array.from({ length: signs }, (_, i) => left + ((i + 0.5) * plateLen) / signs),
  );
  const fill = $derived(
    medium === 'mica' ? '#fde68a' : medium === 'dau-hoa' ? '#fed7aa' : 'transparent',
  );

  const pF = $derived(formatNumber(s.c * 1e12, 1));
  const nC = $derived(formatNumber(s.q * 1e9, 2));
  const volts = $derived(formatNumber(s.u, s.u >= 100 ? 0 : 1));
  const nJ = $derived(formatNumber(s.w * 1e9, 1));
  const hitTarget = $derived(s.onSource && u === 100 && Math.abs(s.q - TARGET) <= 0.05 * TARGET);

  const note = $derived.by(() => {
    const values = `$C \\approx ${numTex(s.c * 1e12, 1)}$ pF, $Q = CU \\approx ${numTex(s.q * 1e9, 2)}$ nC, $W = \\dfrac{QU}{2} \\approx ${numTex(s.w * 1e9, 1)}$ nJ.`;
    if (s.onSource) {
      if (u === 0) {
        return {
          tone: /** @type {const} */ ('info'),
          text: 'Khi $U = 0$, hai bản không tích điện: $Q = CU = 0$.',
        };
      }
      return {
        tone: /** @type {const} */ ('info'),
        text: `Tụ nối với nguồn nên $U = ${numTex(u)}$ V không đổi. ${values} Tăng $S$, tăng $\\varepsilon$ hay giảm $d$ đều làm $C$ tăng, nên tụ tích thêm điện.`,
      };
    }
    const warn = s.u > 1000;
    return {
      tone: /** @type {'warn' | 'info'} */ (warn ? 'warn' : 'info'),
      text: `Tụ đã ngắt khỏi nguồn nên điện tích $Q$ giữ nguyên; hiệu điện thế thay đổi theo $U = \\dfrac{Q}{C} \\approx ${numTex(s.u, s.u >= 100 ? 0 : 1)}$ V. ${values}${warn ? ' Hiệu điện thế lớn như vậy có thể vượt hiệu điện thế giới hạn và đánh thủng điện môi.' : ''}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-50"
      role="img"
      aria-label={`Tụ điện phẳng, diện tích bản ${areaCm2} xentimét vuông, khoảng cách ${formatNumber(gapMm)} milimét, điện môi ${DIELECTRICS.find((m) => m.value === medium)?.label}. ${s.onSource ? 'Đang nối với nguồn.' : 'Đã ngắt khỏi nguồn.'} Điện dung ${pF} picôfara, điện tích ${nC} nanôculông, hiệu điện thế ${volts} vôn.`}
    >
      <!-- wires and switch -->
      <g fill="none" stroke="#475569" stroke-width="2">
        <polyline points="{BX},{CY - 22} {BX},18 {CX},18 {CX},{topY}" />
        <polyline points="{BX},{CY + 22} {BX},{H - 18} {CX},{H - 18} {CX},{bottomY + 8}" />
      </g>
      {#if !s.onSource}
        <rect x="104" y="10" width="34" height="16" fill="#f8fafc" />
        <line x1="104" y1="18" x2="134" y2="2" stroke="#475569" stroke-width="2" />
        <circle cx="104" cy="18" r="3" fill="#475569" />
        <circle cx="138" cy="18" r="3" fill="#475569" />
      {/if}
      <!-- battery: long line is the + pole -->
      <rect x={BX - 16} y={CY - 22} width="32" height="44" fill="#f8fafc" />
      <line x1={BX - 16} y1={CY - 6} x2={BX + 16} y2={CY - 6} stroke="#0f172a" stroke-width="3" />
      <line x1={BX - 8} y1={CY + 6} x2={BX + 8} y2={CY + 6} stroke="#0f172a" stroke-width="5" />
      <line x1={BX} y1={CY - 22} x2={BX} y2={CY - 6} stroke="#475569" stroke-width="2" />
      <line x1={BX} y1={CY + 6} x2={BX} y2={CY + 22} stroke="#475569" stroke-width="2" />
      <text x={BX + 20} y={CY - 10} font-size="13" font-weight="700" fill="#dc2626">+</text>
      <text x={BX + 20} y={CY + 16} font-size="13" font-weight="700" fill="#2563eb">−</text>
      <text x={BX - 4} y={H - 26} font-size="11" fill="#475569" text-anchor="middle"
        >{s.onSource ? `${u} V` : ''}</text
      >

      <!-- dielectric and plates -->
      <rect x={left} y={topY + 8} width={plateLen} height={gapPx} {fill} opacity="0.8" />
      <rect x={left} y={topY} width={plateLen} height="8" rx="2" fill="#94a3b8" />
      <rect x={left} y={bottomY} width={plateLen} height="8" rx="2" fill="#94a3b8" />
      {#each signXs as x, i (i)}
        <text {x} y={topY - 3} font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle"
          >+</text
        >
        <text
          {x}
          y={bottomY + 20}
          font-size="12"
          font-weight="700"
          fill="#2563eb"
          text-anchor="middle">−</text
        >
      {/each}
      <text x={left - 6} y={CY + 4} font-size="11" fill="#0f172a" text-anchor="end">d</text>
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Mỗi dấu + trên bản trên (và − trên bản dưới) ứng với 1 nC; vẽ tối đa {MAX_SIGNS} dấu. Chiều dài
      bản thể hiện diện tích S, khoảng hở thể hiện khoảng cách d, màu giữa hai bản là điện môi.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Diện tích mỗi bản S"
      bind:value={areaCm2}
      min={50}
      max={400}
      step={10}
      unit="cm²"
    />
    <SliderField label="Khoảng cách d" bind:value={gapMm} min={1} max={5} step={0.5} unit="mm" />
    {#if s.onSource}
      <SliderField
        label="Hiệu điện thế nguồn U"
        bind:value={u}
        min={0}
        max={200}
        step={10}
        unit="V"
      />
    {/if}
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <SegmentedControl label="Điện môi giữa hai bản" options={DIELECTRICS} bind:value={medium} />
    <SegmentedControl label="Nguồn điện" options={MODES} bind:value={mode} onchange={setMode} />
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4" aria-live="polite">
    <div class="{card} p-2">
      <dt class="text-slate-500">Điện dung C</dt>
      <dd class="font-semibold tabular-nums">{pF} pF</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Điện tích Q</dt>
      <dd class="font-semibold tabular-nums">{nC} nC</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Hiệu điện thế U</dt>
      <dd class="font-semibold tabular-nums">{volts} V</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Năng lượng W</dt>
      <dd class="font-semibold tabular-nums">{nJ} nJ</dd>
    </div>
  </dl>
  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="{card} space-y-2 p-3 text-sm">
    {#if challenge}
      <FeedbackNote
        tone={hitTarget ? 'ok' : 'info'}
        text={hitTarget
          ? `Đạt! Tụ đang tích $Q \\approx ${numTex(s.q * 1e9, 2)}$ nC.`
          : 'Thử thách: nối tụ với nguồn $U = 100$ V rồi chỉnh $S$, $d$ và điện môi để tụ tích được $Q = 20$ nC (sai lệch không quá $5\\%$). Gợi ý: cần $C = \\dfrac{Q}{U} = 200$ pF.'}
      />
    {:else}
      <p class="text-slate-600">
        Thử ngắt tụ khỏi nguồn rồi kéo hai bản ra xa nhau: điện tích không đổi, điện dung giảm nên
        hiệu điện thế và năng lượng của tụ tăng.
      </p>
    {/if}
    <button
      type="button"
      class={button.quiet}
      aria-pressed={challenge}
      onclick={() => {
        challenge = !challenge;
        if (challenge) {
          mode = 'noi';
          kept = null;
          u = 100;
        }
      }}
    >
      {challenge ? 'Tắt thử thách' : 'Thử thách: tích 20 nC'}
    </button>
  </div>
</div>
