<script>
  /**
   * A coil turning in a uniform field, seen along its axis (the axis is
   * perpendicular to the drawing). B⃗ runs left to right as rows of field
   * lines; the coil shows edge-on as a bar, with its normal n⃗ at `alpha`
   * degrees from B⃗ (counterclockwise). The field lines that pass through
   * the coil are drawn dark: there are more of them the larger |cos α|, the
   * picture of the flux Φ = BS cos α.
   * @type {{ alpha: number, label: string, showNormal?: boolean, poles?: boolean }}
   */
  let { alpha, label, showNormal = true, poles = false } = $props();

  const W = 300;
  const H = 220;
  const CX = W / 2;
  const CY = H / 2;
  const HALF = 70;
  const ROWS = [-90, -70, -50, -30, -10, 10, 30, 50, 70, 90];

  const rad = $derived((alpha * Math.PI) / 180);
  /** Ends of the coil's bar: perpendicular to n⃗. */
  const end = $derived({ x: -Math.sin(rad) * HALF, y: -Math.cos(rad) * HALF });
  const extent = $derived(Math.abs(end.y));
  const through = (/** @type {number} */ dy) => Math.abs(dy) < extent - 1e-9;
  const nTip = $derived({ x: CX + Math.cos(rad) * 62, y: CY - Math.sin(rad) * 62 });
  const arc = $derived.by(() => {
    const r = 26;
    const a = ((alpha % 360) + 360) % 360;
    const large = a > 180 ? 1 : 0;
    return `M ${CX + r} ${CY} A ${r} ${r} 0 ${large} 0 ${(CX + r * Math.cos(rad)).toFixed(1)} ${(CY - r * Math.sin(rad)).toFixed(1)}`;
  });
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-xs select-none"
  role="img"
  aria-label={label}
>
  <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
  {#if poles}
    <rect x="0" y="10" width="26" height={H - 20} fill="#dc2626" rx="4" />
    <rect x={W - 26} y="10" width="26" height={H - 20} fill="#2563eb" rx="4" />
    <text x="13" y={CY + 6} text-anchor="middle" class="fill-white text-[16px] font-bold">N</text>
    <text x={W - 13} y={CY + 6} text-anchor="middle" class="fill-white text-[16px] font-bold"
      >S</text
    >
  {/if}
  {#each ROWS as dy (dy)}
    <line
      x1={poles ? 30 : 8}
      y1={CY + dy}
      x2={poles ? W - 30 : W - 8}
      y2={CY + dy}
      stroke={through(dy) ? '#7c3aed' : '#ddd6fe'}
      stroke-width={through(dy) ? 2.2 : 1.4}
    />
    <path
      d="M {W - 48} {CY + dy - 4} L {W - 40} {CY + dy} L {W - 48} {CY + dy + 4} Z"
      fill={through(dy) ? '#7c3aed' : '#c4b5fd'}
    />
  {/each}
  <text x={poles ? 34 : 10} y="16" class="fill-violet-700 text-[13px] font-semibold">B</text>
  <line
    x1={CX + end.x}
    y1={CY + end.y}
    x2={CX - end.x}
    y2={CY - end.y}
    stroke="#b45309"
    stroke-width="7"
    stroke-linecap="round"
  />
  <circle cx={CX} cy={CY} r="4" fill="#0f172a" />
  {#if showNormal}
    <path d={arc} fill="none" stroke="#0f172a" stroke-width="1.2" />
    <line x1={CX} y1={CY} x2={nTip.x} y2={nTip.y} stroke="#0f766e" stroke-width="2.5" />
    <circle cx={nTip.x} cy={nTip.y} r="3.5" fill="#0f766e" />
    <text
      x={nTip.x + 6}
      y={nTip.y - 6}
      stroke="#fff"
      stroke-width="4"
      paint-order="stroke"
      class="fill-teal-700 text-[13px] font-semibold">n</text
    >
    <text x={CX + 30} y={CY + 16} class="fill-slate-700 text-[12px] italic">α</text>
  {/if}
</svg>
