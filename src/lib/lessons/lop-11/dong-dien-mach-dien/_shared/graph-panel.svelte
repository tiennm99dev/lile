<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A small graph on any ranges, for characteristics such as I against U or
   * U against I. Each axis runs through 0 when 0 lies inside the other range;
   * otherwise it sits on the edge and the graph reads as a cut axis.
   * @type {{
   *   xMin: number;
   *   xMax: number;
   *   yMin: number;
   *   yMax: number;
   *   xTicks: number[];
   *   yTicks: number[];
   *   xLabel: string;
   *   yLabel: string;
   *   label: string;
   *   lines?: Array<{ points: Array<{ x: number, y: number }>, color?: string, dashed?: boolean }>;
   *   marks?: Array<{ x: number, y: number, color?: string, big?: boolean }>;
   * }}
   */
  let {
    xMin,
    xMax,
    yMin,
    yMax,
    xTicks,
    yTicks,
    xLabel,
    yLabel,
    label,
    lines = [],
    marks = [],
  } = $props();

  const uid = $props.id();
  const W = 340;
  const H = 220;
  const LEFT = 42;
  const RIGHT = 14;
  const TOP = 22;
  const BOTTOM = 30;

  const px = $derived(linear(xMin, xMax, LEFT, W - RIGHT));
  const py = $derived(linear(yMin, yMax, H - BOTTOM, TOP));
  const axisY = $derived(py.map(yMin <= 0 && yMax >= 0 ? 0 : yMin));
  const axisX = $derived(px.map(xMin <= 0 && xMax >= 0 ? 0 : xMin));
  /** Keeps a point inside the frame so a line leaving it is clipped. */
  const inside = (/** @type {{ x: number, y: number }} */ p) =>
    p.x >= xMin - 1e-9 && p.x <= xMax + 1e-9 && p.y >= yMin - 1e-9 && p.y <= yMax + 1e-9;
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-md select-none"
  role="img"
  aria-label={label}
>
  <defs>
    <clipPath id="{uid}-frame">
      <rect x={LEFT} y={TOP} width={W - LEFT - RIGHT} height={H - TOP - BOTTOM} />
    </clipPath>
  </defs>
  {#each yTicks as tick (tick)}
    <line x1={LEFT} x2={W - RIGHT} y1={py.map(tick)} y2={py.map(tick)} stroke="#e2e8f0" />
    <text x={LEFT - 5} y={py.map(tick) + 4} font-size="10" fill="#475569" text-anchor="end">
      {formatNumber(tick)}
    </text>
  {/each}
  {#each xTicks as tick (tick)}
    <line x1={px.map(tick)} x2={px.map(tick)} y1={TOP} y2={H - BOTTOM} stroke="#e2e8f0" />
    <text x={px.map(tick)} y={H - BOTTOM + 13} font-size="10" fill="#475569" text-anchor="middle">
      {formatNumber(tick)}
    </text>
  {/each}
  <line x1={axisX} x2={axisX} y1={TOP} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
  <line x1={LEFT} x2={W - RIGHT} y1={axisY} y2={axisY} stroke="#334155" stroke-width="1.5" />
  <text x={axisX + 4} y="13" font-size="11" font-weight="600" fill="#334155">{yLabel}</text>
  <text x={W - RIGHT} y={H - 3} font-size="11" font-weight="600" fill="#334155" text-anchor="end">
    {xLabel}
  </text>
  <g clip-path="url(#{uid}-frame)">
    {#each lines as line, i (i)}
      <polyline
        points={pointsAttr(line.points.map((p) => ({ x: px.map(p.x), y: py.map(p.y) })))}
        fill="none"
        stroke={line.color ?? '#4f46e5'}
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-dasharray={line.dashed ? '6 4' : undefined}
      />
    {/each}
  </g>
  {#each marks.filter(inside) as mark, i (i)}
    <circle
      cx={px.map(mark.x)}
      cy={py.map(mark.y)}
      r={mark.big ? 6 : 4.5}
      fill={mark.color ?? '#e11d48'}
      stroke={mark.big ? '#fff' : 'none'}
      stroke-width="2"
    />
  {/each}
</svg>
