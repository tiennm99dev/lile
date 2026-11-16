<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import {
    FREQUENCIES,
    TUBE,
    judgeSpeed,
    loudness,
    makeTube,
    meanAndError,
    readingOffset,
    speedFrom,
    wavelengthCm,
  } from './engine.js';

  const W = 340;
  const H = 150;
  const X0 = 40;
  const X1 = 330;
  const TOP = 34;
  const BOTTOM = 74;
  const PX = (X1 - X0) / TUBE;
  const OPTIONS = FREQUENCIES.map((f) => ({ value: f, label: `${f} Hz` }));
  const TICKS = Array.from({ length: TUBE / 10 + 1 }, (_, i) => i * 10);

  let seed = $state(1);
  let frequency = $state(500);
  let l = $state(5);
  /** @type {number | null} */
  let l1 = $state(null);
  /** @type {number | null} */
  let l2 = $state(null);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let message = $state({
    tone: 'info',
    text: 'Dịch pít-tông từ từ ra xa loa và theo dõi độ to của âm. Ghi $l_1$ ở vị trí âm to nhất đầu tiên, $l_2$ ở vị trí âm to nhất kế tiếp.',
  });
  /** @type {Array<{ f: number, l1: number, l2: number, v: number }>} */
  let runs = $state([]);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const tube = $derived(makeTube(seed));
  const level = $derived(loudness(l, frequency, tube));
  const summary = $derived(runs.length ? meanAndError(runs.map((r) => r.v)) : null);
  const uid = $props.id();

  /** @param {number} cm */
  const px = (cm) => X0 + cm * PX;
  /** @param {number} v */
  const setL = (v) => (l = Math.round(clamp(v, 0, TUBE) * 10) / 10);

  function pickFrequency() {
    l1 = null;
    l2 = null;
    typed = '';
    message = {
      tone: 'info',
      text: `Máy phát đặt ở $f = ${frequency}$ Hz. Dịch pít-tông từ sát loa ra xa, tìm hai vị trí liền nhau mà âm to nhất.`,
    };
  }

  function newTube() {
    seed += 1;
    runs = [];
    setL(5);
    pickFrequency();
  }

  function check() {
    if (l1 === null || l2 === null || l2 <= l1) {
      message = {
        tone: 'warn',
        text: 'Hãy ghi $l_1$ rồi $l_2$ (với $l_2 > l_1$): hai vị trí liền nhau của pít-tông mà âm to nhất.',
      };
      return;
    }
    const lambda = wavelengthCm(frequency, tube.speed);
    const off = Math.max(readingOffset(l1, frequency, tube), readingOffset(l2, frequency, tube));
    if (off > 1 || Math.abs(2 * (l2 - l1) - lambda) > 0.1 * lambda) {
      message = {
        tone: 'warn',
        text:
          off > 1
            ? 'Một trong hai vị trí đã ghi chưa phải chỗ âm to nhất: dịch pít-tông từng $0{,}1$ cm quanh đó để tìm lại đỉnh của độ to.'
            : 'Hai vị trí đã ghi không liền nhau: giữa hai vị trí âm to nhất liên tiếp, âm phải nhỏ đi rồi to lên đúng một lần.',
      };
      return;
    }
    const guess = readNumber(typed.replace(/\s*m\/s\s*$/i, ''));
    if (guess === null || guess <= 0) {
      message = { tone: 'warn', text: 'Hãy nhập tốc độ truyền âm em tính được, theo m/s.' };
      return;
    }
    const own = speedFrom(l1, l2, frequency);
    const verdict = judgeSpeed(guess, own, tube.speed);
    if (!verdict.computed) {
      message = {
        tone: 'warn',
        text: `Chưa đúng với số liệu đã ghi: $d = l_2 - l_1 = ${numTex(l2 - l1, 1)}$ cm, $\\lambda = 2d$, rồi $v = \\lambda f$ (đổi cm ra m).`,
      };
      return;
    }
    runs = [...runs, { f: frequency, l1, l2, v: own }];
    message = {
      tone: 'ok',
      text: `Tốt! Với số liệu này $v = 2(l_2 - l_1)f = ${numTex(own, 1)}$ m/s, lệch khoảng $${numTex(verdict.error, 1)}\\%$ so với tốc độ âm thật trong ống. Đã ghi vào bảng; đo lại với tần số khác để có thêm lần đo.`,
    };
    l1 = null;
    l2 = null;
    typed = '';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tần số của máy phát"
    options={OPTIONS}
    bind:value={frequency}
    onchange={pickFrequency}
  />

  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl touch-none select-none"
      role="group"
      aria-label="Ống cộng hưởng: loa ở miệng ống bên trái, pít-tông trong ống, thước chia xentimét bên dưới"
    >
      <!-- loudspeaker -->
      <rect x="4" y={(TOP + BOTTOM) / 2 - 9} width="10" height="18" fill="#334155" />
      <path
        d="M14 {(TOP + BOTTOM) / 2 - 9} L28 {TOP - 2} L28 {BOTTOM + 2} L14 {(TOP + BOTTOM) / 2 +
          9} Z"
        fill="#475569"
      />
      {#each [0, 1, 2] as i (i)}
        <path
          d="M{32 + i * 5} {(TOP + BOTTOM) / 2 - 10 - i * 3} q 5 {10 + i * 3} 0 {20 + i * 6}"
          fill="none"
          stroke="#f59e0b"
          stroke-width="2"
          opacity={Math.min(1, level * 1.1 - i * 0.25)}
        />
      {/each}
      <!-- tube -->
      <rect x={X0} y={TOP} width={X1 - X0} height={BOTTOM - TOP} fill="#e0f2fe" opacity="0.6" />
      <line x1={X0} y1={TOP} x2={X1} y2={TOP} stroke="#0369a1" stroke-width="2" />
      <line x1={X0} y1={BOTTOM} x2={X1} y2={BOTTOM} stroke="#0369a1" stroke-width="2" />
      <line x1={X1} y1={TOP} x2={X1} y2={BOTTOM} stroke="#0369a1" stroke-width="2" />
      <rect x={px(l)} y={TOP + 1} width={X1 - px(l)} height={BOTTOM - TOP - 2} fill="#cbd5e1" />
      <!-- ruler -->
      {#each TICKS as t (t)}
        <line x1={px(t)} y1={BOTTOM + 4} x2={px(t)} y2={BOTTOM + 10} stroke="#64748b" />
        {#if t % 20 === 0}
          <text x={px(t)} y={BOTTOM + 22} font-size="10" fill="#475569" text-anchor="middle"
            >{t}</text
          >
        {/if}
      {/each}
      <text x={X1} y={BOTTOM + 36} font-size="10" fill="#475569" text-anchor="end">l (cm)</text>
      {#each [l1, l2] as mark, i (i)}
        {#if mark !== null}
          <line
            x1={px(mark)}
            y1={TOP - 6}
            x2={px(mark)}
            y2={BOTTOM}
            stroke="#be123c"
            stroke-dasharray="3 2"
          />
          <text
            x={px(mark)}
            y={TOP - 9}
            font-size="10"
            font-weight="700"
            fill="#be123c"
            text-anchor="middle">l{i === 0 ? '₁' : '₂'}</text
          >
        {/if}
      {/each}
      <g
        class="drag-handle cursor-ew-resize outline-none"
        role="slider"
        tabindex="0"
        aria-label="Pít-tông: kéo hoặc dùng phím mũi tên trái phải"
        aria-valuemin={0}
        aria-valuemax={TUBE}
        aria-valuenow={l}
        aria-valuetext={`Cột không khí dài ${formatNumber(l, 1)} xentimét, độ to ${Math.round(level * 100)} trên 100`}
        use:draggable={{
          point: { x: px(l), y: (TOP + BOTTOM) / 2 },
          svg: () => board,
          viewBox: { w: W, h: H },
          pad: 0,
          projector: (p) => {
            setL((p.x - X0) / PX);
            return { x: px(l), y: (TOP + BOTTOM) / 2 };
          },
          onKeyMove: (dx, _dy, big) => setL(l + dx * (big ? 1 : 0.1)),
        }}
      >
        <rect
          class="drag-knob"
          x={px(l) - 4}
          y={TOP + 2}
          width="8"
          height={BOTTOM - TOP - 4}
          rx="2"
          fill="#4f46e5"
        />
      </g>
    </svg>
  </div>

  <div class="space-y-1" aria-live="polite">
    <div class="flex items-baseline justify-between text-sm font-semibold text-slate-700">
      <span>Độ to của âm nghe được</span>
      <span class="tabular-nums">{Math.round(level * 100)}/100</span>
    </div>
    <div class="h-4 overflow-hidden rounded-full bg-slate-200">
      <div class="h-full rounded-full bg-amber-500" style:width="{Math.round(level * 100)}%"></div>
    </div>
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <div class="min-w-48 flex-1">
      <SliderField
        label="Chiều dài cột không khí l"
        bind:value={l}
        min={0}
        max={TUBE}
        step={0.1}
        unit="cm"
        format={(v) => formatFixed(v, 1)}
      />
    </div>
    <button type="button" class={button.quiet} onclick={() => setL(l - 0.1)}>− 0,1 cm</button>
    <button type="button" class={button.quiet} onclick={() => setL(l + 0.1)}>+ 0,1 cm</button>
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.secondary} onclick={() => (l1 = l)}>Ghi l₁ tại đây</button>
    <button type="button" class={button.secondary} onclick={() => (l2 = l)}>Ghi l₂ tại đây</button>
  </div>
  <p class="text-sm tabular-nums text-slate-700">
    l₁ = {l1 === null ? '…' : `${formatFixed(l1, 1)} cm`}; l₂ = {l2 === null
      ? '…'
      : `${formatFixed(l2, 1)} cm`}
  </p>

  <div class="flex flex-wrap items-end gap-3">
    <div class="min-w-40 flex-1">
      <label for="{uid}-v" class="mb-1 block text-sm font-semibold text-slate-700"
        >Tốc độ truyền âm v (m/s)</label
      >
      <input
        id="{uid}-v"
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typed}
      />
    </div>
    <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={newTube}>Ống khác</button>
  </div>

  <FeedbackNote tone={message.tone} text={message.text} />

  {#if runs.length}
    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="pb-1 text-left font-semibold text-slate-700">Kết quả các lần đo</caption>
        <thead>
          <tr class="text-left text-slate-600">
            <th class="px-2 py-1">Lần</th>
            <th class="px-2 py-1">f (Hz)</th>
            <th class="px-2 py-1">l₁ (cm)</th>
            <th class="px-2 py-1">l₂ (cm)</th>
            <th class="px-2 py-1">v (m/s)</th>
          </tr>
        </thead>
        <tbody>
          {#each runs as r, i (i)}
            <tr class="border-t border-slate-200">
              <td class="px-2 py-1">{i + 1}</td>
              <td class="px-2 py-1">{r.f}</td>
              <td class="px-2 py-1">{formatFixed(r.l1, 1)}</td>
              <td class="px-2 py-1">{formatFixed(r.l2, 1)}</td>
              <td class="px-2 py-1">{formatNumber(r.v, 1)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if summary && runs.length >= 2}
      <p class="text-sm font-semibold text-slate-700">
        Kết quả: v = {formatNumber(summary.mean, 1)} ± {formatNumber(summary.error, 1)} m/s.
      </p>
    {/if}
  {/if}
</div>
