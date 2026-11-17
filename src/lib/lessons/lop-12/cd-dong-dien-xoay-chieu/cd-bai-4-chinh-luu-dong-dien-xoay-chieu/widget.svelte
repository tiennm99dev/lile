<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import OscGraph from '#lib/domain/osc-graph.svelte';
  import Diode from '../_shared/diode-symbol.svelte';
  import { BRIDGE, bridgeStatus, conductingFor, outputStats, simulate } from './engine.js';

  const U0 = 10;
  const F = 50;
  const LOAD = 100;
  const T_MAX = 0.04;
  const N = 800;

  const MODE_OPTIONS = [
    { value: 'none', label: 'Không có diode' },
    { value: 'half', label: 'Nửa chu kì: 1 diode' },
    { value: 'full', label: 'Cả chu kì: cầu 4 diode' },
  ];
  const FILTER_OPTIONS = [
    { value: 'off', label: 'Không có tụ' },
    { value: 'on', label: 'Có tụ lọc song song với tải' },
  ];

  let mode = $state(/** @type {import('./engine.js').Mode} */ ('half'));
  let flipped = $state(false);
  /** @type {Record<'D1' | 'D2' | 'D3' | 'D4', 'up' | 'down'>} */
  let bridge = $state({ D1: 'up', D2: 'up', D3: 'up', D4: 'up' });
  let filter = $state(false);
  let Cmicro = $state(220);
  let t = $state(0.005);

  const status = $derived(mode === 'full' ? bridgeStatus(bridge) : 'ok');
  const works = $derived(status === 'ok' || status === 'reversed');
  const turned = $derived(mode === 'full' ? status === 'reversed' : flipped);
  const RC = $derived(filter ? LOAD * Cmicro * 1e-6 : null);
  const samples = $derived(simulate({ mode, flipped: turned, U0, f: F, RC }, T_MAX, N));
  const stats = $derived(outputStats(samples));
  /** @param {number} x */
  const at = (x) => samples[Math.max(0, Math.min(N, Math.round((x / T_MAX) * N)))];
  const now = $derived(at(t));
  const lit = $derived(
    works && now.on ? conductingFor(mode, now.u, turned) : /** @type {string[]} */ ([]),
  );
  const outCurve = $derived((/** @type {number} */ x) => (works ? at(x).out : 0));
  const inCurve = (/** @type {number} */ x) => U0 * Math.cos(2 * Math.PI * F * x);

  /** @param {string | number} v */
  function setMode(v) {
    mode = v === 'none' ? 'none' : v === 'full' ? 'full' : 'half';
  }
  /** @param {'D1' | 'D2' | 'D3' | 'D4'} d */
  function turn(d) {
    bridge[d] = bridge[d] === 'up' ? 'down' : 'up';
  }

  const note = $derived.by(() => {
    if (mode === 'full' && status === 'short') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Hai diode cùng một hàng (D1 với D2, hoặc D3 với D4) đang quay ngược chiều nhau: trong một nửa chu kì chúng nối thẳng hai cực của nguồn, gây đoản mạch. Hãy quay lại các diode.',
      };
    }
    if (mode === 'full' && status === 'open') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Cặp diode trên và cặp diode dưới quay ngược nhau: dòng điện qua tải không có đường quay về nguồn, nên không có dòng điện. Cả bốn diode phải cùng hướng về một đầu của tải.',
      };
    }
    if (mode === 'none') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Không có diode: điện áp trên tải là điện áp xoay chiều, đổi chiều $100$ lần mỗi giây, giá trị trung bình bằng $0$.`,
      };
    }
    const sign = turned ? ' (đảo chiều nên điện áp ra âm)' : '';
    const kind =
      mode === 'half'
        ? `Chỉnh lưu nửa chu kì${sign}: diode chỉ cho dòng điện đi theo chiều từ anode sang cathode, nên tải chỉ có dòng điện trong một nửa chu kì; nửa còn lại bị chặn. Có $50$ xung mỗi giây.`
        : `Chỉnh lưu cả chu kì${sign}: trong mỗi nửa chu kì có hai diode dẫn điện, dòng điện qua tải luôn cùng một chiều. Có $100$ xung mỗi giây.`;
    const tail = filter
      ? ` Tụ $C = ${Cmicro}\\ \\mu\\text{F}$ nạp điện khi diode dẫn và phóng điện qua tải khi diode khoá: điện áp ra gần như không đổi, độ gợn sóng $\\Delta U \\approx ${numTex(stats.ripple, 2)}$ V. Tụ càng lớn thì độ gợn càng nhỏ.`
      : ` Giá trị trung bình của điện áp ra khoảng $${numTex(Math.abs(stats.mean), 2)}$ V, điện áp vẫn nhấp nhô mạnh; lắp thêm tụ lọc để làm phẳng.`;
    return {
      tone: /** @type {'ok' | 'info'} */ (filter && mode === 'full' ? 'ok' : 'info'),
      text: kind + tail,
    };
  });

  const timeText = $derived(
    `t = ${formatFixed(t, 4)} s: điện áp nguồn ${formatNumber(now.u, 2)} V, điện áp trên tải ${formatNumber(works ? now.out : 0, 2)} V`,
  );
  const diagramLabel = $derived(
    mode === 'full'
      ? `Mạch cầu chỉnh lưu: ${BRIDGE.map((d) => `${d} hướng ${bridge[d] === 'up' ? 'lên' : 'xuống'}`).join(', ')}. Đang dẫn điện: ${lit.length ? lit.join(', ') : 'không diode nào'}.`
      : mode === 'half'
        ? `Mạch chỉnh lưu nửa chu kì: diode ${flipped ? 'quay ngược' : 'quay thuận'}, ${lit.length ? 'đang dẫn điện' : 'đang khoá'}.`
        : 'Nguồn xoay chiều nối thẳng với điện trở tải.',
  );
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 360 170"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={diagramLabel}
    >
      {#if mode === 'full'}
        <!-- rails: P on top, M at the bottom; columns through A (x = 120) and B (x = 220) -->
        <polyline points="120,30 310,30 310,60" fill="none" stroke="#334155" />
        <polyline points="310,110 310,140 120,140" fill="none" stroke="#334155" />
        <line x1="120" y1="30" x2="120" y2="140" stroke="#334155" />
        <line x1="220" y1="30" x2="220" y2="140" stroke="#334155" />
        <line x1="120" y1="85" x2="156" y2="85" stroke="#334155" />
        <line x1="184" y1="85" x2="220" y2="85" stroke="#334155" />
        <circle cx="170" cy="85" r="14" fill="#fff" stroke="#334155" />
        <text x="170" y="90" font-size="14" text-anchor="middle" fill="#334155">~</text>
        <circle cx="120" cy="85" r="3" fill="#334155" />
        <circle cx="220" cy="85" r="3" fill="#334155" />
        <text x="108" y="89" font-size="11" text-anchor="end" fill="#475569">A</text>
        <text x="232" y="89" font-size="11" fill="#475569">B</text>
        <text x="200" y="24" font-size="11" fill="#475569">P</text>
        <text x="200" y="156" font-size="11" fill="#475569">M</text>
        {#each [{ d: 'D1', x: 120, y: 57 }, { d: 'D4', x: 120, y: 112 }, { d: 'D2', x: 220, y: 57 }, { d: 'D3', x: 220, y: 112 }] as p (p.d)}
          <Diode
            x={p.x}
            y={p.y}
            dir={bridge[/** @type {'D1' | 'D2' | 'D3' | 'D4'} */ (p.d)] === 'up' ? 'up' : 'down'}
            on={lit.includes(p.d)}
            label={p.d}
          />
        {/each}
      {:else}
        <polyline points="50,69 50,30 150,30" fill="none" stroke="#334155" />
        <polyline points="190,30 310,30 310,60" fill="none" stroke="#334155" />
        <polyline points="310,110 310,140 50,140 50,101" fill="none" stroke="#334155" />
        <circle cx="50" cy="85" r="16" fill="#fff" stroke="#334155" />
        <text x="50" y="90" font-size="14" text-anchor="middle" fill="#334155">~</text>
        {#if mode === 'half'}
          <Diode x={170} y={30} dir={flipped ? 'left' : 'right'} on={lit.length > 0} label="D" />
          <line x1="150" y1="30" x2="162" y2="30" stroke="#334155" />
          <line x1="177" y1="30" x2="190" y2="30" stroke="#334155" />
        {:else}
          <line x1="150" y1="30" x2="190" y2="30" stroke="#334155" />
        {/if}
      {/if}
      <rect x="301" y="60" width="18" height="50" fill="#fff" stroke="#334155" />
      <text x="324" y="90" font-size="11" fill="#475569">R</text>
      {#if filter && mode !== 'none'}
        <line x1="270" y1="30" x2="270" y2="80" stroke="#334155" />
        <line x1="258" y1="80" x2="282" y2="80" stroke="#334155" stroke-width="2.5" />
        <line x1="258" y1="88" x2="282" y2="88" stroke="#334155" stroke-width="2.5" />
        <line x1="270" y1="88" x2="270" y2="140" stroke="#334155" />
        <text x="286" y="88" font-size="11" fill="#475569">C</text>
      {/if}
    </svg>
  </div>

  <div class="{card} space-y-1 p-2">
    <p class="px-2 text-sm font-semibold text-slate-700">
      Dao động kí: điện áp nguồn (nét đứt) và điện áp trên tải R (nét liền)
    </p>
    <OscGraph
      curves={[
        { f: inCurve, color: '#94a3b8', dashed: true },
        { f: outCurve, color: '#16a34a' },
      ]}
      tMax={T_MAX}
      yMax={12}
      tStep={0.005}
      yStep={4}
      yLabel="u (V)"
      label="Đồ thị điện áp nguồn và điện áp trên tải theo thời gian; chọn thời điểm"
      cursor={t}
      onpick={(v) => (t = v)}
      keyStep={0.0005}
      valueText={timeText}
      height={170}
    />
    <p class="px-2 text-sm text-slate-600" aria-live="polite">
      {timeText}. Diode đang dẫn: {lit.length ? lit.join(', ') : 'không có'}.
    </p>
  </div>

  <SegmentedControl label="Mạch" options={MODE_OPTIONS} value={mode} onchange={setMode} />
  {#if mode === 'half'}
    <button type="button" class={button.secondary} onclick={() => (flipped = !flipped)}>
      Đảo chiều diode
    </button>
  {:else if mode === 'full'}
    <div class="flex flex-wrap gap-2" role="group" aria-label="Quay từng diode của cầu">
      {#each BRIDGE as d (d)}
        <button type="button" class={button.quiet} onclick={() => turn(d)}>
          Quay {d}: {bridge[d] === 'up' ? 'hướng lên ↑' : 'hướng xuống ↓'}
        </button>
      {/each}
    </div>
  {/if}
  {#if mode !== 'none'}
    <SegmentedControl
      label="Lọc bằng tụ điện"
      options={FILTER_OPTIONS}
      value={filter ? 'on' : 'off'}
      onchange={(v) => (filter = v === 'on')}
    />
    {#if filter}
      <SliderField
        label="Điện dung tụ lọc C"
        bind:value={Cmicro}
        min={10}
        max={1000}
        step={10}
        unit="μF"
      />
    {/if}
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
