<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import HeatGraph from '../_shared/heat-graph.svelte';
  import { sciTex } from '../_shared/thermal.js';
  import { END_T, LAMBDA_ICE, lambdaFrom, relativeError, run, stateAt } from './engine.js';

  const STAGE_TEXT = ['Nước đá đang nóng lên', 'Nước đá đang tan ở 0 °C', 'Nước đang nóng lên'];

  let mass = $state(0.2);
  let start = $state(-10);
  let power = $state(200);
  let time = $state(0);
  let running = $state(false);
  /** @type {number | null} */
  let mark1 = $state(null);
  /** @type {number | null} */
  let mark2 = $state(null);

  const r = $derived(run(mass, start, power));
  const now = $derived(stateAt(r, power, time));
  const step = $derived(Math.max(1, Math.round(r.end / 200)));
  const lambda = $derived(
    mark1 !== null && mark2 !== null && mark2 > mark1
      ? lambdaFrom(power, mark1, mark2, mass)
      : null,
  );

  $effect(() => {
    if (!running) return;
    if (reducedMotion()) {
      time = r.end;
      running = false;
      return;
    }
    const speed = r.end / 12;
    return frameLoop((dt) => {
      time = Math.min(r.end, time + dt * speed);
      if (time >= r.end) running = false;
    });
  });

  function restart() {
    running = false;
    time = 0;
    mark1 = null;
    mark2 = null;
  }

  /** Ice cubes drawn in the beaker, shrinking as they melt. */
  const iceLeft = $derived(1 - now.melted);

  const note = $derived.by(() => {
    if (lambda !== null && mark1 !== null && mark2 !== null) {
      const err = relativeError(lambda);
      return {
        tone: /** @type {'ok' | 'warn'} */ (err <= 0.05 ? 'ok' : 'warn'),
        text: `$\\lambda = \\dfrac{P(\\tau_2 - \\tau_1)}{m} = \\dfrac{${numTex(power)} \\cdot ${numTex(mark2 - mark1)}}{${numTex(mass)}} \\approx ${sciTex(lambda)}$ J/kg, lệch ${formatNumber(err * 100, 1)}% so với giá trị $3{,}34 \\cdot 10^{5}$ J/kg. ${err <= 0.05 ? 'Phép đo tốt!' : 'Hãy đánh dấu đúng lúc đồ thị bắt đầu và kết thúc đoạn nằm ngang.'}`,
      };
    }
    if (mark1 !== null && mark2 !== null)
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Thời điểm tan hết phải sau thời điểm bắt đầu tan. Đánh dấu lại.',
      };
    if (now.stage === 1)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Nhiệt độ đứng yên ở $0$ °C: nhiệt lượng nhận vào chỉ để làm tan nước đá. Đã tan ${formatNumber(now.melted * 100, 0)}% lượng nước đá.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Bấm “Đun”, hoặc kéo thanh thời gian. Đánh dấu thời điểm $\\tau_1$ nước đá bắt đầu tan và $\\tau_2$ tan hết để tính $\\lambda$.',
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[1fr_minmax(0,9rem)]">
    <div class="{card} p-2">
      <HeatGraph
        lines={[{ points: r.points }]}
        bands={[{ from: r.meltStart, to: r.meltEnd, label: 'Q = λm', color: '#bae6fd' }]}
        cursor={time}
        marks={[
          { x: time, y: now.temperature },
          ...(mark1 === null ? [] : [{ x: mark1, y: 0, color: '#16a34a' }]),
          ...(mark2 === null ? [] : [{ x: mark2, y: 0, color: '#16a34a' }]),
        ]}
        xMax={r.end}
        yMin={-20}
        yMax={END_T + 5}
        xTicks={ticksUpTo(r.end)}
        yTicks={[-20, -10, 0, 10, 20, 30, 40]}
        xLabel="τ (s)"
        yLabel="t (°C)"
        label={`Đồ thị nhiệt độ theo thời gian khi đun ${formatNumber(mass)} kg nước đá: nằm ngang ở 0 độ C từ ${formatNumber(r.meltStart, 0)} giây đến ${formatNumber(r.meltEnd, 0)} giây.`}
      />
    </div>
    <div class="{card} flex flex-col items-center justify-center p-2">
      <svg
        viewBox="0 0 100 110"
        class="w-28"
        role="img"
        aria-label={`Cốc chứa nước đá, đã tan ${formatNumber(now.melted * 100, 0)} phần trăm.`}
      >
        <path d="M 15 10 L 20 100 L 80 100 L 85 10" fill="none" stroke="#334155" stroke-width="3" />
        <rect
          x="19"
          y={100 - 50 * now.melted - 6}
          width="62"
          height={50 * now.melted + 6}
          fill="#bfdbfe"
          opacity="0.8"
        />
        {#each [0, 1, 2] as i (i)}
          {@const s = 22 * Math.sqrt(iceLeft)}
          {#if s > 0.5}
            <rect
              x={24 + i * 20 + (22 - s) / 2}
              y={96 - s - (i % 2) * 6}
              width={s}
              height={s}
              rx="3"
              fill="#e0f2fe"
              stroke="#0284c7"
            />
          {/if}
        {/each}
      </svg>
      <p class="text-center text-xs font-semibold text-slate-700" aria-live="polite">
        {formatNumber(now.temperature, 1)} °C · {STAGE_TEXT[now.stage]}
      </p>
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Khối lượng nước đá m"
      bind:value={mass}
      min={0.1}
      max={0.5}
      step={0.05}
      unit="kg"
      oninput={restart}
    />
    <SliderField
      label="Nhiệt độ đầu"
      bind:value={start}
      min={-20}
      max={0}
      unit="°C"
      oninput={restart}
    />
    <SliderField
      label="Công suất dây đun P"
      bind:value={power}
      min={100}
      max={500}
      step={50}
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
    <button type="button" class={button.secondary} onclick={() => (mark1 = Math.round(time))}>
      Đánh dấu bắt đầu tan τ₁{mark1 === null ? '' : ` = ${fmt(mark1)} s`}
    </button>
    <button type="button" class={button.secondary} onclick={() => (mark2 = Math.round(time))}>
      Đánh dấu tan hết τ₂{mark2 === null ? '' : ` = ${fmt(mark2)} s`}
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
  </div>

  <dl class="grid gap-2 text-sm sm:grid-cols-3">
    <div class="{card} p-2">
      <dt class="text-slate-500">Làm nóng nước đá đến 0 °C</dt>
      <dd class="font-semibold tabular-nums">{fmt(Math.round(r.heats[0]))} J</dd>
    </div>
    <div class="{card} bg-sky-50 p-2">
      <dt class="text-slate-500">Nóng chảy: Q = λm</dt>
      <dd class="font-semibold tabular-nums">{fmt(Math.round(r.heats[1]))} J</dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Làm nóng nước đến {END_T} °C</dt>
      <dd class="font-semibold tabular-nums">{fmt(Math.round(r.heats[2]))} J</dd>
    </div>
  </dl>
  <FeedbackNote tone={note.tone} text={note.text} />
  <p class="text-xs text-slate-500">
    Mô phỏng bỏ qua nhiệt lượng hao phí; λ của nước đá lấy bằng {formatNumber(
      LAMBDA_ICE / 1e5,
      2,
    )}·10⁵ J/kg.
  </p>
</div>
