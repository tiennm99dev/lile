<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, fmt } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { trace, xOf, yOf } from '../_shared/scope.js';
  import {
    F_HIGHEST,
    analogAt,
    bitRate,
    levelCount,
    levelStep,
    levelVoltage,
    sampleSignal,
    sampledEnough,
    worstError,
  } from './engine.js';

  const W = 360;
  const H = 220;
  const T_MAX = 2;
  const PLOT = { left: 10, width: W - 20, mid: H / 2, half: 92, tMax: T_MAX, yMax: 1.6 };
  const BIT_OPTIONS = [1, 2, 3, 4, 5].map((b) => ({ value: b, label: `${b} bit` }));
  const SHOWN_CODES = 8;

  let fs = $state(8);
  let bits = $state(3);
  let showAnalog = $state(true);

  const samples = $derived(sampleSignal(fs, bits, T_MAX));
  const analogLine = trace(PLOT, analogAt, 600);
  const stairs = $derived(
    pointsAttr(
      samples.flatMap((s, i) => {
        const end = i + 1 < samples.length ? samples[i + 1].t : T_MAX;
        return [
          { x: xOf(PLOT, s.t), y: yOf(PLOT, s.q) },
          { x: xOf(PLOT, end), y: yOf(PLOT, s.q) },
        ];
      }),
    ),
  );
  const levels = $derived(
    Array.from({ length: levelCount(bits) }, (_, k) => levelVoltage(k, bits)),
  );
  const error = $derived(worstError(fs, bits, T_MAX));
  const enough = $derived(sampledEnough(fs));
  const rate = $derived(bitRate(fs, bits));
  const codes = $derived(
    samples
      .slice(0, SHOWN_CODES)
      .map((s) => s.code)
      .join(' '),
  );

  const note = $derived.by(() => {
    const head = `$${fmt(levelCount(bits))}$ mức, mỗi mức cách nhau $${formatNumber(levelStep(bits), 2)}$ V; tín hiệu số khôi phục lệch tín hiệu gốc nhiều nhất khoảng $${formatNumber(error, 2)}$ V. Tốc độ bit $${fmt(fs)} \\cdot ${bits} = ${fmt(rate)}$ kbit/s.`;
    if (!enough) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Lấy mẫu quá thưa: tín hiệu có thành phần tần số $${F_HIGHEST}$ kHz nên cần ít nhất $${2 * F_HIGHEST}$ kHz, mỗi chu kì của thành phần đó ít nhất hai mẫu. Các chỗ gợn của tín hiệu bị mất. ${head}`,
      };
    }
    if (bits <= 2) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Quá ít bit: các mẫu bị làm tròn thô, bậc thang chỉ có vài mức. ${head}`,
      };
    }
    if (fs >= 20 && bits >= 4) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Bậc thang bám sát tín hiệu tương tự. Đổi lại, mỗi giây phải truyền nhiều bit hơn. ${head}`,
      };
    }
    return { tone: /** @type {const} */ ('info'), text: head };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl rounded-xl bg-slate-50"
      role="img"
      aria-label={`Tín hiệu tương tự và tín hiệu số khôi phục với tần số lấy mẫu ${fs} kHz, ${bits} bit, ${levelCount(bits)} mức.`}
    >
      {#each levels as v (v)}
        <line
          x1={PLOT.left}
          x2={PLOT.left + PLOT.width}
          y1={yOf(PLOT, v)}
          y2={yOf(PLOT, v)}
          stroke="#e2e8f0"
        />
      {/each}
      <line
        x1={PLOT.left}
        x2={PLOT.left + PLOT.width}
        y1={PLOT.mid}
        y2={PLOT.mid}
        stroke="#94a3b8"
        stroke-dasharray="3 3"
      />
      {#if showAnalog}
        <polyline points={analogLine} fill="none" stroke="#2563eb" stroke-width="1.8" />
      {/if}
      <polyline points={stairs} fill="none" stroke="#ea580c" stroke-width="2" />
      {#each samples as s (s.t)}
        <line
          x1={xOf(PLOT, s.t)}
          x2={xOf(PLOT, s.t)}
          y1={PLOT.mid}
          y2={yOf(PLOT, s.u)}
          stroke="#94a3b8"
          stroke-width="0.8"
        />
        <circle cx={xOf(PLOT, s.t)} cy={yOf(PLOT, s.u)} r="2.6" fill="#1e3a8a" />
      {/each}
      <text x={W - 10} y={H - 6} font-size="10" fill="#64748b" text-anchor="end"
        >t (ms), cửa sổ 2 ms</text
      >
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Xanh: tín hiệu tương tự (điện áp từ micro). Chấm: các mẫu. Cam: tín hiệu bộ DAC khôi phục, mỗi
      mẫu được làm tròn về mức gần nhất (đường ngang mờ) và giữ đến mẫu sau.
    </p>
  </div>

  <SliderField label="Tần số lấy mẫu" bind:value={fs} min={2} max={40} step={1} unit="kHz" />
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl label="Số bit mỗi mẫu" options={BIT_OPTIONS} bind:value={bits} />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="size-5" bind:checked={showAnalog} />
      Hiện tín hiệu tương tự
    </label>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
    <div class="rounded-lg bg-slate-100 p-2">
      <dt class="text-slate-600">Số mẫu trong 1 ms</dt>
      <dd class="font-semibold tabular-nums">{fs}</dd>
    </div>
    <div class="rounded-lg bg-slate-100 p-2">
      <dt class="text-slate-600">Số mức</dt>
      <dd class="font-semibold tabular-nums">{levelCount(bits)}</dd>
    </div>
    <div class="rounded-lg bg-slate-100 p-2">
      <dt class="text-slate-600">Sai lệch lớn nhất</dt>
      <dd class="font-semibold tabular-nums">{formatNumber(error, 2)} V</dd>
    </div>
    <div class="rounded-lg bg-slate-100 p-2">
      <dt class="text-slate-600">Tốc độ bit</dt>
      <dd class="font-semibold tabular-nums">{fmt(rate)} kbit/s</dd>
    </div>
  </dl>
  <p class="rounded-lg bg-slate-100 p-2 text-sm text-slate-700">
    Mã của {Math.min(SHOWN_CODES, samples.length)} mẫu đầu:
    <span class="font-mono font-semibold tracking-wide">{codes}</span>
  </p>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
