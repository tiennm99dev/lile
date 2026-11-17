<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rng } from '#lib/core/drill.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    BROWN_RADIUS,
    HEIGHT,
    WIDTH,
    freshBox,
    rateOf,
    reheat,
    step,
    withCount,
  } from './engine.js';

  /** Seconds of history behind the collision rate. */
  const WINDOW = 3;
  /** Points kept in the Brown particle's trail. */
  const TRAIL = 400;

  const rand = rng(8);
  let kelvin = $state(300);
  let count = $state(40);
  let microscope = $state(false);
  let running = $state(!reducedMotion());
  let box = $state.raw(freshBox(40, 300, rand));
  /** @type {Array<{ x: number, y: number }>} */
  let trail = $state.raw([]);
  /** @type {Array<{ t: number, value: number }>} */
  let samples = $state.raw([]);
  let shownKelvin = 300;

  /** The rate shown, refreshed once a second so it stays readable. */
  let rate = $state(0);
  let settled = $state(false);

  /** @param {number} seconds */
  function advance(seconds) {
    const before = Math.floor(box.time);
    box = step(box, seconds);
    trail = [...trail, { x: box.brown.x, y: box.brown.y }].slice(-TRAIL);
    samples = [...samples, { t: box.time, value: box.hits }].filter(
      (s) => s.t >= box.time - WINDOW,
    );
    if (Math.floor(box.time) !== before) {
      settled = samples.length > 1 && samples[samples.length - 1].t - samples[0].t > WINDOW - 0.5;
      rate = Math.round(rateOf(samples));
    }
  }

  function restartCount() {
    samples = [];
    settled = false;
  }

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => advance(Math.min(dt, 0.05)));
  });

  /** Runs one second of the box at once, for learners who keep motion off. */
  function runSecond() {
    for (let i = 0; i < 20; i++) advance(0.05);
  }

  /** @param {number} v */
  function setKelvin(v) {
    box = reheat(box, shownKelvin, v);
    shownKelvin = v;
    restartCount();
  }

  /** @param {number} v */
  function setCount(v) {
    box = withCount(box, v, kelvin, rand);
    restartCount();
  }

  function reset() {
    box = freshBox(count, kelvin, rand);
    shownKelvin = kelvin;
    trail = [];
    restartCount();
  }

  const note = $derived.by(() => {
    if (microscope)
      return 'Qua kính hiển vi chỉ thấy hạt lớn chuyển động không ngừng theo đường gấp khúc. Các phân tử khí quá nhỏ để nhìn thấy, nhưng chính chúng va chạm vào hạt từ mọi phía, mỗi lúc một khác: đó là chuyển động Brown.';
    if (!settled)
      return 'Đang đếm số va chạm của các phân tử lên thành bình trong vài giây gần nhất…';
    return `Khoảng ${formatNumber(rate)} va chạm lên thành bình mỗi giây. Tăng số phân tử hoặc tăng nhiệt độ rồi so sánh: va chạm càng nhiều, càng mạnh thì áp suất khí lên thành bình càng lớn.`;
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="-6 -6 {WIDTH + 12} {HEIGHT + 12}"
      class="mx-auto block w-full max-w-lg select-none rounded-xl {microscope
        ? 'bg-slate-800'
        : 'bg-slate-50'}"
      role="img"
      aria-label={microscope
        ? `Ảnh qua kính hiển vi: hạt Brown chuyển động theo đường gấp khúc, đã đi qua ${trail.length} vị trí.`
        : `Hộp khí với ${count} phân tử ở ${kelvin} K và một hạt Brown lớn ở giữa các phân tử.`}
    >
      <rect
        x="-2"
        y="-2"
        width={WIDTH + 4}
        height={HEIGHT + 4}
        fill="none"
        stroke={microscope ? '#94a3b8' : '#334155'}
        stroke-width="3"
      />
      {#if trail.length > 1}
        <polyline
          points={pointsAttr(trail)}
          fill="none"
          stroke="#f59e0b"
          stroke-width="1.2"
          opacity="0.8"
        />
      {/if}
      {#if !microscope}
        {#each box.molecules as m, i (i)}
          <circle cx={m.x} cy={m.y} r="2.6" fill="#2563eb" />
        {/each}
      {/if}
      <circle
        cx={box.brown.x}
        cy={box.brown.y}
        r={BROWN_RADIUS}
        fill="#b45309"
        stroke="white"
        stroke-width="1.5"
      />
    </svg>
    <p class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 pt-2 text-xs text-slate-600">
      <span><span class="inline-block size-2.5 rounded-full bg-blue-600"></span> phân tử khí</span>
      <span><span class="inline-block size-2.5 rounded-full bg-amber-700"></span> hạt Brown</span>
      <span
        ><span class="inline-block h-0.5 w-4 bg-amber-500 align-middle"></span> quỹ đạo hạt Brown</span
      >
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Nhiệt độ"
      bind:value={kelvin}
      min={100}
      max={900}
      step={50}
      unit="K"
      oninput={setKelvin}
    />
    <SliderField
      label="Số phân tử trong hộp"
      bind:value={count}
      min={10}
      max={80}
      step={5}
      oninput={setCount}
    />
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      aria-pressed={running}
      onclick={() => (running = !running)}
    >
      {running ? 'Tạm dừng' : 'Chạy'}
    </button>
    {#if !running}
      <button type="button" class={button.secondary} onclick={runSecond}>Chạy thêm 1 giây</button>
    {/if}
    <button
      type="button"
      class={button.secondary}
      aria-pressed={microscope}
      onclick={() => (microscope = !microscope)}
    >
      {microscope ? 'Hiện các phân tử' : 'Nhìn như qua kính hiển vi'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm">
    <div class="{card} p-2">
      <dt class="text-slate-500">Va chạm lên thành bình</dt>
      <dd class="font-semibold tabular-nums">{settled ? `${formatNumber(rate)} lần/s` : '…'}</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Tốc độ phân tử (so với 300 K)</dt>
      <dd class="font-semibold tabular-nums">× {formatNumber(Math.sqrt(kelvin / 300), 2)}</dd>
    </div>
  </dl>
  <FeedbackNote tone={microscope ? 'ok' : 'info'} text={note} />
</div>
