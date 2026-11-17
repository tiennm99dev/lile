<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import { SLICES, TISSUES, fieldAt, hitSlices, larmor, relax } from './engine.js';

  const FIELD_OPTIONS = [
    { value: 0, label: 'Tắt' },
    { value: 0.5, label: '0,5 T' },
    { value: 1.5, label: '1,5 T' },
    { value: 3, label: '3 T' },
  ];
  const GRADIENT_OPTIONS = [
    { value: 'off', label: 'Tắt' },
    { value: 'on', label: 'Bật' },
  ];
  const T_END = 5000;

  let B0 = $state(0);
  let gradient = $state(false);
  /** Centre of the radio-frequency dial (MHz); the dial spans ±0,4 MHz. */
  const centre = $derived(larmor(B0 || 1.5));
  let fRF = $state(larmor(1.5) - 0.3);
  /** @type {number[] | null} slices tipped by the last pulse, null before any pulse */
  let tipped = $state(null);
  let t = $state(0);
  let playing = $state(false);
  let phase = $state(0);

  function reset() {
    tipped = null;
    t = 0;
    playing = false;
  }
  /** @param {string | number} v */
  function setField(v) {
    B0 = Number(v);
    fRF = Math.round((larmor(B0 || 1.5) - 0.3) * 100) / 100;
    reset();
  }
  /** @param {string | number} v */
  function setGradient(v) {
    gradient = v === 'on';
    reset();
  }
  function pulse() {
    tipped = B0 > 0 ? hitSlices(B0, gradient, fRF) : [];
    t = 0;
    playing = tipped.length > 0 && !reducedMotion();
  }

  $effect(() => {
    if (B0 === 0 || reducedMotion()) return;
    return frameLoop((dt) => {
      phase = (phase + dt * Math.PI) % (2 * Math.PI);
      if (playing) {
        t = Math.min(T_END, t + dt * 1000);
        if (t >= T_END) playing = false;
      }
    });
  });

  /** Fixed jumbled directions (degrees) of the protons with no field. */
  const JUMBLE = [
    [40, 200, 310, 95, 150],
    [260, 15, 120, 330, 75],
    [180, 290, 30, 225, 110],
    [345, 140, 250, 60, 190],
    [100, 320, 210, 20, 280],
  ];
  const SPREAD = [-0.9, -0.45, 0, 0.45, 0.9];

  const sliceView = $derived(
    SLICES.map((s, i) => {
      const fL = B0 > 0 ? larmor(fieldAt(B0, s.z, gradient)) : 0;
      const hit = tipped?.includes(i) ?? false;
      const state = hit ? relax(s.tissue, t) : { mz: 1, signal: 0 };
      const arrows = SPREAD.map((d, j) => {
        if (B0 === 0) {
          const a = (JUMBLE[i][j] * Math.PI) / 180;
          return { dx: Math.sin(a), dy: -Math.cos(a) };
        }
        if (!hit) {
          const wob = 0.18 * Math.cos(phase + d * 3);
          return { dx: wob, dy: -Math.sqrt(1 - wob * wob) };
        }
        const across = Math.sqrt(Math.max(0, 1 - state.mz ** 2));
        const lag = d * Math.PI * (1 - state.signal);
        return { dx: across * Math.cos(phase + lag), dy: -state.mz };
      });
      return { ...s, fL, hit, state, arrows, info: TISSUES[s.tissue] };
    }),
  );

  const curves = $derived(
    (tipped ?? []).map((i) => {
      const tissue = SLICES[i].tissue;
      const pts = Array.from({ length: 51 }, (_, k) => {
        const time = (T_END * k) / 50;
        return { x: time, y: relax(tissue, time).mz };
      });
      return { points: pts, color: TISSUES[tissue].color };
    }),
  );
  const marks = $derived(
    (tipped ?? []).map((i) => ({
      x: t,
      y: relax(SLICES[i].tissue, t).mz,
      color: TISSUES[SLICES[i].tissue].color,
    })),
  );

  const X0 = 40;
  const DX = 64;
  const CY = 120;
  const LEN = 16;

  const note = $derived.by(() => {
    if (B0 === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chưa có từ trường ngoài: mỗi proton như một nam châm rất nhỏ nhưng trục của chúng hướng hỗn loạn, nên phát xung sóng vô tuyến cũng không thu được gì. Hãy bật từ trường mạnh.',
      };
    }
    const head = `Trong từ trường $B = ${numTex(B0)}$ T, trục các proton định hướng theo từ trường và quay quanh phương của nó với tần số Larmor $f = ${numTex(larmor(B0), 2)}$ MHz (hình vẽ đã quay chậm lại rất nhiều lần).`;
    if (tipped === null) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${head} Chỉnh tần số sóng vô tuyến rồi phát xung.`,
      };
    }
    if (tipped.length === 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${head} Sóng vô tuyến $${numTex(fRF, 2)}$ MHz không trùng tần số Larmor của lát nào: không có cộng hưởng, các proton không hấp thụ năng lượng.`,
      };
    }
    const where =
      gradient && tipped.length === 1
        ? ` Nhờ cuộn gradient, từ trường ở mỗi lát hơi khác nhau nên chỉ lát $z = ${SLICES[tipped[0]].z}$ cm cộng hưởng: máy biết tín hiệu đến từ lát nào.`
        : ' Không có gradient, mọi lát cùng tần số Larmor nên cùng cộng hưởng: máy không biết tín hiệu đến từ đâu.';
    const rec = tipped
      .map((i) => {
        const s = sliceView[i];
        return `${s.info.name} đã hồi phục ${formatNumber(s.state.mz * 100, 0)}%`;
      })
      .join(', ');
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Cộng hưởng từ hạt nhân: proton hấp thụ năng lượng của sóng vô tuyến và bị lật đi.${where}${playing ? ' Sau khi ngắt xung, các proton đang hồi phục và phát sóng vô tuyến; kéo thanh thời gian để đọc mức hồi phục.' : ` Sau khi ngắt xung $${numTex(t, 0)}$ ms: ${rec}.`} Mô khác nhau hồi phục nhanh chậm khác nhau, đó là cơ sở tạo độ tương phản của ảnh.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-lg select-none"
      role="img"
      aria-label={`Năm lát cắt dọc cơ thể trong máy cộng hưởng từ, từ trường ${B0 ? `${formatNumber(B0)} T` : 'tắt'}, cuộn gradient ${gradient ? 'bật' : 'tắt'}.`}
    >
      <rect x="10" y="62" width="340" height="104" rx="12" fill="#f1f5f9" stroke="#cbd5e1" />
      {#if B0 > 0}
        <line x1="22" y1="150" x2="22" y2="80" stroke="#0f172a" stroke-width="2" />
        <polygon points="22,72 17,82 27,82" fill="#0f172a" />
        <text x="30" y="80" font-size="11" fill="#0f172a">B</text>
      {/if}
      {#each sliceView as s, i (i)}
        <g>
          <rect
            x={X0 + i * DX}
            y="70"
            width={DX - 8}
            height="90"
            rx="8"
            fill={s.hit ? '#ecfccb' : '#fff'}
            stroke={s.info.color}
          />
          <text
            x={X0 + i * DX + (DX - 8) / 2}
            y="58"
            font-size="10"
            text-anchor="middle"
            fill="#334155">z = {s.z} cm</text
          >
          <text
            x={X0 + i * DX + (DX - 8) / 2}
            y="180"
            font-size="10"
            text-anchor="middle"
            fill={s.info.color}>{s.info.name}</text
          >
          {#if B0 > 0}
            <text
              x={X0 + i * DX + (DX - 8) / 2}
              y="194"
              font-size="9"
              text-anchor="middle"
              fill="#475569">{formatNumber(s.fL, 3)} MHz</text
            >
          {/if}
          {#each s.arrows as a, j (j)}
            {@const cx = X0 + i * DX + 8 + j * 10}
            {@const cy = CY - 4 + (j % 2) * 16}
            <line
              x1={cx - (a.dx * LEN) / 2}
              y1={cy - (a.dy * LEN) / 2}
              x2={cx + (a.dx * LEN) / 2}
              y2={cy + (a.dy * LEN) / 2}
              stroke="#dc2626"
              stroke-width="2"
            />
            <circle cx={cx + (a.dx * LEN) / 2} cy={cy + (a.dy * LEN) / 2} r="2.2" fill="#dc2626" />
          {/each}
        </g>
      {/each}
      <text x="180" y="20" font-size="11" text-anchor="middle" fill="#334155"
        >Mỗi mũi tên là trục Bắc – Nam (đầu chấm: cực Bắc) của một proton</text
      >
    </svg>
    <div class="flex flex-wrap gap-3">
      <SegmentedControl
        label="Từ trường mạnh"
        options={FIELD_OPTIONS}
        value={B0}
        onchange={setField}
      />
      <SegmentedControl
        label="Cuộn gradient"
        options={GRADIENT_OPTIONS}
        value={gradient ? 'on' : 'off'}
        onchange={setGradient}
      />
    </div>
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Tần số sóng vô tuyến"
        bind:value={fRF}
        min={Math.round((centre - 0.4) * 100) / 100}
        max={Math.round((centre + 0.4) * 100) / 100}
        step={0.01}
        unit="MHz"
        format={(v) => formatNumber(v, 2)}
      />
      <SliderField
        label="Thời gian sau khi ngắt xung"
        bind:value={t}
        min={0}
        max={T_END}
        step={50}
        unit="ms"
        format={(v) => formatNumber(v, 0)}
        oninput={() => (playing = false)}
      />
    </div>
    <button type="button" class={button.primary} onclick={pulse}>Phát xung sóng vô tuyến</button>
  </div>
  {#if curves.length > 0}
    <div class="{card} p-2">
      <p class="px-2 text-sm font-semibold text-slate-700">
        Mức hồi phục về trạng thái ban đầu của các lát đã cộng hưởng
      </p>
      <XyPlot
        lines={curves}
        {marks}
        xMax={T_END}
        yMax={1.05}
        xTicks={[1000, 2000, 3000, 4000]}
        yTicks={[0.5, 1]}
        xLabel="t (ms)"
        yLabel="hồi phục"
        label="Đồ thị mức hồi phục theo thời gian sau khi ngắt xung sóng vô tuyến."
      />
    </div>
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
