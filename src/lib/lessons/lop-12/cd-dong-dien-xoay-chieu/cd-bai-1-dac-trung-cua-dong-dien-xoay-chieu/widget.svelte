<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import OscGraph from '#lib/domain/osc-graph.svelte';
  import { piText } from '#lib/domain/oscillation.js';
  import { acAt } from '../_shared/ac.js';
  import {
    DPHI_OPTIONS,
    I_RANGES,
    PHASE_STEP,
    SCREEN_T,
    TASKS,
    U_RANGES,
    characteristics,
    checkReading,
    relationPlain,
    relationText,
    screenScale,
  } from './engine.js';

  const T_MAX = SCREEN_T;
  const T_STEP = 0.005;

  const F_OPTIONS = [25, 50, 100].map((v) => ({ value: v, label: `${v} Hz` }));

  let U0 = $state(4);
  let I0 = $state(2);
  let f = $state(50);
  let kU = $state(0);
  let kI = $state(-2);
  let t = $state(0.005);

  const s = $derived({ U0, I0, f, phiU: kU * PHASE_STEP, phiI: kI * PHASE_STEP });
  const c = $derived(characteristics(s));
  const uScale = $derived(screenScale(U0, U_RANGES));
  const iScale = $derived(screenScale(I0, I_RANGES));
  const uNow = $derived(acAt(U0, f, s.phiU, t));
  const iNow = $derived(acAt(I0, f, s.phiI, t));
  const uCurve = $derived((/** @type {number} */ x) => acAt(U0, f, s.phiU, x));
  const iCurve = $derived((/** @type {number} */ x) => acAt(I0, f, s.phiI, x));

  /** @param {number} k */
  const phaseLabel = (k) => piText(k * PHASE_STEP);
  /** @param {number} v */
  const pickTime = (v) => (t = v);

  const timeText = $derived(
    `t = ${formatFixed(t, 4)} s: u = ${formatNumber(uNow, 2)} V, i = ${formatNumber(iNow, 2)} A`,
  );

  const note = $derived.by(() => {
    const head = `$U = \\dfrac{U_0}{\\sqrt{2}} \\approx ${numTex(c.U, 2)}$ V, $I = \\dfrac{I_0}{\\sqrt{2}} \\approx ${numTex(c.I, 2)}$ A; $T = ${numTex(c.T)}$ s.`;
    const rel = relationText(c.dphi);
    if (c.relation.name === 'cùng pha') {
      return `${head} ${rel}: hai đường đạt cực đại cùng một lúc.`;
    }
    if (c.relation.name === 'ngược pha') {
      return `${head} ${rel}: khi $u$ cực đại thì $i$ cực tiểu.`;
    }
    const first = c.relation.lead === 1 ? '$u$' : '$i$';
    return `${head} ${rel}: ${first} đạt cực đại sớm hơn một khoảng thời gian $\\Delta t = \\dfrac{|\\varphi|}{2\\pi}T \\approx ${numTex(c.lag, 4)}$ s.`;
  });

  // Reading tasks.
  let pick = $state(0);
  let uText = $state('');
  let fText = $state('');
  /** @type {number | null} */
  let phiPick = $state(null);
  /** @type {ReturnType<typeof checkReading> | null} */
  let result = $state(null);

  const task = $derived(TASKS[pick]);
  const tScaleU = $derived(screenScale(task.U0, U_RANGES));
  const tScaleI = $derived(screenScale(task.I0, I_RANGES));
  const PHI_CHOICES = DPHI_OPTIONS.map((d, i) => ({ value: i, label: relationPlain(d) }));

  function check() {
    result = checkReading(task, { U: readNumber(uText), f: readNumber(fText), pick: phiPick });
  }
  function nextTask() {
    pick = (pick + 1) % TASKS.length;
    uText = '';
    fText = '';
    phiPick = null;
    result = null;
  }

  const verdict = $derived.by(() => {
    if (!result) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Đọc $U_0$ trên trục dọc, đo chu kì $T$ giữa hai đỉnh liên tiếp, so sánh xem đường nào đạt cực đại trước, rồi nhập kết quả.',
      };
    }
    if (result.all) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng hết: $U \\approx ${numTex(result.U, 2)}$ V, $f = ${task.f}$ Hz, ${relationText(result.dphi)}.`,
      };
    }
    const tips = [];
    if (!result.uOk) {
      tips.push(
        `điện áp hiệu dụng là $U = \\dfrac{U_0}{\\sqrt{2}}$, không phải giá trị cực đại $U_0$ đọc trên màn hình`,
      );
    }
    if (!result.fOk)
      tips.push('tần số là $f = \\dfrac{1}{T}$, với $T$ là thời gian giữa hai đỉnh liên tiếp');
    if (!result.phiOk) {
      tips.push(
        'đường đạt cực đại trước (bên trái hơn) là đường sớm pha; một chu kì ứng với $2\\pi$',
      );
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Chưa đúng hết. Gợi ý: ${tips.join('; ')}.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-2 p-2">
    <p class="px-2 text-sm font-semibold text-slate-700">
      Kênh 1: điện áp u (thang đo ±{uScale.range} V)
    </p>
    <OscGraph
      curves={[{ f: uCurve, color: '#2563eb' }]}
      tMax={T_MAX}
      yMax={uScale.range}
      tStep={T_STEP}
      yStep={uScale.step}
      yLabel="u (V)"
      label="Đồ thị điện áp u theo thời gian; chọn thời điểm"
      cursor={t}
      onpick={pickTime}
      keyStep={0.0005}
      valueText={timeText}
      height={150}
    />
    <p class="px-2 text-sm font-semibold text-slate-700">
      Kênh 2: cường độ dòng điện i (thang đo ±{iScale.range} A)
    </p>
    <OscGraph
      curves={[{ f: iCurve, color: '#dc2626' }]}
      tMax={T_MAX}
      yMax={iScale.range}
      tStep={T_STEP}
      yStep={iScale.step}
      yLabel="i (A)"
      label="Đồ thị cường độ dòng điện i theo thời gian; chọn thời điểm"
      cursor={t}
      onpick={pickTime}
      keyStep={0.0005}
      valueText={timeText}
      height={150}
    />
    <p class="px-2 text-sm text-slate-600" aria-live="polite">
      Giá trị tức thời tại t = {formatFixed(t, 4)} s: u = {formatNumber(uNow, 2)} V, i = {formatNumber(
        iNow,
        2,
      )} A. Kéo hoặc dùng phím mũi tên trên đồ thị để đổi thời điểm.
    </p>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Điện áp cực đại U₀" bind:value={U0} min={1} max={9} step={0.5} unit="V" />
    <SliderField
      label="Cường độ cực đại I₀"
      bind:value={I0}
      min={0.5}
      max={5}
      step={0.5}
      unit="A"
    />
    <SliderField
      label="Pha ban đầu φu của u"
      bind:value={kU}
      min={-6}
      max={6}
      step={1}
      unit="rad"
      format={phaseLabel}
    />
    <SliderField
      label="Pha ban đầu φi của i"
      bind:value={kI}
      min={-6}
      max={6}
      step={1}
      unit="rad"
      format={phaseLabel}
    />
  </div>
  <SegmentedControl label="Tần số f của dòng điện" options={F_OPTIONS} bind:value={f} />
  <FeedbackNote tone="info" text={note} />

  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">
      Thử đọc dao động kí (màn hình {pick + 1}/{TASKS.length})
    </h3>
    <OscGraph
      curves={[{ f: (x) => acAt(task.U0, task.f, task.phiU, x), color: '#2563eb' }]}
      tMax={T_MAX}
      yMax={tScaleU.range}
      tStep={T_STEP}
      yStep={tScaleU.step}
      yLabel="u (V)"
      label={`Màn hình ${pick + 1}, kênh 1: đồ thị điện áp u theo thời gian.`}
      height={160}
    />
    <OscGraph
      curves={[{ f: (x) => acAt(task.I0, task.f, task.phiI, x), color: '#dc2626' }]}
      tMax={T_MAX}
      yMax={tScaleI.range}
      tStep={T_STEP}
      yStep={tScaleI.step}
      yLabel="i (A)"
      label={`Màn hình ${pick + 1}, kênh 2: đồ thị cường độ dòng điện i theo thời gian.`}
      height={160}
    />
    <div class="grid gap-3 sm:grid-cols-2">
      <label class="block text-sm font-semibold text-slate-700">
        Điện áp hiệu dụng U (V)
        <input class="{textInput} mt-1" inputmode="decimal" bind:value={uText} />
      </label>
      <label class="block text-sm font-semibold text-slate-700">
        Tần số f (Hz)
        <input class="{textInput} mt-1" inputmode="decimal" bind:value={fText} />
      </label>
    </div>
    <SegmentedControl
      label="Độ lệch pha φ = φu − φi"
      options={PHI_CHOICES}
      value={phiPick ?? -1}
      onchange={(v) => (phiPick = Number(v))}
    />
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
      <button type="button" class={button.quiet} onclick={nextTask}>Màn hình khác</button>
    </div>
    <FeedbackNote tone={verdict.tone} text={verdict.text} />
  </div>
</div>
