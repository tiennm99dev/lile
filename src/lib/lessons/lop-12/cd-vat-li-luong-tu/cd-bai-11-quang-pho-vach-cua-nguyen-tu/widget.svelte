<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { VISIBLE, colourName, spectrumColor } from '../_shared/quantum.js';
  import { LEVELS, levelEv, transition } from './engine.js';

  let level = $state(1);
  let last = $state(/** @type {null | { from: number, to: number }} */ (null));
  /** Lines seen so far, keyed 'high-low', each with the way it was seen. */
  /** @type {Record<string, { hi: number, lo: number, emitted: boolean, absorbed: boolean }>} */
  let seen = $state({});

  /** Where each level is drawn (0 bottom, 1 top): not to scale, so the top ones stay tappable. */
  const PLACE = [0, 0.42, 0.62, 0.76, 0.88, 1];
  const Y0 = 236;
  const Y1 = 26;
  /** @param {number} n */
  const yOf = (n) => Y0 + (Y1 - Y0) * PLACE[n - 1];

  /** @param {number} n */
  function jump(n) {
    if (n === level) return;
    const hi = Math.max(n, level);
    const lo = Math.min(n, level);
    const key = `${hi}-${lo}`;
    const old = seen[key] ?? { hi, lo, emitted: false, absorbed: false };
    seen[key] = n < level ? { ...old, emitted: true } : { ...old, absorbed: true };
    last = { from: level, to: n };
    level = n;
  }

  /** @param {KeyboardEvent} e @param {number} n */
  function onKey(e, n) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      jump(n);
    }
  }

  const photon = $derived(last ? transition(last.from, last.to) : null);
  const photonColor = $derived(
    photon
      ? (spectrumColor(photon.nm) ?? (photon.region === 'tử ngoại' ? '#7c3aed' : '#7f1d1d'))
      : '',
  );

  const SW = 320;
  const sx = linear(VISIBLE.min, VISIBLE.max, 0, SW);
  const GRADIENT = Array.from({ length: 20 }, (_, k) => {
    const nm = VISIBLE.min + ((VISIBLE.max - VISIBLE.min) * k) / 19;
    return { offset: k / 19, color: spectrumColor(nm) ?? '#000' };
  });
  const lines = $derived(Object.values(seen).map((s) => ({ ...s, ...transition(s.hi, s.lo) })));
  const visible = $derived(lines.filter((l) => l.region === 'nhìn thấy'));
  const hidden = $derived(
    lines.filter((l) => l.region !== 'nhìn thấy').sort((a, b) => a.nm - b.nm),
  );

  /** @param {number} n */
  const nameOf = (n) => LEVELS[n - 1].name;

  const note = $derived.by(() => {
    if (!last || !photon) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Electron đang ở trạng thái cơ bản K ($n = 1$), năng lượng $E_K = -13{,}6$ eV. Chọn một mức cao hơn để nguyên tử hấp thụ photon, rồi chọn mức thấp hơn để nó phát xạ photon.',
      };
    }
    const { from, to } = last;
    const hi = Math.max(from, to);
    const lo = Math.min(from, to);
    const energy = `$\\varepsilon = E_${nameOf(hi)} - E_${nameOf(lo)} = ${numTex(levelEv(hi), 2)} - (${numTex(levelEv(lo), 2)}) \\approx ${numTex(photon.ev, 2)}$ eV, $\\lambda = \\dfrac{hc}{\\varepsilon} \\approx ${numTex(photon.nm, 0)}$ nm`;
    const colour = colourName(photon.nm);
    const where =
      photon.region === 'nhìn thấy'
        ? `vạch màu ${colour} trong vùng nhìn thấy`
        : `bức xạ ${photon.region}, mắt không nhìn thấy`;
    const series = photon.series ? ` (dãy ${photon.series})` : '';
    if (photon.emits) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Electron chuyển từ mức ${nameOf(from)} xuống mức ${nameOf(to)}: nguyên tử phát ra một photon ${energy}, là ${where}${series}.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Electron chuyển từ mức ${nameOf(from)} lên mức ${nameOf(to)}: nguyên tử phải hấp thụ đúng một photon ${energy}, là ${where}${series}. Photon có năng lượng khác không bị hấp thụ.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Các mức năng lượng của nguyên tử hydrogen</h3>
    <svg
      viewBox="0 0 360 260"
      class="mx-auto block w-full max-w-md select-none"
      aria-label="Sơ đồ mức năng lượng của nguyên tử hydrogen. Chọn một mức để electron chuyển tới."
      role="group"
    >
      <text x="350" y="14" font-size="10" fill="#64748b" text-anchor="end">
        (khoảng cách các mức không theo tỉ lệ)
      </text>
      {#each LEVELS as L (L.n)}
        <g
          role="button"
          tabindex="-1"
          aria-label={`Mức ${L.name}, n = ${L.n}, năng lượng ${formatNumber(levelEv(L.n), 2)} eV${L.n === level ? ', electron đang ở đây' : ''}`}
          aria-pressed={L.n === level}
          class="cursor-pointer"
          onclick={() => jump(L.n)}
          onkeydown={(e) => onKey(e, L.n)}
        >
          <rect x="40" y={yOf(L.n) - 14} width="230" height="28" fill="transparent" />
          <line
            x1="70"
            x2="240"
            y1={yOf(L.n)}
            y2={yOf(L.n)}
            stroke={L.n === level ? '#4f46e5' : '#334155'}
            stroke-width={L.n === level ? 3 : 2}
          />
          <text x="62" y={yOf(L.n) + 4} font-size="11" fill="#334155" text-anchor="end">
            {L.name} (n = {L.n})
          </text>
          <text x="246" y={yOf(L.n) + 4} font-size="11" fill="#334155">
            {formatNumber(levelEv(L.n), 2)} eV
          </text>
        </g>
      {/each}
      {#if last && photon}
        <line
          x1="150"
          x2="150"
          y1={yOf(last.from)}
          y2={yOf(last.to)}
          stroke="#94a3b8"
          stroke-width="2"
          stroke-dasharray="4 3"
        />
        <path
          d="M 160 {(yOf(last.from) + yOf(last.to)) / 2} q 6 -8 12 0 t 12 0 t 12 0 t 12 0"
          fill="none"
          stroke={photonColor}
          stroke-width="3"
        />
        <text
          x="214"
          y={(yOf(last.from) + yOf(last.to)) / 2 + 4}
          font-size="11"
          font-weight="600"
          fill={photonColor}
        >
          {photon.emits ? 'phát ra →' : '← hấp thụ'}
        </text>
      {/if}
      <circle cx="150" cy={yOf(level)} r="7" fill="#2563eb" />
    </svg>
    <div class="flex flex-wrap gap-2" role="group" aria-label="Chuyển electron tới mức">
      {#each LEVELS as L (L.n)}
        <button
          type="button"
          class={L.n === level ? button.primary : button.quiet}
          aria-pressed={L.n === level}
          onclick={() => jump(L.n)}>{L.name}</button
        >
      {/each}
      <button
        type="button"
        class={button.secondary}
        onclick={() => {
          seen = {};
          last = null;
        }}>Xoá phổ</button
      >
    </div>
  </div>

  <div class="{card} space-y-2 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Quang phổ vạch thu được (vùng nhìn thấy, {VISIBLE.min} nm đến {VISIBLE.max} nm)
    </p>
    <svg
      viewBox="0 0 {SW} 92"
      class="block w-full select-none"
      role="img"
      aria-label={visible.length
        ? `Các vạch nhìn thấy: ${visible.map((l) => `${formatNumber(l.nm, 0)} nm màu ${colourName(l.nm)}`).join(', ')}.`
        : 'Chưa có vạch nào trong vùng nhìn thấy.'}
    >
      <defs>
        <linearGradient id="h-spectrum">
          {#each GRADIENT as g (g.offset)}
            <stop offset={g.offset} stop-color={g.color} />
          {/each}
        </linearGradient>
      </defs>
      <text x="0" y="10" font-size="10" fill="#334155">Phát xạ: vạch màu trên nền tối</text>
      <rect x="0" y="14" width={SW} height="26" fill="#0f172a" />
      {#each visible.filter((l) => l.emitted) as l (`${l.hi}-${l.lo}`)}
        <rect x={sx.map(l.nm) - 1.5} y="14" width="3" height="26" fill={spectrumColor(l.nm)} />
      {/each}
      <text x="0" y="56" font-size="10" fill="#334155">Hấp thụ: vạch tối trên nền cầu vồng</text>
      <rect x="0" y="60" width={SW} height="26" fill="url(#h-spectrum)" />
      {#each visible.filter((l) => l.absorbed) as l (`${l.hi}-${l.lo}`)}
        <rect x={sx.map(l.nm) - 1.5} y="60" width="3" height="26" fill="#0f172a" />
      {/each}
    </svg>
    {#if hidden.length}
      <p class="text-sm text-slate-600">
        Ngoài vùng nhìn thấy:
        {hidden
          .map(
            (l) =>
              `${formatNumber(l.nm, 0)} nm (${l.region}, ${l.emitted && l.absorbed ? 'phát xạ và hấp thụ' : l.emitted ? 'phát xạ' : 'hấp thụ'})`,
          )
          .join('; ')}.
      </p>
    {/if}
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
