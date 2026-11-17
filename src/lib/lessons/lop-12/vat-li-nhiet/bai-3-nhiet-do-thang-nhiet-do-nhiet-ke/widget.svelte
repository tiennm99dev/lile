<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, intText, numTex } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import Thermometer from '#lib/domain/thermometer.svelte';
  import { TARGETS, toCelsius, toKelvin } from './engine.js';

  const MARKS = [
    { label: 'Nước đá đang tan', celsius: 0 },
    { label: 'Thân nhiệt người', celsius: 37 },
    { label: 'Nước sôi (1 atm)', celsius: 100 },
    { label: 'Ngày đông ở Sa Pa', celsius: -2 },
  ];

  let celsius = $state(20);
  let round = $state(-1);
  /** @type {null | boolean} */
  let result = $state(null);

  const kelvin = $derived(toKelvin(celsius));
  const target = $derived(round >= 0 ? TARGETS[round % TARGETS.length] : null);

  function next() {
    round += 1;
    result = null;
  }

  function check() {
    if (target === null) return;
    result = celsius === toCelsius(target);
  }

  const note = $derived.by(() => {
    if (target !== null && result === true)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng! $t = T - 273 = ${target} - 273 = ${toCelsius(target)}$ °C.`,
      };
    if (target !== null && result === false)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Chưa đúng: nhiệt kế đang chỉ $${numTex(celsius)}$ °C, tức $T = ${numTex(celsius)} + 273 = ${kelvin}$ K. Dùng $t = T - 273$ rồi đặt lại.`,
      };
    if (target !== null)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Đặt mức chất lỏng sao cho nhiệt kế chỉ nhiệt độ $T = ${target}$ K, rồi bấm “Kiểm tra”.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `$t = ${numTex(celsius)}$ °C ứng với $T = t + 273 = ${kelvin}$ K. Mỗi độ chia $1$ °C bằng đúng $1$ K: hai thang chỉ lệch nhau $273$ đơn vị.`,
    };
  });
</script>

<div class="grid items-start gap-4 sm:grid-cols-[minmax(0,13rem)_1fr]">
  <div class="{card} p-2">
    <Thermometer
      bind:celsius
      min={-30}
      max={110}
      major={10}
      minor={2}
      secondScale="K"
      interactive
      step={1}
      label="Nhiệt kế thang Celsius và Kelvin"
      onchange={() => (result = null)}
    />
  </div>
  <div class="space-y-3">
    <dl class="grid grid-cols-2 gap-2 text-sm" aria-live="polite">
      <div class="{card} p-2">
        <dt class="text-slate-500">Thang Celsius</dt>
        <dd class="text-lg font-semibold tabular-nums">{intText(celsius)} °C</dd>
      </div>
      <div class="{card} p-2">
        <dt class="text-slate-500">Thang Kelvin</dt>
        <dd class="text-lg font-semibold tabular-nums">{formatNumber(kelvin)} K</dd>
      </div>
    </dl>
    <div class="flex flex-wrap gap-2" role="group" aria-label="Các nhiệt độ quen thuộc">
      {#each MARKS as mark (mark.label)}
        <button
          type="button"
          class={button.quiet}
          onclick={() => {
            celsius = mark.celsius;
            result = null;
          }}>{mark.label}</button
        >
      {/each}
    </div>
    <FeedbackNote tone={note.tone} text={note.text} />
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={next}>
        {target === null ? 'Thử thách: đặt nhiệt độ theo kelvin' : 'Câu khác'}
      </button>
      {#if target !== null}
        <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
      {/if}
    </div>
  </div>
</div>
