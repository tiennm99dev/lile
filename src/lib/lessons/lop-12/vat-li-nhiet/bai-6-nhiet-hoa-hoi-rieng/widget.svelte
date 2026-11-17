<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt, formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import HeatGraph from '../_shared/heat-graph.svelte';
  import { sciTex } from '../_shared/thermal.js';
  import {
    BOIL_SHARE,
    L_WATER,
    latentFrom,
    massPoints,
    massTicks,
    readingAt,
    relativeError,
    run,
  } from './engine.js';

  /** Readings the table keeps at most. */
  const MAX_ROWS = 6;

  let mass = $state(0.3);
  let start = $state(80);
  let power = $state(500);
  let time = $state(0);
  let running = $state(false);
  /** @type {Array<ReturnType<typeof readingAt>>} */
  let rows = $state([]);

  const r = $derived(run(mass, start, power));
  const now = $derived(readingAt(r, power, time));
  const step = $derived(Math.max(1, Math.round(r.end / 200)));
  const lo = $derived(mass * 1000 * (1 - BOIL_SHARE));
  const ticks = $derived(massTicks(lo, mass * 1000));
  const last = $derived(rows.length >= 2 ? [rows[rows.length - 2], rows[rows.length - 1]] : null);
  const latent = $derived(last ? latentFrom(last[0], last[1]) : null);

  $effect(() => {
    if (!running) return;
    if (reducedMotion()) {
      time = r.end;
      running = false;
      return;
    }
    const speed = r.end / 15;
    return frameLoop((dt) => {
      time = Math.min(r.end, time + dt * speed);
      if (time >= r.end) running = false;
    });
  });

  function restart() {
    running = false;
    time = 0;
    rows = [];
  }

  function record() {
    const reading = readingAt(r, power, Math.round(time));
    rows = [...rows, reading].slice(-MAX_ROWS);
  }

  /** Bubbles drawn while the water boils. */
  const bubbles = [
    { x: 38, d: 0 },
    { x: 52, d: 0.35 },
    { x: 64, d: 0.7 },
    { x: 46, d: 0.5 },
  ];
  const level = $derived(70 * (now.mass / 0.5));

  const note = $derived.by(() => {
    if (last && latent === null)
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Giữa hai lần ghi, số chỉ của cân không đổi: nước chưa sôi nên chưa hoá hơi. Hãy ghi số liệu khi nước đang sôi.',
      };
    if (last && latent !== null) {
      const err = relativeError(latent);
      const formula = `L = \\dfrac{Q_2 - Q_1}{m_1 - m_2} = \\dfrac{${numTex(last[1].energy - last[0].energy)}}{${numTex(tidy(last[0].mass - last[1].mass, 6), 6)}} \\approx ${sciTex(latent)}`;
      if (!last[0].boiling)
        return {
          tone: /** @type {const} */ ('warn'),
          text: `$${formula}$ J/kg, lớn hơn giá trị đúng ${formatNumber(err * 100, 0)}%: lần ghi thứ nhất lúc nước chưa sôi, nên một phần nhiệt lượng dùng để làm nóng nước chứ không làm nước hoá hơi.`,
        };
      return {
        tone: /** @type {'ok' | 'warn'} */ (err <= 0.01 ? 'ok' : 'warn'),
        text: `$${formula}$ J/kg, lệch ${formatNumber(err * 100, 1)}% so với giá trị $2{,}26 \\cdot 10^{6}$ J/kg. ${err <= 0.01 ? 'Phép đo tốt!' : 'Ghi số liệu cách xa nhau hơn để sai số do làm tròn nhỏ đi.'}`,
      };
    }
    if (now.boiling)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Nước sôi ở $100$ °C, nhiệt độ không đổi; cân chỉ khối lượng giảm dần vì nước hoá hơi. Ghi hai lần số liệu cách nhau một khoảng thời gian để tính $L$.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Bấm “Đun”, hoặc kéo thanh thời gian. Khi nước đang sôi, bấm “Ghi số liệu” hai lần: mỗi lần ghi số chỉ oát kế $Q$ và số chỉ cân $m$.',
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[minmax(0,11rem)_1fr]">
    <div class="{card} flex flex-col items-center justify-center gap-1 p-2">
      <svg
        viewBox="0 0 120 150"
        class="w-36"
        role="img"
        aria-label={`Bình nước trên cân, nhiệt độ ${formatNumber(now.temperature, 1)} độ C, cân chỉ ${formatNumber(now.mass * 1000, 1)} gam${now.boiling ? ', nước đang sôi' : ''}.`}
      >
        <!-- vapour -->
        {#if now.boiling}
          {#each [40, 60, 80] as x, i (x)}
            <path
              d="M {x} 22 q -6 -6 0 -12 q 6 -6 0 -12"
              fill="none"
              stroke="#94a3b8"
              stroke-width="2"
              opacity={0.4 + 0.2 * i}
            />
          {/each}
        {/if}
        <!-- calorimeter -->
        <rect
          x="25"
          y="28"
          width="70"
          height="80"
          rx="4"
          fill="#f8fafc"
          stroke="#334155"
          stroke-width="2.5"
        />
        <rect
          x="27.5"
          y={106 - level}
          width="65"
          height={level}
          fill={now.boiling ? '#93c5fd' : '#bfdbfe'}
        />
        <!-- heating coil -->
        <path
          d="M 40 100 l 5 -6 l 5 6 l 5 -6 l 5 6 l 5 -6 l 5 6 l 5 -6 l 5 6"
          fill="none"
          stroke="#dc2626"
          stroke-width="2"
        />
        {#if now.boiling}
          {#each bubbles as b (b.x)}
            <circle
              cx={b.x}
              cy={96 - ((time * 0.8 + b.d * 40) % 40)}
              r="2.5"
              fill="#fff"
              stroke="#3b82f6"
            />
          {/each}
        {/if}
        <!-- balance -->
        <rect x="10" y="110" width="100" height="10" rx="2" fill="#cbd5e1" />
        <rect x="18" y="120" width="84" height="26" rx="4" fill="#334155" />
        <rect x="30" y="125" width="60" height="16" rx="2" fill="#a7f3d0" />
        <text x="60" y="137" font-size="11" font-weight="700" text-anchor="middle" fill="#064e3b"
          >{formatNumber(now.mass * 1000, 1)} g</text
        >
      </svg>
    </div>
    <div class="{card} p-2">
      <HeatGraph
        lines={[{ points: massPoints(r) }]}
        bands={[{ from: r.boilStart, to: r.end, label: 'Sôi: Q = Lm', color: '#bfdbfe' }]}
        cursor={time}
        marks={[
          { x: time, y: now.mass * 1000 },
          ...rows.map((row) => ({ x: row.time, y: row.mass * 1000, color: '#16a34a' })),
        ]}
        xMax={r.end}
        yMin={ticks[0]}
        yMax={ticks[ticks.length - 1]}
        xTicks={ticksUpTo(r.end)}
        yTicks={ticks}
        xLabel="τ (s)"
        yLabel="m (g)"
        label={`Đồ thị khối lượng nước theo thời gian: không đổi đến ${formatNumber(r.boilStart, 0)} giây, sau đó giảm đều khi nước sôi.`}
      />
    </div>
  </div>

  <dl class="grid grid-cols-3 gap-2 text-sm" aria-live="polite">
    <div class="{card} p-2">
      <dt class="text-slate-500">Nhiệt kế</dt>
      <dd class="font-semibold tabular-nums">{formatNumber(now.temperature, 1)} °C</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Oát kế: Q</dt>
      <dd class="font-semibold tabular-nums">{fmt(Math.round(now.energy))} J</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Cân: m</dt>
      <dd class="font-semibold tabular-nums">{formatNumber(now.mass * 1000, 1)} g</dd>
    </div>
  </dl>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Khối lượng nước"
      bind:value={mass}
      min={0.2}
      max={0.5}
      step={0.05}
      unit="kg"
      oninput={restart}
    />
    <SliderField
      label="Nhiệt độ đầu"
      bind:value={start}
      min={60}
      max={100}
      step={5}
      unit="°C"
      oninput={restart}
    />
    <SliderField
      label="Công suất P"
      bind:value={power}
      min={300}
      max={1000}
      step={100}
      unit="W"
      oninput={restart}
    />
  </div>
  <SliderField
    label="Thời gian đun τ"
    bind:value={time}
    min={0}
    max={r.end}
    {step}
    unit="s"
    format={(v) => formatNumber(Math.round(v))}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      disabled={running || time >= r.end}
      onclick={() => (running = true)}>Đun</button
    >
    <button type="button" class={button.quiet} onclick={() => (running = false)} disabled={!running}
      >Tạm dừng</button
    >
    <button type="button" class={button.secondary} onclick={record}>Ghi số liệu</button>
    <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
  </div>

  {#if rows.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-1 text-left text-xs text-slate-500">
          Số liệu đã ghi (hai dòng cuối dùng để tính L)
        </caption>
        <thead>
          <tr class="text-left text-slate-500">
            <th class="px-2 py-1">Lần</th>
            <th class="px-2 py-1">τ (s)</th>
            <th class="px-2 py-1">t (°C)</th>
            <th class="px-2 py-1">Q (J)</th>
            <th class="px-2 py-1">m (g)</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row, i (i)}
            <tr class="border-t border-slate-200 {i >= rows.length - 2 ? 'bg-sky-50' : ''}">
              <td class="px-2 py-1">{i + 1}</td>
              <td class="px-2 py-1">{fmt(row.time)}</td>
              <td class="px-2 py-1">{formatNumber(row.temperature, 1)}</td>
              <td class="px-2 py-1">{fmt(Math.round(row.energy))}</td>
              <td class="px-2 py-1">{formatNumber(row.mass * 1000, 1)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />
  <p class="text-xs text-slate-500">
    Mô phỏng bỏ qua nhiệt lượng hao phí ra môi trường; nhiệt hoá hơi riêng của nước ở 100 °C lấy
    bằng {formatNumber(L_WATER / 1e6, 2)}·10⁶ J/kg.
  </p>
</div>
