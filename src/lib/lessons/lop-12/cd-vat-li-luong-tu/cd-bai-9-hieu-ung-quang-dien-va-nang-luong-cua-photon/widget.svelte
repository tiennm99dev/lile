<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rng } from '#lib/core/drill.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { regionOf, sciTex, spectrumColor } from '../_shared/quantum.js';
  import { METALS, freeElectron, photocurrent, photoelectric, stepElectron } from './engine.js';

  /** @type {import('./engine.js').MetalId} */
  let metalId = $state('kem');
  let nm = $state(400);
  /** Photons a second on the cathode, in units of 10¹³. */
  let flux = $state(4);
  let U = $state(1);
  let running = $state(!reducedMotion());

  const photo = $derived(photoelectric(nm, metalId));
  const lightColor = $derived(spectrumColor(nm) ?? (nm < 380 ? '#7c3aed' : '#7f1d1d'));
  const current = $derived(photocurrent(U, flux * 1e13, photo));
  const metalName = $derived(METALS.find((m) => m.id === metalId)?.name ?? '');
  const lambda0 = $derived((METALS.find((m) => m.id === metalId)?.lambda0 ?? 0) * 1000);

  // ---- animation: photons fly to the plate, freed electrons cross the gap ----
  const rand = rng(2024);
  /** @type {Array<{ t: number, y: number }>} */
  let photons = $state([]);
  /** @type {import('./engine.js').Electron[]} */
  let electrons = $state([]);
  let freed = $state(0);
  let arrived = $state(0);
  let returned = $state(0);
  let spawn = 0;

  $effect(() => {
    // Start counting again whenever the experiment changes.
    void [metalId, nm, flux, U];
    freed = 0;
    arrived = 0;
    returned = 0;
  });

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      spawn += flux * 1.5 * dt;
      /** @type {Array<{ t: number, y: number }>} */
      const nextPhotons = [];
      for (const p of photons) {
        const t = p.t + dt / 0.7;
        if (t < 1) nextPhotons.push({ t, y: p.y });
        else if (photo.emits) {
          electrons.push(freeElectron(rand, photo.wMax, p.y));
          freed += 1;
        }
      }
      while (spawn >= 1) {
        spawn -= 1;
        nextPhotons.push({ t: 0, y: 0.1 + 0.8 * rand() });
      }
      photons = nextPhotons;
      electrons = electrons.filter((e) => {
        const end = stepElectron(e, U, dt);
        if (end === 'anode') arrived += 1;
        if (end === 'back') returned += 1;
        return end === null;
      });
    });
  });

  // ---- drawing ----
  const PLATE_X = 70;
  const ANODE_X = 300;
  const TOP_Y = 70;
  const BOT_Y = 170;
  /** @param {number} y */
  const plateY = (y) => TOP_Y + (BOT_Y - TOP_Y) * y;
  /** @param {{ t: number, y: number }} p */
  const photonAt = (p) => ({ x: 30 + (PLATE_X - 30) * p.t, y: 30 + (plateY(p.y) - 30) * p.t });

  // ---- I–U characteristic ----
  const UMIN = -3;
  const UMAX = 3;
  const W = 320;
  const HGT = 170;
  const gx = linear(UMIN, UMAX, 36, W - 10);
  const IMAX = 10 * 1e13 * 1.6e-19;
  const gy = linear(0, IMAX * 1.05, HGT - 26, 14);
  const curve = $derived(
    Array.from({ length: 121 }, (_, i) => {
      const u = UMIN + ((UMAX - UMIN) * i) / 120;
      return { x: gx.map(u), y: gy.map(photocurrent(u, flux * 1e13, photo)) };
    }),
  );
  /** @param {number} amps */
  const micro = (amps) => formatNumber(amps * 1e6, 2);

  const note = $derived.by(() => {
    const eps = `Mỗi photon có năng lượng $\\varepsilon = \\dfrac{hc}{\\lambda} \\approx ${numTex(photo.eps, 2)}$ eV, công thoát của ${metalName.toLowerCase()} là $A \\approx ${numTex(photo.A, 2)}$ eV.`;
    if (!photo.emits) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${eps} Vì $\\varepsilon < A$ (bước sóng $${nm}$ nm lớn hơn giới hạn quang điện $\\lambda_0 = ${lambda0}$ nm) nên không electron nào bật ra, dù tăng số photon tới bao nhiêu.`,
      };
    }
    const back =
      U < 0
        ? -U >= photo.Uh
          ? ` Hiệu điện thế $U_{AK} = ${numTex(U, 1)}$ V đủ hãm mọi electron: chúng đều quay về catot, dòng quang điện bằng $0$.`
          : ` Với $U_{AK} = ${numTex(U, 1)}$ V, các electron có động năng ban đầu nhỏ hơn $${numTex(-U, 1)}$ eV bị điện trường đẩy về catot.`
        : ` Mọi electron bật ra đều tới anot: dòng quang điện bão hoà $I_{bh} = Ne \\approx ${numTex(current * 1e6, 2)}$ μA.`;
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${eps} Vì $\\varepsilon \\ge A$ nên electron bật ra với động năng ban đầu cực đại $W_{đmax} = \\varepsilon - A \\approx ${numTex(photo.wMax, 2)}$ eV, tốc độ cực đại $v_{0max} \\approx ${sciTex(photo.vMax)}$ m/s; hiệu điện thế hãm $U_h \\approx ${numTex(photo.Uh, 2)}$ V.${back}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Tế bào quang điện</h3>
    <svg
      viewBox="0 0 360 220"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Chiếu ánh sáng bước sóng ${nm} nm vào catot bằng ${metalName.toLowerCase()}, mỗi giây ${flux}·10¹³ photon. Hiệu điện thế giữa anot và catot ${formatNumber(U, 1)} V. ${photo.emits ? 'Electron bật ra khỏi catot.' : 'Không có electron bật ra.'}`}
    >
      <rect x="44" y="46" width="290" height="148" rx="60" fill="#f8fafc" stroke="#94a3b8" />
      <circle cx="26" cy="26" r="14" fill={lightColor} opacity="0.85" />
      <text x="44" y="22" font-size="11" fill="#334155">nguồn sáng {nm} nm ({regionOf(nm)})</text>
      <rect x={PLATE_X - 8} y={TOP_Y} width="8" height={BOT_Y - TOP_Y} fill="#64748b" />
      <rect x={ANODE_X} y={TOP_Y + 10} width="6" height={BOT_Y - TOP_Y - 20} fill="#b45309" />
      <text x={PLATE_X - 4} y={BOT_Y + 18} font-size="11" fill="#334155" text-anchor="middle"
        >K ({metalName})</text
      >
      <text x={ANODE_X + 3} y={BOT_Y + 18} font-size="11" fill="#334155" text-anchor="middle"
        >A</text
      >
      {#each photons as p, i (i)}
        {@const at = photonAt(p)}
        <circle cx={at.x} cy={at.y} r="3" fill={lightColor} />
      {/each}
      {#each electrons as e, i (i)}
        <circle
          cx={PLATE_X + (ANODE_X - PLATE_X) * e.s}
          cy={plateY(e.y)}
          r="3.5"
          fill={e.dir > 0 ? '#2563eb' : '#e11d48'}
        />
      {/each}
      <text x="190" y="212" font-size="11" fill="#334155" text-anchor="middle"
        >U_AK = {formatNumber(U, 1)} V</text
      >
    </svg>
    <div class="flex flex-wrap items-center gap-3 text-sm text-slate-700">
      <button type="button" class={button.secondary} onclick={() => (running = !running)}>
        {running ? 'Tắt đèn' : 'Bật đèn'}
      </button>
      <p aria-live="polite" class="tabular-nums">
        Electron bật ra: <b>{freed}</b> · tới anot: <b>{arrived}</b> · quay về catot:
        <b>{returned}</b>
      </p>
    </div>
    <SegmentedControl
      label="Kim loại làm catot"
      options={METALS.map((m) => ({ value: m.id, label: m.name }))}
      bind:value={metalId}
    />
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Bước sóng ánh sáng λ"
        bind:value={nm}
        min={200}
        max={700}
        step={5}
        unit="nm"
      />
      <SliderField
        label="Số photon tới mỗi giây"
        bind:value={flux}
        min={1}
        max={10}
        step={1}
        format={(v) => `${v}·10¹³`}
      />
      <SliderField
        label="Hiệu điện thế U_AK"
        bind:value={U}
        min={-3}
        max={3}
        step={0.1}
        unit="V"
        format={(v) => formatNumber(v, 1)}
      />
    </div>
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {HGT}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Đường đặc trưng vôn – ampe: dòng quang điện bão hoà ${micro(flux * 1e13 * 1.6e-19 * (photo.emits ? 1 : 0))} μA, hiệu điện thế hãm ${formatNumber(photo.Uh, 2)} V. Ở U_AK = ${formatNumber(U, 1)} V, I = ${micro(current)} μA.`}
    >
      <line x1="36" x2={W - 10} y1={gy.map(0)} y2={gy.map(0)} stroke="#334155" />
      <line x1={gx.map(0)} x2={gx.map(0)} y1="10" y2={HGT - 26} stroke="#334155" />
      {#each [-3, -2, -1, 1, 2] as u (u)}
        <text x={gx.map(u)} y={HGT - 12} font-size="10" fill="#475569" text-anchor="middle"
          >{formatNumber(u)}</text
        >
      {/each}
      <text x={W - 10} y={HGT - 1} font-size="11" fill="#334155" text-anchor="end">U_AK (V)</text>
      <text x={gx.map(0) + 4} y="12" font-size="11" fill="#334155">I (μA)</text>
      <polyline points={pointsAttr(curve)} fill="none" stroke="#4f46e5" stroke-width="2.5" />
      {#if photo.emits && photo.Uh > 0 && photo.Uh <= -UMIN}
        <text
          x={gx.map(-photo.Uh)}
          y={gy.map(0) - 6}
          font-size="10"
          fill="#e11d48"
          text-anchor="middle">−U_h</text
        >
      {/if}
      <circle cx={gx.map(U)} cy={gy.map(current)} r="5" fill="#e11d48" />
    </svg>
    <p class="px-2 text-xs text-slate-500">
      Mô hình: mỗi photon tới catot làm bật ra một electron (khi ε ≥ A). Ở U_AK = {formatNumber(
        U,
        1,
      )} V, I ≈ {micro(current)} μA.
    </p>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
