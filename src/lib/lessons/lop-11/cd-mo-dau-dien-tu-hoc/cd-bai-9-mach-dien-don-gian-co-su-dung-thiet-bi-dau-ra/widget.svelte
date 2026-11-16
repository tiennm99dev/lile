<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { luxAt, luxText } from '../_shared/electronics.js';
  import OpampSymbol from '../_shared/opamp-symbol.svelte';
  import SensorSymbol from '../_shared/sensor-symbol.svelte';
  import {
    GOALS,
    PARTS,
    PART_IDS,
    SLOTS,
    SLOT_IDS,
    U,
    check,
    emptyBoard,
    evaluate,
    fits,
  } from './engine.js';

  /** @typedef {import('./engine.js').PartId} PartId */
  /** @typedef {import('./engine.js').SlotId} SlotId */

  const GOAL_OPTIONS = [
    { value: 'night', label: GOALS.night.title },
    { value: 'heat', label: GOALS.heat.title },
  ];

  /** @type {'night' | 'heat'} */
  let goalId = $state('night');
  let board = $state(emptyBoard());
  /** @type {PartId | null} */
  let held = $state(null);
  let u0 = $state(6);
  let lightStep = $state(25);
  let celsius = $state(25);
  let message = $state('Chạm vào một linh kiện, rồi chạm vào vị trí muốn lắp nó.');

  const goal = $derived(GOALS[goalId]);
  const surroundings = $derived({ lux: luxAt(lightStep), celsius });
  const live = $derived(evaluate(board, surroundings, u0));
  const verdict = $derived(check(board, goal, u0));

  /** @param {string | number} v */
  function setGoal(v) {
    goalId = v === 'heat' ? 'heat' : 'night';
    board = emptyBoard();
    held = null;
    message = 'Bảng mạch đã được làm trống cho nhiệm vụ mới.';
  }

  /** @param {PartId} part */
  function pick(part) {
    held = held === part ? null : part;
    message = held
      ? `Đang cầm ${PARTS[part].name}. Chạm vào vị trí muốn lắp.`
      : 'Đã đặt linh kiện xuống.';
  }

  /** @param {SlotId} slot */
  function place(slot) {
    if (!held) {
      const part = board[slot];
      if (part) {
        board[slot] = null;
        message = `Đã tháo ${PARTS[part].name} khỏi ${SLOTS[slot]}.`;
      } else {
        message = 'Chọn một linh kiện trước.';
      }
      return;
    }
    if (!fits(slot, held)) {
      message =
        slot === 'output'
          ? `${PARTS[held].name} là linh kiện của mạch chia áp, không phải thiết bị đầu ra.`
          : `${PARTS[held].name} là thiết bị đầu ra, lắp ở lối ra của op-amp.`;
      return;
    }
    board[slot] = held;
    message = `Đã lắp ${PARTS[held].name} vào ${SLOTS[slot]}.`;
    held = null;
  }

  function reset() {
    board = emptyBoard();
    held = null;
    message = 'Đã tháo hết linh kiện.';
  }

  /**
   * The drawing of a divider slot.
   * @param {PartId | null} part
   * @returns {'ldr' | 'ntc' | 'fixed' | 'empty'}
   */
  const symbolOf = (part) =>
    part === 'ldr' || part === 'ntc' || part === 'fixed' ? part : 'empty';
  /** @param {number} v */
  const volt = (v) => `${formatNumber(v, 2)} V`;
  /** @param {SlotId} slot */
  const slotLabel = (slot) => {
    const part = board[slot];
    return part ? PARTS[part].short : 'trống';
  };
  const deviceWord = $derived(
    board.output === 'relay'
      ? 'Đèn'
      : board.output === 'buzzer'
        ? 'Còi'
        : board.output === 'led'
          ? 'LED'
          : 'Thiết bị',
  );
  const outText = $derived(
    live
      ? `${live.out > 0 ? '+' : live.out < 0 ? '−' : ''}${formatNumber(Math.abs(live.out))} V`
      : '',
  );
  const deviceText = $derived(
    board.output ? `${deviceWord} ${live?.on ? 'đang chạy' : 'tắt'}.` : 'Chưa có thiết bị đầu ra.',
  );
  /** The state of the board, read aloud and shown with TeX below the controls. */
  const stateText = $derived(
    live
      ? `Us = ${volt(live.us)}, U₀ = ${volt(u0)}, U ra = ${outText}. ${deviceText}`
      : 'Mạch chia áp chưa đủ linh kiện.',
  );
  const stateTex = $derived(
    live
      ? `$U_s$ = ${volt(live.us)}, $U_0$ = ${volt(u0)}, $U_{ra}$ = ${outText}. ${deviceText}`
      : 'Mạch chia áp chưa đủ linh kiện.',
  );
</script>

