<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { arrowHead } from '#lib/domain/arrow.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import ChargeDot from '../_shared/charge-dot.svelte';
  import { makeBoard } from '../_shared/board.js';
  import { BOTTOM, TOP, energyAt, presetPaths, walk, workAlong } from './engine.js';

  const board = makeBoard({ width: 360, height: 220, scale: 20, step: 0.1, margin: 0.3 });
  /** Field between the plates: U = 80 V over d = 8 cm. */
  const FIELD = 1000;
  const M = { x: -5, y: 2 };
  const N = { x: 5, y: -2 };
  const PATHS = presetPaths(M, N);
  const CHARGE_OPTIONS = [
    { value: 2, label: 'q = +2 µC' },
    { value: -2, label: 'q = −2 µC' },
  ];

  let q = $state(2);
  let pos = $state({ ...M });
  let trail = $state([{ ...M }]);
  let finished = $state(false);
  let playing = $state(false);
  /** @type {Array<{ name: string, length: number, work: number }>} */
  let attempts = $state([]);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const sofar = $derived(walk(q, FIELD, trail));
  const energy = $derived(energyAt(q, FIELD, pos.y));
  const expected = $derived(workAlong(q, FIELD, M, N));
  const trailPoints = $derived(
    trail.map((p) => `${board.px(p.x).toFixed(1)},${board.py(p.y).toFixed(1)}`).join(' '),
  );

  /** Stops a running preset path when the widget goes away. */
  let stopPlay = () => {};
  $effect(() => () => stopPlay());

  function reset() {
    pos = { ...M };
    trail = [{ ...M }];
    finished = false;
  }

  /** @param {string | number} v */
  function changeCharge(v) {
    q = Number(v);
    attempts = [];
    reset();
  }

  /** @param {string} name */
  function finish(name) {
    finished = true;
    const r = walk(q, FIELD, trail);
    attempts = [...attempts.slice(-4), { name, length: r.length, work: r.work }];
  }

  /** @param {{ x: number, y: number }} p cm */
  function moveTo(p) {
    if (finished || playing) return;
    const placed = board.place(p);
    const next = { x: placed.x, y: clamp(placed.y, BOTTOM + 0.3, TOP - 0.3) };
    const last = trail[trail.length - 1];
    if (Math.hypot(next.x - last.x, next.y - last.y) < 0.05) return;
    pos = next;
    trail = [...trail, next];
    if (Math.hypot(next.x - N.x, next.y - N.y) <= 0.4) {
      pos = { ...N };
      trail = [...trail, { ...N }];
      finish('Đường em kéo');
    }
  }

  /** @param {{ name: string, points: Array<{ x: number, y: number }> }} path */
  function play(path) {
    reset();
    if (reducedMotion()) {
      trail = path.points.map((p) => ({ ...p }));
      pos = { ...N };
      finish(path.name);
      return;
    }
    playing = true;
    let t = 0;
    stopPlay = frameLoop((dt) => {
      t += dt;
      const i = Math.min(path.points.length - 1, Math.floor(t * 18));
      trail = path.points.slice(0, i + 1).map((p) => ({ ...p }));
      pos = { ...path.points[i] };
      if (i === path.points.length - 1) {
        stopPlay();
        playing = false;
        finish(path.name);
      }
    });
  }

  const drag = $derived({
    point: { x: board.px(pos.x), y: board.py(pos.y) },
    svg: () => svg,
    viewBox: { w: board.width, h: board.height },
    pad: 0,
    /** @param {{ x: number, y: number }} pt */
    projector: (pt) => {
      moveTo(board.toCm(pt));
      return pt;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const s = big ? 1 : 0.5;
      moveTo({ x: pos.x + dx * s, y: pos.y - dy * s });
    },
  });

  /** @param {number} v */
  const paren = (v) => (v < 0 ? `(${numTex(v)})` : numTex(v));

  const note = $derived.by(() => {
    if (!finished) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Đang ở độ cao $d = ${numTex(pos.y - BOTTOM, 1)}$ cm so với bản âm: $W = qEd = ${numTex(energy, 1)}\\ \\mu\\text{J}$. Công lực điện từ $M$ tới đây: $A = ${numTex(sofar.work, 1)}\\ \\mu\\text{J}$ sau quãng đường ${formatNumber(sofar.length, 1)} cm.`,
      };
    }
    const many = attempts.length >= 2;
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Tới $N$: $A_{MN} = ${numTex(sofar.work, 1)}\\ \\mu\\text{J} = W_M - W_N = ${numTex(energyAt(q, FIELD, M.y))} - ${paren(energyAt(q, FIELD, N.y))}$ (µJ).${many ? ' Các đường đi dài ngắn khác nhau nhưng công đều bằng nhau: công của lực điện không phụ thuộc hình dạng đường đi.' : ' Bấm “Làm lại” và thử một đường khác.'}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {board.width} {board.height}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-xl bg-slate-50"
      role="group"
      aria-label={`Điện trường đều giữa hai bản phẳng, bản dương ở trên. Điện tích đang cách bản âm ${formatNumber(pos.y - BOTTOM, 1)} xentimét.`}
    >
      <rect x="0" y={board.py(TOP) - 6} width={board.width} height="6" fill="#ef4444" />
      <rect x="0" y={board.py(BOTTOM)} width={board.width} height="6" fill="#3b82f6" />
      <text x="6" y={board.py(TOP) + 14} font-size="12" font-weight="700" fill="#b91c1c">+</text>
      <text x="6" y={board.py(BOTTOM) - 4} font-size="12" font-weight="700" fill="#1d4ed8"
        >− (mốc thế năng)</text
      >
      {#each [-7, -3.5, 0, 3.5, 7] as x (x)}
        <line
          x1={board.px(x)}
          x2={board.px(x)}
          y1={board.py(TOP) + 2}
          y2={board.py(BOTTOM) - 8}
          stroke="#f59e0b"
          stroke-opacity="0.4"
        />
        <polygon
          points={arrowHead(board.px(x), board.py(TOP), board.px(x), board.py(BOTTOM) - 2, 7)}
          fill="#f59e0b"
          fill-opacity="0.6"
        />
      {/each}
      <line
        x1={board.px(M.x)}
        x2={board.px(M.x)}
        y1={board.py(M.y)}
        y2={board.py(N.y)}
        stroke="#64748b"
        stroke-dasharray="3 3"
      />
      <line
        x1={board.px(M.x)}
        x2={board.px(N.x)}
        y1={board.py(N.y)}
        y2={board.py(N.y)}
        stroke="#64748b"
        stroke-dasharray="3 3"
      />
      <text
        x={board.px(M.x) - 30}
        y={(board.py(M.y) + board.py(N.y)) / 2}
        font-size="11"
        fill="#475569">d = 4 cm</text
      >
      {#each [{ p: M, name: 'M' }, { p: N, name: 'N' }] as s (s.name)}
        <circle cx={board.px(s.p.x)} cy={board.py(s.p.y)} r="5" fill="none" stroke="#0f172a" />
        <text
          x={board.px(s.p.x) + 8}
          y={board.py(s.p.y) - 8}
          font-size="13"
          font-weight="700"
          fill="#0f172a">{s.name}</text
        >
      {/each}
      <polyline points={trailPoints} fill="none" stroke="#7c3aed" stroke-width="2" />
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Điện tích q: kéo từ M tới N, hoặc dùng phím mũi tên"
        aria-valuemin={BOTTOM}
        aria-valuemax={TOP}
        aria-valuenow={pos.y}
        aria-valuetext={`Cách bản âm ${formatNumber(pos.y - BOTTOM, 1)} xentimét; công lực điện từ M tới đây ${formatNumber(sofar.work, 1)} micrôjun`}
        use:draggable={drag}
      >
        <ChargeDot cx={board.px(pos.x)} cy={board.py(pos.y)} {q} r={10} />
      </g>
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Điện trường đều E = 1 000 V/m hướng từ bản dương xuống bản âm. Kéo điện tích từ M tới N theo
      đường bất kì (nét tím là đường đã đi).
    </p>
  </div>

  <SegmentedControl
    label="Điện tích"
    options={CHARGE_OPTIONS}
    bind:value={q}
    onchange={changeCharge}
  />
  <div class="flex flex-wrap gap-2">
    {#each PATHS as path (path.id)}
      <button type="button" class={button.secondary} disabled={playing} onclick={() => play(path)}>
        {path.name}
      </button>
    {/each}
    <button type="button" class={button.quiet} disabled={playing} onclick={reset}>Làm lại</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if attempts.length > 0}
    <div class="{card} overflow-x-auto p-3">
      <table class="w-full text-sm tabular-nums">
        <caption class="pb-2 text-left font-semibold text-slate-700">
          Các lần dịch chuyển từ M tới N (công dự đoán qEd = {formatNumber(expected)} µJ)
        </caption>
        <thead>
          <tr class="text-left text-slate-600">
            <th class="py-1 pr-3">Đường đi</th>
            <th class="py-1 pr-3">Quãng đường</th>
            <th class="py-1">Công A</th>
          </tr>
        </thead>
        <tbody>
          {#each attempts as a, i (i)}
            <tr class="border-t border-slate-100">
              <td class="py-1 pr-3">{a.name}</td>
              <td class="py-1 pr-3">{formatNumber(a.length, 1)} cm</td>
              <td class="py-1">{formatNumber(a.work, 1)} µJ</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
