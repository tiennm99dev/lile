<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { card, focusRing } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { CURVE, nuclideName, nuclideTex, sideTex } from '../_shared/nuclear.js';
  import { FUSIONS, LIGHT_MAX, LIGHT_MIN, curveLine, epsFor, fission, fusionOf } from './engine.js';

  const W = 340;
  const H = 230;
  const LEFT = 36;
  const RIGHT = 10;
  const TOP = 14;
  const BOTTOM = 30;
  const px = linear(0, 240, LEFT, W - RIGHT);
  const py = linear(0, 9.5, H - BOTTOM, TOP);
  const LINE = pointsAttr(curveLine().map((p) => ({ x: px.map(p.x), y: py.map(p.y) })));

  let mode = $state(/** @type {'xem' | 'phan-hach' | 'nhiet-hach'} */ ('xem'));
  let pick = $state(CURVE.findIndex((p) => p.A === 56));
  let light = $state(95);
  let free = $state(2);
  let fusionId = $state('dt');

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const chosen = $derived(CURVE[pick]);
  const split = $derived(fission(light, free));
  const fusion = $derived(FUSIONS.find((f) => f.id === fusionId) ?? FUSIONS[0]);
  const fused = $derived(fusionOf(fusion));

  /** @param {{ A: number, Z: number }} p */
  const at = (p) => ({ x: px.map(p.A), y: py.map(epsFor(p.A, p.Z)) });

  /** Arrows from each nucleus before to each nucleus after (free nucleons left out). */
  const arrows = $derived.by(() => {
    if (mode === 'xem') return [];
    const r = mode === 'phan-hach' ? split : fusion;
    const from = r.before.filter((p) => p.A > 1);
    const to = r.after.filter((p) => p.A > 1);
    return from.flatMap((a) => to.map((b) => ({ a: at(a), b: at(b) })));
  });

  /** Nuclei to ring on the curve. */
  const rings = $derived.by(() => {
    if (mode === 'xem') return [{ ...at(chosen), color: '#dc2626' }];
    const r = mode === 'phan-hach' ? split : fusion;
    return [
      ...r.before.filter((p) => p.A > 1).map((p) => ({ ...at(p), color: '#64748b' })),
      ...r.after.filter((p) => p.A > 1).map((p) => ({ ...at(p), color: '#dc2626' })),
    ];
  });

  /** @param {PointerEvent} e */
  function pointAt(e) {
    if (mode !== 'xem' || !svgEl) return;
    const box = svgEl.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * W;
    const y = ((e.clientY - box.top) / box.height) * H;
    let best = 0;
    let bestD = Infinity;
    CURVE.forEach((p, i) => {
      const d = Math.hypot(px.map(p.A) - x, py.map(p.eps) - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    pick = best;
  }

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    if (mode !== 'xem') return;
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (e.key === 'Home') pick = 0;
    else if (e.key === 'End') pick = CURVE.length - 1;
    else if (step) pick = Math.min(CURVE.length - 1, Math.max(0, pick + step));
    else return;
    e.preventDefault();
  }

  /** @param {number} v */
  const mev = (v) => formatNumber(v, 1);

  const equation = $derived.by(() => {
    if (mode === 'phan-hach') return `${sideTex(split.before)} \\to ${sideTex(split.after)}`;
    if (mode === 'nhiet-hach') return `${sideTex(fusion.before)} \\to ${sideTex(fusion.after)}`;
    return `${nuclideTex(chosen.A, chosen.Z)}:\\ E_{lkr} = ${numTex(chosen.eps, 3)}\\ \\text{MeV/nucleon}`;
  });

  const note = $derived.by(() => {
    if (mode === 'xem') {
      const e = chosen.eps * chosen.A;
      const where =
        chosen.A >= 50 && chosen.A <= 80
          ? 'Hạt nhân này nằm ở vùng đỉnh đồ thị: thuộc loại bền vững nhất.'
          : chosen.A < 50
            ? 'Hạt nhân nhẹ: năng lượng liên kết riêng nhỏ hơn vùng đỉnh, nên có thể toả năng lượng khi tổng hợp hạt nhân (nhiệt hạch) thành hạt nhân nặng hơn.'
            : 'Hạt nhân nặng: năng lượng liên kết riêng giảm dần khi A tăng, nên có thể toả năng lượng khi vỡ (phân hạch) thành hai hạt nhân trung bình.';
      return `${nuclideName(chosen.A, chosen.Z)}: năng lượng liên kết riêng $E_{lkr} = ${numTex(chosen.eps, 3)}$ MeV/nucleon, năng lượng liên kết $E_{lk} = A \\cdot E_{lkr} \\approx ${numTex(e, 1)}$ MeV. ${where}`;
    }
    if (mode === 'phan-hach') {
      const [f1, f2] = split.after;
      return `Hạt nhân U-235 hấp thụ một neutron rồi vỡ thành ${nuclideName(f1.A, f1.Z)} và ${nuclideName(f2.A, f2.Z)}, giải phóng ${free} neutron. Hai mảnh nằm cao hơn trên đồ thị ($E_{lkr} \\approx$ ${formatNumber(epsFor(f1.A, f1.Z), 2)} và ${formatNumber(epsFor(f2.A, f2.Z), 2)} MeV) so với U-235 (${formatNumber(7.591, 2)} MeV): các nucleon liên kết chặt hơn, phần năng lượng liên kết tăng thêm được toả ra, khoảng ${mev(split.energy)} MeV cho một phân hạch (ước tính từ đồ thị).`;
    }
    return `${fusion.label}: hai hạt nhân nhẹ ở chân đồ thị kết hợp thành hạt nhân có năng lượng liên kết riêng lớn hơn nhiều. Năng lượng toả ra bằng năng lượng liên kết tăng thêm: khoảng ${mev(fused.energy)} MeV cho một phản ứng, tức khoảng ${formatNumber(fused.energy / totals(fusion), 1)} MeV cho mỗi nucleon tham gia.`;
  });

  /** @param {import('./engine.js').Fusion} f */
  function totals(f) {
    return f.before.reduce((s, p) => s + (p.count ?? 1) * p.A, 0);
  }

  const MODES = [
    { value: 'xem', label: 'Đọc đồ thị' },
    { value: 'phan-hach', label: 'Phân hạch' },
    { value: 'nhiet-hach', label: 'Nhiệt hạch' },
  ];
  const FUSION_OPTIONS = FUSIONS.map((f) => ({ value: f.id, label: f.label }));
  const FREE_OPTIONS = [
    { value: 2, label: '2 neutron' },
    { value: 3, label: '3 neutron' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl label="Chế độ" bind:value={mode} options={MODES} hideLabel />

  <figure class="{card} p-2">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl touch-none select-none rounded-lg {focusRing}"
      role={mode === 'xem' ? 'slider' : 'img'}
      tabindex={mode === 'xem' ? 0 : -1}
      aria-label={mode === 'xem'
        ? 'Đồ thị năng lượng liên kết riêng theo số khối; bấm vào một điểm hoặc dùng phím mũi tên để chọn hạt nhân'
        : 'Đồ thị năng lượng liên kết riêng theo số khối, có mũi tên từ các hạt nhân trước phản ứng đến các hạt nhân sau phản ứng'}
      aria-valuemin={mode === 'xem' ? 0 : undefined}
      aria-valuemax={mode === 'xem' ? CURVE.length - 1 : undefined}
      aria-valuenow={mode === 'xem' ? pick : undefined}
      aria-valuetext={mode === 'xem'
        ? `${nuclideName(chosen.A, chosen.Z)}, ${formatNumber(chosen.eps, 3)} MeV mỗi nucleon`
        : undefined}
      onpointerdown={pointAt}
      onkeydown={onKey}
    >
      <defs>
        <marker
          id="bai22-head"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill="#7c3aed" />
        </marker>
      </defs>
      <rect
        x={px.map(50)}
        y={TOP}
        width={px.map(80) - px.map(50)}
        height={H - BOTTOM - TOP}
        fill="#ecfdf5"
      />
      <text x={px.map(65)} y={H - BOTTOM - 6} font-size="9" fill="#047857" text-anchor="middle"
        >bền nhất</text
      >
      {#each [0, 2, 4, 6, 8] as t (t)}
        <line x1={LEFT} x2={W - RIGHT} y1={py.map(t)} y2={py.map(t)} stroke="#e2e8f0" />
        <text x={LEFT - 5} y={py.map(t) + 4} font-size="10" fill="#475569" text-anchor="end"
          >{t}</text
        >
      {/each}
      {#each [0, 50, 100, 150, 200] as t (t)}
        <text x={px.map(t)} y={H - BOTTOM + 13} font-size="10" fill="#475569" text-anchor="middle"
          >{t}</text
        >
      {/each}
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={H - BOTTOM}
        y2={H - BOTTOM}
        stroke="#334155"
        stroke-width="1.5"
      />
      <text x="4" y="10" font-size="10" font-weight="600" fill="#334155"
        >E<tspan baseline-shift="sub" font-size="8">lkr</tspan> (MeV/nucleon)</text
      >
      <text
        x={W - RIGHT}
        y={H - 3}
        font-size="10"
        font-weight="600"
        fill="#334155"
        text-anchor="end">A</text
      >
      <polyline points={LINE} fill="none" stroke="#4f46e5" stroke-width="2" />
      {#each CURVE as p, i (i)}
        <circle cx={px.map(p.A)} cy={py.map(p.eps)} r="2.5" fill="#4f46e5" />
      {/each}
      {#each [{ A: 4, Z: 2, t: 'He' }, { A: 56, Z: 26, t: 'Fe' }, { A: 235, Z: 92, t: 'U' }] as l (l.t)}
        <text
          x={px.map(l.A) + (l.A > 200 ? -4 : 5)}
          y={py.map(epsFor(l.A, l.Z)) - 7}
          font-size="10"
          font-weight="600"
          fill="#334155"
          text-anchor={l.A > 200 ? 'end' : 'start'}>{l.t}-{l.A}</text
        >
      {/each}
      {#each arrows as a, i (i)}
        <line
          x1={a.a.x}
          y1={a.a.y}
          x2={a.b.x}
          y2={a.b.y}
          stroke="#7c3aed"
          stroke-width="1.8"
          stroke-dasharray="4 3"
          marker-end="url(#bai22-head)"
        />
      {/each}
      {#each rings as r, i (i)}
        <circle cx={r.x} cy={r.y} r="6" fill="none" stroke={r.color} stroke-width="2.5" />
      {/each}
    </svg>
    <figcaption class="px-2 pt-1 text-xs text-slate-500">
      Năng lượng liên kết riêng của các hạt nhân theo số khối A. Vùng xanh: các hạt nhân bền vững
      nhất.
    </figcaption>
  </figure>

  {#if mode === 'phan-hach'}
    <div class="{card} grid gap-3 p-3 sm:grid-cols-2">
      <SliderField
        label="Số khối của mảnh nhẹ"
        bind:value={light}
        min={LIGHT_MIN}
        max={LIGHT_MAX}
      />
      <SegmentedControl label="Số neutron giải phóng" bind:value={free} options={FREE_OPTIONS} />
    </div>
  {:else if mode === 'nhiet-hach'}
    <div class="{card} p-3">
      <SegmentedControl label="Phản ứng" bind:value={fusionId} options={FUSION_OPTIONS} />
    </div>
  {/if}

  <p class="overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-center">
    <Tex math={equation} />
  </p>
  <FeedbackNote tone="info" text={note} />
</div>
