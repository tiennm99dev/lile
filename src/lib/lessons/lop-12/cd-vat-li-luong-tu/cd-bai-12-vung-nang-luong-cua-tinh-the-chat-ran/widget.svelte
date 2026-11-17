<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { sciTex, spectrumColor, wavelengthNm } from '../_shared/quantum.js';
  import { MATERIALS, carriers, material, relativeResistance } from './engine.js';

  /** @type {import('./engine.js').MaterialId} */
  let id = $state('silic');
  let T = $state(300);
  let photonEv = $state(0);
  let level = $state(100);

  const LIGHTS = [
    { value: 0, label: 'Không chiếu sáng' },
    { value: 0.9, label: 'Hồng ngoại 0,9 eV' },
    { value: 1.9, label: 'Đỏ 1,9 eV' },
    { value: 3.1, label: 'Tím 3,1 eV' },
    { value: 6, label: 'Tử ngoại 6 eV' },
  ];

  const mat = $derived(material(id));
  const isMetal = $derived(mat.kind === 'kim loại');
  const lit = $derived(photonEv > 0 && level > 0);
  const at = $derived({ T, photonEv, light: lit ? level / 100 : 0 });
  const n = $derived(carriers(id, at));
  const R = $derived(relativeResistance(id, at));
  const lifts = $derived(lit && !isMetal && photonEv >= mat.gap);

  // ---- band drawing: energy up, the gap drawn to scale (0,6 eV ↔ 18 px, capped) ----
  const BAND_H = 46;
  const gapPx = $derived(isMetal ? 0 : Math.min(150, 30 * mat.gap));
  const vTop = $derived(150 + gapPx / 2);
  const cBottom = $derived(150 - gapPx / 2);
  /** Dots stand for the order of magnitude of the conduction density, not a count. */
  const dots = $derived(isMetal ? 16 : Math.max(0, Math.min(14, Math.round(Math.log10(n) - 6))));
  /** @param {number} k @param {number} count */
  const dotX = (k, count) => 120 + (180 * (k + 0.5)) / Math.max(1, count);
  const lightColor = $derived(
    photonEv > 0
      ? (spectrumColor(wavelengthNm(photonEv)) ?? (photonEv > 3.2 ? '#7c3aed' : '#7f1d1d'))
      : '',
  );

  /** @param {number} r */
  const ratioText = (r) =>
    r >= 1 ? `gấp $${numTex(r, 2)}$ lần` : `chỉ bằng $${r < 0.001 ? sciTex(r) : numTex(r, 3)}$ lần`;

  const note = $derived.by(() => {
    if (isMetal) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Ở kim loại, vùng chứa electron hoá trị chỉ được lấp đầy một phần (hoặc chồng lên vùng dẫn), nên luôn có rất nhiều electron tự do, $n \\approx ${sciTex(n)}\\ \\text{cm}^{-3}$, gần như không đổi. Nhiệt độ càng cao, các ion ở nút mạng dao động càng mạnh, electron va chạm với chúng càng nhiều. Ở $${T}$ K, điện trở ${ratioText(R)} điện trở lúc $300$ K.${lit ? ' Chiếu sáng hầu như không làm thay đổi điện trở của kim loại.' : ''}`,
      };
    }
    const head = `${mat.name}: độ rộng vùng cấm $E_g = ${numTex(mat.gap, 2)}$ eV. Mật độ electron trong vùng dẫn $n \\approx ${sciTex(n)}\\ \\text{cm}^{-3}$`;
    if (mat.kind === 'điện môi' && !lifts) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${head}: vùng cấm quá rộng, chuyển động nhiệt không đưa được electron lên vùng dẫn. Vật liệu gần như không dẫn điện.${lit ? ` Photon $${numTex(photonEv, 1)}$ eV nhỏ hơn $E_g$ nên không bị hấp thụ để tạo hạt tải điện.` : ''}`,
      };
    }
    const light = lit
      ? lifts
        ? ` Photon $${numTex(photonEv, 1)}$ eV $\\ge E_g$ đưa thêm electron từ vùng hoá trị lên vùng dẫn, để lại lỗ trống: điện trở giảm mạnh (hiện tượng quang dẫn).`
        : ` Photon $${numTex(photonEv, 1)}$ eV $< E_g$ không đủ năng lượng đưa electron qua vùng cấm, nên chiếu sáng không làm thay đổi điện trở.`
      : '';
    return {
      tone: lifts ? /** @type {const} */ ('ok') : /** @type {const} */ ('info'),
      text: `${head}. Nhiệt độ càng cao, càng nhiều electron nhận đủ năng lượng vượt qua vùng cấm. Điện trở ${ratioText(R)} điện trở lúc $300$ K, không chiếu sáng.${light}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Sơ đồ vùng năng lượng</h3>
    <svg
      viewBox="0 0 360 300"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`${mat.name} ở ${T} K${lit ? `, chiếu photon ${formatNumber(photonEv, 1)} eV` : ''}. ${isMetal ? 'Vùng dẫn chứa sẵn nhiều electron tự do.' : `Vùng cấm rộng ${formatNumber(mat.gap, 2)} eV; ${dots === 0 ? 'hầu như không có electron trong vùng dẫn' : 'có electron trong vùng dẫn và lỗ trống trong vùng hoá trị'}.`}`}
    >
      <defs>
        <marker id="band-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={lightColor || '#475569'} />
        </marker>
      </defs>
      <text x="14" y="18" font-size="11" fill="#334155">Năng lượng ↑</text>
      {#if isMetal}
        <rect x="110" y="70" width="200" height="140" fill="#e0e7ff" stroke="#6366f1" />
        <rect x="110" y="140" width="200" height="70" fill="#c7d2fe" />
        <text x="104" y="110" font-size="11" fill="#3730a3" text-anchor="end">mức còn trống</text>
        <text x="104" y="190" font-size="11" fill="#3730a3" text-anchor="end">mức có electron</text>
        {#each Array.from({ length: dots }, (_, k) => k) as k (k)}
          <circle cx={dotX(k % 8, 8)} cy={k < 8 ? 132 : 152} r="5" fill="#2563eb" />
        {/each}
      {:else}
        <rect
          x="110"
          y={cBottom - BAND_H}
          width="200"
          height={BAND_H}
          fill="#e0e7ff"
          stroke="#6366f1"
        />
        <rect x="110" y={vTop} width="200" height={BAND_H} fill="#c7d2fe" stroke="#6366f1" />
        <text x="104" y={cBottom - BAND_H / 2 + 4} font-size="11" fill="#3730a3" text-anchor="end"
          >vùng dẫn</text
        >
        <text x="104" y={vTop + BAND_H / 2 + 4} font-size="11" fill="#3730a3" text-anchor="end"
          >vùng hoá trị</text
        >
        <text x="104" y="154" font-size="11" fill="#64748b" text-anchor="end">vùng cấm</text>
        <text x="210" y="154" font-size="11" fill="#475569" text-anchor="middle"
          >Eg = {formatNumber(mat.gap, 2)} eV</text
        >
        {#each Array.from({ length: dots }, (_, k) => k) as k (k)}
          <circle cx={dotX(k, dots)} cy={cBottom - 12} r="5" fill="#2563eb" />
          <circle
            cx={dotX(k, dots)}
            cy={vTop + 12}
            r="5"
            fill="white"
            stroke="#2563eb"
            stroke-width="2"
          />
        {/each}
        {#if lit}
          <line
            x1="140"
            x2="140"
            y1={vTop + 4}
            y2={lifts ? cBottom - 2 : Math.max(cBottom + 4, vTop - 30 * photonEv)}
            stroke={lightColor}
            stroke-width="3"
            marker-end="url(#band-arrow)"
          />
          {#if !lifts}
            <text x="148" y={vTop - 6} font-size="11" fill="#b91c1c">hf &lt; Eg</text>
          {/if}
        {/if}
      {/if}
      <text x="14" y="282" font-size="11" fill="#334155"> ● electron trong vùng dẫn </text>
      {#if !isMetal}
        <text x="200" y="282" font-size="11" fill="#334155">○ lỗ trống</text>
      {/if}
      <text x="14" y="296" font-size="9" fill="#64748b">
        Số chấm tăng theo bậc độ lớn của mật độ hạt tải, không phải số hạt thật.
      </text>
    </svg>
    <SegmentedControl
      label="Vật liệu"
      options={MATERIALS.map((m) => ({ value: m.id, label: m.name }))}
      bind:value={id}
    />
    <SliderField label="Nhiệt độ T" bind:value={T} min={200} max={500} step={10} unit="K" />
    <SegmentedControl label="Chiếu sáng" options={LIGHTS} bind:value={photonEv} />
    {#if photonEv > 0}
      <SliderField
        label="Cường độ chùm sáng"
        bind:value={level}
        min={0}
        max={100}
        step={10}
        unit="%"
      />
    {/if}
    <p class="text-sm text-slate-700" aria-live="polite">
      Điện trở so với lúc 300 K, không chiếu sáng: <b class="tabular-nums"
        >{mat.kind === 'điện môi' && !lifts
          ? 'rất lớn, gần như không dẫn điện'
          : R >= 0.001
            ? `× ${formatNumber(R, 3)}`
            : 'nhỏ hơn 0,001 lần'}</b
      >
    </p>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
