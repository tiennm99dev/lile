<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import OscGraph from '#lib/domain/osc-graph.svelte';
  import CoilTopView from '../_shared/coil-top-view.svelte';
  import { wrapDeg } from '../_shared/loop.js';
  import { AREA, emfAt, outputOf } from './engine.js';

  /** The model turns this many times slower than the real machine. */
  const SLOW = 5;
  const WINDOW = 1;

  let n = $state(2);
  let turns = $state(100);
  let field = $state(0.2);
  let t = $state(0);
  let running = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const out = $derived(outputOf(turns, field, n));
  /** The oscilloscope's vertical range, switched like its volts/div knob. */
  const scale = $derived([10, 20, 40, 80].find((v) => v >= out.E0 * 1.1) ?? 80);
  const alpha = $derived(wrapDeg(360 * n * t));
  const e = $derived(emfAt(turns, field, n, t));
  const curve = $derived((/** @type {number} */ s) => emfAt(turns, field, n, s));

  function halt() {
    stop?.();
    stop = null;
    running = false;
  }
  onDestroy(halt);

  function toggle() {
    if (running) {
      halt();
      return;
    }
    running = true;
    const slow = reducedMotion() ? SLOW * 4 : SLOW;
    stop = frameLoop((dt) => {
      t = (t + dt / slow) % WINDOW;
    });
  }

  const note = $derived.by(() => {
    const head = `n = ${formatNumber(n)} vòng/s: ω = 2πn ≈ ${formatNumber(out.omega, 1)} rad/s, T = ${formatNumber(out.T, 3)} s, f = ${formatNumber(out.f)} Hz. E₀ = NBSω = ${formatNumber(turns)} · ${formatNumber(field)} · ${formatNumber(AREA)} · ${formatNumber(out.omega, 1)} ≈ ${formatNumber(out.E0, 1)} V; giá trị hiệu dụng E = E₀/√2 ≈ ${formatNumber(out.E, 1)} V.`;
    if (running) return `${head} Máy đang quay (hình vẽ chậm ${SLOW} lần so với thực tế).`;
    return `${head} Tại t = ${formatFixed(t, 3)} s, e ≈ ${formatNumber(e, 1)} V. Quay nhanh gấp đôi thì cả tần số và biên độ suất điện động đều tăng gấp đôi.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <CoilTopView
        {alpha}
        poles
        showNormal={false}
        label="Khung dây của máy phát quay giữa hai cực nam châm, nhìn dọc theo trục quay."
      />
      <p class="px-2 pt-1 text-center text-xs text-slate-500">
        Phần cảm: nam châm (stato). Phần ứng: khung dây quay (roto), S = {formatNumber(
          AREA * 10000,
        )}
        cm².
      </p>
    </div>
    <div class="{card} p-2">
      <p class="px-2 text-sm font-semibold text-slate-700">
        Dao động kí: e theo thời gian (thang đo ±{scale} V)
      </p>
      <OscGraph
        curves={[{ f: curve, color: '#16a34a' }]}
        tMax={WINDOW}
        yMax={scale}
        tStep={0.25}
        yStep={scale / 4}
        yLabel="e (V)"
        cursor={t}
        onpick={(s) => {
          halt();
          t = s;
        }}
        keyStep={0.01}
        label="Đồ thị suất điện động của máy phát trong 1 giây; bấm hoặc dùng phím mũi tên để chọn thời điểm"
        valueText="t = {formatFixed(t, 2)} giây, e = {formatNumber(e, 1)} vôn"
      />
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Tốc độ quay n" bind:value={n} min={1} max={5} step={0.5} unit="vòng/s" />
    <SliderField label="Số vòng dây N" bind:value={turns} min={50} max={200} step={50} />
    <SliderField label="Cảm ứng từ B" bind:value={field} min={0.1} max={0.5} step={0.1} unit="T" />
  </div>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} aria-pressed={running} onclick={toggle}>
      {running ? 'Dừng máy' : 'Cho máy quay'}
    </button>
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
