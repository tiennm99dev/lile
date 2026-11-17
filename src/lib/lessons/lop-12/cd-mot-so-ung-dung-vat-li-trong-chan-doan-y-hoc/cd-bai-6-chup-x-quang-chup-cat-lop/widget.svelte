<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { BINS, N, grey, lesionContrast, phantom, project, reconstruct } from './engine.js';

  let contrast = $state(false);
  let count = $state(1);
  let view = $state(0);
  /** @type {'bone' | 'soft'} */
  let windowName = $state('bone');
  const WINDOWS = { bone: [0, 0.65], soft: [0.17, 0.3] };
  const WINDOW_OPTIONS = [
    { value: 'bone', label: 'Cửa sổ xương' },
    { value: 'soft', label: 'Cửa sổ mô mềm' },
  ];
  const CONTRAST_OPTIONS = [
    { value: 'no', label: 'Không' },
    { value: 'yes', label: 'Tiêm chất cản quang' },
  ];

  const truth = $derived(phantom(contrast));
  const image = $derived(reconstruct(truth, count));
  const strip = $derived(project(truth, view));
  const read = $derived(lesionContrast(image));

  const SIZE = 150;
  const PX = SIZE / N;
  const CELLS = Array.from({ length: N * N }, (_, i) => i);
  /** @param {number} g grey 0..1 */
  const tone = (g) => {
    const v = Math.round(g * 255);
    return `rgb(${v},${v},${v})`;
  };
  const lo = $derived(WINDOWS[windowName][0]);
  const hi = $derived(WINDOWS[windowName][1]);

  /** Detector row: the brighter, the more the beam was absorbed (the larger ∫μ ds), as on a film. */
  const film = $derived(Array.from(strip, (p) => tone(Math.min(1, p / 7))));

  const note = $derived.by(() => {
    const diff = read.lesion - read.around;
    if (count === 1) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Chỉ chụp từ một góc: đây chính là ảnh X-quang thường. Mỗi điểm trên phim cho biết tia X bị cả đường đi hấp thụ bao nhiêu, nên xương sọ phía trước, phía sau và mô não chồng lên nhau; ảnh "dựng lại" chỉ là các vệt kéo dài theo phương chiếu. Hãy tăng số góc chụp.`,
      };
    }
    if (count < 12) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${count} góc chụp: hình hộp sọ đã hiện ra nhưng còn nhiều vệt sọc. Ống tia X cần quay quanh đầu và chụp ở thật nhiều góc thì máy tính mới dựng lại được lát cắt rõ nét.`,
      };
    }
    const seen = diff > 0.012;
    return {
      tone: /** @type {'ok' | 'info'} */ (seen ? 'ok' : 'info'),
      text: `${count} góc chụp: ảnh lát cắt khá rõ, các phần không còn chồng lên nhau. Trên ảnh, hệ số suy giảm đọc được ở khối u khoảng ${formatNumber(read.lesion, 2)} cm⁻¹, mô não quanh nó khoảng ${formatNumber(read.around, 2)} cm⁻¹${contrast ? ': chất cản quang làm khối u hấp thụ tia X mạnh hơn hẳn nên nổi bật.' : '. Chênh lệch nhỏ như vậy chụp X-quang thường không thấy được; chọn "Cửa sổ mô mềm" hoặc tiêm chất cản quang để nhìn rõ hơn.'}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} space-y-3 p-3">
    <svg
      viewBox="0 0 360 262"
      class="mx-auto block w-full max-w-lg select-none"
      role="img"
      aria-label={`Máy chụp cắt lớp: chùm tia X đang chiếu ở góc ${view} độ qua lát cắt đầu; ảnh dựng lại từ ${count} góc chụp.`}
    >
      <text x="85" y="11" font-size="11" text-anchor="middle" fill="#334155">Lát cắt thật</text>
      <text x="275" y="11" font-size="11" text-anchor="middle" fill="#334155"
        >Ảnh dựng lại ({count} góc)</text
      >
      <g transform="translate(10 32)">
        <rect width={SIZE} height={SIZE} fill="#000" />
        {#each CELLS as i (i)}
          <rect
            x={(i % N) * PX}
            y={Math.floor(i / N) * PX}
            width={PX + 0.3}
            height={PX + 0.3}
            fill={tone(grey(truth[i], lo, hi))}
          />
        {/each}
        <g transform="rotate({view} {SIZE / 2} {SIZE / 2})" opacity="0.75">
          <circle cx={SIZE / 2} cy="-6" r="6" fill="#f59e0b" />
          <rect x={SIZE / 2 - 20} y={SIZE + 1} width="40" height="6" rx="2" fill="#0ea5e9" />
          {#each [0.36, 0.43, 0.5, 0.57, 0.64] as f (f)}
            <line
              x1={f * SIZE}
              y1="0"
              x2={f * SIZE}
              y2={SIZE}
              stroke="#c084fc"
              stroke-width="1.2"
              stroke-dasharray="4 4"
            />
          {/each}
        </g>
      </g>
      <g transform="translate(200 32)">
        <rect width={SIZE} height={SIZE} fill="#000" />
        {#each CELLS as i (i)}
          <rect
            x={(i % N) * PX}
            y={Math.floor(i / N) * PX}
            width={PX + 0.3}
            height={PX + 0.3}
            fill={tone(grey(image[i], lo, hi))}
          />
        {/each}
      </g>
      <text x="10" y="212" font-size="11" fill="#334155"
        >Tín hiệu ở đầu thu (giống phim X-quang) khi chiếu ở góc {view}°:</text
      >
      <g transform="translate(10 220)">
        {#each film as fill, k (k)}
          <rect x={(k * 340) / BINS} y="0" width={340 / BINS + 0.3} height="26" {fill} />
        {/each}
      </g>
      <text x="10" y="260" font-size="9" fill="#64748b">ống tia X: cam · đầu thu: xanh</text>
    </svg>
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField label="Số góc chụp" bind:value={count} min={1} max={60} step={1} />
      <SliderField
        label="Góc chiếu đang xem"
        bind:value={view}
        min={0}
        max={175}
        step={5}
        unit="°"
      />
    </div>
    <div class="flex flex-wrap gap-3">
      <SegmentedControl
        label="Hiển thị"
        options={WINDOW_OPTIONS}
        value={windowName}
        onchange={(v) => (windowName = v === 'soft' ? 'soft' : 'bone')}
      />
      <SegmentedControl
        label="Chất cản quang"
        options={CONTRAST_OPTIONS}
        value={contrast ? 'yes' : 'no'}
        onchange={(v) => (contrast = v === 'yes')}
      />
    </div>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
