<script>
  /**
   * The circuit symbol of a resistor-type part, drawn upright and centred on
   * (0, 0) inside an SVG, 16 by 44 units: a fixed resistor, a
   * light-dependent resistor (two arrows of light falling on it) or an NTC
   * thermistor (the slanted line with "t°"). `empty` draws a dashed free
   * slot. Purely visual: the caller names the part in text.
   * @type {{ kind: 'fixed' | 'ldr' | 'ntc' | 'empty', active?: boolean }}
   */
  let { kind, active = false } = $props();
</script>

<g aria-hidden="true">
  {#if kind === 'empty'}
    <rect
      x="-11"
      y="-24"
      width="22"
      height="48"
      rx="4"
      fill={active ? '#e0e7ff' : '#f8fafc'}
      stroke={active ? '#4f46e5' : '#94a3b8'}
      stroke-dasharray="4 3"
      stroke-width="1.5"
    />
    <text x="0" y="5" font-size="14" fill="#64748b" text-anchor="middle">?</text>
  {:else}
    <rect
      x="-8"
      y="-22"
      width="16"
      height="44"
      fill="#fff"
      stroke={active ? '#4f46e5' : '#334155'}
      stroke-width="2"
    />
    {#if kind === 'ldr'}
      <g stroke="#d97706" stroke-width="1.6" fill="#d97706">
        <line x1="-30" y1="-20" x2="-13" y2="-8" />
        <polygon points="-11,-6 -17,-7 -14,-12" />
        <line x1="-30" y1="-4" x2="-13" y2="8" />
        <polygon points="-11,10 -17,9 -14,4" />
      </g>
    {:else if kind === 'ntc'}
      <polyline points="-16,18 -12,18 14,-18" fill="none" stroke="#dc2626" stroke-width="1.6" />
      <text x="-26" y="-8" font-size="10" fill="#dc2626">t°</text>
    {/if}
  {/if}
</g>
