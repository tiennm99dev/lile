<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rng } from '#lib/core/drill.js';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { HALF_SCREEN, electronLambda, fringe, histogram, intensity, landing } from './engine.js';

  let U = $state(100);
  let slits = $state('hai');
  let auto = $state(false);
  /** Landings: x on the screen (m) and a random height for drawing. */
  /** @type {Array<{ x: number, h: number }>} */
  let hits = $state.raw([]);
  const MAX_HITS = 4000;

  const rand = rng(1927);
  const lambda = $derived(electronLambda(U));
  const two = $derived(slits === 'hai');
  const i = $derived(fringe(lambda));

  $effect(() => {
    // A new voltage or slit setting is a new experiment.
    void [U, slits];
    hits = [];
  });

  /** @param {number} n */
  function fire(n) {
    const add = [];
    for (let k = 0; k < n; k += 1) add.push({ x: landing(rand, lambda, two), h: rand() });
    const next = hits.concat(add);
    hits = next.length > MAX_HITS ? next.slice(next.length - MAX_HITS) : next;
    if (hits.length >= MAX_HITS) auto = false;
  }

  let pending = 0;
  $effect(() => {
    if (!auto) return;
    return frameLoop((dt) => {
      pending += dt * Math.min(400, 8 + hits.length);
      const n = Math.floor(pending);
      pending -= n;
      if (n > 0) fire(n);
    });
  });

  const W = 340;
  const sx = linear(-HALF_SCREEN, HALF_SCREEN, 10, W - 10);
  const BINS = 68;
  const counts = $derived(
    histogram(
      hits.map((h) => h.x),
      BINS,
    ),
  );
  const top = $derived(Math.max(1, ...counts));
  const binW = (W - 20) / BINS;
  const theory = $derived(
    Array.from({ length: 241 }, (_, k) => {
      const x = -HALF_SCREEN + (2 * HALF_SCREEN * k) / 240;
      return { x: sx.map(x), y: 128 - 100 * intensity(x, lambda, two) };
    }),
  );

  const note = $derived.by(() => {
    const lam = `Bước sóng de Broglie của electron: $\\lambda = \\dfrac{h}{\\sqrt{2meU}} \\approx ${numTex(lambda * 1e9, 3)}$ nm.`;
    const n = hits.length;
    if (n === 0) {
      return { tone: /** @type {const} */ ('info'), text: `${lam} Bắn electron để bắt đầu.` };
    }
    if (n < 60) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${lam} Đã có $${n}$ electron tới màn. Mỗi electron chỉ tạo ra một chấm sáng tại một vị trí ngẫu nhiên, như một hạt; chưa nhìn ra quy luật nào.`,
      };
    }
    if (!two) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${lam} Chỉ mở một khe: $${n}$ chấm sáng tập trung thành một dải rộng ở giữa, không có các vân sáng tối xen kẽ cách đều. Mở cả hai khe để so sánh.`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${lam} Sau $${n}$ electron, các vân sáng tối xen kẽ hiện ra, khoảng vân $i = \\dfrac{\\lambda D}{a} \\approx ${numTex(i * 1e3, 3)}$ mm, đúng như giao thoa của sóng có bước sóng $\\lambda$. Từng electron đến màn như hạt, nhưng tập hợp nhiều electron cho thấy tính chất sóng.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Giao thoa electron qua hai khe</h3>
    <svg
      viewBox="0 0 {W} 210"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Màn quan sát với ${hits.length} chấm sáng do electron tạo ra, ${two ? 'mở hai khe' : 'mở một khe'}, hiệu điện thế tăng tốc ${U} V.`}
    >
      <rect x="10" y="4" width={W - 20} height="70" fill="#0f172a" rx="4" />
      {#each hits as h, k (k)}
        <rect x={sx.map(h.x) - 0.7} y={8 + 62 * h.h} width="1.4" height="1.4" fill="#a5f3fc" />
      {/each}
      {#each counts as c, k (k)}
        <rect
          x={10 + k * binW}
          y={128 - (100 * c) / top}
          width={binW - 0.5}
          height={(100 * c) / top}
          fill="#818cf8"
        />
      {/each}
      {#if hits.length >= 300}
        <polyline
          points={pointsAttr(theory)}
          fill="none"
          stroke="#e11d48"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
      {/if}
      <line x1="10" x2={W - 10} y1="128" y2="128" stroke="#334155" />
      <text x="10" y="144" font-size="10" fill="#475569">
        −{formatNumber(HALF_SCREEN * 1e3, 1)} mm
      </text>
      <text x={W / 2} y="144" font-size="10" fill="#475569" text-anchor="middle">0</text>
      <text x={W - 10} y="144" font-size="10" fill="#475569" text-anchor="end">
        {formatNumber(HALF_SCREEN * 1e3, 1)} mm
      </text>
      <text x="10" y="164" font-size="11" fill="#334155">
        Số electron tới màn: {hits.length}
      </text>
      {#if hits.length >= 300}
        <text x="10" y="182" font-size="11" fill="#e11d48">
          - - - phân bố cường độ của sóng có bước sóng λ
        </text>
      {/if}
      <text x="10" y="200" font-size="10" fill="#64748b">
        Mô hình: hai khe cách nhau a = 1 μm, màn cách khe D = 1 m.
      </text>
    </svg>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={() => fire(1)}>Bắn 1 electron</button>
      <button type="button" class={button.secondary} onclick={() => fire(100)}>Bắn 100</button>
      <button type="button" class={button.secondary} onclick={() => (auto = !auto)}>
        {auto ? 'Dừng' : 'Bắn liên tục'}
      </button>
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          auto = false;
          hits = [];
        }}>Xoá màn</button
      >
    </div>
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Hiệu điện thế tăng tốc U"
        bind:value={U}
        min={25}
        max={400}
        step={25}
        unit="V"
      />
      <SegmentedControl
        label="Khe"
        options={[
          { value: 'hai', label: 'Mở hai khe' },
          { value: 'mot', label: 'Che một khe' },
        ]}
        bind:value={slits}
      />
    </div>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
