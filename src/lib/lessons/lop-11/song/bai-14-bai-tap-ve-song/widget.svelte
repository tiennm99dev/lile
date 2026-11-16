<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card, textInput } from '#lib/core/ui.js';
  import StandingString from '../_shared/standing-string.svelte';
  import { interferenceReport, standingReport, valid } from './engine.js';

  const KINDS = [
    { value: 'song-dung', label: 'Sóng dừng trên dây' },
    { value: 'giao-thoa', label: 'Giao thoa hai nguồn' },
  ];
  const ENDS = [
    { value: 'co-dinh', label: 'Hai đầu cố định' },
    { value: 'tu-do', label: 'Một đầu tự do' },
  ];
  /** @type {Record<string, [number, number]>} */
  const STRING_RANGES = { l: [0.05, 20], v: [0.1, 1000], f: [0.1, 5000] };
  /** @type {Record<string, [number, number]>} */
  const SOURCE_RANGES = { a: [0.5, 50], lambda: [0.1, 50] };

  let kind = $state('song-dung');
  /** @type {import('../_shared/standing.js').EndKind} */
  let end = $state('co-dinh');
  let typed = $state({ l: '1,2', v: '10,64', f: '13,3', a: '9', lambda: '2' });

  const uid = $props.id();
  const num = $derived({
    l: readNumber(typed.l),
    v: readNumber(typed.v),
    f: readNumber(typed.f),
    a: readNumber(typed.a),
    lambda: readNumber(typed.lambda),
  });
  const stringOk = $derived(valid(num, STRING_RANGES));
  const sourceOk = $derived(valid(num, SOURCE_RANGES));
  const standing = $derived(
    stringOk ? standingReport(end, num.l ?? 1, num.v ?? 1, num.f ?? 1) : null,
  );
  const sources = $derived(sourceOk ? interferenceReport(num.a ?? 1, num.lambda ?? 1) : null);

  const FIELDS = {
    'song-dung': [
      { key: 'l', label: 'Chiều dài dây l (m)' },
      { key: 'v', label: 'Tốc độ truyền sóng v (m/s)' },
      { key: 'f', label: 'Tần số f (Hz)' },
    ],
    'giao-thoa': [
      { key: 'a', label: 'Khoảng cách S₁S₂ (cm)' },
      { key: 'lambda', label: 'Bước sóng λ (cm)' },
    ],
  };
  const fields = $derived(kind === 'giao-thoa' ? FIELDS['giao-thoa'] : FIELDS['song-dung']);

  // Segment drawing for the two sources.
  const W = 340;
  const LEFT = 24;
  const RIGHT = W - 24;
  /** @param {number} x cm from the midpoint */
  const sx = (x) => (LEFT + RIGHT) / 2 + ((RIGHT - LEFT) * x) / (num.a ?? 1);
</script>

<div class="space-y-4">
  <SegmentedControl label="Loại bài toán" options={KINDS} bind:value={kind} hideLabel />
  {#if kind === 'song-dung'}
    <SegmentedControl label="Hai đầu dây" options={ENDS} bind:value={end} hideLabel />
  {/if}

  <div class="grid gap-3 sm:grid-cols-3">
    {#each fields as field (field.key)}
      <div>
        <label for="{uid}-{field.key}" class="mb-1 block text-sm font-semibold text-slate-700"
          >{field.label}</label
        >
        <input
          id="{uid}-{field.key}"
          class={textInput}
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed[/** @type {'l' | 'v' | 'f' | 'a' | 'lambda'} */ (field.key)]}
        />
      </div>
    {/each}
  </div>

  {#if kind === 'song-dung'}
    {#if standing && num.l !== null && num.v !== null && num.f !== null}
      <div class="{card} p-3">
        {#if standing.drawable}
          <StandingString {end} length={num.l} speed={num.v} frequency={num.f} />
        {:else}
          <p class="text-sm text-slate-600">
            Dây có quá nhiều bó sóng để vẽ rõ; xem kết quả bên dưới.
          </p>
        {/if}
      </div>
      <FeedbackNote tone={standing.standing ? 'ok' : 'info'} text={standing.text} />
    {:else}
      <FeedbackNote
        tone="warn"
        text={'Hãy nhập các số dương, ví dụ $1{,}2$: $l$ từ $0{,}05$ đến $20$ m, $v$ đến $1000$ m/s, $f$ đến $5000$ Hz.'}
      />
    {/if}
  {:else if sources}
    <div class="{card} p-3">
      <svg
        viewBox="0 0 {W} 90"
        class="mx-auto block w-full max-w-xl"
        role="img"
        aria-label={`Đoạn S1S2 dài ${formatNumber(num.a ?? 0, 2)} xentimét với ${sources.maxima.length} cực đại và ${sources.minima.length} cực tiểu`}
      >
        <line x1={LEFT} y1="44" x2={RIGHT} y2="44" stroke="#94a3b8" stroke-width="2" />
        {#if sources.maxima.length <= 80}
          {#each sources.maxima as x (x)}
            <circle cx={sx(x)} cy="44" r="4" fill="#4f46e5" />
          {/each}
          {#each sources.minima as x (x)}
            <g stroke="#be123c" stroke-width="1.8">
              <line x1={sx(x) - 3.5} y1="40.5" x2={sx(x) + 3.5} y2="47.5" />
              <line x1={sx(x) - 3.5} y1="47.5" x2={sx(x) + 3.5} y2="40.5" />
            </g>
          {/each}
        {/if}
        <circle cx={LEFT} cy="44" r="6" fill="#f97316" />
        <circle cx={RIGHT} cy="44" r="6" fill="#f97316" />
        <text x={LEFT} y="70" font-size="12" font-weight="700" text-anchor="middle" fill="#334155"
          >S₁</text
        >
        <text x={RIGHT} y="70" font-size="12" font-weight="700" text-anchor="middle" fill="#334155"
          >S₂</text
        >
        <text x={W / 2} y="20" font-size="11" text-anchor="middle" fill="#475569"
          >● cực đại ✕ cực tiểu</text
        >
      </svg>
    </div>
    <FeedbackNote tone="ok" text={sources.text} />
  {:else}
    <FeedbackNote
      tone="warn"
      text={'Hãy nhập các số dương: $S_1S_2$ từ $0{,}5$ đến $50$ cm, $\\lambda$ từ $0{,}1$ đến $50$ cm.'}
    />
  {/if}
</div>
