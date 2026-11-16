<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { DEVICES, KWH, MAINS, mainsCurrent, totalPower } from './engine.js';

  /** Simulated hours per real second while the meter runs. */
  const HOURS_PER_SECOND = 1;

  let on = $state(/** @type {string[]} */ (['den-led', 'tivi']));
  let energy = $state(0);
  let hours = $state(0);
  let running = $state(false);
  /** Turn of the meter disc, degrees. */
  let disc = $state(0);

  const power = $derived(totalPower(on));
  const current = $derived(mainsCurrent(power));

  /** @param {string} id */
  function toggle(id) {
    on = on.includes(id) ? on.filter((x) => x !== id) : [...on, id];
  }

  /** @param {number} dtHours */
  function advance(dtHours) {
    hours += dtHours;
    energy += (power * dtHours) / 1000;
    disc = (disc + power * dtHours * 0.6) % 360;
  }

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => advance(dt * HOURS_PER_SECOND));
  });

  function reset() {
    energy = 0;
    hours = 0;
    disc = 0;
  }

  const digits = $derived(formatFixed(Math.floor(energy * 100) / 100, 2).padStart(7, '0'));

  const note = $derived.by(() => {
    if (power === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Không thiết bị nào đang bật: $P = 0$, công tơ đứng yên.',
      };
    const base = `Tổng công suất $P = ${numTex(power)}$ W, dòng điện lấy từ lưới $I = \\dfrac{P}{U} = \\dfrac{${numTex(power)}}{${MAINS}} \\approx ${numTex(current, 2)}$ A. Giữ nguyên như vậy thì cứ $${numTex(1000 / power, 2)}$ giờ công tơ tăng $1$ số ($1$ kWh).`;
    if (running) return { tone: /** @type {const} */ ('info'), text: base };
    return {
      tone: /** @type {const} */ ('info'),
      text: `${base} Từ lúc đặt lại: $t \\approx ${numTex(hours, 2)}$ h, điện năng tiêu thụ $A \\approx ${numTex(energy, 3)}$ kWh $\\approx ${numTex((energy * KWH) / 1e6, 2)} \\cdot 10^6$ J.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
    {#each DEVICES as d (d.id)}
      {@const active = on.includes(d.id)}
      <button
        type="button"
        class="flex min-h-14 flex-col items-start justify-center rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 {active
          ? 'border-amber-400 bg-amber-50 text-amber-900'
          : 'border-slate-200 bg-white text-slate-600'}"
        aria-pressed={active}
        onclick={() => toggle(d.id)}
      >
        <span class="font-semibold">{d.label}</span>
        <span class="tabular-nums">{formatNumber(d.power)} W · {active ? 'đang bật' : 'tắt'}</span>
      </button>
    {/each}
  </div>

  <div class="{card} flex flex-wrap items-center justify-center gap-4 p-3">
    <svg viewBox="0 0 120 120" class="h-28 w-28" aria-hidden="true">
      <rect x="4" y="4" width="112" height="112" rx="12" fill="#f1f5f9" stroke="#64748b" />
      <circle cx="60" cy="74" r="30" fill="#e2e8f0" stroke="#64748b" />
      <g style="transform: rotate({disc}deg); transform-origin: 60px 74px">
        <rect x="58" y="44" width="4" height="14" fill="#dc2626" />
      </g>
      <text x="60" y="26" font-size="12" font-weight="700" text-anchor="middle" fill="#334155"
        >kWh</text
      >
    </svg>
    <div class="text-center">
      <p class="text-sm text-slate-500">Số chỉ công tơ</p>
      <p
        class="rounded-lg bg-slate-900 px-3 py-1 font-mono text-2xl tracking-widest text-emerald-300 tabular-nums"
      >
        {digits}
      </p>
      <p class="mt-1 text-sm text-slate-600 tabular-nums">
        Thời gian: {formatNumber(hours, 2)} h · P = {formatNumber(power)} W
      </p>
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      aria-pressed={running}
      onclick={() => (running = !running)}
    >
      {running ? 'Dừng công tơ' : 'Chạy công tơ (1 giây = 1 giờ)'}
    </button>
    <button type="button" class={button.quiet} onclick={() => advance(1)}>Thêm 1 giờ</button>
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
