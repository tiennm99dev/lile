<script>
  /**
   * The triangle of an op-amp inside an SVG, its left side at `x` from
   * `y − 50` to `y + 50` and its tip, the output, at (`x + 80`, `y`). The
   * inverting input (−) is at (`x`, `y − 25`), the non-inverting input (+)
   * at (`x`, `y + 25`). Purely visual: the caller describes the circuit.
   * @type {{ x: number, y: number }}
   */
  let { x, y } = $props();
</script>

<g aria-hidden="true">
  <polygon
    points="{x},{y - 50} {x},{y + 50} {x + 80},{y}"
    fill="#eef2ff"
    stroke="#334155"
    stroke-width="2"
  />
  <text x={x + 7} y={y - 21} font-size="14" font-weight="700" fill="#334155">−</text>
  <text x={x + 6} y={y + 30} font-size="14" font-weight="700" fill="#334155">+</text>
</g>
