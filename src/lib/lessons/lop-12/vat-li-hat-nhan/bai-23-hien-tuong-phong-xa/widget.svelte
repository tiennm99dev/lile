<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { rng } from '#lib/core/drill.js';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { countLeft, lawCurve, remaining, step } from './engine.js';

  /** Simulated seconds per step. */
  const DT = 0.1;
  /** The run stops after this many half-lives. */
  const SPAN = 5;

  let n0 = $state(400);
  let T = $state(2);
  let t = $state(0);
  let seed = 1;
  let rand = rng(seed);
  /** @type {Array<number | null>} */
  let decayed = $state(Array(400).fill(null));
  let history = $state([{ x: 0, y: 400 }]);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;
  let carry = 0;

  const left = $derived(countLeft(decayed));
  const tMax = $derived(SPAN * T);
  const cols = $derived(n0 === 400 ? 20 : 10);
  const cell = $derived(n0 === 400 ? 13 : 26);
  const law = $derived(lawCurve(n0, T, tMax));
  const halves = $derived(t / T);

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }
  onDestroy(halt);

  function advance() {
    const next = Math.round((t + DT) * 10) / 10;
    decayed = step(decayed, next, DT, T, rand);
    t = next;
    history = [...history, { x: t, y: countLeft(decayed) }];
  }

  function reset() {
    halt();
    seed = (seed * 7919 + 13) % 100003;
    rand = rng(seed);
    decayed = Array(n0).fill(null);
    t = 0;
    carry = 0;
    history = [{ x: 0, y: n0 }];
  }

  function toggle() {
    if (playing) {
      halt();
      return;
    }
    if (t >= tMax - 1e-9) reset();
    playing = true;
    stop = frameLoop((dt) => {
      carry += dt;
      while (carry >= DT && t < tMax - 1e-9) {
        carry -= DT;
        advance();
      }
      if (t >= tMax - 1e-9) halt();
    });
  }

  function oneHalfLife() {
    halt();
    const target = Math.min(tMax, (Math.floor(t / T + 1e-9) + 1) * T);
    while (t < target - 1e-9) advance();
  }

  /** @param {number} v */
  function setN0(v) {
    n0 = v;
    reset();
  }
  /** @param {number} v */
  function setT(v) {
    T = v;
    reset();
  }

  const note = $derived.by(() => {
    const expected = remaining(n0, t, T);
    const head = `t = ${formatFixed(t, 1)} s (${formatNumber(halves, 2)} chu kì bán rã): còn ${left}/${n0} hạt nhân chưa phân rã; định luật phóng xạ cho $N = N_0 \\cdot 2^{-\\frac{t}{T}} \\approx ${numTex(expected, 1)}$.`;
    if (t === 0)
      return `Mẫu có ${n0} hạt nhân phóng xạ, chu kì bán rã T = ${T} s. Bấm "Cho phân rã" và theo dõi: hạt nhân nào phân rã trước là hoàn toàn ngẫu nhiên.`;
    const whole = Math.abs(halves - Math.round(halves)) < 1e-6 && Math.round(halves) > 0;
    if (whole)
      return `${head} Sau ${Math.round(halves)} chu kì, số hạt còn lại xấp xỉ $\\dfrac{N_0}{${2 ** Math.round(halves)}}$: cứ sau mỗi chu kì bán rã, một nửa số hạt nhân còn lại bị phân rã.`;
    return `${head} Không đoán được hạt nhân nào sẽ phân rã tiếp theo, nhưng số hạt còn lại của cả mẫu bám sát đường cong lí thuyết${n0 === 100 ? '; với mẫu nhỏ, độ lệch ngẫu nhiên thấy rõ hơn' : ''}.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Số hạt nhân ban đầu N₀"
      value={n0}
      options={[
        { value: 100, label: '100' },
        { value: 400, label: '400' },
      ]}
      onchange={(v) => setN0(Number(v))}
    />
    <SegmentedControl
      label="Chu kì bán rã T"
      value={T}
      options={[
        { value: 2, label: '2 s' },
        { value: 4, label: '4 s' },
      ]}
      onchange={(v) => setT(Number(v))}
    />
  </div>

  <div class="grid gap-3 md:grid-cols-2">
    <figure class="{card} p-2">
      <svg
        viewBox="0 0 {cols * cell} {cols * cell}"
        class="mx-auto block w-full max-w-64"
        role="img"
        aria-label="Mẫu chất phóng xạ: {left} trong {n0} hạt nhân chưa phân rã"
      >
        {#each decayed as d, i (i)}
          <circle
            cx={(i % cols) * cell + cell / 2}
            cy={Math.floor(i / cols) * cell + cell / 2}
            r={cell * 0.38}
            fill={d === null ? '#dc2626' : '#cbd5e1'}
          />
        {/each}
      </svg>
      <figcaption class="px-2 pt-1 text-center text-xs text-slate-500">
        Đỏ: hạt nhân mẹ chưa phân rã. Xám: đã phân rã thành hạt nhân con.
      </figcaption>
    </figure>
    <div class="{card} p-2">
      <XyPlot
        lines={[
          { points: law, color: '#94a3b8' },
          { points: history, color: '#dc2626' },
        ]}
        guides={[
          { y: n0 / 2, label: 'N₀/2' },
          { y: n0 / 4, label: 'N₀/4' },
        ]}
        xMax={tMax}
        yMax={n0}
        xTicks={[0, 1, 2, 3, 4, 5].map((k) => k * T)}
        yTicks={[0, n0 / 4, n0 / 2, (3 * n0) / 4, n0]}
        xLabel="t (s)"
        yLabel="N"
        label="Số hạt nhân còn lại theo thời gian: đường đỏ là mẫu ảo, đường xám là định luật phóng xạ"
      />
      <p class="px-2 pt-1 text-xs text-slate-500">
        Đỏ: số hạt còn lại của mẫu ảo. Xám: định luật N = N₀·2<sup>−t/T</sup>.
      </p>
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} aria-pressed={playing} onclick={toggle}>
      {playing ? 'Dừng' : t >= tMax - 1e-9 ? 'Làm lại' : 'Cho phân rã'}
    </button>
    <button type="button" class={button.secondary} disabled={t >= tMax - 1e-9} onclick={oneHalfLife}
      >Đi tiếp đến chu kì sau</button
    >
    <button type="button" class={button.quiet} onclick={reset}>Mẫu mới</button>
  </div>

  <FeedbackNote tone="info" text={note} />
</div>
