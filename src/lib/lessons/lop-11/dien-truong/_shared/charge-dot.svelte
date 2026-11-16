<script>
  /**
   * A point charge drawn inside an SVG: a red disc with + for a positive
   * charge, a blue disc with − for a negative one, a grey disc for zero, and
   * an optional name below. Put it inside a drag handle `<g>`; the disc
   * carries `drag-knob` so only it gets the focus ring.
   * @type {{ cx: number, cy: number, q: number, name?: string, r?: number }}
   */
  let { cx, cy, q, name = '', r = 12 } = $props();

  const fill = $derived(q > 0 ? '#dc2626' : q < 0 ? '#2563eb' : '#94a3b8');
</script>

<circle class="drag-knob" {cx} {cy} {r} {fill} stroke="#fff" stroke-width="2" />
<text
  x={cx}
  y={cy + r * 0.42}
  text-anchor="middle"
  font-size={r * 1.25}
  font-weight="700"
  fill="#fff"
  pointer-events="none">{q > 0 ? '+' : q < 0 ? '−' : '0'}</text
>
{#if name}
  <text
    x={cx}
    y={cy + r + 13}
    text-anchor="middle"
    font-size="12"
    font-weight="700"
    fill="#0f172a"
    stroke="#fff"
    stroke-width="3"
    paint-order="stroke"
    pointer-events="none">{name}</text
  >
{/if}
