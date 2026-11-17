<script>
  /**
   * A horizontal cylinder of gas closed by a piston on the right, with a
   * pressure gauge on its left end. The gas is a fixed set of dots spread
   * over the space left of the piston, so a smaller volume looks denser;
   * its colour warms with the temperature. Purely visual (`aria-hidden`):
   * the caller announces the state in text.
   * @type {{
   *   fill: number;
   *   warmth: number;
   *   gauge: number;
   *   gaugeText: string;
   *   flame?: boolean;
   *   weight?: boolean;
   * }}
   * - `fill`: the gas length as a share (0–1) of the cylinder's length.
   * - `warmth`: 0 (cold, blue) to 1 (hot, red).
   * - `gauge`: the needle as a share (0–1) of the gauge's scale.
   */
  let { fill, warmth, gauge, gaugeText, flame = false, weight = false } = $props();

  const X0 = 60;
  const X1 = 300;
  const Y0 = 30;
  const Y1 = 110;
  /** Fixed spots of the gas dots, as shares of the gas space: an evenly
   * scattered (R2 low-discrepancy) set, so the dots show no rows. */
  const SPOTS = Array.from({ length: 36 }, (_, i) => ({
    u: ((0.5 + i * 0.7548776662) % 1) * 0.9 + 0.05,
    v: ((0.5 + i * 0.5698402911) % 1) * 0.84 + 0.08,
  }));

  const pistonX = $derived(X0 + Math.max(0.05, Math.min(1, fill)) * (X1 - X0));
  const gasColor = $derived(
    `rgb(${Math.round(37 + 200 * warmth)}, ${Math.round(99 - 40 * warmth)}, ${Math.round(235 - 190 * warmth)})`,
  );
  const needle = $derived(-120 + 240 * Math.max(0, Math.min(1, gauge)));
</script>

<svg viewBox="0 0 340 150" class="mx-auto block w-full max-w-lg select-none" aria-hidden="true">
  <!-- gauge -->
  <line x1="40" y1="70" x2={X0} y2="70" stroke="#475569" stroke-width="4" />
  <circle cx="26" cy="70" r="22" fill="white" stroke="#334155" stroke-width="2" />
  {#each [0, 0.25, 0.5, 0.75, 1] as t (t)}
    {@const a = ((-120 + 240 * t) * Math.PI) / 180}
    <line
      x1={26 + 16 * Math.sin(a)}
      y1={70 - 16 * Math.cos(a)}
      x2={26 + 20 * Math.sin(a)}
      y2={70 - 20 * Math.cos(a)}
      stroke="#334155"
      stroke-width="1.5"
    />
  {/each}
  <line
    x1="26"
    y1="70"
    x2={26 + 15 * Math.sin((needle * Math.PI) / 180)}
    y2={70 - 15 * Math.cos((needle * Math.PI) / 180)}
    stroke="#e11d48"
    stroke-width="2.5"
    stroke-linecap="round"
  />
  <circle cx="26" cy="70" r="2.5" fill="#334155" />
  <text x="2" y="126" font-size="11" font-weight="600" fill="#334155">{gaugeText}</text>
  <!-- cylinder -->
  <rect
    x={X0}
    y={Y0}
    width={X1 - X0 + 20}
    height={Y1 - Y0}
    fill="#f8fafc"
    stroke="#334155"
    stroke-width="2.5"
  />
  <rect
    x={X0 + 1.5}
    y={Y0 + 1.5}
    width={pistonX - X0 - 1.5}
    height={Y1 - Y0 - 3}
    fill={gasColor}
    opacity="0.18"
  />
  {#each SPOTS as s, i (i)}
    <circle
      cx={X0 + 4 + s.u * (pistonX - X0 - 8)}
      cy={Y0 + s.v * (Y1 - Y0)}
      r="2.6"
      fill={gasColor}
    />
  {/each}
  <rect x={pistonX} y={Y0 + 2} width="8" height={Y1 - Y0 - 4} fill="#64748b" />
  <rect x={pistonX + 8} y="66" width="330" height="8" fill="#94a3b8" />
  {#if weight}
    <text x={X1 + 20} y={Y0 - 8} font-size="10" fill="#475569" text-anchor="end"
      >pít-tông chuyển động tự do</text
    >
  {/if}
  {#if flame}
    {#each [100, 160, 220] as fx (fx)}
      <path
        d="M {fx} 140 q -8 -12 0 -24 q 8 12 0 24 z"
        fill="#f97316"
        opacity={0.35 + 0.65 * warmth}
      />
    {/each}
  {/if}
</svg>