<div class="space-y-4">
  <SegmentedControl label="Nhiệm vụ" options={GOAL_OPTIONS} value={goalId} onchange={setGoal} />
  <p class="text-sm text-slate-700">{goal.task}</p>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 340 235"
      class="mx-auto block w-full max-w-lg"
      role="img"
      aria-label={`Bảng mạch: R₁ ${slotLabel('top')}, R₂ ${slotLabel('bottom')}, lối vào + nhận Us, lối vào − nhận U₀ = ${volt(u0)}, thiết bị đầu ra ${slotLabel('output')}. ${stateText}`}
    >
      <!-- Supply rail and ground. -->
      <line x1="30" x2="110" y1="20" y2="20" stroke="#334155" stroke-width="2" />
      <text x="30" y="14" font-size="10" fill="#334155">+{U} V</text>
      <line x1="60" x2="60" y1="20" y2="59" stroke="#334155" stroke-width="2" />
      <line x1="60" x2="60" y1="111" y2="149" stroke="#334155" stroke-width="2" />
      <line x1="60" x2="60" y1="201" y2="222" stroke="#334155" stroke-width="2" />
      <line x1="30" x2="320" y1="222" y2="222" stroke="#334155" stroke-width="2" />
      <text x="282" y="216" font-size="10" fill="#334155" text-anchor="end">đất (0 V)</text>

      <!-- Divider slots. -->
      <g transform="translate(60 85)">
        <SensorSymbol kind={symbolOf(board.top)} active={held !== null && fits('top', held)} />
      </g>
      <text x="80" y="82" font-size="10" font-weight="600" fill="#334155">R₁</text>
      <text x="80" y="95" font-size="9" fill="#475569">{slotLabel('top')}</text>
      <g transform="translate(60 175)">
        <SensorSymbol
          kind={symbolOf(board.bottom)}
          active={held !== null && fits('bottom', held)}
        />
      </g>
      <text x="80" y="172" font-size="10" font-weight="600" fill="#334155">R₂</text>
      <text x="80" y="185" font-size="9" fill="#475569">{slotLabel('bottom')}</text>

      <!-- Us to the non-inverting input, U0 to the inverting input. -->
      <circle cx="60" cy="135" r="3" fill="#334155" />
      <line x1="60" x2="150" y1="135" y2="135" stroke="#334155" stroke-width="2" />
      <text x="68" y="148" font-size="10" fill="#4f46e5"
        >U<tspan baseline-shift="sub" font-size="7">s</tspan>{live
          ? ` = ${volt(live.us)}`
          : ''}</text
      >
      <polyline points="150,85 125,85 125,48" fill="none" stroke="#334155" stroke-width="2" />
      <circle cx="125" cy="44" r="4" fill="#fff" stroke="#334155" stroke-width="2" />
      <text x="133" y="47" font-size="10" fill="#b45309"
        >U<tspan baseline-shift="sub" font-size="7">0</tspan> = {volt(u0)} (biến trở)</text
      >
      <OpampSymbol x={150} y={110} />

      <!-- Output device. -->
      <line x1="230" x2="262" y1="110" y2="110" stroke="#334155" stroke-width="2" />
      <rect
        x="262"
        y="88"
        width="62"
        height="44"
        rx="6"
        fill={board.output ? (live?.on ? '#fef3c7' : '#f8fafc') : '#f8fafc'}
        stroke={held !== null && fits('output', held) ? '#4f46e5' : '#94a3b8'}
        stroke-width="1.5"
        stroke-dasharray={board.output ? '' : '4 3'}
      />
      {#if board.output}
        <circle
          cx="276"
          cy="110"
          r="8"
          fill={live?.on ? (board.output === 'led' ? '#ef4444' : '#facc15') : '#e5e7eb'}
          stroke="#334155"
        />
        <text x="288" y="114" font-size="9" fill="#334155">{PARTS[board.output].short}</text>
      {:else}
        <text x="293" y="114" font-size="12" fill="#64748b" text-anchor="middle">?</text>
      {/if}
      <line x1="293" x2="293" y1="132" y2="222" stroke="#334155" stroke-width="2" />
      <text x="236" y="102" font-size="10" fill="#334155"
        >U<tspan baseline-shift="sub" font-size="7">ra</tspan></text
      >
    </svg>
  </div>

  <div class="space-y-2">
    <p class="text-sm font-semibold text-slate-700">Hộp linh kiện</p>
    <div class="flex flex-wrap gap-2">
      {#each PART_IDS as part (part)}
        <button
          type="button"
          class={held === part ? button.primary : button.quiet}
          aria-pressed={held === part}
          onclick={() => pick(part)}>{PARTS[part].name}</button
        >
      {/each}
    </div>
    <p class="text-sm font-semibold text-slate-700">Vị trí trên bảng mạch</p>
    <div class="grid gap-2 sm:grid-cols-3">
      {#each SLOT_IDS as slot (slot)}
        <button type="button" class={button.secondary} onclick={() => place(slot)}>
          {SLOTS[slot]}: {slotLabel(slot)}
        </button>
      {/each}
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <button type="button" class={button.quiet} onclick={reset}>Tháo hết</button>
      <p class="text-sm text-slate-600" aria-live="polite">{message}</p>
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    {#if goalId === 'night'}
      <SliderField
        label="Độ rọi (thử mạch)"
        bind:value={lightStep}
        min={0}
        max={40}
        step={1}
        format={(v) => luxText(luxAt(v))}
      />
    {:else}
      <SliderField
        label="Nhiệt độ (thử mạch)"
        bind:value={celsius}
        min={0}
        max={100}
        step={1}
        unit="°C"
      />
    {/if}
    <SliderField
      label="Điện áp so sánh U₀"
      bind:value={u0}
      min={0}
      max={U}
      step={0.1}
      format={(v) => formatNumber(v, 1)}
      unit="V"
    />
  </div>

  <p class="rounded-xl bg-slate-900 p-3 text-center text-sm text-amber-200" aria-live="polite">
    <LiveRichText text={stateTex} />
  </p>
  <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
</div>
