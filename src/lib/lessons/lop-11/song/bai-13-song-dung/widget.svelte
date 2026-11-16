<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import StandingString from '../_shared/standing-string.svelte';
  import { LENGTH, SPEED, TASKS, noteFor, reading, solves } from './engine.js';

  const ENDS = [
    { value: 'co-dinh', label: 'Đầu Q cố định' },
    { value: 'tu-do', label: 'Đầu Q tự do' },
  ];

  /** @type {import('../_shared/standing.js').EndKind} */
  let end = $state('co-dinh');
  let frequency = $state(6);
  let taskAt = $state(0);
  /** Frequencies at which a standing wave was seen, per kind of end. */
  let found = $state(/** @type {Record<string, number[]>} */ ({ 'co-dinh': [], 'tu-do': [] }));

  const r = $derived(reading(end, frequency));
  const task = $derived(TASKS[taskAt]);
  const done = $derived(solves(task, end, frequency));

  $effect(() => {
    if (!r.standing) return;
    const list = found[end];
    if (!list.includes(frequency)) found[end] = [...list, frequency].sort((a, b) => a - b);
  });

  /** @param {number} step */
  const nudge = (step) => (frequency = Math.min(40, Math.max(0.5, frequency + step)));
</script>

<div class="space-y-4">
  <SegmentedControl label="Đầu Q của dây" options={ENDS} bind:value={end} hideLabel />
  <div class="{card} p-3">
    <StandingString {end} length={LENGTH} speed={SPEED} {frequency} />
    <p class="pt-1 text-center text-sm text-slate-600">
      Dây PQ dài {formatNumber(LENGTH)} m, tốc độ truyền sóng trên dây {SPEED} m/s. N: nút, B: bụng.
    </p>
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <div class="min-w-48 flex-1">
      <SliderField
        label="Tần số f của cần rung"
        bind:value={frequency}
        min={0.5}
        max={40}
        step={0.5}
        unit="Hz"
        format={(v) => formatNumber(v, 1)}
      />
    </div>
    <button type="button" class={button.quiet} onclick={() => nudge(-0.5)}>− 0,5 Hz</button>
    <button type="button" class={button.quiet} onclick={() => nudge(0.5)}>+ 0,5 Hz</button>
  </div>

  <FeedbackNote tone={r.standing ? 'ok' : 'info'} text={noteFor(end, frequency)} />

  <div class="{card} space-y-2 p-3 text-sm">
    <FeedbackNote
      tone={done ? 'ok' : 'info'}
      text={done ? `Đúng rồi! Em đã tạo được ${task.text}.` : `Nhiệm vụ: tạo ${task.text}.`}
    />
    <button
      type="button"
      class={button.quiet}
      onclick={() => (taskAt = (taskAt + 1) % TASKS.length)}
    >
      Nhiệm vụ khác
    </button>
  </div>

  <div class="text-sm text-slate-700" aria-live="polite">
    {#each ENDS as e (e.value)}
      <p>
        <span class="font-semibold">{e.label}</span>: các tần số đã thấy sóng dừng
        {found[e.value].length
          ? found[e.value].map((v) => `${formatNumber(v, 1)} Hz`).join('; ')
          : '(chưa có)'}.
      </p>
    {/each}
  </div>
</div>
