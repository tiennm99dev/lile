<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { lineLoss } from './engine.js';

  /** Power sent from the plant, kW. */
  const P_KW = 500;
  const VOLTAGES = [5, 10, 25, 110];

  let kv = $state(5);
  let resistance = $state(20);

  const r = $derived(lineLoss(P_KW * 1000, kv * 1000, resistance));
  const lossKw = $derived(r.loss / 1000);
  const lossShare = $derived(Math.min(1, lossKw / P_KW));

  const note = $derived(
    `Truyền P = ${P_KW} kW ở U = ${kv} kV: I = P/U = ${formatNumber(r.I, 2)} A, công suất hao phí ΔP = I²R = P²R/U² ≈ ${formatNumber(lossKw, 2)} kW (${formatNumber(lossShare * 100, 2)} % công suất), hiệu suất truyền tải ${formatNumber(r.efficiency * 100, 2)} %. ${
      kv === 5
        ? 'Thử tăng điện áp truyền tải: tăng U lên 2 lần thì hao phí giảm 4 lần.'
        : 'Hao phí tỉ lệ nghịch với bình phương điện áp, nên người ta dùng máy tăng áp ở đầu đường dây và máy hạ áp ở nơi tiêu thụ.'
    }`,
  );
</script>

<div class="space-y-3">
  <SegmentedControl
    label="Điện áp truyền tải U"
    options={VOLTAGES.map((v) => ({ value: v, label: `${v} kV` }))}
    bind:value={kv}
  />
  <SliderField
    label="Điện trở đường dây R"
    bind:value={resistance}
    min={5}
    max={40}
    step={5}
    unit="Ω"
  />
  <div class="{card} space-y-2 p-3" aria-hidden="true">
    <div class="flex h-8 w-full overflow-hidden rounded-lg bg-slate-100 text-xs font-semibold">
      <div
        class="flex items-center justify-center bg-emerald-500 text-white"
        style:width="{(1 - lossShare) * 100}%"
      >
        {lossShare < 0.85 ? 'đến nơi tiêu thụ' : ''}
      </div>
      <div
        class="flex items-center justify-center bg-red-500 text-white"
        style:width="{lossShare * 100}%"
      >
        {lossShare > 0.15 ? 'hao phí' : ''}
      </div>
    </div>
    <p class="text-xs text-slate-500">
      Xanh: công suất đến nơi tiêu thụ; đỏ: công suất toả nhiệt trên đường dây.
    </p>
  </div>
  <FeedbackNote tone={lossShare < 0.05 ? 'ok' : 'warn'} text={note} />
</div>
