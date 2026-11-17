<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A state graph of a gas (p–V, V–T, p–T, V–t): lines that may be dashed
   * (an extrapolation), marked points with an optional label, on axes whose
   * ranges may start below zero. Anything outside the plot is cut off.
   * @type {{
   *   lines?: Array<{ points: Array<{ x: number, y: number }>, color?: string, dashed?: boolean, label?: string }>;
   *   marks?: Array<{ x: number, y: number, color?: string, label?: string, hollow?: boolean }>;
   *   xMin?: number;
   *   xMax: number;
   *   yMin?: number;
   *   yMax: number;
   *   xTicks: number[];
   *   yTicks: number[];
   *   xLabel: string;
   *   yLabel: string;
   *   label: string;
   * }}
   */
  let {
    lines = [],
    marks = [],
    xMin = 0,
    xMax,
    yMin = 0,
    yMax,
    xTicks,
    yTicks,
    xLabel,
    yLabel,
    label,
  } = $props();

  const W = 340;
  const H = 220;
  const LEFT = 40;
  const RIGHT = 14;
  const TOP = 22;
  const BOTTOM = 30;

  const uid = $props.id();
  const clipId = `gas-graph-${uid}`;
  const px = $derived(linear(xMin, xMax, LEFT, W - RIGHT));
  const py = $derived(linear(yMin, yMax, H - BOTTOM, TOP));
  const axisX = $derived(xMin < 0 && xMax > 0 ? px.map(0) : LEFT);
  const axisY = $derived(yMin < 0 && yMax > 0 ? py.map(0) : H - BOTTOM);

  /** @param {Array<{ x: number, y: number }>} pts */
  function toScreen(pts) {
    return pointsAttr(pts.map((p) => ({ x: px.map(p.x), y: py.map(p.y) })));
  }

  /** @param {{ points: Array<{ x: number, y: number }> }} line */
  function endOf(line) {
    const inside = line.points.filter(
      (p) => p.x >= xMin && p.x <= xMax && p.y >= yMin && p.y <= yMax,
    );
    const p = inside.at(-1) ?? line.points.at(-1) ?? { x: xMax, y: yMax };
    return { x: Math.min(px.map(p.x), W - RIGHT - 2), y: Math.max(py.map(p.y) - 5, TOP + 8) };
  }
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-lg select-none"
  role="img"
  aria-label={label}
>
  <defs>
    <clipPath id={clipId}>
      <rect x={LEFT} y={TOP - 6} width={W - LEFT - RIGHT + 6} height={H - TOP - BOTTOM + 6} />
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
  <text x="2" y="12" font-size="11" font-weight="600" fill="#334155">{yLabel}</text>
  <text x={W - RIGHT} y={H - 3} font-size="11" font-weight="600" fill="#334155" text-anchor="end">
    {xLabel}
  </text>
  <g clip-path="url(#{clipId})">
    {#each lines as line, i (i)}
      <polyline
        points={toScreen(line.points)}
        fill="none"
        stroke={line.color ?? '#4f46e5'}
        stroke-width={line.dashed ? 1.8 : 2.5}
        stroke-linejoin="round"
        stroke-dasharray={line.dashed ? '6 4' : undefined}
      />
      {#if line.label}
        <text
          x={endOf(line).x}
          y={endOf(line).y}
          font-size="10"
          font-weight="600"
          fill={line.color ?? '#4f46e5'}
          text-anchor="end">{line.label}</text
        >
      {/if}
    {/each}
    {#each marks as mark, i (i)}
      <circle
        cx={px.map(mark.x)}
        cy={py.map(mark.y)}
        r="4.5"
        fill={mark.hollow ? 'white' : (mark.color ?? '#e11d48')}
        stroke={mark.color ?? '#e11d48'}
        stroke-width="2"
      />
      {#if mark.label}
        <text
          x={px.map(mark.x) + 7}
          y={py.map(mark.y) - 6}
          font-size="10"
          font-weight="600"
          fill={mark.color ?? '#e11d48'}>{mark.label}</text
        >
      {/if}
    {/each}
  </g>
</svg>
