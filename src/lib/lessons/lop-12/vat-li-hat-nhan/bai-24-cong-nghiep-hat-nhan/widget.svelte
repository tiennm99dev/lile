<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import {
    BAND,
    GOAL,
    TRIP,
    burnAt,
    kOf,
    regime,
    stepPower,
    steadyAfter,
    verdict,
  } from './engine.js';

  /** Seconds of power history on the graph. */
  const WINDOW = 30;
  /** Fixed game step, in seconds. */
  const DT = 0.05;

  let depth = $state(50);
  let power = $state(100);
  let clock = $state(0);
  let steady = $state(0);
  let phase = $state(/** @type {'idle' | 'run' | 'trip' | 'out' | 'won'} */ ('idle'));
  let trace = $state([{ t: 0, p: 100 }]);
  /** The operator dropped every rod by hand. */
  let scrammed = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;
  let carry = 0;

  const burn = $derived(burnAt(clock));
  const k = $derived(kOf(depth / 100, burn));
  const kind = $derived(regime(k));
  const running = $derived(phase === 'run');

  function halt() {
    stop?.();
    stop = null;
  }
  onDestroy(halt);

  function tick() {
    clock = Math.round((clock + DT) * 1000) / 1000;
    power = stepPower(power, kOf(depth / 100, burnAt(clock)), DT);
    steady = steadyAfter(steady, power, DT);
    if (Math.round(clock / DT) % 4 === 0)
      trace = [...trace, { t: clock, p: Math.min(power, 220) }].filter(
        (s) => s.t >= clock - WINDOW,
      );
    const v = verdict(power, steady);
    if (v !== 'run') {
      if (v === 'trip') depth = 100;
      phase = v;
      halt();
    }
  }

  function start() {
    if (phase !== 'idle' && phase !== 'run') restart();
    if (phase === 'run') {
      phase = 'idle';
      halt();
      return;
    }
    phase = 'run';
    stop = frameLoop((dt) => {
      carry += Math.min(dt, 0.25);
      while (carry >= DT && phase === 'run') {
        carry -= DT;
        tick();
      }
    });
  }

  function restart() {
    halt();
    depth = 50;
    power = 100;
    clock = 0;
    steady = 0;
    carry = 0;
    trace = [{ t: 0, p: 100 }];
    scrammed = false;
    phase = 'idle';
  }

  function scram() {
    depth = 100;
    scrammed = true;
  }

  const points = $derived(trace.map((s) => ({ x: s.t - Math.max(0, clock - WINDOW), y: s.p })));

  /** Neutron dots in the core: more with more power, moving every step. */
  const neutrons = $derived.by(() => {
    const count = Math.min(60, Math.round(power / 4));
    const out = [];
    for (let i = 0; i < count; i++) {
      const s = Math.sin(i * 12.9898 + Math.floor(clock * 10) * 78.233) * 43758.5453;
      const u = s - Math.floor(s);
      const s2 = Math.sin(i * 39.346 + Math.floor(clock * 10) * 11.135) * 24634.6345;
      const v = s2 - Math.floor(s2);
      out.push({ x: 40 + u * 180, y: 40 + v * 150 });
    }
    return out;
  });

  const FUEL = [55, 105, 155, 205];
  const RODS = [80, 130, 180];

  const regimeText = $derived(
    kind === 'toi'
      ? 'k ≈ 1: phản ứng dây chuyền tự duy trì ổn định (tới hạn)'
      : kind === 'duoi'
        ? 'k < 1: phản ứng dây chuyền tắt dần'
        : 'k > 1: phản ứng dây chuyền tăng nhanh (vượt hạn)',
  );

  const note = $derived.by(() => {
    const head = `k = ${formatFixed(k, 3)}, ${regimeText}. Công suất ${formatNumber(power, 0)}% công suất định mức.`;
    if (phase === 'idle' && clock === 0)
      return `Lò đang ở công suất định mức. Bấm "Vận hành lò" rồi kéo thanh trượt để nâng, hạ thanh điều khiển, giữ công suất trong vùng ${BAND.lo}% đến ${BAND.hi}% suốt ${GOAL} giây. Nhiên liệu cháy dần nên k cũng giảm dần theo thời gian.`;
    if (phase === 'trip')
      return `Công suất vượt ${TRIP}%: hệ thống an toàn tự động hạ hết các thanh điều khiển (dập lò). Trong nhà máy thật, các thanh điều khiển luôn được thả rơi để dập lò khi có sự cố. Bấm "Chơi lại".`;
    if (phase === 'out' && scrammed && depth === 100)
      return `Em đã dập lò: mọi thanh điều khiển cắm hết vào lõi, k < 1 nên phản ứng dây chuyền tắt hẳn. Bấm "Chơi lại" để vận hành lại.`;
    if (phase === 'out')
      return `Thanh điều khiển hấp thụ quá nhiều neutron, k < 1 quá lâu nên phản ứng dây chuyền tắt. Bấm "Chơi lại" và nâng thanh điều khiển lên sớm hơn.`;
    if (phase === 'won')
      return `Giỏi lắm! Em đã giữ lò ổn định ${GOAL} giây. Mỗi lần nhiên liệu cháy bớt làm k giảm, em đã rút thanh điều khiển lên một chút để giữ k ≈ 1.`;
    return `${head} Thời gian ổn định liên tục: ${formatNumber(steady, 1)}/${GOAL} s.`;
  });

  const tone = $derived(
    phase === 'won'
      ? 'ok'
      : phase === 'trip' || phase === 'out' || kind === 'vuot'
        ? 'warn'
        : 'info',
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <figure class="{card} p-2">
      <svg
        viewBox="0 0 260 215"
        class="mx-auto block w-full max-w-72"
        role="img"
        aria-label="Lõi lò phản ứng: thanh điều khiển cắm sâu {depth}%, công suất {formatNumber(
          power,
          0,
        )}%"
      >
        <rect
          x="25"
          y="25"
          width="210"
          height="180"
          rx="14"
          fill="#e0f2fe"
          stroke="#0369a1"
          stroke-width="3"
        />
        {#each FUEL as x (x)}
          <rect x={x - 7} y="45" width="14" height="150" rx="4" fill="#f59e0b" />
        {/each}
        {#each RODS as x (x)}
          <rect x={x - 5} y={-110 + 1.5 * depth} width="10" height="150" fill="#334155" />
        {/each}
        {#each neutrons as n, i (i)}
          <circle cx={n.x} cy={n.y} r="2.5" fill="#dc2626" />
        {/each}
      </svg>
      <figcaption class="px-2 pt-1 text-center text-xs text-slate-500">
        Cam: thanh nhiên liệu. Xám: thanh điều khiển. Đỏ: neutron (càng nhiều thì công suất càng
        lớn).
      </figcaption>
    </figure>
    <div class="{card} space-y-2 p-2">
      <XyPlot
        lines={[{ points, color: '#dc2626' }]}
        guides={[
          { y: BAND.hi, label: `${BAND.hi}%`, color: '#059669' },
          { y: BAND.lo, label: `${BAND.lo}%`, color: '#059669' },
        ]}
        xMax={WINDOW}
        yMax={220}
        xTicks={[0, 10, 20, 30]}
        yTicks={[0, 50, 100, 150, 200]}
        xLabel="t (s, 30 s gần nhất)"
        yLabel="P (%)"
        label="Công suất lò trong 30 giây gần nhất"
      />
      <p class="px-2 text-sm font-semibold text-slate-700">
        k = {formatFixed(k, 3)} · P = {formatNumber(power, 0)}% · Ổn định: {formatNumber(
          steady,
          1,
        )}/{GOAL}
        s
      </p>
    </div>
  </div>

  <div class="{card} p-3">
    <SliderField label="Độ sâu thanh điều khiển" bind:value={depth} min={0} max={100} unit="%" />
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} aria-pressed={running} onclick={start}>
      {running ? 'Tạm dừng' : phase === 'idle' ? 'Vận hành lò' : 'Chơi lại và vận hành'}
    </button>
    <button type="button" class={button.secondary} onclick={scram}>Dập lò khẩn cấp</button>
    <button type="button" class={button.quiet} onclick={restart}>Chơi lại</button>
  </div>

  <FeedbackNote {tone} text={note} />
</div>
