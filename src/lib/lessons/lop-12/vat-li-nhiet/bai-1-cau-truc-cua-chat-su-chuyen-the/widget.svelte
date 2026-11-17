<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rng } from '#lib/core/drill.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import HeatGraph from '../_shared/heat-graph.svelte';
  import { curvePoints } from '../_shared/thermal.js';
  import {
    BOX,
    MAX_ENERGY,
    STAGES,
    STRUCTURE,
    freshSample,
    liquidTop,
    roleOf,
    sampleAt,
    step,
  } from './engine.js';

  /** Parts of heat per second while the stove is on. */
  const RATE = 40;
  const COLORS = { ran: '#2563eb', long: '#0d9488', khi: '#ea580c' };
  const STATE_TEXT = {
    ran: 'Thể rắn (nước đá)',
    'nong-chay': 'Đang nóng chảy',
    long: 'Thể lỏng (nước)',
    soi: 'Đang sôi',
    khi: 'Thể khí (hơi nước)',
  };

  const rand = rng(12);
  let heat = $state(0);
  let heating = $state(false);
  let molecules = $state.raw(freshSample(rand));
  let clock = 0;

  const sample = $derived(sampleAt(heat));
  const curve = curvePoints(STAGES, 1);
  const bands = [
    { from: 15, to: 95, label: 'nóng chảy', color: '#bae6fd' },
    { from: 195, to: 735, label: 'sôi', color: '#fed7aa' },
  ];

  /** The phase whose structure the card describes. */
  const shown = $derived(
    sample.state === 'nong-chay'
      ? sample.progress < 0.5
        ? 'ran'
        : 'long'
      : sample.state === 'soi'
        ? sample.progress < 0.5
          ? 'long'
          : 'khi'
        : sample.state,
  );
  const info = $derived(STRUCTURE[/** @type {'ran' | 'long' | 'khi'} */ (shown)]);

  // Molecules move every frame; with reduced motion they settle once after
  // each change of heat instead.
  $effect(() => {
    if (reducedMotion()) {
      const s = sample;
      let m = freshSample(rng(7));
      for (let t = 0; t < 4; t += 0.05) m = step(m, 0.05, s, t, rand);
      molecules = m;
      return;
    }
    return frameLoop((dt) => {
      clock += dt;
      molecules = step(molecules, dt, sampleAt(heat), clock, rand);
    });
  });

  $effect(() => {
    if (!heating) return;
    return frameLoop((dt) => {
      heat = Math.min(MAX_ENERGY, heat + RATE * dt);
      if (heat >= MAX_ENERGY) heating = false;
    });
  });

  function reset() {
    heating = false;
    heat = 0;
    molecules = freshSample(rand);
  }

  const temp = $derived(formatNumber(Math.round(sample.temperature)));
  const top = $derived(liquidTop(sample.solid + sample.liquid));

  const note = $derived.by(() => {
    if (sample.state === 'nong-chay')
      return `Đang nóng chảy: nhiệt độ giữ ở 0 °C dù vẫn được cung cấp nhiệt. Nhiệt lượng nhận vào dùng để phá vỡ trật tự của mạng tinh thể: còn ${sample.solid} phân tử ở thể rắn, ${sample.liquid} phân tử đã thành chất lỏng.`;
    if (sample.state === 'soi')
      return `Đang sôi ở 100 °C: nhiệt độ không đổi. Nhiệt lượng nhận vào giúp các phân tử thắng lực liên kết và thoát khỏi chất lỏng: đã có ${sample.gas} phân tử thành hơi.`;
    if (sample.state === 'ran')
      return 'Thể rắn: các phân tử ở rất gần nhau, sắp xếp có trật tự và chỉ dao động quanh vị trí cân bằng xác định. Cung cấp nhiệt làm chúng dao động mạnh hơn, nhiệt độ tăng.';
    if (sample.state === 'long')
      return 'Thể lỏng: các phân tử vẫn ở gần nhau nhưng vị trí cân bằng của chúng di chuyển được, nên chất lỏng chảy và trải ra theo đáy bình. Nhiệt độ càng cao, phân tử chuyển động càng nhanh.';
    return 'Thể khí: các phân tử ở rất xa nhau, chuyển động hỗn loạn về mọi phía và chiếm toàn bộ bình chứa.';
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <svg
        viewBox="0 0 280 200"
        class="mx-auto block w-full max-w-md select-none rounded-xl bg-slate-50"
        role="img"
        aria-label={`Hộp phân tử nước ở ${temp} độ C, ${STATE_TEXT[sample.state].toLowerCase()}: ${sample.solid} phân tử rắn, ${sample.liquid} phân tử lỏng, ${sample.gas} phân tử khí.`}
      >
        <rect
          x={BOX.x0}
          y={BOX.y0}
          width={BOX.x1 - BOX.x0}
          height={BOX.y1 - BOX.y0}
          fill="white"
          stroke="#334155"
          stroke-width="2"
        />
        {#if sample.liquid > 0}
          <rect
            x={BOX.x0 + 1}
            y={top - 8}
            width={BOX.x1 - BOX.x0 - 2}
            height={BOX.y1 - top + 7}
            fill="#ccfbf1"
            opacity="0.7"
          />
        {/if}
        {#each molecules as m, i (i)}
          <circle
            cx={m.x}
            cy={m.y}
            r="5.5"
            fill={COLORS[roleOf(i, sample.solid, sample.gas)]}
            stroke="white"
            stroke-width="1"
          />
        {/each}
      </svg>
      <p class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 pt-2 text-xs text-slate-600">
        <span><span class="inline-block size-2.5 rounded-full bg-blue-600"></span> rắn</span>
        <span><span class="inline-block size-2.5 rounded-full bg-teal-600"></span> lỏng</span>
        <span><span class="inline-block size-2.5 rounded-full bg-orange-600"></span> khí</span>
      </p>
    </div>
    <div class="{card} p-2">
      <HeatGraph
        lines={[{ points: curve }]}
        {bands}
        cursor={heat}
        marks={[{ x: heat, y: sample.temperature }]}
        xMax={MAX_ENERGY}
        yMin={-40}
        yMax={160}
        yTicks={[-40, 0, 40, 80, 120, 160]}
        xTicks={[0, 200, 400, 600]}
        xLabel="Q (phần)"
        yLabel="t (°C)"
        label="Đồ thị nhiệt độ theo nhiệt lượng cung cấp: tăng từ −30 °C đến 0 °C, nằm ngang khi nóng chảy, tăng đến 100 °C, nằm ngang khi sôi rồi lại tăng."
      />
      <p class="px-2 text-xs text-slate-600">
        Một “phần” nhiệt lượng làm 1 g nước lỏng nóng thêm 1 °C (tỉ lệ giữa các đoạn giống với nước
        thật).
      </p>
    </div>
  </div>

  <SliderField
    label="Nhiệt lượng đã cung cấp"
    bind:value={heat}
    min={0}
    max={MAX_ENERGY}
    step={5}
    unit="phần"
    format={(v) => formatNumber(Math.round(v))}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      aria-pressed={heating}
      disabled={heat >= MAX_ENERGY}
      onclick={() => (heating = !heating)}
    >
      {heating ? 'Tắt bếp' : 'Bật bếp đun đều'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại từ nước đá −30 °C</button>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm" aria-live="polite">
    <div class="{card} p-2">
      <dt class="text-slate-500">Nhiệt độ</dt>
      <dd class="font-semibold tabular-nums">{temp} °C</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Trạng thái</dt>
      <dd class="font-semibold">{STATE_TEXT[sample.state]}</dd>
    </div>
  </dl>
  <FeedbackNote
    tone={sample.state === 'nong-chay' || sample.state === 'soi' ? 'warn' : 'info'}
    text={note}
  />

  <div class="{card} p-3 text-sm">
    <p class="mb-2 font-semibold text-slate-800">{info.name}</p>
    <dl class="grid gap-1 sm:grid-cols-2">
      <div>
        <dt class="inline text-slate-500">Khoảng cách phân tử:</dt>
        <dd class="inline">{info.gap}</dd>
      </div>
      <div>
        <dt class="inline text-slate-500">Sắp xếp:</dt>
        <dd class="inline">{info.order}</dd>
      </div>
      <div>
        <dt class="inline text-slate-500">Chuyển động:</dt>
        <dd class="inline">{info.motion}</dd>
      </div>
      <div>
        <dt class="inline text-slate-500">Hình dạng, thể tích:</dt>
        <dd class="inline">{info.shape}</dd>
      </div>
    </dl>
  </div>
</div>
