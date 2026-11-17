<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { GRIP_QUESTIONS, WAYS_3D, gripAnswer } from './engine.js';

  let index = $state(0);
  /** @type {import('./engine.js').Way | null} */
  let picked = $state(null);
  let tries = $state(0);
  let score = $state(0);

  const q = $derived(GRIP_QUESTIONS[index]);
  const answer = $derived(gripAnswer(q));
  const solved = $derived(picked === answer);
  const done = $derived(index === GRIP_QUESTIONS.length - 1 && solved);

  const SPOT = {
    len: { x: 90, y: 30 },
    xuong: { x: 90, y: 150 },
    trai: { x: 30, y: 90 },
    phai: { x: 150, y: 90 },
  };
  const labelOf = (/** @type {import('./engine.js').Way} */ w) =>
    WAYS_3D.find((x) => x.way === w)?.label ?? '';

  const prompt = $derived(
    q.kind === 'day'
      ? `Dây dẫn thẳng dài vuông góc với mặt phẳng hình vẽ, dòng điện ${q.out ? 'hướng ra (⊙)' : 'hướng vào (⊗)'}. Cảm ứng từ tại điểm M (${labelOf(q.spot).toLowerCase()} so với dây) hướng thế nào?`
      : `Vòng dây nằm trong mặt phẳng hình vẽ, dòng điện chạy ${q.cw ? 'cùng' : 'ngược'} chiều kim đồng hồ. Cảm ứng từ tại tâm vòng dây hướng thế nào?`,
  );

  /** @param {import('./engine.js').Way} w */
  function pick(w) {
    if (solved) return;
    picked = w;
    tries += 1;
    if (w === answer && tries === 1) score += 1;
  }

  function next() {
    index = (index + 1) % GRIP_QUESTIONS.length;
    if (index === 0) score = 0;
    picked = null;
    tries = 0;
  }

  const note = $derived.by(() => {
    if (picked === null) return 'Dùng quy tắc nắm tay phải rồi chọn hướng của cảm ứng từ.';
    if (solved) {
      const why =
        q.kind === 'day'
          ? `Ngón cái tay phải ${q.out ? 'hướng ra phía em' : 'hướng vào trong'}, các ngón khum ${q.out ? 'ngược' : 'cùng'} chiều kim đồng hồ: tại M, đường sức hướng ${labelOf(answer).toLowerCase()}.`
          : `Các ngón tay khum ${q.cw ? 'cùng' : 'ngược'} chiều kim đồng hồ theo dòng điện thì ngón cái ${q.cw ? 'hướng vào trong mặt phẳng' : 'hướng ra phía em'}.`;
      return `Đúng. ${why}${done ? ` Em đã xong cả ${GRIP_QUESTIONS.length} câu, đúng ngay lần đầu ${score} câu.` : ''}`;
    }
    return q.kind === 'day'
      ? 'Chưa đúng. Với dây thẳng, ngón cái chỉ chiều dòng điện; chiều khum của các ngón tay là chiều đường sức (đường tròn quanh dây). Thử lại.'
      : 'Chưa đúng. Với vòng dây, các ngón tay khum theo chiều dòng điện, ngón cái chỉ chiều đường sức qua tâm vòng. Thử lại.';
  });
</script>

<div class="space-y-3">
  <div class="grid gap-3 sm:grid-cols-[180px_1fr]">
    <svg viewBox="0 0 180 180" class="{card} mx-auto w-40 sm:w-full" role="img" aria-label={prompt}>
      {#if q.kind === 'day'}
        <circle cx="90" cy="90" r="14" fill="#fff" stroke="#b45309" stroke-width="2.5" />
        {#if q.out}
          <circle cx="90" cy="90" r="3.5" fill="#b45309" />
        {:else}
          <path d="M 81 81 L 99 99 M 81 99 L 99 81" stroke="#b45309" stroke-width="2.5" />
        {/if}
        <circle cx={SPOT[q.spot].x} cy={SPOT[q.spot].y} r="4" fill="#0f172a" />
        <text
          x={SPOT[q.spot].x + 8}
          y={SPOT[q.spot].y - 6}
          class="fill-slate-800 text-[14px] italic">M</text
        >
      {:else}
        <circle cx="90" cy="90" r="55" fill="none" stroke="#b45309" stroke-width="3" />
        <path
          d={q.cw ? 'M 84 29 L 96 35 L 84 41' : 'M 96 29 L 84 35 L 96 41'}
          fill="none"
          stroke="#b45309"
          stroke-width="3"
        />
        <text x="100" y="62" class="fill-amber-800 text-[14px] font-semibold">I</text>
        <circle cx="90" cy="90" r="4" fill="#0f172a" />
        <text x="96" y="105" class="fill-slate-800 text-[13px] italic">tâm</text>
      {/if}
    </svg>
    <div class="space-y-2">
      <p class="text-sm font-semibold text-slate-800">
        Câu {index + 1}/{GRIP_QUESTIONS.length}. {prompt}
      </p>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {#each WAYS_3D as w (w.way)}
          <button
            type="button"
            class={picked === w.way ? (solved ? button.primary : button.secondary) : button.quiet}
            aria-pressed={picked === w.way}
            disabled={solved && picked !== w.way}
            onclick={() => pick(w.way)}>{w.label}</button
          >
        {/each}
      </div>
      {#if solved}
        <button type="button" class={button.primary} onclick={next}>
          {done ? 'Làm lại từ đầu' : 'Câu tiếp theo'}
        </button>
      {/if}
    </div>
  </div>
  <FeedbackNote tone={picked === null ? 'info' : solved ? 'ok' : 'warn'} text={note} />
</div>
