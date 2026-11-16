<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { trace, xOf } from '../_shared/scope.js';
  import { PUZZLES, audioAt, carrierAt, envelopeAt, modulatedAt, ranges } from './engine.js';

  const W = 360;
  const H = 300;
  const T_MAX = 2;
  const STEPS = 720;
  const LEFT = 8;
  const WIDTH = W - 16;
  /** @param {number} mid @param {number} half @param {number} yMax */
  const strip = (mid, half, yMax) => ({ left: LEFT, width: WIDTH, mid, half, tMax: T_MAX, yMax });
  const AUDIO = strip(50, 26, 1);
  const CARRIER = strip(130, 26, 1);
  const OUT = strip(232, 46, 2.2);
  const PUZZLE = strip(60, 46, 2.2);

  const MODE_OPTIONS = [
    { value: 'am', label: 'Biến điệu biên độ (AM)' },
    { value: 'fm', label: 'Biến điệu tần số (FM)' },
  ];
  const AUDIO_OPTIONS = [0.5, 1, 1.5].map((v) => ({ value: v, label: `${formatNumber(v)} kHz` }));
  const CARRIER_OPTIONS = [10, 15, 20].map((v) => ({ value: v, label: `${v} kHz` }));

  /** @type {'am' | 'fm'} */
  let mode = $state('am');
  let fa = $state(1);
  let fc = $state(15);
  let m = $state(0.5);
  let df = $state(5);

  const s = $derived({ fa, fc, m, df });
  const r = $derived(ranges(mode, s));
  const audioLine = $derived(trace(AUDIO, (t) => audioAt(t, fa), STEPS));
  const carrierLine = $derived(trace(CARRIER, (t) => carrierAt(t, fc), STEPS));
  const outLine = $derived(trace(OUT, (t) => modulatedAt(mode, t, s), STEPS));
  const upper = $derived(trace(OUT, (t) => envelopeAt(t, s), STEPS));
  const lower = $derived(trace(OUT, (t) => -envelopeAt(t, s), STEPS));

  /** @param {string | number} v */
  const setMode = (v) => (mode = v === 'fm' ? 'fm' : 'am');

  const note = $derived.by(() => {
    if (mode === 'am') {
      if (r.overModulated) {
        return {
          tone: /** @type {const} */ ('warn'),
          text: `Độ biến điệu lớn hơn 1: đường bao bị gập lại qua trục, không còn giống tín hiệu âm. Máy thu sẽ cho âm thanh méo (quá biến điệu).`,
        };
      }
      return {
        tone: /** @type {const} */ ('info'),
        text: `AM: biên độ sóng thay đổi từ $${formatNumber(r.ampMin)}$ đến $${formatNumber(r.ampMax)}$ (biên độ sóng mang là $1$), theo đúng dạng tín hiệu âm (đường bao nét đứt). Tần số luôn bằng tần số sóng mang $${fc}$ kHz.`,
      };
    }
    if (df === 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Độ lệch tần số bằng 0: sóng ra chỉ là sóng mang, không mang thông tin gì. Tăng độ lệch tần số.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `FM: biên độ sóng không đổi. Tần số thay đổi từ $${formatNumber(r.fMin)}$ kHz (chỗ sóng thưa, tín hiệu âm ở đáy) đến $${formatNumber(r.fMax)}$ kHz (chỗ sóng dày, tín hiệu âm ở đỉnh).`,
    };
  });

  // Recognition puzzles.
  let pick = $state(0);
  /** @type {'am' | 'fm' | null} */
  let guess = $state(null);
  const puzzle = $derived(PUZZLES[pick]);
  const puzzleLine = $derived(trace(PUZZLE, (t) => modulatedAt(puzzle.mode, t, puzzle.s), STEPS));
  /** @param {'am' | 'fm'} g */
  const answer = (g) => (guess = g);
  const next = () => {
    pick = (pick + 1) % PUZZLES.length;
    guess = null;
  };
  const verdict = $derived.by(() => {
    if (guess === null) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Quan sát biên độ và độ dày của các dao động rồi chọn AM hoặc FM.',
      };
    }
    const right = guess === puzzle.mode;
    const why =
      puzzle.mode === 'am'
        ? 'các dao động dày đều (tần số không đổi) còn biên độ to nhỏ theo tín hiệu âm'
        : 'biên độ không đổi còn các dao động lúc dày lúc thưa (tần số thay đổi)';
    return right
      ? {
          tone: /** @type {const} */ ('ok'),
          text: `Đúng, đây là sóng ${puzzle.mode.toUpperCase()}: ${why}.`,
        }
      : {
          tone: /** @type {const} */ ('warn'),
          text: `Chưa đúng. Đây là sóng ${puzzle.mode.toUpperCase()}: ${why}.`,
        };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl rounded-xl bg-slate-50"
      role="img"
      aria-label={`Ba đồ thị theo thời gian: tín hiệu âm tần số ${formatNumber(fa)} kHz, sóng mang tần số ${fc} kHz và sóng ${mode.toUpperCase()} tạo thành.`}
    >
      {#each [AUDIO, CARRIER, OUT] as st (st.mid)}
        <line x1={LEFT} x2={LEFT + WIDTH} y1={st.mid} y2={st.mid} stroke="#cbd5e1" />
      {/each}
      {#each [0.5, 1, 1.5] as t (t)}
        <line
          x1={xOf(OUT, t)}
          x2={xOf(OUT, t)}
          y1="14"
          y2={H - 6}
          stroke="#e2e8f0"
          stroke-dasharray="2 3"
        />
      {/each}
      <text x={LEFT + 2} y="16" font-size="11" font-weight="700" fill="#1d4ed8"
        >Tín hiệu âm (tần số thấp)</text
      >
      <polyline points={audioLine} fill="none" stroke="#2563eb" stroke-width="1.8" />
      <text x={LEFT + 2} y="96" font-size="11" font-weight="700" fill="#475569"
        >Sóng mang (tần số cao)</text
      >
      <polyline points={carrierLine} fill="none" stroke="#64748b" stroke-width="1.1" />
      <text x={LEFT + 2} y="180" font-size="11" font-weight="700" fill="#047857"
        >Sóng đã biến điệu {mode.toUpperCase()}</text
      >
      {#if mode === 'am'}
        <polyline points={upper} fill="none" stroke="#2563eb" stroke-dasharray="4 3" />
        <polyline points={lower} fill="none" stroke="#2563eb" stroke-dasharray="4 3" />
      {/if}
      <polyline points={outLine} fill="none" stroke="#059669" stroke-width="1.1" />
      <text x={W - 8} y={H - 4} font-size="10" fill="#64748b" text-anchor="end"
        >t (ms), cửa sổ 2 ms</text
      >
    </svg>
    <p class="px-2 pt-2 text-sm text-slate-600">
      Tần số sóng mang ở đây được thu nhỏ để nhìn rõ từng dao động; sóng mang thật của đài phát
      thanh có tần số cỡ trăm kHz (AM) đến trăm MHz (FM).
    </p>
  </div>

  <SegmentedControl label="Cách biến điệu" options={MODE_OPTIONS} value={mode} onchange={setMode} />
  <div class="flex flex-wrap gap-3">
    <SegmentedControl label="Tần số tín hiệu âm" options={AUDIO_OPTIONS} bind:value={fa} />
    <SegmentedControl label="Tần số sóng mang" options={CARRIER_OPTIONS} bind:value={fc} />
  </div>
  {#if mode === 'am'}
    <SliderField
      label="Độ biến điệu (mức thay đổi biên độ)"
      bind:value={m}
      min={0}
      max={1.2}
      step={0.1}
    />
  {:else}
    <SliderField
      label="Độ lệch tần số lớn nhất"
      bind:value={df}
      min={0}
      max={8}
      step={1}
      unit="kHz"
    />
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="{card} space-y-3 p-3">
    <h3 class="font-semibold text-slate-800">Thử nhận biết: AM hay FM?</h3>
    <svg
      viewBox="0 0 {W} 120"
      class="mx-auto block w-full max-w-xl rounded-xl bg-slate-50"
      role="img"
      aria-label={`Sóng bí ẩn số ${pick + 1}. ${guess === null ? 'Hãy chọn AM hoặc FM.' : `Đây là sóng ${puzzle.mode.toUpperCase()}.`}`}
    >
      <line x1={LEFT} x2={LEFT + WIDTH} y1={PUZZLE.mid} y2={PUZZLE.mid} stroke="#cbd5e1" />
      <polyline points={puzzleLine} fill="none" stroke="#7c3aed" stroke-width="1.1" />
    </svg>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={() => answer('am')}>Sóng AM</button>
      <button type="button" class={button.secondary} onclick={() => answer('fm')}>Sóng FM</button>
      <button type="button" class={button.quiet} onclick={next}>Sóng khác</button>
    </div>
    <FeedbackNote tone={verdict.tone} text={verdict.text} />
  </div>
</div>
