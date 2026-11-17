<script>
  import { onDestroy } from 'svelte';
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { viewPoint } from '#lib/geom-engine/solid.js';
  import { fieldsAt, samples, wavelengthOf } from './engine.js';

  const W = 360;
  const H = 260;
  const CX = W / 2;
  const CY = H / 2 + 6;
  /** Pixels per metre, and the stretch of the drawn wave: 6 m of it, centred. */
  const S = 40;
  const LENGTH = 6;
  /** Drawn amplitude of both fields, in model metres. */
  const AMP = 1.1;
  const TURN = { minPitch: -80, maxPitch: 80 };
  const VIEWS = [
    { name: 'Nhìn nghiêng', view: { yaw: -35, pitch: 22 } },
    { name: 'Nhìn từ phía trước', view: { yaw: 0, pitch: 0 } },
    { name: 'Nhìn từ trên xuống', view: { yaw: 0, pitch: 80 } },
  ];

  let view = $state({ yaw: -35, pitch: 22 });
  let fMHz = $state(150);
  let probe = $state(1.5);
  let t = $state(0);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const lambda = $derived(wavelengthOf(fMHz * 1e6));
  const wave = $derived(samples(LENGTH, t, lambda, 120));
  const here = $derived(fieldsAt(probe, t, lambda));

  /**
   * Screen point of a model point; the wave runs from x = −3 m to 3 m.
   * @param {number} x @param {number} y @param {number} z
   */
  function at(x, y, z) {
    const v = viewPoint({ x: x - LENGTH / 2, y, z }, view);
    return { x: CX + S * v.x, y: CY + S * v.y };
  }

  /** @param {Array<{ x: number, y: number }>} pts */
  const line = (pts) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const eCurve = $derived(line(wave.map((s) => at(s.x, 0, AMP * s.e))));
  const bCurve = $derived(line(wave.map((s) => at(s.x, -AMP * s.b, 0))));
  const ribs = $derived(
    wave
      .filter((_, i) => i % 3 === 0)
      .map((s) => ({ base: at(s.x, 0, 0), e: at(s.x, 0, AMP * s.e), b: at(s.x, -AMP * s.b, 0) })),
  );
  const axisFrom = $derived(at(-0.3, 0, 0));
  const axisTo = $derived(at(LENGTH, 0, 0));
  const vFrom = $derived(at(LENGTH + 0.1, 0, 0));
  const vTo = $derived(at(LENGTH + 0.9, 0, 0));
  const pBase = $derived(at(probe, 0, 0));
  const pE = $derived(at(probe, 0, AMP * here.e));
  const pB = $derived(at(probe, -AMP * here.b, 0));

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }
  onDestroy(halt);

  function toggle() {
    if (playing) {
      halt();
      return;
    }
    playing = true;
    const rate = reducedMotion() ? 0.15 : 0.5;
    stop = frameLoop((dt) => {
      t = (t + dt * rate) % 1;
    });
  }

  const note = $derived.by(() => {
    if (playing)
      return 'Sóng đang truyền đi: các đỉnh sóng của $\\vec{E}$ và $\\vec{B}$ cùng dịch theo chiều $\\vec{v}$. Bấm "Dừng" để đọc giá trị của hai trường tại điểm đang xét.';
    const e = numTex(tidy(here.e, 2) + 0);
    const head = `Tại điểm cách đầu đoạn sóng $${numTex(tidy(probe, 1))}$ m: $E = ${e}\\,E_0$ và $B = ${e}\\,B_0$.`;
    const mag = Math.abs(here.e);
    const phase =
      mag < 0.05
        ? 'Lúc này $\\vec{E}$ và $\\vec{B}$ cùng bằng 0.'
        : mag > 0.97
          ? 'Lúc này $\\vec{E}$ và $\\vec{B}$ cùng đạt độ lớn cực đại.'
          : '$\\vec{E}$ và $\\vec{B}$ cùng tăng, cùng giảm: chúng dao động cùng pha.';
    const dir =
      mag < 0.05
        ? ''
        : ' Hai vectơ vuông góc với nhau và cùng vuông góc với phương truyền: $\\vec{E}$, $\\vec{B}$, $\\vec{v}$ theo thứ tự tạo thành một tam diện thuận.';
    return `${head} ${phase}${dir} Bước sóng $\\lambda = \\dfrac{c}{f} = \\dfrac{3 \\cdot 10^8}{${numTex(fMHz)} \\cdot 10^6} ${tidy(lambda, 2) === lambda ? '=' : '\\approx'} ${numTex(tidy(lambda, 2))}$ m.`;
  });
