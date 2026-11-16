<script>
  import { onMount } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { CHARGE, SECTION, WIRE, drift, makeCarriers, modelCurrent } from './engine.js';

  const W = 360;
  const LANE = 18;
  /** Counting window, s. */
  const WINDOW = 2;
  /** Manual step, s. */
  const STEP = 0.25;

  let lanes = $state(2);
  let density = $state(2);
  let speed = $state(1);
  // A new density or cross section redraws the wire; drifting moves it on.
  let carriers = $derived(makeCarriers(density, lanes, 3));
  let running = $state(false);
  /** Seconds counted so far and carriers passed, while a count runs. */
  let counting = $state(/** @type {{ elapsed: number, passed: number } | null} */ (null));
  let result = $state(
    /** @type {{ passed: number, lanes: number, density: number, speed: number } | null} */ (null),
  );

  // The wire starts drifting on its own unless the reader asked for less motion.
  onMount(() => {
    running = !reducedMotion();
  });
  // Any change of the wire voids a count.
  $effect(() => {
    void [lanes, density, speed];
    counting = null;
    result = null;
  });

  /** @param {number} dt */
  function advance(dt) {
    let step = dt;
    if (counting) step = Math.min(dt, WINDOW - counting.elapsed);
    const next = drift(carriers, speed * step);
    carriers = next.carriers;
    if (!counting) return;
    const elapsed = counting.elapsed + step;
    const passed = counting.passed + next.passed;
    if (elapsed >= WINDOW - 1e-9) {
      counting = null;
      result = { passed, lanes, density, speed };
    } else {
      counting = { elapsed, passed };
    }
  }

  $effect(() => {
    if (!running) return;
    return frameLoop(advance);
  });

  function startCount() {
    result = null;
    counting = { elapsed: 0, passed: 0 };
  }

  const H = $derived(70 + lanes * LANE + 46);
  const top = 64;
  const sx = linear(0, WIRE, 24, W - 24);
  const sectionX = sx.map(SECTION);
  const theory = $derived(modelCurrent(lanes, density, speed));

  const note = $derived.by(() => {
    if (counting)
      return {
        tone: /** @type {const} */ ('info'),
        // While frames run, keep the line still so screen readers are not flooded.
        text: running
          ? 'Đang đếm số hạt đi qua tiết diện trong $2$ s…'
          : `Đang đếm: $t = ${numTex(counting.elapsed, 2)}$ s, đã có $${counting.passed}$ hạt đi qua tiết diện. Bấm “Tiến 0,25 s” để thời gian trôi.`,
      };
    if (result) {
      const dq = result.passed * CHARGE;
      const i = dq / WINDOW;
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Trong $\\Delta t = 2$ s có $${result.passed}$ hạt đi qua: $\\Delta q = ${result.passed} \\cdot 0{,}1 = ${numTex(dq, 2)}$ C, nên $I = \\dfrac{\\Delta q}{\\Delta t} = ${numTex(i, 3)}$ A. Mô hình cho $S \\cdot n \\cdot v \\cdot q = ${result.lanes} \\cdot ${result.density} \\cdot ${numTex(result.speed)} \\cdot 0{,}1 = ${numTex(modelCurrent(result.lanes, result.density, result.speed), 3)}$ A: hai cách tính trùng nhau.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Electron trôi sang phải, về phía cực dương; dòng điện có chiều ngược lại, từ phải sang trái. Bấm “Đếm trong 2 s” để đo cường độ dòng điện.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-50"
      role="img"
      aria-label={`Đoạn dây dẫn có tiết diện ${lanes} ô, mật độ ${density} hạt mỗi xentimét, electron trôi sang phải với tốc độ ${formatNumber(speed)} xentimét mỗi giây. Dòng điện có chiều từ phải sang trái, cường độ theo mô hình ${formatNumber(theory, 3)} ampe.`}
    >
      <!-- current direction above the wire -->
      <g stroke="#dc2626" stroke-width="2.5" fill="#dc2626">
        <line x1={W - 60} y1="26" x2="70" y2="26" />
        <path d="M 62 26 l 12 -6 v 12 z" stroke="none" />
      </g>
      <text x={W / 2} y="18" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle"
        >Chiều dòng điện I</text
      >
      <text x="10" y={top + (lanes * LANE) / 2 + 5} font-size="16" font-weight="700" fill="#2563eb"
        >−</text
      >
      <text
        x={W - 18}
        y={top + (lanes * LANE) / 2 + 5}
        font-size="16"
        font-weight="700"
        fill="#dc2626">+</text
      >
      <!-- the wire -->
      <rect
        x={sx.map(0)}
        y={top - 4}
        width={sx.map(WIRE) - sx.map(0)}
        height={lanes * LANE + 8}
        rx="10"
        fill="#fde7c7"
        stroke="#b45309"
        stroke-width="1.5"
      />
      <line
        x1={sectionX}
        x2={sectionX}
        y1={top - 12}
        y2={top + lanes * LANE + 12}
        stroke="#0f172a"
        stroke-width="2"
        stroke-dasharray="5 4"
      />
      <text x={sectionX + 5} y={top - 12} font-size="12" font-weight="700" fill="#0f172a"
        >tiết diện S</text
      >
      {#each carriers as c, i (i)}
        <circle cx={sx.map(c.x)} cy={top + LANE / 2 + c.lane * LANE} r="5" fill="#2563eb" />
      {/each}
      <!-- electron drift below the wire -->
      <g stroke="#2563eb" stroke-width="2" fill="#2563eb">
        <line x1="70" y1={H - 22} x2={W - 70} y2={H - 22} />
        <path d="M {W - 62} {H - 22} l -12 -6 v 12 z" stroke="none" />
      </g>
      <text x={W / 2} y={H - 6} font-size="12" fill="#1d4ed8" text-anchor="middle"
        >chiều trôi của electron</text
      >
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Mỗi chấm xanh là một nhóm electron mang điện lượng 0,1 C. Số làn của dây thể hiện tiết diện S.
      Thực ra electron còn chuyển động nhiệt hỗn loạn rất nhanh; hình chỉ vẽ phần trôi có hướng của
      chúng (đã phóng to rất nhiều).
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Tiết diện S" bind:value={lanes} min={1} max={3} unit="làn" />
    <SliderField label="Mật độ hạt n" bind:value={density} min={1} max={4} unit="hạt/cm" />
    <SliderField
      label="Tốc độ trôi v"
      bind:value={speed}
      min={0.5}
      max={3}
      step={0.5}
      unit="cm/s"
    />
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      aria-pressed={running}
      onclick={() => (running = !running)}
    >
      {running ? 'Dừng' : 'Chạy'}
    </button>
    <button type="button" class={button.quiet} onclick={() => advance(STEP)}>Tiến 0,25 s</button>
    <button type="button" class={button.primary} onclick={startCount} disabled={counting !== null}>
      Đếm trong 2 s
    </button>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
    <div class="{card} p-2">
      <dt class="text-slate-500">Hạt đi qua S</dt>
      <dd class="font-semibold tabular-nums">
        {counting ? counting.passed : result ? result.passed : '–'}
      </dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">Thời gian đếm</dt>
      <dd class="font-semibold tabular-nums">
        {counting ? formatNumber(counting.elapsed, 2) : result ? '2' : '–'} s
      </dd>
    </div>
    <div class="{card} p-2">
      <dt class="text-slate-500">I theo mô hình</dt>
      <dd class="font-semibold tabular-nums">{formatNumber(theory, 3)} A</dd>
    </div>
  </dl>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
