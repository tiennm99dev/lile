<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { combine } from './engine.js';

  const W = 340;
  const H = 170;
  const MODES = [
    { value: 'noi-tiep', label: 'Ghép nối tiếp' },
    { value: 'song-song', label: 'Ghép song song' },
  ];

  let c1 = $state(3);
  let c2 = $state(6);
  let u = $state(12);
  let mode = $state(/** @type {'noi-tiep' | 'song-song'} */ ('noi-tiep'));

  const r = $derived(combine([c1, c2], mode, u));
  /** @param {number} v */
  const n = (v) => formatNumber(v, 2);
  /** @param {number} v */
  const t = (v) => numTex(v, 2);

  const note = $derived.by(() => {
    const [a, b] = r.parts;
    if (mode === 'noi-tiep') {
      return `Nối tiếp: $\\dfrac{1}{C_b} = \\dfrac{1}{${t(c1)}} + \\dfrac{1}{${t(c2)}}$, nên $C_b ${Number.isInteger(r.c) ? '=' : '\\approx'} ${t(r.c)}$ µF, nhỏ hơn mỗi tụ. Hai tụ tích cùng điện tích $Q = C_bU \\approx ${t(r.q)}$ µC; hiệu điện thế chia theo $U_1 = \\dfrac{Q}{C_1} \\approx ${t(a.u)}$ V, $U_2 \\approx ${t(b.u)}$ V (tụ điện dung nhỏ chịu hiệu điện thế lớn hơn), $U_1 + U_2 = ${t(u)}$ V.`;
    }
    return `Song song: $C_b = ${t(c1)} + ${t(c2)} = ${t(r.c)}$ µF, lớn hơn mỗi tụ. Hai tụ cùng hiệu điện thế $U = ${t(u)}$ V; điện tích $Q_1 = ${t(a.q)}$ µC, $Q_2 = ${t(b.q)}$ µC, tổng $Q = ${t(r.q)}$ µC.`;
  });

  /** Draw a capacitor symbol across a horizontal wire at (x, y). */
  const capH = (/** @type {number} */ x, /** @type {number} */ y) => [
    { x1: x - 4, y1: y - 14, x2: x - 4, y2: y + 14 },
    { x1: x + 4, y1: y - 14, x2: x + 4, y2: y + 14 },
  ];
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-lg select-none rounded-xl bg-slate-50"
      role="img"
      aria-label={`Hai tụ điện ${n(c1)} và ${n(c2)} micrôfara ${mode === 'noi-tiep' ? 'ghép nối tiếp' : 'ghép song song'}, nối với nguồn ${u} vôn. Điện dung tương đương ${n(r.c)} micrôfara.`}
    >
      <!-- battery on the left -->
      <g stroke="#475569" stroke-width="2" fill="none">
        <line x1="30" y1="40" x2="30" y2="77" />
        <line x1="30" y1="93" x2="30" y2="140" />
      </g>
      <line x1="16" y1="77" x2="44" y2="77" stroke="#0f172a" stroke-width="3" />
      <line x1="23" y1="91" x2="37" y2="91" stroke="#0f172a" stroke-width="5" />
      <text x="50" y="82" font-size="12" fill="#0f172a">{u} V</text>
      {#if mode === 'noi-tiep'}
        <g stroke="#475569" stroke-width="2" fill="none">
          <polyline points="30,40 136,40" />
          <polyline points="144,40 216,40" />
          <polyline points="224,40 310,40 310,140 30,140" />
        </g>
        {#each [...capH(140, 40), ...capH(220, 40)] as l, i (i)}
          <line {...l} stroke="#0f172a" stroke-width="3" />
        {/each}
        <text x="140" y="70" font-size="12" text-anchor="middle" fill="#0f172a"
          >C₁ = {n(c1)} µF</text
        >
        <text x="220" y="70" font-size="12" text-anchor="middle" fill="#0f172a"
          >C₂ = {n(c2)} µF</text
        >
        <text x="140" y="20" font-size="11" text-anchor="middle" fill="#7c3aed"
          >U₁ = {n(r.parts[0].u)} V</text
        >
        <text x="220" y="20" font-size="11" text-anchor="middle" fill="#7c3aed"
          >U₂ = {n(r.parts[1].u)} V</text
        >
      {:else}
        <g stroke="#475569" stroke-width="2" fill="none">
          <polyline points="30,40 310,40 310,140 30,140" />
          <polyline points="160,40 160,66" />
          <polyline points="160,74 160,140" />
          <polyline points="250,40 250,66" />
          <polyline points="250,74 250,140" />
        </g>
        {#each [160, 250] as x (x)}
          <line x1={x - 14} y1="66" x2={x + 14} y2="66" stroke="#0f172a" stroke-width="3" />
          <line x1={x - 14} y1="74" x2={x + 14} y2="74" stroke="#0f172a" stroke-width="3" />
        {/each}
        <text x="160" y="104" font-size="12" text-anchor="middle" fill="#0f172a"
          >C₁ = {n(c1)} µF</text
        >
        <text x="250" y="104" font-size="12" text-anchor="middle" fill="#0f172a"
          >C₂ = {n(c2)} µF</text
        >
        <text x="160" y="122" font-size="11" text-anchor="middle" fill="#7c3aed"
          >Q₁ = {n(r.parts[0].q)} µC</text
        >
        <text x="250" y="122" font-size="11" text-anchor="middle" fill="#7c3aed"
          >Q₂ = {n(r.parts[1].q)} µC</text
        >
      {/if}
    </svg>
  </div>

  <SegmentedControl label="Cách ghép" options={MODES} bind:value={mode} hideLabel />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Điện dung C₁" bind:value={c1} min={1} max={12} step={1} unit="µF" />
    <SliderField label="Điện dung C₂" bind:value={c2} min={1} max={12} step={1} unit="µF" />
    <SliderField label="Hiệu điện thế U" bind:value={u} min={0} max={24} step={1} unit="V" />
  </div>

  <div class="overflow-x-auto">
    <table class="w-full min-w-72 text-sm tabular-nums">
      <thead>
        <tr class="text-left text-slate-500">
          <th class="p-1 font-semibold"></th>
          <th class="p-1 font-semibold">C (µF)</th>
          <th class="p-1 font-semibold">U (V)</th>
          <th class="p-1 font-semibold">Q (µC)</th>
          <th class="p-1 font-semibold">W (µJ)</th>
        </tr>
      </thead>
      <tbody aria-live="polite">
        {#each r.parts as p, i (i)}
          <tr class="border-t border-slate-200">
            <th class="p-1 text-left font-semibold">Tụ {i + 1}</th>
            <td class="p-1">{n(p.c)}</td>
            <td class="p-1">{n(p.u)}</td>
            <td class="p-1">{n(p.q)}</td>
            <td class="p-1">{n(p.w)}</td>
          </tr>
        {/each}
        <tr class="border-t border-slate-300 font-semibold text-indigo-700">
          <th class="p-1 text-left">Bộ tụ</th>
          <td class="p-1">{n(r.c)}</td>
          <td class="p-1">{n(r.u)}</td>
          <td class="p-1">{n(r.q)}</td>
          <td class="p-1">{n(r.w)}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
