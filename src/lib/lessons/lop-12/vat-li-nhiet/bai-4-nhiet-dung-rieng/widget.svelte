<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import HeatGraph from '../_shared/heat-graph.svelte';
  import {
    MAX_T,
    SAMPLES,
    START_T,
    SUSPECTS,
    linePoints,
    measuredC,
    temperatureAt,
  } from './engine.js';

  const END = 300;
  const SPEED = 30;
  const MODES = [
    { value: 'so-sanh', label: 'Nước, dầu, nhôm' },
    { value: 'bi-an', label: 'Chất bí ẩn' },
  ];
  const MASSES = [
    { value: '0.2', label: '0,2 kg' },
    { value: '0.5', label: '0,5 kg' },
    { value: '1', label: '1 kg' },
  ];

  let mode = $state('so-sanh');
  let massText = $state('0.5');
  let power = $state(500);
  let time = $state(0);
  let running = $state(false);
  let mystery = $state(0);
  /** @type {string | null} */
  let guess = $state(null);

  const mass = $derived(Number(massText));
  const unknown = $derived(SUSPECTS[mystery % SUSPECTS.length]);
  const shown = $derived(
    mode === 'so-sanh' ? SAMPLES : [{ ...unknown, name: 'Chất X', color: '#7c3aed' }],
  );
  const rows = $derived(
    shown.map((s) => {
      const t = temperatureAt(s.c, mass, power, time);
      return { ...s, t, c: measuredC(mass, power, time, t) };
    }),
  );

  $effect(() => {
    if (!running) return;
    if (reducedMotion()) {
      time = END;
      running = false;
      return;
    }
    return frameLoop((dt) => {
      time = Math.min(END, time + dt * SPEED);
      if (time >= END) running = false;
    });
  });

  function restart() {
    running = false;
    time = 0;
    guess = null;
  }

  const q = $derived(Math.round(power * time));

  const note = $derived.by(() => {
    if (mode === 'bi-an') {
      if (guess === unknown.id)
        return {
          tone: /** @type {const} */ ('ok'),
          text: `Đúng! Chất X là ${unknown.name.toLowerCase()}, $c = ${fmt(unknown.c)}$ J/kg.K.`,
        };
      if (guess !== null)
        return {
          tone: /** @type {const} */ ('warn'),
          text: 'Chưa đúng. Tính $c = \\dfrac{Q}{m\\Delta t} = \\dfrac{P\\tau}{m\\Delta t}$ từ một số đọc rồi so với bảng nhiệt dung riêng.',
        };
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Đun chất X, đọc nhiệt độ ở một thời điểm (trước khi tới $100$ °C), tính $c = \\dfrac{P\\tau}{m\\Delta t}$ rồi chọn chất phù hợp.',
      };
    }
    if (time === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Ba mẫu cùng khối lượng, cùng nhiệt độ đầu $25$ °C, nhận cùng nhiệt lượng mỗi giây. Bấm “Đun” và so sánh độ dốc ba đường.',
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Sau $${formatNumber(Math.round(time))}$ s, mỗi mẫu đã nhận $Q = P\\tau = ${fmt(q)}$ J. Cùng nhiệt lượng nhưng nước nóng lên chậm nhất vì nhiệt dung riêng của nước lớn nhất; nhôm nóng nhanh nhất vì $c$ nhỏ nhất.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl label="Thí nghiệm" options={MODES} bind:value={mode} onchange={restart} />
    <SegmentedControl
      label="Khối lượng mỗi mẫu"
      options={MASSES}
      bind:value={massText}
      onchange={restart}
    />
  </div>
  <div class="{card} p-2">
    <HeatGraph
      lines={shown.map((s) => ({ points: linePoints(s.c, mass, power, END), color: s.color }))}
      cursor={time}
      marks={rows.map((r) => ({ x: time, y: r.t, color: r.color }))}
      xMax={END}
      yMin={0}
      yMax={MAX_T}
      xTicks={[0, 60, 120, 180, 240, 300]}
      yTicks={[0, 25, 50, 75, 100]}
      xLabel="τ (s)"
      yLabel="t (°C)"
      label={`Đồ thị nhiệt độ theo thời gian khi đun với công suất ${power} oát. ${rows.map((r) => `${r.name}: ${formatNumber(r.t, 1)} độ C`).join('; ')}.`}
    />
    <p class="flex flex-wrap justify-center gap-x-4 px-2 text-xs text-slate-600">
      {#each shown as s (s.id)}
        <span style="color:{s.color}" class="font-semibold">■ {s.name}</span>
      {/each}
      <span>Bếp tự tắt khi mẫu đạt {MAX_T} °C.</span>
    </p>
  </div>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Công suất bếp P"
      bind:value={power}
      min={200}
      max={1000}
      step={100}
      unit="W"
      oninput={restart}
    />
    <SliderField
      label="Thời gian đun τ"
      bind:value={time}
      min={0}
      max={END}
      step={1}
      unit="s"
      format={(v) => formatNumber(Math.round(v))}
    />
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      disabled={running || time >= END}
      onclick={() => (running = true)}
    >
      Đun
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
    {#if mode === 'bi-an'}
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          mystery += 1;
          restart();
        }}>Mẫu khác</button
      >
    {/if}
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums" aria-live="polite">
      <thead>
        <tr class="text-left text-slate-500">
          <th class="p-1">Mẫu</th>
          <th class="p-1">t (°C)</th>
          <th class="p-1">Δt (°C)</th>
          <th class="p-1">Q = Pτ (J)</th>
          <th class="p-1">c = Q/(mΔt)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r (r.id)}
          <tr class="border-t border-slate-200">
            <td class="p-1 font-semibold" style="color:{r.color}">{r.name}</td>
            <td class="p-1">{formatNumber(r.t, 1)}</td>
            <td class="p-1">{formatNumber(Math.round(r.t * 10) / 10 - START_T, 1)}</td>
            <td class="p-1">{r.t >= MAX_T ? 'bếp đã tắt' : fmt(q)}</td>
            <td class="p-1">
              {#if mode === 'bi-an' && guess !== unknown.id}
                tự tính
              {:else}
                {r.c === null ? '—' : `≈ ${fmt(Math.round(r.c / 10) * 10)} J/kg.K`}
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if mode === 'bi-an'}
    <div class="flex flex-wrap gap-2" role="group" aria-label="Chất X là chất nào?">
      {#each SUSPECTS as s (s.id)}
        <button
          type="button"
          class={button.secondary}
          aria-pressed={guess === s.id}
          onclick={() => (guess = s.id)}>{s.name} ({fmt(s.c)} J/kg.K)</button
        >
      {/each}
    </div>
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
