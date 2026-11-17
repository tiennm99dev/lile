<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A temperature graph whose value axis may go below zero: lines drawn up
   * to the edge of the plot (anything above `yMax` is cut off), shaded
   * vertical bands with a label (a change of state), a vertical cursor and
   * marked points.
   * @type {{
   *   lines?: Array<{ points: Array<{ x: number, y: number }>, color?: string, dashed?: boolean }>;
   *   bands?: Array<{ from: number, to: number, label: string, color?: string }>;
   *   marks?: Array<{ x: number, y: number, color?: string }>;
   *   cursor?: number | null;
   *   xMax: number;
   *   yMin?: number;
   *   yMax: number;
   *   xTicks?: number[];
   *   yTicks: number[];
   *   xLabel: string;
   *   yLabel: string;
   *   label: string;
   * }}
   */
  let {
    lines = [],
    bands = [],
    marks = [],
    cursor = null,
    xMax,
    yMin = 0,
    yMax,
    xTicks = [],
    yTicks,
    xLabel,
    yLabel,
    label,
  } = $props();

  const W = 340;
  const H = 210;
  const LEFT = 38;
  const RIGHT = 12;
  const TOP = 22;
  const BOTTOM = 28;

  const uid = $props.id();
  const clipId = `heat-graph-${uid}`;
  const px = $derived(linear(0, xMax, LEFT, W - RIGHT));
  const py = $derived(linear(yMin, yMax, H - BOTTOM, TOP));
  const axisY = $derived(yMin < 0 && yMax > 0 ? py.map(0) : H - BOTTOM);
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-lg select-none"
  role="img"
  aria-label={label}
>
  <defs>
    <clipPath id={clipId}>
      <rect x={LEFT} y={TOP} width={W - LEFT - RIGHT} height={H - TOP - BOTTOM} />
    </clipPath>
  </defs>
  {#each bands as band, i (i)}
    <rect
      x={px.map(band.from)}
      y={TOP}
      width={Math.max(0, px.map(band.to) - px.map(band.from))}
      height={H - TOP - BOTTOM}
      fill={band.color ?? '#bae6fd'}
      opacity="0.55"
    />
    <text
      x={(px.map(band.from) + px.map(band.to)) / 2}
      y={TOP + 12}
      font-size="10"
      font-weight="600"
      fill="#0c4a6e"
      text-anchor="middle">{band.label}</text
    >
  {/each}
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
  <line x1={LEFT} x2={LEFT} y1={TOP} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
  <line x1={LEFT} x2={W - RIGHT} y1={axisY} y2={axisY} stroke="#334155" stroke-width="1.5" />
  <text x="2" y="12" font-size="11" font-weight="600" fill="#334155">{yLabel}</text>
  <text x={W - RIGHT} y={H - 3} font-size="11" font-weight="600" fill="#334155" text-anchor="end">
    {xLabel}
  </text>
  <g clip-path="url(#{clipId})">
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
    {#if cursor !== null}
      <line
        x1={px.map(cursor)}
        x2={px.map(cursor)}
        y1={TOP}
        y2={H - BOTTOM}
        stroke="#e11d48"
        stroke-width="1.5"
        stroke-dasharray="4 3"
      />
    {/if}
    {#each marks as mark, i (i)}
      <circle cx={px.map(mark.x)} cy={py.map(mark.y)} r="4.5" fill={mark.color ?? '#e11d48'} />
    {/each}
  </g>
</svg>
