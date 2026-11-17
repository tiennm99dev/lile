<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import OscGraph from '#lib/domain/osc-graph.svelte';
  import CoilTopView from '../_shared/coil-top-view.svelte';
  import { COIL, PERIOD, angleAt, readingAt } from './engine.js';

  let t = $state(0);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const alpha = $derived(angleAt(t));
  const now = $derived(readingAt(t));
  const fluxF = (/** @type {number} */ s) => readingAt(s).flux;
  const emfF = (/** @type {number} */ s) => readingAt(s).emf;

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }
  onDestroy(halt);

  function toggle() {
    if (playing) {
      halt();
      return;
    }
    playing = true;
    const rate = reducedMotion() ? 0.25 : 0.5;
    stop = frameLoop((dt) => {
      t = (t + dt * rate) % PERIOD;
    });
  }

  /** @param {number} s */
  function pick(s) {
    halt();
    t = s;
  }

  const signWord = $derived(Math.abs(now.flux) < 1e-9 ? 'bằng 0' : now.flux > 0 ? 'dương' : 'âm');

  const note = $derived.by(() => {
    if (playing)
      return 'Khung dây đang quay đều: từ thông và suất điện động cảm ứng cùng biến thiên tuần hoàn. Bấm "Dừng" để đọc số liệu tại một thời điểm.';
    const head = `t = ${formatFixed(t, 2)} s, α = ${formatNumber(alpha, 0)}°: Φ = BS cos α = ${formatFixed(now.flux, 2)} mWb (${signWord}), e = ${formatFixed(now.emf, 2)} mV.`;
    const c = Math.abs(Math.cos((alpha * Math.PI) / 180));
    if (c > 0.97)
      return `${head} Mặt khung vuông góc với đường sức: số đường sức xuyên qua khung nhiều nhất, |Φ| cực đại, nhưng lúc này Φ gần như không đổi nên suất điện động cảm ứng gần bằng 0.`;
    if (c < 0.05)
      return `${head} Mặt khung song song với đường sức: không đường sức nào xuyên qua, Φ = 0, nhưng Φ đang biến thiên nhanh nhất nên |e| cực đại.`;
    return `${head} Φ ${now.emf > 0 ? 'đang giảm' : 'đang tăng'} nên e = −ΔΦ/Δt ${now.emf > 0 ? 'dương' : 'âm'}: suất điện động cảm ứng chỉ xuất hiện khi từ thông biến thiên.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <CoilTopView
        {alpha}
        label="Khung dây nhìn dọc theo trục quay, pháp tuyến hợp với cảm ứng từ góc {formatNumber(
          alpha,
          0,
        )} độ."
      />
      <p class="px-2 pt-1 text-center text-xs text-slate-500">
        Khung dây ({formatNumber(COIL.S * 10000)} cm², B = {formatNumber(COIL.B)} T) nhìn dọc theo trục
        quay; đường sức đậm là đường xuyên qua khung.
      </p>
    </div>
    <div class="{card} space-y-1 p-2">
      <OscGraph
        curves={[{ f: fluxF, color: '#7c3aed' }]}
        tMax={PERIOD}
        yMax={2.5}
        tStep={0.5}
        yStep={1}
        yLabel="Φ (mWb)"
        height={130}
        cursor={t}
        onpick={pick}
        keyStep={0.05}
        label="Đồ thị từ thông theo thời gian; bấm hoặc dùng phím mũi tên để chọn thời điểm"
        valueText="t = {formatFixed(t, 2)} giây, từ thông {formatFixed(now.flux, 2)} miliwebe"
      />
      <OscGraph
        curves={[{ f: emfF, color: '#dc2626' }]}
        tMax={PERIOD}
        yMax={8}
        tStep={0.5}
        yStep={2}
        yLabel="e (mV)"
        height={130}
        cursor={t}
        onpick={pick}
        keyStep={0.05}
        label="Đồ thị suất điện động cảm ứng theo thời gian; bấm hoặc dùng phím mũi tên để chọn thời điểm"
        valueText="t = {formatFixed(t, 2)} giây, suất điện động {formatFixed(now.emf, 2)} milivôn"
      />
    </div>
  </div>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} aria-pressed={playing} onclick={toggle}>
      {playing ? 'Dừng' : 'Cho khung quay đều'}
    </button>
    <button type="button" class={button.quiet} onclick={() => pick(0)}>Về t = 0</button>
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