</script>

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <div
      class="touch-none select-none rounded-lg {focusRing}"
      role="slider"
      tabindex="0"
      aria-label="Góc nhìn sóng điện từ: kéo hoặc dùng phím mũi tên để xoay"
      aria-valuemin={-180}
      aria-valuemax={180}
      aria-valuenow={Math.round(view.yaw)}
      aria-valuetext="quay {formatNumber(Math.round(view.yaw))} độ, nghiêng {formatNumber(
        Math.round(view.pitch),
      )} độ"
      style="cursor:grab"
      use:turnSolid={{ view: () => view, onturn: (v) => (view = v), options: TURN }}
    >
      <svg
        viewBox="0 0 {W} {H}"
        class="mx-auto block w-full max-w-lg"
        role="img"
        aria-label="Sóng điện từ truyền theo phương ngang. Vectơ cường độ điện trường màu đỏ và vectơ cảm ứng từ màu xanh dao động cùng pha, vuông góc với nhau và vuông góc với phương truyền."
      >
        <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
        <g aria-hidden="true">
          {#each ribs as r, i (i)}
            <line
              x1={r.base.x}
              y1={r.base.y}
              x2={r.b.x}
              y2={r.b.y}
              stroke="#93c5fd"
              stroke-width="1.2"
            />
          {/each}
          <polyline points={bCurve} fill="none" stroke="#2563eb" stroke-width="2.2" />
          {#each ribs as r, i (i)}
            <line
              x1={r.base.x}
              y1={r.base.y}
              x2={r.e.x}
              y2={r.e.y}
              stroke="#fca5a5"
              stroke-width="1.2"
            />
          {/each}
          <polyline points={eCurve} fill="none" stroke="#dc2626" stroke-width="2.2" />
          <line
            x1={axisFrom.x}
            y1={axisFrom.y}
            x2={axisTo.x}
            y2={axisTo.y}
            stroke="#334155"
            stroke-width="1.5"
          />
          <ForceArrow x1={vFrom.x} y1={vFrom.y} x2={vTo.x} y2={vTo.y} color="#0f172a" label="v" />
          <ForceArrow x1={pBase.x} y1={pBase.y} x2={pB.x} y2={pB.y} color="#1d4ed8" label="B" />
          <ForceArrow x1={pBase.x} y1={pBase.y} x2={pE.x} y2={pE.y} color="#b91c1c" label="E" />
          <circle cx={pBase.x} cy={pBase.y} r="4" fill="#0f172a" />
        </g>
      </svg>
    </div>
    <figcaption class="px-2 pt-1 text-xs text-slate-500">
      Kéo trên hình (hoặc chọn hình rồi dùng phím mũi tên) để xoay góc nhìn. Đỏ: vectơ cường độ điện
      trường E; xanh: vectơ cảm ứng từ B; chấm đen: điểm đang xét.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} aria-pressed={playing} onclick={toggle}>
      {playing ? 'Dừng' : 'Cho sóng truyền đi'}
    </button>
    {#each VIEWS as v (v.name)}
      <button type="button" class={button.quiet} onclick={() => (view = { ...v.view })}
        >{v.name}</button
      >
    {/each}
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Tần số f" bind:value={fMHz} min={50} max={300} step={25} unit="MHz" />
    <SliderField
      label="Điểm đang xét, cách đầu đoạn sóng"
      bind:value={probe}
      min={0}
      max={LENGTH}
      step={0.1}
      unit="m"
    />
  </div>

  <FeedbackNote tone="info" text={note} />
</div>
