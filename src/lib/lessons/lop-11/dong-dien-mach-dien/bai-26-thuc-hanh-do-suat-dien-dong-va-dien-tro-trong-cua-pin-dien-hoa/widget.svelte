<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import GraphPanel from '../_shared/graph-panel.svelte';
  import { fitLine } from '../_shared/circuit-math.js';
  import { R0, judgeReading, makeCell, readingAt } from './engine.js';

  /** @typedef {import('./engine.js').CellKind} CellKind */

  const KINDS = [
    { value: 'moi', label: 'Pin mới' },
    { value: 'cu', label: 'Pin cũ' },
  ];
  const uid = $props.id();

  let kind = $state(/** @type {CellKind} */ ('cu'));
  let seed = $state(1);
  let rheostat = $state(100);
  /** Readings taken so far, one per rheostat setting. */
  let rows = $state(/** @type {Array<{ r: number, mA: number, u: number }>} */ ([]));
  let last = $state(/** @type {{ mA: number, u: number } | null} */ (null));
  let typedE = $state('');
  let typedR = $state('');
  let message = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: 'Đặt biến trở ở $100$ Ω, đóng khoá K để đọc số chỉ, rồi giảm dần biến trở và đo tiếp.',
    }),
  );

  const cell = $derived(makeCell(kind, seed));

  function newCell() {
    rows = [];
    last = null;
    typedE = '';
    typedR = '';
    message = { tone: 'info', text: 'Đã lắp pin mới vào mạch. Đo lại từ đầu.' };
  }

  /** @param {string | number} next */
  function changeKind(next) {
    void next;
    newCell();
  }

  function measure() {
    const reading = readingAt(cell, rheostat, seed);
    last = reading;
    rows = [...rows.filter((row) => row.r !== rheostat), { r: rheostat, ...reading }].sort(
      (a, b) => b.r - a.r,
    );
    message = {
      tone: 'info',
      text: `Biến trở $${rheostat}$ Ω: $I = ${numTex(reading.mA, 1)}$ mA, $U = ${numTex(reading.u, 2)}$ V. Đã ngắt khoá K. ${rows.length < 5 ? `Cần thêm ít nhất $${5 - rows.length}$ lần đo.` : 'Đã đủ số liệu: đọc $\\mathscr{E}$ và $r$ từ đồ thị.'}`,
    };
  }

  const fit = $derived(fitLine(rows.map((row) => ({ x: row.mA, y: row.u }))));
  const fitted = $derived(fit ? { emf: fit.intercept, r: -fit.slope * 1000 } : null);
  const lines = $derived(
    fit && rows.length >= 2
      ? [
          {
            points: [
              { x: 0, y: fit.intercept },
              { x: 80, y: fit.intercept + fit.slope * 80 },
            ],
            color: '#0284c7',
          },
        ]
      : [],
  );

  function check() {
    const e = readNumber(typedE.replace(/\s*V\s*$/i, ''));
    const r = readNumber(typedR.replace(/\s*(Ω|ôm)\s*$/i, ''));
    if (rows.length < 5 || !fitted) {
      message = { tone: 'warn', text: 'Hãy đo ít nhất $5$ giá trị biến trở trước khi tính.' };
      return;
    }
    if (e === null || r === null || e <= 0 || r < 0) {
      message = {
        tone: 'warn',
        text: 'Nhập suất điện động (V) và điện trở trong (Ω) em đọc được từ đồ thị.',
      };
      return;
    }
    const { emfOk, rOk } = judgeReading({ emf: e, r }, fitted);
    const truth = `Giá trị thật của pin: $\\mathscr{E} = ${numTex(cell.emf, 2)}$ V, $r = ${numTex(cell.r, 2)}$ Ω.`;
    if (emfOk && rOk) {
      message = {
        tone: 'ok',
        text: `Đúng! Đường thẳng qua các điểm đo cho $\\mathscr{E} \\approx ${numTex(fitted.emf, 3)}$ V và $r \\approx ${numTex(fitted.r, 2)}$ Ω. ${truth}`,
      };
      return;
    }
    message = {
      tone: 'warn',
      text: `${emfOk ? '$\\mathscr{E}$ đúng. ' : '$\\mathscr{E}$ chưa đúng: kéo dài đường thẳng tới $I = 0$ và đọc $U$ tại đó. '}${rOk ? '$r$ đúng.' : '$r$ chưa đúng: lấy hai điểm M, N xa nhau trên đường thẳng, $r = \\dfrac{U_M - U_N}{I_N - I_M}$ (đổi mA ra A).'}`,
    };
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl label="Pin đem đo" options={KINDS} bind:value={kind} onchange={changeKind} />
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        seed += 1;
        newCell();
      }}>Lắp một pin khác</button
    >
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 360 170"
      class="mx-auto block w-full max-w-xl select-none rounded-xl bg-slate-50"
      role="img"
      aria-label={`Sơ đồ mạch: pin, điện trở bảo vệ ${R0} ôm, biến trở ${rheostat} ôm, ampe kế và khoá K mắc nối tiếp; vôn kế mắc giữa hai cực của pin.`}
    >
      <g fill="none" stroke="#475569" stroke-width="2">
        <polyline points="150,130 30,130 30,30 90,30" />
        <polyline points="130,30 180,30" />
        <polyline points="230,30 330,30 330,130 290,130" />
        <polyline points="250,130 200,130" />
        <polyline points="150,130 150,155 168,155" stroke="#0369a1" />
        <polyline points="188,155 200,155 200,130" stroke="#0369a1" />
      </g>
      <!-- cell: long line + -->
      <line x1="170" y1="118" x2="170" y2="142" stroke="#0f172a" stroke-width="2" />
      <line x1="180" y1="123" x2="180" y2="137" stroke="#0f172a" stroke-width="5" />
      <line x1="150" y1="130" x2="170" y2="130" stroke="#475569" stroke-width="2" />
      <line x1="180" y1="130" x2="200" y2="130" stroke="#475569" stroke-width="2" />
      <text x="164" y="112" font-size="12" font-weight="700" fill="#dc2626">+</text>
      <text x="182" y="112" font-size="12" font-weight="700" fill="#2563eb">−</text>
      <text x="215" y="122" font-size="10" fill="#475569" text-anchor="middle">ℰ, r</text>
      <!-- protective resistor -->
      <rect x="90" y="22" width="40" height="16" fill="#e2e8f0" stroke="#475569" />
      <text x="110" y="16" font-size="11" text-anchor="middle" fill="#334155">R₀</text>
      <!-- rheostat -->
      <rect x="180" y="22" width="50" height="16" fill="#e0e7ff" stroke="#4338ca" />
      <line x1="178" y1="50" x2="232" y2="10" stroke="#4338ca" stroke-width="1.5" />
      <text x="205" y="62" font-size="11" text-anchor="middle" fill="#3730a3">R = {rheostat} Ω</text
      >
      <!-- ammeter -->
      <circle cx="330" cy="80" r="13" fill="#fff" stroke="#475569" stroke-width="2" />
      <text x="330" y="85" font-size="12" font-weight="700" text-anchor="middle">A</text>
      <!-- switch K (open between readings) -->
      <circle cx="250" cy="130" r="3" fill="#475569" />
      <circle cx="290" cy="130" r="3" fill="#475569" />
      <line x1="250" y1="130" x2="285" y2="114" stroke="#475569" stroke-width="2" />
      <text x="270" y="148" font-size="11" text-anchor="middle" fill="#334155">K</text>
      <!-- voltmeter -->
      <circle cx="178" cy="155" r="10" fill="#fff" stroke="#0369a1" stroke-width="2" />
      <text x="178" y="159" font-size="10" font-weight="700" text-anchor="middle" fill="#0369a1"
        >V</text
      >
    </svg>
  </div>

  <SliderField label="Biến trở R" bind:value={rheostat} min={0} max={100} step={10} unit="Ω" />
  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={measure}
      >Đóng K, đọc số chỉ rồi ngắt</button
    >
    <p class="text-sm tabular-nums text-slate-700">
      {last
        ? `Ampe kế: ${formatFixed(last.mA, 1)} mA · Vôn kế: ${formatFixed(last.u, 2)} V`
        : 'Chưa đo.'}
    </p>
  </div>

  <div class="grid gap-3 lg:grid-cols-2">
    <div class="{card} overflow-x-auto p-2">
      <table class="w-full text-sm tabular-nums">
        <caption class="pb-1 text-left font-semibold text-slate-700">Bảng số liệu</caption>
        <thead>
          <tr class="text-slate-500">
            <th class="px-2 text-left font-medium">Lần đo</th>
            <th class="px-2 text-right font-medium">R (Ω)</th>
            <th class="px-2 text-right font-medium">I (mA)</th>
            <th class="px-2 text-right font-medium">U (V)</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row, k (row.r)}
            <tr class="border-t border-slate-100">
              <td class="px-2">{k + 1}</td>
              <td class="px-2 text-right">{row.r}</td>
              <td class="px-2 text-right">{formatFixed(row.mA, 1)}</td>
              <td class="px-2 text-right">{formatFixed(row.u, 2)}</td>
            </tr>
          {:else}
            <tr><td colspan="4" class="px-2 py-2 text-slate-500">Chưa có số liệu.</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="{card} p-2">
      <GraphPanel
        xMin={0}
        xMax={80}
        yMin={1}
        yMax={1.7}
        xTicks={[0, 20, 40, 60, 80]}
        yTicks={[1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7]}
        xLabel="I (mA)"
        yLabel="U (V)"
        label={`Đồ thị U theo I với ${rows.length} điểm đo${lines.length ? ' và đường thẳng đi gần các điểm nhất, kéo dài tới trục U' : ''}. Trục U bắt đầu từ 1 vôn.`}
        {lines}
        marks={rows.map((row) => ({ x: row.mA, y: row.u }))}
      />
    </div>
  </div>

  <div class="{card} grid gap-3 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
    <div>
      <label for="{uid}-e" class="text-sm font-semibold text-slate-700">Suất điện động ℰ (V)</label>
      <input
        id="{uid}-e"
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typedE}
      />
    </div>
    <div>
      <label for="{uid}-r" class="text-sm font-semibold text-slate-700">Điện trở trong r (Ω)</label>
      <input
        id="{uid}-r"
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typedR}
      />
    </div>
    <button type="button" class={button.secondary} onclick={check}>Kiểm tra</button>
  </div>
  <FeedbackNote tone={message.tone} text={message.text} />
</div>
