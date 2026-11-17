<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { kindOf, secondaryVoltage } from './engine.js';

  const U1 = 220;

  let n1 = $state(500);
  let n2 = $state(100);
  let source = $state('xoay-chieu');

  const ac = $derived(source === 'xoay-chieu');
  const u2 = $derived(secondaryVoltage(U1, n1, n2, ac));
  const kind = $derived(kindOf(n1, n2));
  /** Loops drawn for a coil: more turns, more loops. */
  const loops = (/** @type {number} */ n) => Math.max(3, Math.min(16, Math.round(n / 100)));
  const loopsY = (/** @type {number} */ count) =>
    Array.from({ length: count }, (_, i) => 50 + ((i + 0.5) * 120) / count);

  const note = $derived.by(() => {
    if (!ac)
      return `Nguồn một chiều tạo ra từ trường không đổi trong lõi sắt: từ thông qua cuộn thứ cấp không biến thiên nên không có suất điện động cảm ứng, U₂ = 0. Máy biến áp chỉ hoạt động với dòng điện xoay chiều.`;
    const ratio = `U₂ = U₁ · N₂/N₁ = ${U1} · ${formatNumber(n2)}/${formatNumber(n1)} = ${formatNumber(u2, 1)} V.`;
    if (kind === 'giu') return `${ratio} N₂ = N₁ nên điện áp không đổi.`;
    return `${ratio} N₂ ${kind === 'tang' ? '>' : '<'} N₁: đây là máy ${kind === 'tang' ? 'tăng áp, dùng ở đầu đường dây tải điện' : 'hạ áp, dùng ở nơi tiêu thụ'}. Từ thông biến thiên trong lõi sắt như nhau ở mọi vòng dây, nên điện áp trên mỗi cuộn tỉ lệ với số vòng của nó.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nguồn nối vào cuộn sơ cấp (220 V)"
    options={[
      { value: 'xoay-chieu', label: 'Xoay chiều' },
      { value: 'mot-chieu', label: 'Một chiều' },
    ]}
    bind:value={source}
  />
  <figure class="{card} p-2">
    <svg
      viewBox="0 0 340 220"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Máy biến áp: cuộn sơ cấp {n1} vòng, cuộn thứ cấp {n2} vòng, điện áp ra {formatNumber(
        u2,
        1,
      )} vôn."
    >
      <path
        d="M 90 30 H 250 V 190 H 90 Z M 120 60 V 160 H 220 V 60 Z"
        fill="#94a3b8"
        fill-rule="evenodd"
      />
      {#each loopsY(loops(n1)) as y (y)}
        <ellipse cx="105" cy={y} rx="24" ry="4" fill="none" stroke="#b45309" stroke-width="2.5" />
      {/each}
      {#each loopsY(loops(n2)) as y (y)}
        <ellipse cx="235" cy={y} rx="24" ry="4" fill="none" stroke="#0369a1" stroke-width="2.5" />
      {/each}
      {#if ac}
        <path
          d="M 140 45 H 200 M 200 45 L 192 40 M 200 45 L 192 50"
          stroke="#7c3aed"
          stroke-width="2"
          fill="none"
          stroke-dasharray="4 3"
        />
        <text x="170" y="22" text-anchor="middle" class="fill-violet-700 text-[11px]"
          >từ thông biến thiên</text
        >
      {/if}
      <text x="40" y="112" text-anchor="middle" class="fill-amber-800 text-[13px] font-semibold"
        >U₁</text
      >
      <text x="40" y="128" text-anchor="middle" class="fill-amber-800 text-[12px]">{U1} V</text>
      <text x="300" y="112" text-anchor="middle" class="fill-sky-800 text-[13px] font-semibold"
        >U₂</text
      >
      <text x="300" y="128" text-anchor="middle" class="fill-sky-800 text-[12px]"
        >{formatNumber(u2, 1)} V</text
      >
      <text x="105" y="210" text-anchor="middle" class="fill-slate-600 text-[11px]">sơ cấp</text>
      <text x="235" y="210" text-anchor="middle" class="fill-slate-600 text-[11px]">thứ cấp</text>
    </svg>
  </figure>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Số vòng cuộn sơ cấp N₁" bind:value={n1} min={100} max={1000} step={50} />
    <SliderField label="Số vòng cuộn thứ cấp N₂" bind:value={n2} min={50} max={2000} step={50} />
  </div>
  <FeedbackNote tone={ac ? 'ok' : 'warn'} text={note} />
</div>
