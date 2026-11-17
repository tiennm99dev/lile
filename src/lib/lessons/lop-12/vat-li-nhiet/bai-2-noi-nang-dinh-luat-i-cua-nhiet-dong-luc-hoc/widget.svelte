<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { intText } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { SCENARIOS, checkScenario, deltaU, signMeaning, signed } from './engine.js';

  const LIMIT = 300;
  const MODES = [
    { value: 'tu-do', label: 'Thử tự do' },
    { value: 'tinh-huong', label: 'Tình huống' },
  ];
  const PICKS = SCENARIOS.map((s, i) => ({ value: s.id, label: `${i + 1}` }));

  let mode = $state('tu-do');
  let pick = $state(SCENARIOS[0].id);
  let work = $state(0);
  let heat = $state(0);
  let checked = $state(false);

  const du = $derived(deltaU(work, heat));
  const scenario = $derived(SCENARIOS.find((s) => s.id === pick) ?? SCENARIOS[0]);
  const verdict = $derived(checkScenario(scenario, work, heat));

  /** Piston face, px: compressing (A > 0) pushes it in. */
  const piston = $derived(215 - (work / LIMIT) * 70);
  /** Gas colour from blue (U fell) through grey to red (U rose). */
  const gasColor = $derived.by(() => {
    const k = Math.max(-1, Math.min(1, du / (2 * LIMIT)));
    if (k >= 0)
      return `rgb(${Math.round(226 + 26 * k)}, ${Math.round(232 - 120 * k)}, ${Math.round(240 - 140 * k)})`;
    return `rgb(${Math.round(226 + 130 * k)}, ${Math.round(232 + 10 * k)}, ${Math.round(240 + 10 * k)})`;
  });
  const flame = $derived(Math.max(0, heat) / LIMIT);
  const cold = $derived(Math.max(0, -heat) / LIMIT);

  const bars = $derived([
    { name: 'A', value: work, color: '#7c3aed' },
    { name: 'Q', value: heat, color: '#ea580c' },
    { name: 'ΔU', value: du, color: '#0f766e' },
  ]);

  const equation = $derived(
    `$\\Delta U = A + Q = (${signed(work)}) + (${signed(heat)}) = ${signed(du)}$ J`,
  );

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const note = $derived.by(() => {
    if (mode === 'tinh-huong' && checked)
      return { tone: verdict.ok ? 'ok' : 'warn', text: verdict.text };
    if (mode === 'tinh-huong')
      return {
        tone: 'info',
        text: 'Đọc tình huống, đặt $A$ và $Q$ với đúng dấu rồi bấm “Kiểm tra”.',
      };
    if (work === 0 && heat === 0)
      return {
        tone: 'info',
        text: 'Kéo thanh $A$ để nén hoặc cho khí giãn nở, kéo thanh $Q$ để đun hoặc làm lạnh xi lanh.',
      };
    return {
      tone: 'info',
      text: `${capital(signMeaning('A', work))}, ${signMeaning('Q', heat)}: ${signMeaning('U', du)}${du === 0 ? '' : ` ${intText(Math.abs(du))} J`}.`,
    };
  });

  /** @param {string} s */
  function capital(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /** @param {string | number} next */
  function choose(next) {
    pick = String(next);
    work = 0;
    heat = 0;
    checked = false;
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Chế độ"
      options={MODES}
      bind:value={mode}
      onchange={() => (checked = false)}
    />
    {#if mode === 'tinh-huong'}
      <SegmentedControl label="Tình huống" options={PICKS} value={pick} onchange={choose} />
    {/if}
  </div>
  {#if mode === 'tinh-huong'}
    <div class="{card} p-3 text-sm">
      <LiveRichText text={scenario.text} />
    </div>
  {/if}

  <div class="{card} p-2">
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-50"
      role="img"
      aria-label={`Xi lanh chứa khí. Công khí nhận A bằng ${intText(work)} jun, nhiệt lượng khí nhận Q bằng ${intText(heat)} jun, độ biến thiên nội năng bằng ${intText(du)} jun.`}
    >
      <!-- cylinder: closed on the left, piston on the right -->
      <rect x="40" y="40" width={piston - 40} height="90" fill={gasColor} />
      {#each [0, 1, 2, 3, 4, 5, 6, 7] as i (i)}
        <circle
          cx={52 + ((i * 37) % Math.max(20, piston - 64))}
          cy={56 + ((i * 23) % 60)}
          r="4"
          fill="#334155"
          opacity="0.6"
        />
      {/each}
      <path d="M 310 40 L 40 40 L 40 130 L 310 130" fill="none" stroke="#334155" stroke-width="4" />
      <rect x={piston} y="42" width="14" height="86" fill="#94a3b8" stroke="#475569" />
      <rect
        x={piston + 14}
        y="78"
        width={340 - piston}
        height="14"
        fill="#cbd5e1"
        stroke="#475569"
      />
      {#if work > 0}
        <path
          d="M {piston + 70} 70 L {piston + 30} 70 M {piston + 38} 63 L {piston + 30} 70 L {piston +
            38} 77"
          stroke="#7c3aed"
          stroke-width="3"
          fill="none"
        />
        <text x={piston + 34} y="60" font-size="11" fill="#7c3aed" font-weight="600">nén khí</text>
      {:else if work < 0}
        <path
          d="M {piston + 30} 70 L {piston + 70} 70 M {piston + 62} 63 L {piston + 70} 70 L {piston +
            62} 77"
          stroke="#7c3aed"
          stroke-width="3"
          fill="none"
        />
        <text x={piston + 26} y="60" font-size="11" fill="#7c3aed" font-weight="600"
          >khí đẩy ra</text
        >
      {/if}
      <!-- stove or cooler under the cylinder -->
      <rect x="70" y="170" width="160" height="10" rx="3" fill="#475569" />
      {#if flame > 0}
        {#each [90, 120, 150, 180, 210] as x (x)}
          <path
            d="M {x - 8} 168 Q {x} {166 - 30 * flame} {x + 8} 168 Z"
            fill="#f97316"
            opacity="0.9"
          />
        {/each}
        <text x="240" y="160" font-size="11" fill="#ea580c" font-weight="600">đun nóng</text>
      {:else if cold > 0}
        <rect x="80" y="136" width="140" height={8 + 20 * cold} rx="4" fill="#7dd3fc" />
        <text x="240" y="160" font-size="11" fill="#0369a1" font-weight="600">làm lạnh</text>
      {/if}
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Màu khí đỏ dần khi nội năng tăng, xanh dần khi nội năng giảm.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Công khí nhận A"
      bind:value={work}
      min={-LIMIT}
      max={LIMIT}
      step={10}
      unit="J"
      format={intText}
      oninput={() => (checked = false)}
    />
    <SliderField
      label="Nhiệt lượng khí nhận Q"
      bind:value={heat}
      min={-LIMIT}
      max={LIMIT}
      step={10}
      unit="J"
      format={intText}
      oninput={() => (checked = false)}
    />
  </div>

  <div class="{card} space-y-2 p-3" aria-hidden="true">
    {#each bars as bar (bar.name)}
      <div class="flex items-center gap-2 text-sm">
        <span class="w-8 font-semibold">{bar.name}</span>
        <div class="relative h-4 flex-1 rounded bg-slate-100">
          <div class="absolute inset-y-0 left-1/2 w-px bg-slate-400"></div>
          <div
            class="absolute inset-y-0 rounded"
            style="background:{bar.color}; left:{bar.value >= 0
              ? 50
              : 50 + (bar.value / (2 * LIMIT)) * 50}%; width:{(Math.abs(bar.value) / (2 * LIMIT)) *
              50}%"
          ></div>
        </div>
        <span class="w-16 text-right tabular-nums">{intText(bar.value)} J</span>
      </div>
    {/each}
  </div>
  <p class="text-center text-lg" aria-live="polite"><LiveRichText text={equation} /></p>
  <FeedbackNote tone={note.tone} text={note.text} />
  {#if mode === 'tinh-huong'}
    <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button>
  {/if}
</div>
