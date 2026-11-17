<script>
  /**
   * The circuit symbol of a diode inside an SVG: a triangle pointing from the
   * anode to the cathode bar, centred on (x, y). `dir` is the way current may
   * pass; `on` colours it while it conducts; `label` is written beside it.
   * @type {{ x: number, y: number, dir: 'right' | 'left' | 'up' | 'down', on?: boolean, label?: string }}
   */
  let { x, y, dir, on = false, label = '' } = $props();

  const ANGLE = { right: 0, down: 90, left: 180, up: -90 };
  const color = $derived(on ? '#d97706' : '#334155');
  const labelAt = $derived(
    dir === 'up' || dir === 'down'
      ? { x: x + 14, y: y + 4, a: 'start' }
      : { x, y: y - 13, a: 'middle' },
  );
</script>

<g transform="rotate({ANGLE[dir]} {x} {y})">
  <polygon
    points="{x - 8},{y - 8} {x - 8},{y + 8} {x + 7},{y}"
    fill={on ? '#fde68a' : '#fff'}
    stroke={color}
    stroke-width="1.8"
  />
  <line x1={x + 7} y1={y - 8} x2={x + 7} y2={y + 8} stroke={color} stroke-width="2.4" />
</g>
{#if label}
  <text
    x={labelAt.x}
    y={labelAt.y}
    font-size="11"
    font-weight="600"
    fill={color}
    text-anchor={labelAt.a}>{label}</text
  >
{/if}
