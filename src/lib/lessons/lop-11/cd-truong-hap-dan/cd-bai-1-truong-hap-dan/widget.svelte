<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { arrowHead } from '#lib/domain/arrow.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { sciTex, sciText } from '../_shared/gravity.js';
  import {
    arrowPx,
    directionWords,
    fieldAtPoint,
    fieldLines,
    forceOnTest,
    midArrow,
    nearBalance,
  } from './engine.js';

  const W = 360;
  const H = 240;
  /** Pixels per metre. */
  const SCALE = 30;
  const HALF_X = W / 2 / SCALE;
  const HALF_Y = H / 2 / SCALE;
  const STEP = 0.25;
  const BOUNDS = { xMin: -HALF_X, xMax: HALF_X, yMin: -HALF_Y, yMax: HALF_Y };
  const MAX_BALLS = 3;
  /** Field strength drawn at about 40% of the longest arrow, N/kg. */
  const G_REF = 1e-8;

  /** @type {Record<string, Array<{ x: number, y: number, tonnes: number }>>} */
  const PRESETS = {
    mot: [{ x: 0, y: 0, tonnes: 2 }],
    'bang-nhau': [
      { x: -2.5, y: 0, tonnes: 2 },
      { x: 2.5, y: 0, tonnes: 2 },
    ],
    'khac-nhau': [
      { x: -2.5, y: 0, tonnes: 3 },
      { x: 2.5, y: 0, tonnes: 1 },
    ],
  };
  const PRESET_OPTIONS = [
    { value: 'mot', label: 'Một quả cầu' },
    { value: 'bang-nhau', label: 'Hai quả cầu bằng nhau' },
    { value: 'khac-nhau', label: 'Hai quả cầu khác nhau' },
  ];
  const MASS_OPTIONS = [
    { value: 1, label: '1 kg' },
    { value: 5, label: '5 kg' },
  ];

  let preset = $state('mot');
  let balls = $state(PRESETS.mot.map((b) => ({ ...b })));
  let probe = $state({ x: 0, y: 2.5 });
  let testMass = $state(1);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  /** @param {number} x m */
  const px = (x) => W / 2 + x * SCALE;
  /** @param {number} y m */
  const py = (y) => H / 2 - y * SCALE;
  /** @param {{ x: number, y: number }} p pixels */
  const toMetres = (p) => ({ x: (p.x - W / 2) / SCALE, y: (H / 2 - p.y) / SCALE });
  /** @param {{ x: number, y: number }} p m */
  const place = (p) => ({
    x: clamp(Math.round(p.x / STEP) * STEP, -HALF_X + 0.5, HALF_X - 0.5),
    y: clamp(Math.round(p.y / STEP) * STEP, -HALF_Y + 0.5, HALF_Y - 0.5),
  });
  /** @param {number} tonnes */
  const radiusOf = (tonnes) => 9 + 4 * Math.cbrt(tonnes);

  const lines = $derived(fieldLines(balls, BOUNDS));
  const field = $derived(fieldAtPoint(balls, probe));
  const force = $derived(forceOnTest(balls, probe, testMass));
  const tooClose = $derived(balls.some((b) => Math.hypot(b.x - probe.x, b.y - probe.y) < 0.75));
  const balanced = $derived(nearBalance(balls, probe));
  /** The pulls cancel exactly (a symmetric spot), so the force has no direction. */
  const cancelled = $derived(field.size < 1e-12);
  const forceWords = $derived(
    cancelled ? 'bằng 0' : `khoảng ${sciText(force.size)} niutơn, hướng ${directionWords(force)}`,
  );
  const fLen = $derived(tooClose ? 0 : arrowPx(force.size, G_REF * testMass, 70));
  const fUnit = $derived(
    force.size > 0 ? { x: force.x / force.size, y: force.y / force.size } : { x: 0, y: 0 },
  );

  /** @param {string | number} v */
  function choose(v) {
    balls = PRESETS[String(v)].map((b) => ({ ...b }));
  }

  /** @param {number} tonnes */
  function addBall(tonnes) {
    if (balls.length >= MAX_BALLS) return;
    const spots = [
      { x: 0, y: -2 },
      { x: -4, y: 2 },
      { x: 4, y: 2 },
      { x: -4, y: -2 },
      { x: 4, y: -2 },
      { x: 0, y: 0 },
    ];
    const free = spots.find(
      (s) =>
        balls.every((b) => Math.hypot(b.x - s.x, b.y - s.y) >= 1.5) &&
        Math.hypot(probe.x - s.x, probe.y - s.y) >= 1.5,
    );
    if (free) balls = [...balls, { ...free, tonnes }];
  }

  /** @param {number} i @param {{ x: number, y: number }} p m */
  function moveBall(i, p) {
    const next = place(p);
    if (balls.some((b, j) => j !== i && Math.hypot(b.x - next.x, b.y - next.y) < 1)) return;
    balls = balls.map((b, j) => (j === i ? { ...b, ...next } : b));
  }

  /** @param {{ x: number, y: number }} p m */
  function moveProbe(p) {
    probe = place(p);
  }

  /**
   * @param {() => { x: number, y: number }} where
   * @param {(p: { x: number, y: number }) => void} move
   */
  const dragOf = (where, move) => ({
    point: { x: px(where().x), y: py(where().y) },
    svg: () => svg,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} pt */
    projector: (pt) => {
      move(toMetres(pt));
      return pt;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const s = big ? 1 : STEP;
      move({ x: where().x + dx * s, y: where().y - dy * s });
    },
  });

  /** @param {Array<{ x: number, y: number }>} line */
  const pointsOf = (line) =>
    line.map((p) => `${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');

  const note = $derived.by(() => {
    if (balls.length === 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Không còn quả cầu nào trên bảng. Chọn một cấu hình ở trên.',
      };
    }
    if (tooClose) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Vật thử đang chạm vào một quả cầu; hãy kéo nó ra xa hơn một chút.',
      };
    }
    const f = cancelled
      ? `Vật thử $m = ${testMass}$ kg chịu lực hấp dẫn tổng hợp $F = 0$.`
      : `Vật thử $m = ${testMass}$ kg chịu lực hấp dẫn tổng hợp $F \\approx ${sciTex(force.size)}$ N, hướng ${directionWords(force)}.`;
    if (balanced) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${f} Ở đây lực hút của các quả cầu gần như cân bằng nhau, đường sức thưa hẳn. Dù đặt vật thử ở đâu, lực vẫn luôn là lực hút.`,
      };
    }
    const sum =
      balls.length > 1
        ? ' Mỗi quả cầu hút vật thử một lực (mũi tên mảnh); lực tổng hợp là tổng vectơ của chúng.'
        : ' Lực hướng về tâm quả cầu, dọc theo đường sức.';
    return { tone: /** @type {const} */ ('info'), text: `${f}${sum}` };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-xl bg-slate-50"
      role="group"
      aria-label={`Đường sức trường hấp dẫn của ${balls.length} quả cầu. Lực hấp dẫn lên vật thử ${forceWords}.`}
    >
      {#each [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as x (x)}
        <line x1={px(x)} x2={px(x)} y1="0" y2={H} stroke="#e2e8f0" />
      {/each}
      {#each [-3, -2, -1, 0, 1, 2, 3] as y (y)}
        <line x1="0" x2={W} y1={py(y)} y2={py(y)} stroke="#e2e8f0" />
      {/each}
      {#each lines as line, i (i)}
        {@const arrow = midArrow(line)}
        <polyline points={pointsOf(line)} fill="none" stroke="#94a3b8" stroke-width="1.2" />
        {#if arrow}
          {@const x = px(arrow.at.x)}
          {@const y = py(arrow.at.y)}
          <polygon
            points={arrowHead(x - arrow.dir.x * 8, y + arrow.dir.y * 8, x, y, 7)}
            fill="#64748b"
          />
        {/if}
      {/each}
      {#if fLen > 0}
        {#if balls.length > 1}
          {#each field.parts as part, i (i)}
            {@const m = Math.hypot(part.x, part.y)}
            {@const l = arrowPx(m, G_REF, 70)}
            <ForceArrow
              x1={px(probe.x)}
              y1={py(probe.y)}
              x2={px(probe.x) + (part.x / m) * l}
              y2={py(probe.y) - (part.y / m) * l}
              color="#93c5fd"
              dashed
            />
          {/each}
        {/if}
        <ForceArrow
          x1={px(probe.x)}
          y1={py(probe.y)}
          x2={px(probe.x) + fUnit.x * fLen}
          y2={py(probe.y) - fUnit.y * fLen}
          color="#059669"
          label="F"
        />
      {/if}
      {#each balls as b, i (i)}
        {@const r = radiusOf(b.tonnes)}
        <g
          class="drag-handle cursor-move outline-none"
          role="slider"
          tabindex="0"
          aria-label={`Quả cầu ${b.tonnes} tấn thứ ${i + 1}: kéo hoặc dùng phím mũi tên`}
          aria-valuemin={-HALF_X}
          aria-valuemax={HALF_X}
          aria-valuenow={b.x}
          aria-valuetext={`Toạ độ ${formatNumber(b.x)} mét và ${formatNumber(b.y)} mét`}
          use:draggable={dragOf(
            () => balls[i],
            (p) => moveBall(i, p),
          )}
        >
          <circle
            class="drag-knob"
            cx={px(b.x)}
            cy={py(b.y)}
            {r}
            fill="#78716c"
            stroke="#fff"
            stroke-width="2"
          />
          <text
            x={px(b.x)}
            y={py(b.y) + 4}
            text-anchor="middle"
            font-size="11"
            font-weight="700"
            fill="#fff"
            pointer-events="none">{b.tonnes} t</text
          >
        </g>
      {/each}
      <g
        class="drag-handle cursor-move outline-none"
        role="slider"
        tabindex="0"
        aria-label="Vật thử: kéo hoặc dùng phím mũi tên"
        aria-valuemin={-HALF_X}
        aria-valuemax={HALF_X}
        aria-valuenow={probe.x}
        aria-valuetext={`Lực hấp dẫn lên vật thử ${forceWords}`}
        use:draggable={dragOf(() => probe, moveProbe)}
      >
        <circle
          class="drag-knob"
          cx={px(probe.x)}
          cy={py(probe.y)}
          r="6"
          fill="#facc15"
          stroke="#334155"
          stroke-width="1.5"
        />
        <text
          x={px(probe.x) - 14}
          y={py(probe.y) + 4}
          font-size="12"
          font-weight="700"
          fill="#0f172a"
          pointer-events="none">m</text
        >
      </g>
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Ô lưới cạnh 1 m. Các quả cầu đồng chất nặng 1, 2 hoặc 3 tấn. Đường sức (xám) đi vào tâm quả
      cầu; quả cầu nặng hơn có nhiều đường sức hơn. Kéo các quả cầu và vật thử m (chấm vàng).
    </p>
  </div>

  <SegmentedControl
    label="Cấu hình các quả cầu"
    options={PRESET_OPTIONS}
    bind:value={preset}
    onchange={choose}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.secondary}
      onclick={() => addBall(1)}
      disabled={balls.length >= MAX_BALLS}>Thêm quả cầu 1 tấn</button
    >
    <button
      type="button"
      class={button.secondary}
      onclick={() => addBall(3)}
      disabled={balls.length >= MAX_BALLS}>Thêm quả cầu 3 tấn</button
    >
  </div>
  <SegmentedControl label="Khối lượng vật thử" options={MASS_OPTIONS} bind:value={testMass} />
  <FeedbackNote tone={note.tone} text={note.text} />
  <p class="text-sm text-slate-600">
    So sánh: Trái Đất hút vật 1 kg một lực khoảng 9,8 N, lớn gấp hàng trăm triệu lần lực ở đây. Lực
    hấp dẫn giữa các vật thông thường rất nhỏ; chỉ khi một vật có khối lượng rất lớn như Trái Đất
    thì lực mới đáng kể.
  </p>
</div>
