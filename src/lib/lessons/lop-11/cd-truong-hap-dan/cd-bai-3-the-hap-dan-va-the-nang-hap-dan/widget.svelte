<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    EARTH_KM,
    V1,
    V2,
    apogee,
    energyPerKg,
    motionPath,
    outcomeOf,
    pathOf,
  } from './engine.js';

  const W = 360;
  const H = 300;
  const CX = W / 2;
  const CY = H / 2;
  /** Pixels per Earth radius. */
  const RPX = 46;
  /** Seconds the launch takes to draw. */
  const DURATION = 2.5;

  let speed = $state(7);
  let angle = $state(30);
  let shown = $state(1);
  /** @type {(() => void) | null} */
  let stop = null;

  const path = $derived(pathOf(speed, angle));
  const outcome = $derived(outcomeOf(speed, angle));
  const energy = $derived(energyPerKg(speed));
  const drawn = $derived(motionPath(path.points, shown, { cx: CX, cy: CY, scale: RPX }));

  function launch() {
    stop?.();
    if (reducedMotion()) {
      shown = 1;
      return;
    }
    shown = 0;
    stop = frameLoop((dt) => {
      shown = Math.min(1, shown + dt / DURATION);
      if (shown >= 1) {
        stop?.();
        stop = null;
      }
    });
  }

  $effect(() => () => stop?.());

  /** @param {number} v */
  function setSpeed(v) {
    speed = v;
    angle = 0;
    launch();
  }

  const km = (/** @type {number} */ v) => numTex(Math.round(v / 10) * 10, 0);
  const note = $derived.by(() => {
    const v = `$v = ${numTex(speed, 2)}$ km/s`;
    if (outcome === 'roi-ngay') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Phóng ngang sát mặt đất với ${v} $< v_{\\text{I}} \\approx ${numTex(V1, 2)}$ km/s: lực hấp dẫn kéo vật xuống nhanh hơn mặt đất cong đi, vật rơi ngay xuống đất.`,
      };
    }
    if (outcome === 'roi') {
      const top = (apogee(speed, angle) - 1) * EARTH_KM;
      const far = (path.landedAfter ?? 0) * EARTH_KM;
      return {
        tone: /** @type {const} */ ('info'),
        text: `Với ${v}, vật lên cao nhất khoảng $${km(top)}$ km rồi rơi lại, cách điểm phóng khoảng $${km(far)}$ km theo mặt đất. Phóng xiên từ mặt đất thì quỹ đạo elip luôn cắt mặt đất; muốn bay quanh, vật phải được phóng ngang.`,
      };
    }
    if (outcome === 'tron') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${v} $= v_{\\text{I}}$, phóng ngang: vệ tinh bay theo quỹ đạo tròn sát mặt đất. Lực hấp dẫn đóng vai trò lực hướng tâm: $\\dfrac{GMm}{R^2} = \\dfrac{mv^2}{R}$.`,
      };
    }
    if (outcome === 'elip') {
      const top = (apogee(speed, angle) - 1) * EARTH_KM;
      return {
        tone: /** @type {const} */ ('ok'),
        text: `$v_{\\text{I}} < v < v_{\\text{II}}$: vệ tinh bay theo quỹ đạo elip quanh Trái Đất, điểm xa nhất cao khoảng $${km(top)}$ km so với mặt đất.`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${v} $\\ge v_{\\text{II}} \\approx ${numTex(V2, 2)}$ km/s: cơ năng không âm nên vật thoát khỏi trường hấp dẫn của Trái Đất, không bao giờ quay lại.`,
    };
  });
  const energyText = $derived(
    `Cơ năng của mỗi kilôgam lúc phóng: $\\dfrac{v^2}{2} + \\varphi = ${numTex(energy, 1)}$ MJ/kg, với thế hấp dẫn ở mặt đất $\\varphi = -\\dfrac{GM}{R} \\approx ${numTex(-V1 * V1, 1)}$ MJ/kg. ${energy < 0 ? 'Cơ năng âm: vật bị trường hấp dẫn giữ lại.' : 'Cơ năng không âm: vật thoát ra xa vô cùng.'}`,
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-900"
      role="img"
      aria-label={`Quỹ đạo của vật phóng từ mặt đất với tốc độ ${formatNumber(speed, 2)} kilômét trên giây, góc ${angle} độ.`}
    >
      {#each [[40, 30], [300, 60], [70, 250], [320, 240], [200, 20], [20, 160]] as [x, y] (x)}
        <circle cx={x} cy={y} r="1.2" fill="#cbd5e1" />
      {/each}
      <circle cx={CX} cy={CY} r={RPX} fill="#1d4ed8" />
      <path
        d="M {CX - 20} {CY - 30} q 12 -10 22 -4 q 10 8 -4 18 q -14 6 -18 -14 Z"
        fill="#16a34a"
        opacity="0.8"
      />
      <path d="M {CX + 8} {CY + 10} q 16 -4 18 10 q -6 14 -18 6 Z" fill="#16a34a" opacity="0.8" />
      <polyline
        points={drawn.points}
        fill="none"
        stroke="#fbbf24"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <rect x={CX - 3} y={CY - RPX - 10} width="6" height="10" fill="#e2e8f0" />
      {#if drawn.tip}
        <circle cx={drawn.tip.x} cy={drawn.tip.y} r="5" fill="#f97316" stroke="#fff" />
      {/if}
      <text x="8" y={H - 10} font-size="11" fill="#cbd5e1"
        >Bỏ qua không khí và sự tự quay của Trái Đất</text
      >
    </svg>
  </div>
  <SliderField
    label="Tốc độ phóng"
    bind:value={speed}
    min={1}
    max={14}
    step={0.1}
    unit="km/s"
    format={(v) => formatNumber(v, 2)}
    oninput={() => (shown = 1)}
  />
  <SliderField
    label="Góc phóng so với phương ngang"
    bind:value={angle}
    min={0}
    max={60}
    step={5}
    unit="°"
    oninput={() => (shown = 1)}
  />
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={launch}>Phóng</button>
    <button type="button" class={button.quiet} onclick={() => setSpeed(V1)}
      >Phóng ngang với tốc độ vũ trụ cấp I</button
    >
    <button type="button" class={button.quiet} onclick={() => setSpeed(V2)}
      >Phóng ngang với tốc độ vũ trụ cấp II</button
    >
  </div>
  <div aria-live="polite" class="space-y-2">
    <FeedbackNote tone={note.tone} text={note.text} />
    <FeedbackNote tone="info" text={energyText} />
  </div>
</div>
