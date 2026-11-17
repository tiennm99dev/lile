<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import HeatGraph from '../_shared/heat-graph.svelte';
  import { equilibrium, flowText, temperaturesAt } from './engine.js';

  /** Seconds of contact the graph holds, and the settling time constant. */
  const T_END = 60;
  const TAU = 10;
  /** Simulated seconds per real second. */
  const SPEED = 12;
  const SIZES = [
    { value: '1-1', label: 'A và B như nhau' },
    { value: '1-3', label: 'B lớn gấp 3 A' },
    { value: '3-1', label: 'A lớn gấp 3 B' },
  ];

  let ta0 = $state(80);
  let tb0 = $state(20);
  let sizes = $state('1-1');
  let time = $state(0);
  let running = $state(false);

  const caps = $derived(sizes.split('-').map(Number));
  const a = $derived({ name: 'khối A', celsius: ta0, capacity: caps[0] });
  const b = $derived({ name: 'khối B', celsius: tb0, capacity: caps[1] });
  const now = $derived(temperaturesAt(a, b, time, TAU));
  const eq = $derived(equilibrium(a, b));
  /** Drawn widths of the blocks, px: a bigger block holds more heat per degree. */
  const wa = $derived(40 + 25 * caps[0]);
  const wb = $derived(40 + 25 * caps[1]);

  /** @param {0 | 1} which */
  function trace(which) {
    const pts = [];
    for (let s = 0; s <= time + 1e-9; s += 1)
      pts.push({ x: s, y: temperaturesAt(a, b, s, TAU)[which] });
    pts.push({ x: time, y: now[which] });
    return pts;
  }

  $effect(() => {
    if (!running) return;
    if (reducedMotion()) {
      time = T_END;
      running = false;
      return;
    }
    return frameLoop((dt) => {
      time = Math.min(T_END, time + dt * SPEED);
      if (time >= T_END) running = false;
    });
  });

  function reset() {
    running = false;
    time = 0;
  }

  /** @param {number} t */
  function color(t) {
    const k = Math.max(0, Math.min(1, (t + 10) / 110));
    return `rgb(${Math.round(59 + 180 * k)}, ${Math.round(130 - 60 * k)}, ${Math.round(246 - 190 * k)})`;
  }

  const note = $derived(
    time === 0
      ? 'Chọn nhiệt độ ban đầu và kích thước hai khối (cùng chất liệu), rồi bấm “Cho tiếp xúc”.'
      : `${flowText(a, b, now[0], now[1])} Sau ${formatNumber(Math.round(time))} s: A ${formatNumber(now[0], 1)} °C, B ${formatNumber(now[1], 1)} °C. Nhiệt độ cân bằng: ${formatNumber(eq, 1)} °C.`,
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 300 90"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Khối A ở ${formatNumber(now[0], 1)} độ C tiếp xúc khối B ở ${formatNumber(now[1], 1)} độ C.`}
    >
      <rect x={150 - wa} y="20" width={wa} height="56" rx="4" fill={color(now[0])} />
      <rect x="150" y="20" width={wb} height="56" rx="4" fill={color(now[1])} />
      <line x1="150" x2="150" y1="16" y2="80" stroke="#0f172a" stroke-width="2" />
      <text
        x={150 - wa / 2}
        y="52"
        font-size="13"
        font-weight="700"
        fill="white"
        text-anchor="middle">A</text
      >
      <text
        x={150 + wb / 2}
        y="52"
        font-size="13"
        font-weight="700"
        fill="white"
        text-anchor="middle">B</text
      >
      {#if time > 0 && Math.abs(now[0] - now[1]) >= 0.05}
        <text x="150" y="12" font-size="11" fill="#b91c1c" text-anchor="middle" font-weight="600">
          {now[0] > now[1] ? 'nhiệt: A → B' : 'nhiệt: B → A'}
        </text>
      {/if}
    </svg>
    <HeatGraph
      lines={[
        { points: trace(0), color: '#dc2626' },
        { points: trace(1), color: '#2563eb' },
        {
          points: [
            { x: 0, y: eq },
            { x: T_END, y: eq },
          ],
          color: '#94a3b8',
          dashed: true,
        },
      ]}
      xMax={T_END}
      yMin={-20}
      yMax={100}
      xTicks={[0, 20, 40, 60]}
      yTicks={[-20, 0, 20, 40, 60, 80, 100]}
      xLabel="thời gian (s)"
      yLabel="t (°C)"
      label="Đồ thị nhiệt độ của khối A (đỏ) và khối B (xanh) theo thời gian; đường nét đứt là nhiệt độ cân bằng."
    />
  </div>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Nhiệt độ ban đầu của A"
      bind:value={ta0}
      min={-10}
      max={100}
      unit="°C"
      oninput={reset}
    />
    <SliderField
      label="Nhiệt độ ban đầu của B"
      bind:value={tb0}
      min={-10}
      max={100}
      unit="°C"
      oninput={reset}
    />
  </div>
  <SegmentedControl
    label="Kích thước hai khối"
    options={SIZES}
    bind:value={sizes}
    onchange={reset}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      disabled={running || time >= T_END}
      onclick={() => (running = true)}
    >
      Cho tiếp xúc
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Tách ra, làm lại</button>
  </div>
  <FeedbackNote tone={time >= T_END ? 'ok' : 'info'} text={note} />
</div>
