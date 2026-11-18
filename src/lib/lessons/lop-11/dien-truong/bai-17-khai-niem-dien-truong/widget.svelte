<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { arrowHead } from '#lib/domain/arrow.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, sciTex, sciText } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ChargeDot from '../_shared/charge-dot.svelte';
  import { makeBoard } from '../_shared/board.js';
  import { arrowPx } from '../_shared/charges.js';
  import { fieldLines, forceOnTest, midArrow, probeField } from './engine.js';

  const board = makeBoard({ width: 360, height: 240, scale: 20 });
  const BOUNDS = {
    xMin: -board.halfX,
    xMax: board.halfX,
    yMin: -board.halfY,
    yMax: board.halfY,
  };
  const MAX_CHARGES = 4;
  /** Field strength drawn at about 40% of the longest arrow, V/m. */
  const E_REF = 3000;
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
  const TEST_OPTIONS = [
    { value: 1, label: 'q > 0' },
    { value: -1, label: 'q < 0' },
  ];

  let preset = $state('trai-dau');
  let charges = $state(PRESETS['trai-dau'].map((c) => ({ ...c })));
  let probe = $state({ x: 0, y: 3 });
  let testSign = $state(1);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const lines = $derived(fieldLines(charges, BOUNDS));
  const field = $derived(probeField(charges, probe));
  const tooClose = $derived(charges.some((c) => Math.hypot(c.x - probe.x, c.y - probe.y) < 0.75));
  const eLen = $derived(tooClose ? 0 : arrowPx(field.size, E_REF, 70));
  const eUnit = $derived(
    field.size > 0
      ? { x: field.total.x / field.size, y: field.total.y / field.size }
      : { x: 0, y: 0 },
  );
  const force = $derived(forceOnTest(testSign, field.total));
  const fUnit = $derived({ x: eUnit.x * testSign, y: eUnit.y * testSign });

  /** @param {string | number} v */
  function choose(v) {
    charges = PRESETS[String(v)].map((c) => ({ ...c }));
  }

  /** @param {number} sign */
  function add(sign) {
    if (charges.length >= MAX_CHARGES) return;
    const spots = [
      { x: 0, y: -3 },
      { x: -6, y: 3 },
      { x: 6, y: 3 },
      { x: 0, y: 4 },
      { x: -6, y: -3 },
      { x: 6, y: -3 },
    ];
    const free = spots.find(
      (s) =>
        charges.every((c) => Math.hypot(c.x - s.x, c.y - s.y) >= 1.5) &&
        Math.hypot(probe.x - s.x, probe.y - s.y) >= 1.5,
    );
    if (!free) return;
    charges = [...charges, { ...free, q: sign }];
  }

  /** @param {number} i @param {{ x: number, y: number }} p cm */
  function moveCharge(i, p) {
    const next = board.place(p);
    if (charges.some((c, j) => j !== i && Math.hypot(c.x - next.x, c.y - next.y) < 1)) return;
    charges = charges.map((c, j) => (j === i ? { ...c, ...next } : c));
  }

  /** @param {{ x: number, y: number }} p cm */
  function moveProbe(p) {
    probe = board.place(p);
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
      move(board.toCm(pt));
      return pt;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const s = big ? 2 : 0.5;
      move({ x: where().x + dx * s, y: where().y - dy * s });
    },
  });

  /** @param {Array<{ x: number, y: number }>} line */
  const pointsOf = (line) =>
    line.map((p) => `${board.px(p.x).toFixed(1)},${board.py(p.y).toFixed(1)}`).join(' ');

  const note = $derived.by(() => {
    if (charges.length === 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Không có điện tích nào: không có điện trường.',
      };
    }
    if (tooClose) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Điểm M quá gần một điện tích; hãy kéo M ra xa hơn một chút.',
      };
    }
    const e = `Tại M: $E \\approx ${sciTex(field.size)}$ V/m.`;
    const f = `Điện tích thử $q = ${testSign > 0 ? '' : '-'}1$ nC chịu lực $F = |q|E \\approx ${sciTex(Math.hypot(force.x, force.y))}$ N, ${testSign > 0 ? 'cùng chiều' : 'ngược chiều'} với $\\vec E$.`;
    const parts =
      charges.length > 1
        ? ' $\\vec E$ là tổng vectơ các cường độ điện trường do từng điện tích gây ra (các mũi tên mảnh).'
        : '';
    return { tone: /** @type {const} */ ('info'), text: `${e} ${f}${parts}` };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {board.width} {board.height}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-xl bg-slate-50"
      role="group"
      aria-label={`Đường sức điện của ${charges.length} điện tích. Cường độ điện trường tại M khoảng ${sciText(field.size)} vôn trên mét.`}
    >
      {#each lines as line, i (i)}
        {@const arrow = midArrow(line)}
        <polyline points={pointsOf(line)} fill="none" stroke="#94a3b8" stroke-width="1.2" />
        {#if arrow}
          {@const x = board.px(arrow.at.x)}
          {@const y = board.py(arrow.at.y)}
          <polygon
            points={arrowHead(x - arrow.dir.x * 8, y + arrow.dir.y * 8, x, y, 7)}
            fill="#64748b"
          />
        {/if}
      {/each}
      {#if eLen > 0}
        {#if charges.length > 1}
          {#each field.parts as part, i (i)}
            {@const m = Math.hypot(part.x, part.y)}
            {@const l = arrowPx(m, E_REF, 70)}
            <ForceArrow
              x1={board.px(probe.x)}
              y1={board.py(probe.y)}
              x2={board.px(probe.x) + (part.x / m) * l}
              y2={board.py(probe.y) - (part.y / m) * l}
              color={charges[i].q > 0 ? '#fca5a5' : '#93c5fd'}
              dashed
            />
          {/each}
        {/if}
        <ForceArrow
          x1={board.px(probe.x)}
          y1={board.py(probe.y)}
          x2={board.px(probe.x) + eUnit.x * eLen}
          y2={board.py(probe.y) - eUnit.y * eLen}
          color="#d97706"
          label="E"
        />
        <ForceArrow
          x1={board.px(probe.x)}
          y1={board.py(probe.y)}
          x2={board.px(probe.x) + fUnit.x * eLen * 0.6}
          y2={board.py(probe.y) - fUnit.y * eLen * 0.6}
          color="#059669"
          label="F"
          labelDy={18}
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
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Điểm M đặt điện tích thử: kéo hoặc dùng phím mũi tên"
        aria-valuemin={-board.halfX}
        aria-valuemax={board.halfX}
        aria-valuenow={probe.x}
        aria-valuetext={`Cường độ điện trường tại M khoảng ${sciText(field.size)} vôn trên mét`}
        use:draggable={dragOf(() => probe, moveProbe)}
      >
        <circle
          class="drag-knob"
          cx={board.px(probe.x)}
          cy={board.py(probe.y)}
          r="6"
          fill="#facc15"
          stroke="#334155"
          stroke-width="1.5"
        />
        <text
          x={board.px(probe.x) - 14}
          y={board.py(probe.y) + 4}
          font-size="12"
          font-weight="700"
          fill="#0f172a"
          pointer-events="none">M</text
        >
      </g>
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Đường sức (xám) đi ra từ điện tích dương, đi vào điện tích âm; chỗ đường sức dày điện trường
      mạnh. Kéo các điện tích và điểm M.
    </p>
  </div>

  <SegmentedControl
    label="Cấu hình điện tích"
    options={PRESET_OPTIONS}
    bind:value={preset}
    onchange={choose}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.secondary}
      onclick={() => add(1)}
      disabled={charges.length >= MAX_CHARGES}>Thêm điện tích +1 nC</button
    >
    <button
      type="button"
      class={button.secondary}
      onclick={() => add(-1)}
      disabled={charges.length >= MAX_CHARGES}>Thêm điện tích −1 nC</button
    >
  </div>
  <SegmentedControl label="Điện tích thử đặt tại M" options={TEST_OPTIONS} bind:value={testSign} />
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
