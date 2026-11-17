<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { lenzOutcome } from './engine.js';

  /** @type {import('./engine.js').Pole[]} */
  const POLES = ['N', 'S'];
  let pole = $state(/** @type {import('./engine.js').Pole} */ ('N'));
  let motion = $state(/** @type {import('./engine.js').Motion} */ ('gan'));
  /** @type {import('./engine.js').Pole | null} */
  let guess = $state(null);

  const out = $derived(lenzOutcome(pole, motion));
  const right = $derived(guess === out.face);
  /** +1 when the magnet's field through the ring points right (away from an N face). */
  const magnetDir = $derived(pole === 'N' ? 1 : -1);
  const inducedDir = $derived(out.grows ? -magnetDir : magnetDir);
  const shift = $derived(motion === 'gan' ? 20 : -20);

  function reset() {
    guess = null;
  }

  const note = $derived.by(() => {
    if (guess === null)
      return 'Dự đoán: mặt vòng dây quay về phía nam châm sẽ trở thành cực gì? Chọn một đáp án.';
    const why = `Khi nam châm ${motion === 'gan' ? 'lại gần' : 'ra xa'}, từ thông qua vòng dây ${out.grows ? 'tăng' : 'giảm'}. Theo định luật Lenz, dòng điện cảm ứng sinh ra từ trường cảm ứng $\\vec{B}_c$ ${out.grows ? 'ngược chiều' : 'cùng chiều'} với từ trường của nam châm để chống lại sự ${out.grows ? 'tăng' : 'giảm'} đó: mặt vòng dây đối diện nam châm là cực ${out.face === 'N' ? 'Bắc' : 'Nam'}, ${out.force} nam châm. Nhìn từ phía nam châm, dòng điện cảm ứng chạy ${out.turn}.`;
    return right ? `Đúng. ${why}` : `Chưa đúng. ${why}`;
  });
</script>

<div class="space-y-3">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Cực quay về phía vòng dây"
      options={[
        { value: 'N', label: 'Cực Bắc (N)' },
        { value: 'S', label: 'Cực Nam (S)' },
      ]}
      bind:value={pole}
      onchange={reset}
    />
    <SegmentedControl
      label="Nam châm chuyển động"
      options={[
        { value: 'gan', label: 'Lại gần vòng dây' },
        { value: 'xa', label: 'Ra xa vòng dây' },
      ]}
      bind:value={motion}
      onchange={reset}
    />
  </div>

  <svg
    viewBox="0 0 340 170"
    class="{card} mx-auto block w-full max-w-md"
    role="img"
    aria-label="Nam châm thẳng quay cực {pole === 'N'
      ? 'Bắc'
      : 'Nam'} về phía vòng dây kín, đang chuyển động {motion === 'gan'
      ? 'lại gần'
      : 'ra xa'} vòng dây."
  >
    <rect x="30" y="70" width="60" height="34" fill={pole === 'N' ? '#2563eb' : '#dc2626'} />
    <rect x="90" y="70" width="60" height="34" fill={pole === 'N' ? '#dc2626' : '#2563eb'} />
    <text x="60" y="93" text-anchor="middle" class="fill-white text-[16px] font-bold"
      >{pole === 'N' ? 'S' : 'N'}</text
    >
    <text x="120" y="93" text-anchor="middle" class="fill-white text-[16px] font-bold">{pole}</text>
    <ForceArrow x1={90 - shift} y1={130} x2={90 + shift} y2={130} color="#0f172a" label="v" />
    <ellipse cx="250" cy="87" rx="14" ry="52" fill="none" stroke="#b45309" stroke-width="5" />
    <ForceArrow
      x1={magnetDir > 0 ? 200 : 300}
      y1={50}
      x2={magnetDir > 0 ? 300 : 200}
      y2={50}
      color="#7c3aed"
      label="B"
    />
    {#if guess !== null}
      <ForceArrow
        x1={inducedDir > 0 ? 215 : 285}
        y1={110}
        x2={inducedDir > 0 ? 285 : 215}
        y2={110}
        color="#059669"
        dashed
        label="Bc"
      />
      <text x="226" y="160" text-anchor="middle" class="fill-emerald-700 text-[15px] font-bold"
        >{out.face}</text
      >
    {/if}
  </svg>

  <div class="flex flex-wrap gap-2">
    {#each POLES as p (p)}
      <button
        type="button"
        class={guess === p ? (right ? button.primary : button.secondary) : button.quiet}
        aria-pressed={guess === p}
        onclick={() => (guess = p)}>Mặt đối diện là cực {p === 'N' ? 'Bắc' : 'Nam'}</button
      >
    {/each}
  </div>
  <FeedbackNote tone={guess === null ? 'info' : right ? 'ok' : 'warn'} text={note} />
</div>
