<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import {
    CYST,
    DEPTH,
    MEDIA,
    RIB,
    ROWS,
    WIDTH,
    aTrace,
    depthFromTime,
    scanColumn,
  } from './engine.js';

  const W = 360;
  const LEFT = 20;
  const SPAN = 320;
  const TOP = 44;
  const PER_CM = 14;
  const PROBE_Y = 28;
  const COLS = 40;
  const T_MAX = 160;

  /** @param {number} x cm */
  const sx = (x) => LEFT + (x / WIDTH) * SPAN;
  /** @param {number} px */
  const fromPx = (px) => ((px - LEFT) / SPAN) * WIDTH;
  /** @param {number} z cm */
  const sz = (z) => TOP + z * PER_CM;

  let gel = $state(true);
  let probeX = $state(9);
  const handle = $state({ x: sx(9), y: PROBE_Y });
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {Array<number[] | null>} */
  let image = $state(Array(COLS).fill(null));

  const colOf = (/** @type {number} */ x) => clamp(Math.floor((x / WIDTH) * COLS), 0, COLS - 1);
  const colCentre = (/** @type {number} */ c) => ((c + 0.5) * WIDTH) / COLS;

  const column = $derived(scanColumn(probeX, gel));
  const trace = $derived(aTrace(column.echoes, T_MAX));

  /** @param {number} x */
  function moveTo(x) {
    probeX = clamp(x, 0.3, WIDTH - 0.3);
    handle.x = sx(probeX);
    handle.y = PROBE_Y;
    const c = colOf(probeX);
    image[c] = scanColumn(colCentre(c), gel).rows;
  }
  moveTo(9);

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: 230 },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      moveTo(fromPx(p.x));
      return { x: handle.x, y: PROBE_Y };
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ _dy,
      /** @type {boolean} */ big,
    ) => {
      moveTo(probeX + dx * (big ? 3 : 0.6));
    },
  });

  function sweep() {
    image = Array.from({ length: COLS }, (_, c) => scanColumn(colCentre(c), gel).rows);
  }
  function clearImage() {
    image = Array(COLS).fill(null);
    moveTo(probeX);
  }
  /** @param {string | number} v */
  function setGel(v) {
    gel = v === 'yes';
    clearImage();
  }

  const GEL_OPTIONS = [
    { value: 'yes', label: 'Có bôi gel' },
    { value: 'no', label: 'Không bôi gel' },
  ];
  const scanned = $derived(image.filter(Boolean).length);

  /** @param {number} b */
  const grey = (b) => {
    const v = Math.round(b * 255);
    return `rgb(${v},${v},${v})`;
  };
  const ROW_H = (DEPTH * PER_CM) / ROWS;

  const note = $derived.by(() => {
    if (!gel) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Giữa đầu dò và da còn lớp không khí. Trở kháng âm của không khí rất nhỏ so với của da và mô, nên gần như toàn bộ siêu âm bị phản xạ ngay ở mặt da: ảnh tối đen. Vì vậy phải bôi gel trước khi siêu âm.',
      };
    }
    const strong = column.echoes
      .filter((e) => e.z > 0.2)
      .sort((a, b) => b.I - a.I)
      .slice(0, 2)
      .sort((a, b) => a.t - b.t);
    const parts = strong.map(
      (e) =>
        `tiếng vọng ở mặt phân cách ${MEDIA[e.from].name} – ${MEDIA[e.to].name} về sau $t \\approx ${numTex(e.t, 1)}\\ \\mu\\text{s}$, nên $d = \\dfrac{vt}{2} \\approx ${numTex(depthFromTime(e.t), 1)}$ cm`,
    );
    const where =
      Math.abs(probeX - RIB.x) < RIB.rx
        ? ' Xương sườn phản xạ mạnh và hấp thụ gần hết siêu âm: phía sau nó là vùng tối (bóng cản), không thấy gì.'
        : Math.abs(probeX - CYST.x) < CYST.r
          ? ' Bên trong nang chứa dịch hầu như không có tiếng vọng nên hiện màu đen (trống âm).'
          : '';
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đầu dò ở vị trí $x = ${numTex(probeX, 1)}$ cm: ${parts.join('; ')}.${where} Đã quét ${scanned}/${COLS} cột ảnh.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} 230"
      class="mx-auto block w-full max-w-lg touch-none select-none"
      role="group"
      aria-label="Mặt cắt bụng: lớp mỡ, lớp cơ, gan có một nang chứa dịch, một xương sườn. Kéo đầu dò dọc mặt da."
    >
      <rect x={LEFT} y={sz(0)} width={SPAN} height={sz(1.2) - sz(0)} fill="#fde68a" />
      <rect x={LEFT} y={sz(1.2)} width={SPAN} height={sz(2.6) - sz(1.2)} fill="#fca5a5" />
      <rect
        x={LEFT}
        y={sz(2.6)}
        width={SPAN}
        height={sz(10) - sz(2.6)}
        fill="#b45309"
        opacity="0.55"
      />
      <rect x={LEFT} y={sz(10)} width={SPAN} height={sz(12) - sz(10)} fill="#fca5a5" />
      <circle cx={sx(CYST.x)} cy={sz(CYST.z)} r={CYST.r * PER_CM} fill="#1e3a8a" opacity="0.7" />
      <ellipse
        cx={sx(RIB.x)}
        cy={sz(RIB.z)}
        rx={(RIB.rx / WIDTH) * SPAN}
        ry={RIB.rz * PER_CM}
        fill="#f8fafc"
        stroke="#64748b"
      />
      <text x={LEFT + 4} y={sz(0.8)} font-size="9" fill="#713f12">mỡ</text>
      <text x={LEFT + 4} y={sz(2.1)} font-size="9" fill="#7f1d1d">cơ</text>
      <text x={LEFT + 4} y={sz(3.4)} font-size="9" fill="#fff">gan</text>
      <text x={sx(CYST.x)} y={sz(CYST.z) + 3} font-size="9" fill="#fff" text-anchor="middle"
        >nang</text
      >
      <text x={sx(RIB.x) + 16} y={sz(RIB.z) + 3} font-size="9" fill="#0f172a">xương sườn</text>
      <line
        x1={handle.x}
        y1={sz(0)}
        x2={handle.x}
        y2={sz(DEPTH)}
        stroke="#4f46e5"
        stroke-dasharray="4 3"
        stroke-width="1.5"
      />
      {#if gel}
        <rect x={handle.x - 14} y={sz(0) - 6} width="28" height="6" rx="3" fill="#7dd3fc" />
      {/if}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Đầu dò siêu âm: kéo hoặc dùng phím mũi tên trái, phải để di chuyển dọc mặt da"
        aria-valuemin="0"
        aria-valuemax={WIDTH}
        aria-valuenow={Math.round(probeX)}
        aria-valuetext="đầu dò ở vị trí {formatNumber(probeX, 1)} cm"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <rect
          class="drag-knob"
          x={handle.x - 12}
          y={PROBE_Y - 14}
          width="24"
          height="22"
          rx="5"
          fill="#334155"
        />
      </g>
    </svg>
    <div class="flex flex-wrap items-end gap-3">
      <SegmentedControl
        label="Lớp tiếp xúc"
        options={GEL_OPTIONS}
        value={gel ? 'yes' : 'no'}
        onchange={setGel}
      />
      <button type="button" class={button.secondary} onclick={sweep}>Quét cả bụng</button>
      <button type="button" class={button.quiet} onclick={clearImage}>Xoá ảnh</button>
    </div>
  </div>

  <div class="grid gap-3 md:grid-cols-2">
    <div class="{card} p-2">
      <p class="px-2 text-sm font-semibold text-slate-700">Siêu âm kiểu A (tại đầu dò)</p>
      <XyPlot
        lines={[{ points: trace, color: '#0f766e' }]}
        xMax={T_MAX}
        yMax={1.05}
        xTicks={[40, 80, 120, 160]}
        yTicks={[0.5, 1]}
        xLabel="t (μs)"
        yLabel="điện áp"
        label={`Đồ thị điện áp theo thời gian của các tiếng vọng tại vị trí ${formatNumber(probeX, 1)} cm.`}
      />
    </div>
    <div class="{card} p-2">
      <p class="px-2 text-sm font-semibold text-slate-700">Siêu âm kiểu B (ảnh mặt cắt)</p>
      <svg
        viewBox="0 0 {W} {DEPTH * PER_CM + 8}"
        class="mx-auto block w-full max-w-md"
        role="img"
        aria-label={`Ảnh siêu âm kiểu B đã quét ${scanned} trên ${COLS} cột.`}
      >
        <rect x={LEFT} y="4" width={SPAN} height={DEPTH * PER_CM} fill="#0f172a" />
        {#each image as rows, c (c)}
          {#if rows}
            {#each rows as b, r (r)}
              <rect
                x={LEFT + (c * SPAN) / COLS}
                y={4 + r * ROW_H}
                width={SPAN / COLS + 0.3}
                height={ROW_H + 0.3}
                fill={grey(b)}
              />
            {/each}
          {/if}
        {/each}
        <line
          x1={handle.x}
          y1="4"
          x2={handle.x}
          y2={4 + DEPTH * PER_CM}
          stroke="#facc15"
          stroke-width="1"
          opacity="0.6"
        />
      </svg>
    </div>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
