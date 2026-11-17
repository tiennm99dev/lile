<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { METALS, kindOf, lineResistance, transformer, transmit } from './engine.js';

  // Part 1: the transformer on the bench.
  const U1 = 220;
  let N1 = $state(1000);
  let N2 = $state(100);
  let R = $state(22);
  let ac = $state(true);
  const SOURCE_OPTIONS = [
    { value: 'ac', label: 'Nguồn xoay chiều 220 V' },
    { value: 'dc', label: 'Nguồn một chiều 220 V' },
  ];
  const t = $derived(transformer({ U1, N1, N2, R, ac }));

  const CORE = { x: 96, y: 34, w: 168, h: 132, bar: 22 };
  /** Coil turns drawn on a limb, about one per 150 real turns. */
  const turnsDrawn = (/** @type {number} */ n) => clamp(Math.round(n / 150), 2, 26);
  /** @param {number} count @param {number} x */
  function coil(count, x) {
    const top = CORE.y + CORE.bar + 6;
    const span = CORE.h - 2 * CORE.bar - 12;
    return Array.from({ length: count }, (_, i) => {
      const y = top + (span * (i + 0.5)) / count;
      return { x1: x - 7, y1: y - 2, x2: x + CORE.bar + 7, y2: y + 2 };
    });
  }
  const primary = $derived(coil(turnsDrawn(N1), CORE.x));
  const secondary = $derived(coil(turnsDrawn(N2), CORE.x + CORE.w - CORE.bar));

  const benchNote = $derived.by(() => {
    if (!ac) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Dòng điện một chiều không đổi tạo ra từ thông không đổi trong lõi, nên cuộn thứ cấp không có suất điện động cảm ứng: $U_2 = 0$. Cuộn sơ cấp lúc này chỉ còn điện trở rất nhỏ của dây, dòng điện rất lớn có thể làm cháy máy. Máy biến áp chỉ hoạt động với dòng điện xoay chiều.',
      };
    }
    const ratio = `$\\dfrac{U_2}{U_1} = \\dfrac{N_2}{N_1} = ${numTex(t.ratio, 3)}$`;
    return {
      tone: /** @type {const} */ ('info'),
      text: `${kindOf(N1, N2).replace(/^m/, 'M')}: ${ratio}, nên $U_2 \\approx ${numTex(t.U2, 1)}$ V. Dòng điện thứ cấp $I_2 = \\dfrac{U_2}{R} \\approx ${numTex(t.I2, 3)}$ A, dòng điện sơ cấp $I_1 = \\dfrac{N_2}{N_1}I_2 \\approx ${numTex(t.I1, 3)}$ A. Công suất hai cuộn bằng nhau: $U_1I_1 = U_2I_2 \\approx ${numTex(t.P, 1)}$ W.`,
    };
  });

  // Part 2: the power line.
  const P = 500e3;
  const U_GEN = 5e3;
  const SECTION = 100;
  const K_OPTIONS = [1, 2, 5, 10, 20, 50].map((k) => ({
    value: k,
    label: `${formatNumber((U_GEN * k) / 1000)} kV`,
  }));
  const METAL_OPTIONS = Object.entries(METALS).map(([value, m]) => ({ value, label: m.name }));
  let k = $state(1);
  let km = $state(20);
  /** @type {keyof typeof METALS} */
  let metal = $state('nhom');

  const Rline = $derived(lineResistance(METALS[metal].rho, km, SECTION));
  const line = $derived(transmit({ P, U: U_GEN * k, R: Rline }));
  const base = $derived(transmit({ P, U: U_GEN, R: Rline }));
  const kw = (/** @type {number} */ w) => formatNumber(w / 1000, 2);
  const BAR = 300;

  const lineNote = $derived.by(() => {
    const head = `Đường dây dài $${km}$ km (hai dây, $l = ${2 * km}$ km), tiết diện $${SECTION}$ mm², $R = \\rho\\dfrac{l}{S} \\approx ${numTex(Rline, 2)}\\ \\Omega$. Điện áp truyền đi $U = ${numTex((U_GEN * k) / 1000)}$ kV, dòng điện trên dây $I = \\dfrac{P}{U} = ${numTex(line.I, 2)}$ A.`;
    if (line.delivered <= 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${head} Công suất hao phí theo công thức $\\dfrac{P^2}{U^2}R$ còn lớn hơn công suất phát: với điện áp thấp như vậy không thể truyền điện đi xa. Hãy tăng điện áp truyền đi.`,
      };
    }
    const cut =
      k > 1
        ? ` So với khi truyền ở $5$ kV, điện áp tăng $${k}$ lần nên hao phí giảm $${k}^2 = ${k * k}$ lần.`
        : ' Thử tăng điện áp truyền đi bằng máy tăng áp.';
    return {
      tone: /** @type {'ok' | 'info'} */ (line.efficiency >= 0.9 ? 'ok' : 'info'),
      text: `${head} Hao phí $P_{hp} = \\dfrac{P^2}{U^2}R \\approx ${numTex(line.loss / 1000, 2)}$ kW, hiệu suất truyền tải $H \\approx ${numTex(line.efficiency * 100, 1)}\\%$.${cut}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Máy biến áp trên bàn thí nghiệm</h3>
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Máy biến áp: cuộn sơ cấp ${N1} vòng nối nguồn ${ac ? 'xoay chiều' : 'một chiều'} ${U1} V, cuộn thứ cấp ${N2} vòng nối điện trở tải ${R} Ω; điện áp ra ${formatNumber(t.U2, 1)} V.`}
    >
      <path
        d="M {CORE.x} {CORE.y} h {CORE.w} v {CORE.h} h {-CORE.w} Z M {CORE.x + CORE.bar} {CORE.y +
          CORE.bar} v {CORE.h - 2 * CORE.bar} h {CORE.w - 2 * CORE.bar} v {-(
          CORE.h -
          2 * CORE.bar
        )} Z"
        fill="#cbd5e1"
        fill-rule="evenodd"
        stroke="#64748b"
      />
      {#if ac}
        <rect
          x={CORE.x + CORE.bar / 2}
          y={CORE.y + CORE.bar / 2}
          width={CORE.w - CORE.bar}
          height={CORE.h - CORE.bar}
          fill="none"
          stroke="#7c3aed"
          stroke-dasharray="5 4"
        />
        <text x="180" y={CORE.y - 6} font-size="10" fill="#7c3aed" text-anchor="middle"
          >từ thông biến thiên trong lõi</text
        >
      {/if}
      {#each primary as s, i (i)}
        <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#b45309" stroke-width="2.5" />
      {/each}
      {#each secondary as s, i (i)}
        <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#0f766e" stroke-width="2.5" />
      {/each}
      <!-- primary circuit -->
      <polyline
        points="{CORE.x - 7},{primary[0].y1} 40,{primary[0].y1} 40,84"
        fill="none"
        stroke="#334155"
      />
      <polyline
        points="{CORE.x - 7},{primary[primary.length - 1].y1} 40,{primary[primary.length - 1]
          .y1} 40,116"
        fill="none"
        stroke="#334155"
      />
      <circle cx="40" cy="100" r="16" fill="#fff" stroke="#334155" />
      <text x="40" y="105" font-size="14" text-anchor="middle" fill="#334155">{ac ? '~' : '='}</text
      >
      <text x="40" y="190" font-size="11" text-anchor="middle" fill="#b45309">N₁ = {N1}</text>
      <!-- secondary circuit -->
      <polyline
        points="{CORE.x + CORE.w + 7},{secondary[0].y1} 320,{secondary[0].y1} 320,78"
        fill="none"
        stroke="#334155"
      />
      <polyline
        points="{CORE.x + CORE.w + 7},{secondary[secondary.length - 1].y1} 320,{secondary[
          secondary.length - 1
        ].y1} 320,122"
        fill="none"
        stroke="#334155"
      />
      <rect x="311" y="78" width="18" height="44" fill="#fff" stroke="#334155" />
      <text x="320" y="190" font-size="11" text-anchor="middle" fill="#0f766e">N₂ = {N2}</text>
      <text x="40" y="20" font-size="11" text-anchor="middle" fill="#334155">U₁ = {U1} V</text>
      <text x="320" y="20" font-size="11" text-anchor="middle" fill="#334155"
        >U₂ ≈ {formatNumber(t.U2, 1)} V</text
      >
    </svg>
    <SegmentedControl
      label="Nguồn nối vào cuộn sơ cấp"
      options={SOURCE_OPTIONS}
      value={ac ? 'ac' : 'dc'}
      onchange={(v) => (ac = v === 'ac')}
    />
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField label="Số vòng sơ cấp N₁" bind:value={N1} min={100} max={2000} step={50} />
      <SliderField label="Số vòng thứ cấp N₂" bind:value={N2} min={50} max={4000} step={50} />
      <SliderField label="Điện trở tải R" bind:value={R} min={10} max={500} step={2} unit="Ω" />
    </div>
    <FeedbackNote tone={benchNote.tone} text={benchNote.text} />
  </div>

  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Truyền tải {formatNumber(P / 1000)} kW đi xa</h3>
    <svg
      viewBox="0 0 360 130"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Công suất phát ${kw(P)} kW: hao phí trên đường dây ${kw(line.loss)} kW, tới nơi tiêu thụ ${kw(line.delivered)} kW.`}
    >
      {#each [{ x: 4, t: 'Nhà máy' }, { x: 78, t: 'Tăng áp' }, { x: 222, t: 'Hạ áp' }, { x: 296, t: 'Nơi dùng' }] as b (b.t)}
        <rect x={b.x} y="8" width="60" height="30" rx="6" fill="#eef2ff" stroke="#6366f1" />
        <text x={b.x + 30} y="27" font-size="10" text-anchor="middle" fill="#3730a3">{b.t}</text>
      {/each}
      <line x1="64" y1="23" x2="78" y2="23" stroke="#334155" />
      <line x1="138" y1="18" x2="222" y2="18" stroke="#334155" stroke-width="2" />
      <line x1="138" y1="28" x2="222" y2="28" stroke="#334155" stroke-width="2" />
      <line x1="282" y1="23" x2="296" y2="23" stroke="#334155" />
      <text x="180" y="50" font-size="10" text-anchor="middle" fill="#334155"
        >{km} km, U = {formatNumber((U_GEN * k) / 1000)} kV, I ≈ {formatNumber(line.I, 1)} A</text
      >
      <rect x="30" y="66" width={BAR} height="22" fill="#f1f5f9" stroke="#cbd5e1" />
      <rect x="30" y="66" width={(BAR * line.delivered) / P} height="22" fill="#16a34a" />
      <rect
        x={30 + (BAR * line.delivered) / P}
        y="66"
        width={(BAR * line.loss) / P}
        height="22"
        fill="#dc2626"
      />
      <text x="30" y="104" font-size="10" fill="#15803d">Tới nơi dùng: {kw(line.delivered)} kW</text
      >
      <text x="330" y="120" font-size="10" fill="#b91c1c" text-anchor="end"
        >Hao phí toả nhiệt: {kw(line.loss)} kW</text
      >
    </svg>
    <SegmentedControl
      label="Điện áp truyền đi (sau máy tăng áp)"
      options={K_OPTIONS}
      bind:value={k}
    />
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Khoảng cách truyền tải"
        bind:value={km}
        min={10}
        max={100}
        step={5}
        unit="km"
      />
      <SegmentedControl
        label="Vật liệu dây dẫn"
        options={METAL_OPTIONS}
        value={metal}
        onchange={(v) => (metal = v === 'dong' ? 'dong' : 'nhom')}
      />
    </div>
    <FeedbackNote tone={lineNote.tone} text={lineNote.text} />
    <p class="text-xs text-slate-500">
      Ở cùng đường dây, nếu truyền ở 5 kV thì hao phí {base.delivered > 0
        ? `là ${kw(base.loss)} kW`
        : 'còn lớn hơn công suất phát'}. Đổi dây nhôm sang dây đồng chỉ giảm hao phí khoảng 1,6 lần
      mà rất tốn kém; tăng điện áp hiệu quả hơn nhiều.
    </p>
  </div>
</div>
