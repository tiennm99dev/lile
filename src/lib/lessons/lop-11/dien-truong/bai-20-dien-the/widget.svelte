<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ChargeDot from '../_shared/charge-dot.svelte';
  import { makeBoard } from '../_shared/board.js';
  import { sciTex } from '../_shared/charges.js';
  import { colorOf, contour, field, potential, sampleGrid } from './engine.js';

  const board = makeBoard({ width: 360, height: 240, scale: 20 });
  const BOUNDS = {
    xMin: -board.halfX,
    xMax: board.halfX,
    yMin: -board.halfY,
    yMax: board.halfY,
  };
  const COLS = 120;
  const ROWS = 80;
  /** Potential drawn at about three quarters of full colour, V. */
  const SCALE = 250;
  const MAX_LINES = 6;
  const LINE_COLORS = ['#0f172a', '#7c3aed', '#047857', '#b45309', '#be123c', '#0369a1'];
  /** @type {Record<string, Array<{ x: number, y: number, q: number }>>} */
  const PRESETS = {
    duong: [{ x: 0, y: 0, q: 1 }],
    am: [{ x: 0, y: 0, q: -1 }],
    'trai-dau': [
      { x: -3, y: 0, q: 1 },
      { x: 3, y: 0, q: -1 },
    ],
    'cung-dau': [
      { x: -3, y: 0, q: 1 },
      { x: 3, y: 0, q: 1 },
    ],
  };
  const PRESET_OPTIONS = [
    { value: 'duong', label: 'Một điện tích +' },
    { value: 'am', label: 'Một điện tích −' },
    { value: 'trai-dau', label: 'Hai điện tích trái dấu' },
    { value: 'cung-dau', label: 'Hai điện tích cùng dấu' },
  ];

  let preset = $state('trai-dau');
  let charges = $state(PRESETS['trai-dau'].map((c) => ({ ...c })));
  let m = $state({ x: -3, y: 3 });
  let n = $state({ x: 3, y: 3 });
  /** @type {number[]} */
  let levels = $state([]);
  /** @type {HTMLCanvasElement | null} */
  let canvas = $state(null);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const vm = $derived(potential(charges, m));
  const vn = $derived(potential(charges, n));
  const umn = $derived(vm - vn);
  const grid = $derived(sampleGrid(charges, BOUNDS, 90, 60));
  const lines = $derived(levels.map((level) => contour(grid, level)));
  const eAtM = $derived(field(charges, m));
  const eSize = $derived(Math.hypot(eAtM.x, eAtM.y));
  const onCharge = $derived(
    charges.some(
      (c) => Math.hypot(c.x - m.x, c.y - m.y) < 0.6 || Math.hypot(c.x - n.x, c.y - n.y) < 0.6,
    ),
  );

  $effect(() => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const img = ctx.createImageData(COLS, ROWS);
    for (let r = 0; r < ROWS; r++) {
      const y = BOUNDS.yMax - ((r + 0.5) / ROWS) * (BOUNDS.yMax - BOUNDS.yMin);
      for (let c = 0; c < COLS; c++) {
        const x = BOUNDS.xMin + ((c + 0.5) / COLS) * (BOUNDS.xMax - BOUNDS.xMin);
        const [red, green, blue] = colorOf(potential(charges, { x, y }), SCALE);
        const i = 4 * (r * COLS + c);
        img.data[i] = red;
        img.data[i + 1] = green;
        img.data[i + 2] = blue;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  });

  /** The two points whose potentials are read, M and N. */
  const PROBES = [
    {
      name: 'M',
      get: () => m,
      /** @param {{ x: number, y: number }} p */
      set: (p) => (m = p),
    },
    {
      name: 'N',
      get: () => n,
      /** @param {{ x: number, y: number }} p */
      set: (p) => (n = p),
    },
  ];

  /** @param {string | number} v */
  function choose(v) {
    charges = PRESETS[String(v)].map((c) => ({ ...c }));
    levels = [];
  }

  function addLine() {
    if (onCharge) return;
    levels = [...levels.slice(-(MAX_LINES - 1)), vm];
  }

  /**
   * @param {() => { x: number, y: number }} where
   * @param {(p: { x: number, y: number }) => void} move
   */
  const dragOf = (where, move) => ({
    point: { x: board.px(where().x), y: board.py(where().y) },
    svg: () => svg,
    viewBox: { w: board.width, h: board.height },
    pad: 0,
    /** @param {{ x: number, y: number }} pt */
    projector: (pt) => {
      move(board.place(board.toCm(pt)));
      return pt;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const s = big ? 2 : 0.5;
      move(board.place({ x: where().x + dx * s, y: where().y - dy * s }));
    },
  });

  /** @param {number} i @param {{ x: number, y: number }} p */
  function moveCharge(i, p) {
    if (charges.some((c, j) => j !== i && Math.hypot(c.x - p.x, c.y - p.y) < 1)) return;
    charges = charges.map((c, j) => (j === i ? { ...c, ...p } : c));
    levels = [];
  }

  /** @param {Array<[{ x: number, y: number }, { x: number, y: number }]>} segs */
  const pathOf = (segs) =>
    segs
      .map(
        ([a, b]) =>
          `M${board.px(a.x).toFixed(1)} ${board.py(a.y).toFixed(1)}L${board.px(b.x).toFixed(1)} ${board.py(b.y).toFixed(1)}`,
      )
      .join('');

  /** @param {number} v */
  const vTex = (v) => numTex(v, Math.abs(v) < 10 ? 1 : 0);
  /** @param {number} v */
  const paren = (v) => (v < 0 ? `(${vTex(v)})` : vTex(v));

  const note = $derived.by(() => {
    if (onCharge) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Điểm $M$ hoặc $N$ nằm quá gần một điện tích; kéo ra xa hơn một chút.',
      };
    }
    const work = 1e-9 * umn;
    return {
      tone: /** @type {const} */ ('info'),
      text: `$V_M \\approx ${vTex(vm)}$ V, $V_N \\approx ${vTex(vn)}$ V, $U_{MN} = V_M - V_N \\approx ${vTex(vm)} - ${paren(vn)} = ${vTex(umn)}$ V. Đưa điện tích $q = 1$ nC từ $M$ tới $N$, lực điện sinh công $A_{MN} = qU_{MN} \\approx ${sciTex(work)}$ J.${Math.abs(umn) < 2 ? ' $M$ và $N$ gần như cùng điện thế: chúng nằm trên cùng một mặt đẳng thế, lực điện không sinh công.' : ''}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <div
      class="relative mx-auto w-full max-w-xl"
      style:aspect-ratio="{board.width} / {board.height}"
    >
      <canvas
        bind:this={canvas}
        width={COLS}
        height={ROWS}
        class="absolute inset-0 size-full rounded-xl"
        aria-hidden="true"
      ></canvas>
      <svg
        bind:this={svg}
        viewBox="0 0 {board.width} {board.height}"
        class="absolute inset-0 size-full touch-none select-none"
        role="group"
        aria-label={`Bản đồ điện thế: đỏ là điện thế dương, xanh là điện thế âm. Điện thế tại M khoảng ${formatNumber(vm, 0)} vôn, tại N khoảng ${formatNumber(vn, 0)} vôn.`}
      >
        {#each lines as segs, i (i)}
          <path
            d={pathOf(segs)}
            fill="none"
            stroke={LINE_COLORS[i % LINE_COLORS.length]}
            stroke-width="1.6"
            stroke-linecap="round"
          />
        {/each}
        {#if !onCharge && eSize > 0}
          <ForceArrow
            x1={board.px(m.x)}
            y1={board.py(m.y)}
            x2={board.px(m.x) + (eAtM.x / eSize) * 36}
            y2={board.py(m.y) - (eAtM.y / eSize) * 36}
            color="#d97706"
            label="E"
          />
        {/if}
        {#each charges as c, i (i)}
          <g
            class="drag-handle cursor-move outline-none"
            role="slider"
            tabindex="0"
            aria-label={`Điện tích ${c.q > 0 ? 'dương' : 'âm'} thứ ${i + 1}: kéo hoặc dùng phím mũi tên`}
            aria-valuemin={-board.halfX}
            aria-valuemax={board.halfX}
            aria-valuenow={c.x}
            aria-valuetext={`Toạ độ ${formatNumber(c.x)} và ${formatNumber(c.y)} xentimét`}
            use:draggable={dragOf(
              () => charges[i],
              (p) => moveCharge(i, p),
            )}
          >
            <ChargeDot cx={board.px(c.x)} cy={board.py(c.y)} q={c.q} r={11} />
          </g>
        {/each}
        {#each PROBES as probe (probe.name)}
          {@const p = probe.get()}
          <g
            class="drag-handle cursor-move outline-none"
            role="slider"
            tabindex="0"
            aria-label={`Điểm ${probe.name}: kéo hoặc dùng phím mũi tên`}
            aria-valuemin={-board.halfX}
            aria-valuemax={board.halfX}
            aria-valuenow={p.x}
            aria-valuetext={`Điện thế tại ${probe.name} khoảng ${formatNumber(probe.name === 'M' ? vm : vn, 0)} vôn`}
            use:draggable={dragOf(probe.get, probe.set)}
          >
            <circle
              class="drag-knob"
              cx={board.px(p.x)}
              cy={board.py(p.y)}
              r="6"
              fill="#facc15"
              stroke="#0f172a"
              stroke-width="1.5"
            />
            <text
              x={board.px(p.x) + 9}
              y={board.py(p.y) + 16}
              font-size="12"
              font-weight="700"
              fill="#0f172a"
              stroke="#fff"
              stroke-width="3"
              paint-order="stroke"
              pointer-events="none">{probe.name}</text
            >
          </g>
        {/each}
      </svg>
    </div>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Màu đỏ càng đậm điện thế càng cao (dương), màu xanh càng đậm điện thế càng thấp (âm); màu
      trắng là điện thế gần 0. Mỗi điện tích có độ lớn 1 nC. Mũi tên E tại M luôn vuông góc với
      đường đẳng thế và hướng về phía điện thế giảm.
    </p>
  </div>

  <SegmentedControl
    label="Cấu hình điện tích"
    options={PRESET_OPTIONS}
    bind:value={preset}
    onchange={choose}
  />
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={addLine} disabled={onCharge}>
      Vẽ đường đẳng thế qua M
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => (levels = [])}
      disabled={levels.length === 0}>Xoá các đường</button
    >
  </div>
  {#if levels.length > 0}
    <p class="text-sm text-slate-600 tabular-nums">
      Đã vẽ các đường đẳng thế: {levels.map((v) => `${formatNumber(v, 0)} V`).join('; ')}.
    </p>
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
