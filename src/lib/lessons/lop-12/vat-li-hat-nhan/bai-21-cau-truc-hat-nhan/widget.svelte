<script>
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { NAMES, SYMBOLS } from '../_shared/nuclear.js';
  import { MAX_N, MAX_Z, TASKS, describe, packing, statusOf } from './engine.js';

  const SIZE = 220;
  const C = SIZE / 2;
  const BALL = 9;

  let Z = $state(1);
  let N = $state(0);
  let at = $state(0);
  /** Indices of the finished tasks. */
  let done = $state(/** @type {number[]} */ ([]));

  const A = $derived(Z + N);
  const status = $derived(statusOf(Z, N));
  const balls = $derived(packing(Z, N, BALL * 2));
  const task = $derived(TASKS[at]);
  const hit = $derived(Z === task.Z && N === task.N);

  $effect(() => {
    if (hit && !done.includes(at)) done = [...done, at];
  });

  const symbolTex = $derived(
    Z === 0 ? (N === 0 ? '?' : `${N}\\,{}^{1}_{0}n`) : `{}^{${A}}_{${Z}}\\mathrm{${SYMBOLS[Z]}}`,
  );

  const tone = $derived(
    status.kind === 'stable'
      ? 'ok'
      : status.kind === 'unbound' || status.kind === 'neutrons'
        ? 'warn'
        : 'info',
  );

  const badge = $derived(
    status.kind === 'stable'
      ? 'Đồng vị bền'
      : status.kind === 'radioactive'
        ? 'Đồng vị phóng xạ'
        : status.kind === 'unbound'
          ? 'Không bền'
          : '',
  );

  function nextTask() {
    at = (at + 1) % TASKS.length;
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <figure class="{card} p-2">
      <svg
        viewBox="0 0 {SIZE} {SIZE}"
        class="mx-auto block w-full max-w-60"
        role="img"
        aria-label="Hạt nhân gồm {Z} proton và {N} neutron"
      >
        <circle cx={C} cy={C} r={C - 4} fill="#f8fafc" stroke="#e2e8f0" />
        {#each balls as b, i (i)}
          <circle
            cx={C + b.x}
            cy={C + b.y}
            r={BALL}
            fill={b.proton ? '#dc2626' : '#94a3b8'}
            stroke="#fff"
            stroke-width="1.5"
          />
          {#if b.proton}
            <text
              x={C + b.x}
              y={C + b.y + 4}
              text-anchor="middle"
              font-size="11"
              font-weight="700"
              fill="#fff">+</text
            >
          {/if}
        {/each}
      </svg>
      <figcaption class="px-2 pt-1 text-center text-xs text-slate-500">
        Đỏ: proton (mang điện +e). Xám: neutron (không mang điện).
      </figcaption>
    </figure>

    <div class="{card} space-y-3 p-3">
      <Stepper label="Số proton Z" bind:value={Z} min={0} max={MAX_Z} />
      <Stepper label="Số neutron N" bind:value={N} min={0} max={MAX_N} />
      <div class="flex items-center gap-4 rounded-xl bg-slate-50 px-3 py-2">
        <span class="text-3xl"><Tex math={symbolTex} /></span>
        <div class="text-sm text-slate-700">
          <p class="font-semibold">
            {Z > 0 ? `${NAMES[Z]} (${SYMBOLS[Z]})` : N > 0 ? 'Chỉ có neutron' : 'Chưa có hạt nào'}
          </p>
          <p>Số khối A = Z + N = {A}</p>
          {#if badge}
            <p
              class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold {status.kind ===
              'stable'
                ? 'bg-emerald-100 text-emerald-800'
                : status.kind === 'radioactive'
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-amber-100 text-amber-900'}"
            >
              {badge}
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <FeedbackNote {tone} text={describe(Z, N)} />

  <div class="{card} space-y-2 p-3">
    <p class="text-sm font-semibold text-slate-600">
      Thử thách {at + 1}/{TASKS.length} · Đã hoàn thành: {done.length}
    </p>
    <p class="text-slate-800"><LiveRichText text={task.text} /></p>
    <p
      class="text-sm font-semibold {hit ? 'text-emerald-700' : 'text-slate-500'}"
      aria-live="polite"
    >
      {hit
        ? `Đúng rồi: ${task.Z} proton và ${task.N} neutron.`
        : 'Chỉnh số proton và số neutron cho đúng yêu cầu.'}
    </p>
    <button type="button" class={button.quiet} onclick={nextTask}>Thử thách tiếp</button>
  </div>
</div>
