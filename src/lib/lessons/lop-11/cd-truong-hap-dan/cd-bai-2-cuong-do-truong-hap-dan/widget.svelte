<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { BODIES } from '../_shared/gravity.js';
  import { X_MAX, curvePoints, describe, fieldAtRadii, heightKm, surfaceField } from './engine.js';

  const W = 360;
  const H = 130;
  const CX = 44;
  const CY = 65;
  /** Pixels per planet radius. */
  const UNIT = 38;
  const STEP = 0.05;
  const SAT_MASS = 1000;

  /** @type {Record<string, { yMax: number, yTicks: number[], color: string }>} */
  const AXES = {
    earth: { yMax: 10, yTicks: [0, 2, 4, 6, 8, 10], color: '#2563eb' },
    moon: { yMax: 2, yTicks: [0, 0.5, 1, 1.5, 2], color: '#64748b' },
    mars: { yMax: 4, yTicks: [0, 1, 2, 3, 4], color: '#c2410c' },
  };
  const BODY_OPTIONS = [
    { value: 'earth', label: 'Trái Đất' },
    { value: 'moon', label: 'Mặt Trăng' },
    { value: 'mars', label: 'Hoả tinh' },
  ];

  let body = $state(/** @type {'earth' | 'moon' | 'mars'} */ ('earth'));
  let x = $state(2);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const g0 = $derived(surfaceField(body));
  const g = $derived(fieldAtRadii(body, x));
  const axes = $derived(AXES[body]);
  const curve = $derived(curvePoints(body));
  const arrowLen = $derived(70 * (g / g0));
  const satX = $derived(CX + x * UNIT);

  /** @param {number} v */
  function setX(v) {
    x = Math.round(clamp(v, 1, X_MAX) / STEP) * STEP;
    x = Number(x.toFixed(2));
  }

  const drag = $derived({
    point: { x: satX, y: CY },
    svg: () => svg,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} pt */
    projector: (pt) => {
      setX((pt.x - CX) / UNIT);
      return pt;
    },
    /** @param {number} dx @param {number} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => setX(x + dx * (big ? 1 : 0.1)),
  });

  const note = $derived(
    `${describe(body, x)} Vệ tinh $1\\,000$ kg ở đây chịu lực hấp dẫn $F = mg \\approx ${numTex(SAT_MASS * g, 0)}$ N.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl label="Thiên thể" options={BODY_OPTIONS} bind:value={body} />
  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-xl bg-slate-900"
      role="group"
      aria-label={`${BODIES[body].name} và một vệ tinh cách tâm ${formatNumber(x)} lần bán kính`}
    >
      {#each [2, 3, 4, 5, 6, 7, 8] as k (k)}
        <line
          x1={CX + k * UNIT}
          x2={CX + k * UNIT}
          y1={CY + 40}
          y2={CY + 48}
          stroke="#94a3b8"
          stroke-width="1"
        />
        <text x={CX + k * UNIT} y={CY + 60} font-size="11" fill="#cbd5e1" text-anchor="middle"
          >{k}R</text
        >
      {/each}
      <line x1={CX} x2={W - 6} y1={CY + 44} y2={CY + 44} stroke="#475569" />
      <circle cx={CX} cy={CY} r={UNIT} fill={axes.color} />
      <text x={CX} y={CY + 4} font-size="11" font-weight="700" fill="#fff" text-anchor="middle"
        >{BODIES[body].name}</text
      >
      <line
        x1={CX + UNIT}
        x2={satX}
        y1={CY}
        y2={CY}
        stroke="#fbbf24"
        stroke-dasharray="4 4"
        stroke-width="1.5"
      />
      <ForceArrow
        x1={satX}
        y1={CY + 22}
        x2={satX - arrowLen}
        y2={CY + 22}
        color="#34d399"
        label=""
      />
      <g
        class="drag-handle cursor-ew-resize outline-none"
        role="slider"
        tabindex="0"
        aria-label="Vệ tinh: kéo ra xa hoặc lại gần, hoặc dùng phím mũi tên"
        aria-valuemin={1}
        aria-valuemax={X_MAX}
        aria-valuenow={x}
        aria-valuetext={`Cách tâm ${formatNumber(x)} lần bán kính, cường độ trường hấp dẫn ${formatNumber(g, 2)} niutơn trên kilôgam`}
        use:draggable={drag}
      >
        <rect
          class="drag-knob"
          x={satX - 7}
          y={CY - 7}
          width="14"
          height="14"
          rx="2"
          fill="#e2e8f0"
          stroke="#fbbf24"
          stroke-width="2"
        />
        <rect x={satX - 19} y={CY - 3} width="10" height="6" fill="#38bdf8" />
        <rect x={satX + 9} y={CY - 3} width="10" height="6" fill="#38bdf8" />
      </g>
      <text x={satX} y={CY - 14} font-size="11" fill="#e2e8f0" text-anchor="middle"
        >g ≈ {formatNumber(g, 2)} N/kg</text
      >
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Mũi tên xanh là cường độ trường hấp dẫn, luôn hướng về tâm thiên thể, dài theo độ lớn của g.
      Hình không vẽ đúng tỉ lệ kích thước giữa các thiên thể.
    </p>
  </div>
  <div class="flex flex-wrap gap-2">
    {#each [1, 2, 3, 4] as k (k)}
      <button type="button" class={button.quiet} onclick={() => setX(k)}
        >{k === 1 ? 'Bề mặt' : `r = ${k}R`}</button
      >
    {/each}
  </div>
  <div class="{card} p-2">
    <XyPlot
      lines={[{ points: curve, color: axes.color }]}
      marks={[{ x, y: g }]}
      guides={[{ y: g0, label: `g₀ ≈ ${formatNumber(g0, 2)}` }]}
      xMax={X_MAX}
      yMax={axes.yMax}
      xTicks={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
      yTicks={axes.yTicks}
      xLabel="r/R"
      yLabel="g (N/kg)"
      label={`Đồ thị cường độ trường hấp dẫn của ${BODIES[body].name} theo khoảng cách đến tâm, tính bằng bán kính`}
    />
  </div>
  <FeedbackNote tone={x === 1 ? 'info' : 'ok'} text={note} />
  <p class="text-sm text-slate-600">
    Độ cao h tính từ mặt {BODIES[body].name}: {formatNumber(heightKm(body, x), 0)} km.
  </p>
</div>
