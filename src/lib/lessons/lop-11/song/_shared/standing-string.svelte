<script>
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { markPositions, nearestMode, pattern, profile } from './standing.js';

  /**
   * A string driven by a vibrator at its left end (cần rung), its right end
   * fixed or free, swinging as the standing-wave model says for the given
   * frequency. At a mode frequency the envelope, the nodes (N) and the
   * antinodes (B) are drawn; elsewhere the string only trembles a little.
   * Animates unless the reader prefers reduced motion, in which case the
   * string is drawn at its largest swing.
   *
   * @type {{
   *   end: import('./standing.js').EndKind;
   *   length: number;
   *   speed: number;
   *   frequency: number;
   * }}
   */
  let { end, length, speed, frequency } = $props();

  const W = 340;
  const H = 170;
  const LEFT = 34;
  const RIGHT = W - 22;
  const MID = 78;
  const SWING = 46;
  const SAMPLES = 240;

  let phase = $state(0);
  let running = $state(true);
  let still = $state(false);

  const mode = $derived(nearestMode(end, frequency, length, speed));
  const marks = $derived(mode.standing ? markPositions(end, mode.n, length) : null);
  const counts = $derived(pattern(end, mode.n));
  const swing = $derived(still || !running ? 1 : Math.cos(phase));

  /** @param {number} x metres */
  const px = (x) => LEFT + ((RIGHT - LEFT) * x) / length;

  const amps = $derived(
    Array.from({ length: SAMPLES + 1 }, (_, i) => {
      const x = (length * i) / SAMPLES;
      return { x, a: profile(end, frequency, length, speed, x) };
    }),
  );
  /** @param {number} k */
  const line = (k) =>
    amps.map((p) => `${px(p.x).toFixed(1)},${(MID - k * p.a * SWING).toFixed(1)}`).join(' ');
  const shape = $derived(line(swing));
  const upper = $derived(line(1));
  const lower = $derived(line(-1));
  const tipY = $derived(MID - swing * amps[SAMPLES].a * SWING);

  $effect(() => {
    still = reducedMotion();
    if (still || !running) return;
    return frameLoop((dt) => {
      phase = (phase + dt * 2 * Math.PI * 1.2) % (2 * Math.PI);
    });
  });

  const label = $derived(
    `Sợi dây dài ${formatNumber(length, 2)} mét, đầu trái nối cần rung, đầu phải ${
      end === 'co-dinh' ? 'cố định' : 'tự do'
    }, tần số ${formatNumber(frequency, 2)} héc. ${
      mode.standing
        ? `Có sóng dừng với ${counts.antinodes} bụng và ${counts.nodes} nút.`
        : 'Dây chỉ rung rất nhẹ, chưa có sóng dừng.'
    }`,
  );
</script>

<figure class="space-y-2">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label={label}
  >
    <!-- vibrator -->
    <rect x="4" y={MID - 22} width="22" height="44" rx="4" fill="#64748b" />
    <rect x="22" y={MID - 4} width={LEFT - 22} height="8" fill="#94a3b8" />
    <text x="2" y={MID + 36} font-size="10" fill="#475569">cần rung</text>
    {#if end === 'co-dinh'}
      <rect x={RIGHT} y={MID - 34} width="10" height="68" fill="#cbd5e1" />
      {#each [0, 1, 2, 3, 4, 5] as i (i)}
        <line
          x1={RIGHT + 10}
          y1={MID - 34 + i * 12}
          x2={RIGHT + 18}
          y2={MID - 42 + i * 12}
          stroke="#94a3b8"
        />
      {/each}
    {:else}
      <line
        x1={RIGHT}
        y1={MID - SWING - 8}
        x2={RIGHT}
        y2={MID + SWING + 8}
        stroke="#475569"
        stroke-width="3"
      />
      <circle cx={RIGHT} cy={tipY} r="5" fill="none" stroke="#0f766e" stroke-width="2.5" />
    {/if}
    <line x1={LEFT} y1={MID} x2={RIGHT} y2={MID} stroke="#e2e8f0" stroke-dasharray="3 3" />
    {#if marks}
      <polyline points={upper} fill="none" stroke="#a5b4fc" stroke-dasharray="5 4" />
      <polyline points={lower} fill="none" stroke="#a5b4fc" stroke-dasharray="5 4" />
    {/if}
    <polyline points={shape} fill="none" stroke="#4f46e5" stroke-width="2.5" />
    {#if marks}
      {#each marks.nodes as x (x)}
        <circle cx={px(x)} cy={MID} r="3.5" fill="#be123c" />
        <text
          x={px(x)}
          y={MID + SWING + 22}
          font-size="11"
          font-weight="700"
          fill="#be123c"
          text-anchor="middle">N</text
        >
      {/each}
      {#each marks.antinodes as x (x)}
        <text
          x={px(x)}
          y={MID + SWING + 22}
          font-size="11"
          font-weight="700"
          fill="#0f766e"
          text-anchor="middle">B</text
        >
      {/each}
    {/if}
  </svg>
  {#if !still}
    <div class="flex justify-center">
      <button
        type="button"
        class={button.quiet}
        aria-pressed={!running}
        onclick={() => (running = !running)}
      >
        {running ? 'Tạm dừng dây' : 'Cho dây rung tiếp'}
      </button>
    </div>
  {/if}
</figure>
