<script>
  import { arrowHead } from '#lib/domain/arrow.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex, sciTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { flight, path } from './engine.js';

  const W = 360;
  const H = 240;
  /** Pixels per centimetre. */
  const PX = 50;
  /** Where the plates begin, px. */
  const X0 = 30;
  /** Plate length, cm. */
  const LENGTH_CM = 5;
  const X_MAX_CM = (W - 10 - X0) / PX;
  const POLARITY = [
    { value: 'tren', label: 'Bản trên mang điện +' },
    { value: 'duoi', label: 'Bản dưới mang điện +' },
  ];

  let u = $state(60);
  let dCm = $state(2);
  let v0 = $state(2);
  let polarity = $state('tren');
  /** Fraction of the flight shown by the moving dot, 0 to 1. */
  let shown = $state(1);
  let running = $state(false);
  let challenge = $state(false);

  const setup = $derived({ u, d: dCm / 100, length: LENGTH_CM / 100, v0: v0 * 1e7 });
  const f = $derived(flight(setup));
  const pts = $derived(path(setup, X_MAX_CM / 100, 60));
  // y measured toward the + plate; the + plate is up for 'tren'.
  const up = $derived(polarity === 'tren' ? 1 : -1);
  /** @param {number} x m */
  const sx = (x) => X0 + x * 100 * PX;
  /** @param {number} y m */
  const sy = (y) => H / 2 - up * y * 100 * PX;
  const halfPx = $derived((dCm / 2) * PX);
  const visible = $derived(pts.slice(0, Math.max(2, Math.ceil(shown * pts.length))));
  const head = $derived(visible[visible.length - 1]);
  const polyline = $derived(
    visible.map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' '),
  );
  const fieldArrows = $derived(
    Array.from({ length: 6 }, (_, i) => X0 + 25 + i * 40).map((x) => ({
      x,
      y1: H / 2 - up * (halfPx - 6),
      y2: H / 2 + up * (halfPx - 6),
    })),
  );
  // Goal: leave the plates with a deflection of at least 90% of d/2.
  const nearEdge = $derived(!f.hits && f.yEnd >= 0.9 * (setup.d / 2));

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      shown = Math.min(1, shown + dt * 0.8);
      if (shown >= 1) running = false;
    });
  });

  function fire() {
    if (reducedMotion()) {
      shown = 1;
      return;
    }
    shown = 0;
    running = true;
  }

  const note = $derived.by(() => {
    const e = `$E = \\dfrac{U}{d} = \\dfrac{${numTex(u)}}{${numTex(dCm / 100, 3)}} = ${sciTex(f.field)}$ V/m, gia tốc $a = \\dfrac{eE}{m} \\approx ${sciTex(f.accel)}$ m/s².`;
    if (u === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Khi $U = 0$, giữa hai bản không có điện trường: electron bay thẳng đều.',
      };
    }
    if (f.hits) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${e} Electron bị lực điện kéo về bản dương và đập vào bản tại $x \\approx ${numTex(f.xEnd * 100, 2)}$ cm.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${e} Electron bay hết bản sau $t = \\dfrac{\\ell}{v_0} \\approx ${sciTex(f.time)}$ s, lệch $y = \\dfrac{at^2}{2} \\approx ${numTex(f.yEnd * 100, 3)}$ cm về phía bản dương.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-900"
      role="img"
      aria-label={`Electron bay vào giữa hai bản phẳng dài 5 xentimét, cách nhau ${formatNumber(dCm)} xentimét, hiệu điện thế ${u} vôn. ${f.hits ? 'Electron đập vào bản dương.' : `Electron ra khỏi hai bản, lệch ${formatNumber(f.yEnd * 100, 2)} xentimét.`}`}
    >
      {#each [-1, 1] as side (side)}
        {@const plus = side === up}
        <rect
          x={X0}
          y={side === 1 ? H / 2 - halfPx - 6 : H / 2 + halfPx}
          width={LENGTH_CM * PX}
          height="6"
          fill={plus ? '#ef4444' : '#3b82f6'}
        />
        <text
          x={X0 + LENGTH_CM * PX + 8}
          y={side === 1 ? H / 2 - halfPx + 2 : H / 2 + halfPx + 8}
          font-size="14"
          font-weight="700"
          fill={plus ? '#fca5a5' : '#93c5fd'}>{plus ? '+' : '−'}</text
        >
      {/each}
      {#if u > 0}
        {#each fieldArrows as a (a.x)}
          <line x1={a.x} y1={a.y1} x2={a.x} y2={a.y2} stroke="#fbbf24" stroke-opacity="0.45" />
          <polygon points={arrowHead(a.x, a.y1, a.x, a.y2, 7)} fill="#fbbf24" fill-opacity="0.6" />
        {/each}
        <text x={X0 + 4} y={H / 2 + up * (halfPx - 16) + 4} font-size="11" fill="#fde68a">E</text>
      {/if}
      <rect x="4" y={H / 2 - 7} width="20" height="14" rx="3" fill="#64748b" />
      <polyline points={polyline} fill="none" stroke="#a5f3fc" stroke-width="2" />
      <circle cx={sx(head.x)} cy={sy(head.y)} r="4" fill="#67e8f9" />
      {#if challenge}
        <line
          x1={X0 + LENGTH_CM * PX}
          x2={X0 + LENGTH_CM * PX}
          y1={H / 2 - up * halfPx * 0.9}
          y2={H / 2 - up * halfPx}
          stroke="#4ade80"
          stroke-width="4"
        />
      {/if}
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Electron (chấm xanh) bay vào chính giữa hai bản với vận tốc v₀ song song với hai bản. Các mũi
      tên vàng là đường sức điện, đi từ bản dương sang bản âm.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Hiệu điện thế U" bind:value={u} min={0} max={200} step={5} unit="V" />
    <SliderField label="Khoảng cách d" bind:value={dCm} min={1} max={4} step={0.5} unit="cm" />
    <SliderField
      label="Vận tốc ban đầu v₀"
      bind:value={v0}
      min={0.8}
      max={3}
      step={0.1}
      format={(v) => `${formatNumber(v)}·10⁷`}
      unit="m/s"
    />
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <SegmentedControl label="Cực của hai bản" options={POLARITY} bind:value={polarity} hideLabel />
    <button type="button" class={button.primary} onclick={fire}>Bắn electron</button>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
  <div class="{card} space-y-2 p-3 text-sm">
    {#if challenge}
      <FeedbackNote
        tone={nearEdge ? 'ok' : 'info'}
        text={nearEdge
          ? `Đạt! Electron vừa sượt qua mép bản (lệch ${formatNumber(f.yEnd * 100, 2)} cm, gần bằng $\\dfrac{d}{2}$).`
          : 'Thử thách: chỉnh $U$ (hoặc $v_0$) để electron vừa kịp ra khỏi hai bản, đi qua vạch xanh ở mép bản mà không chạm bản.'}
      />
    {:else}
      <p class="text-slate-600">
        Thử tăng U: điện trường mạnh hơn nên quỹ đạo cong hơn. Tăng v₀: electron ở giữa hai bản ít
        thời gian hơn nên lệch ít hơn. {f.hits
          ? 'Hiện electron đang đập vào bản dương.'
          : `Hiện electron lệch ${formatNumber(f.yEnd * 100, 3)} cm khi ra khỏi hai bản.`}
      </p>
    {/if}
    <button
      type="button"
      class={button.quiet}
      aria-pressed={challenge}
      onclick={() => (challenge = !challenge)}
    >
      {challenge ? 'Tắt thử thách' : 'Thử thách: sượt qua mép bản'}
    </button>
  </div>
</div>
