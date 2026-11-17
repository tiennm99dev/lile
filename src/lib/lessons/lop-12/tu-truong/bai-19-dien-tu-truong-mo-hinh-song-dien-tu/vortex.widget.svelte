<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { vortexTurn } from './engine.js';

  const W = 340;
  const H = 240;
  const CX = W / 2;
  const CY = H / 2;
  /** Radius of the region with the magnetic field, and of the drawn E lines. */
  const R = 62;
  const RINGS = [42, 84, 108];
  const MARKS = [30, 150, 270];

  let way = $state(/** @type {import('./engine.js').Way} */ ('ra'));
  let change = $state(/** @type {import('./engine.js').Change} */ ('tang'));
  /** @type {'cw' | 'ccw' | 'none' | null} */
  let guess = $state(null);

  const turn = $derived(vortexTurn(way, change));
  const answer = $derived(turn ?? 'none');
  const right = $derived(guess === answer);

  const dots = $derived.by(() => {
    /** @type {Array<{ x: number, y: number }>} */
    const out = [];
    for (let dx = -48; dx <= 48; dx += 24)
      for (let dy = -48; dy <= 48; dy += 24)
        if (dx * dx + dy * dy < (R - 8) * (R - 8)) out.push({ x: CX + dx, y: CY + dy });
    return out;
  });

  /** Arrows along each ring, pointing the way the E lines turn. */
  const arrows = $derived.by(() => {
    if (!turn) return [];
    const s = turn === 'ccw' ? 1 : -1;
    return RINGS.flatMap((r, k) =>
      MARKS.map((deg) => {
        const a = ((deg + k * 40) * Math.PI) / 180;
        const p = { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) };
        const tx = -Math.sin(a) * s;
        const ty = -Math.cos(a) * s;
        return { x1: p.x - tx * 9, y1: p.y - ty * 9, x2: p.x + tx * 9, y2: p.y + ty * 9 };
      }),
    );
  });

  function reset() {
    guess = null;
  }

  const CHOICES = /** @type {const} */ ([
    { value: 'cw', label: 'Cùng chiều kim đồng hồ' },
    { value: 'ccw', label: 'Ngược chiều kim đồng hồ' },
    { value: 'none', label: 'Không có điện trường' },
  ]);

  const note = $derived.by(() => {
    if (guess === null)
      return 'Dự đoán: đường sức của điện trường sinh ra quanh vùng từ trường chạy theo chiều nào? Chọn một đáp án.';
    const head = right ? 'Đúng.' : 'Chưa đúng.';
    if (!turn)
      return `${head} Từ trường không biến thiên theo thời gian thì không sinh ra điện trường xoáy: không có đường sức điện nào.`;
    const bWord = way === 'ra' ? 'hướng ra' : 'hướng vào';
    const cWord = change === 'tang' ? 'tăng' : 'giảm';
    const opp = (way === 'ra') === (change === 'giam') ? 'hướng ra' : 'hướng vào';
    return `${head} $\\vec{B}$ ${bWord} mặt phẳng hình vẽ và đang ${cWord}: từ trường biến thiên sinh ra điện trường xoáy có đường sức là những đường cong khép kín bao quanh vùng từ trường. Chiều của nó giống chiều dòng điện cảm ứng trong một vòng dây kín đặt ở đó: từ trường của dòng điện ấy phải ${opp} để chống lại sự ${cWord} của từ thông, nên đường sức điện chạy ${turn === 'cw' ? 'cùng' : 'ngược'} chiều kim đồng hồ.`;
  });
</script>

<div class="space-y-3">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Chiều của cảm ứng từ B"
      options={[
        { value: 'ra', label: 'Hướng ra ⊙' },
        { value: 'vao', label: 'Hướng vào ⊗' },
      ]}
      bind:value={way}
      onchange={reset}
    />
    <SegmentedControl
      label="Độ lớn của B theo thời gian"
      options={[
        { value: 'tang', label: 'Đang tăng' },
        { value: 'giam', label: 'Đang giảm' },
        { value: 'khong', label: 'Không đổi' },
      ]}
      bind:value={change}
      onchange={reset}
    />
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="{card} mx-auto block w-full max-w-md"
    role="img"
    aria-label="Vùng từ trường hình tròn, cảm ứng từ {way === 'ra'
      ? 'hướng ra'
      : 'hướng vào'} mặt phẳng hình vẽ và {change === 'tang'
      ? 'đang tăng'
      : change === 'giam'
        ? 'đang giảm'
        : 'không đổi'}.{guess !== null && turn
      ? ` Đường sức điện trường xoáy khép kín, chạy ${turn === 'cw' ? 'cùng' : 'ngược'} chiều kim đồng hồ.`
      : ''}"
  >
    <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
    <circle cx={CX} cy={CY} r={R} fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
    {#each dots as d (`${d.x},${d.y}`)}
      {#if way === 'ra'}
        <circle cx={d.x} cy={d.y} r="6" fill="none" stroke="#7c3aed" stroke-width="1.5" />
        <circle cx={d.x} cy={d.y} r="1.8" fill="#7c3aed" />
      {:else}
        <path
          d="M {d.x - 5} {d.y - 5} L {d.x + 5} {d.y + 5} M {d.x - 5} {d.y + 5} L {d.x + 5} {d.y -
            5}"
          stroke="#7c3aed"
          stroke-width="1.5"
        />
      {/if}
    {/each}
    <text x="12" y="22" class="fill-violet-700 text-[13px] font-semibold"
      >B {change === 'tang' ? 'tăng' : change === 'giam' ? 'giảm' : 'không đổi'}</text
    >
    {#if guess !== null && turn}
      {#each RINGS as r (r)}
        <circle
          cx={CX}
          cy={CY}
          {r}
          fill="none"
          stroke="#059669"
          stroke-width="1.8"
          stroke-dasharray={r < R ? '5 4' : undefined}
        />
      {/each}
      {#each arrows as a, i (i)}
        <ForceArrow x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} color="#047857" />
      {/each}
      <text x={W - 12} y="22" text-anchor="end" class="fill-emerald-700 text-[13px] font-semibold"
        >E xoáy</text
      >
    {/if}
  </svg>

  <div class="flex flex-wrap gap-2">
    {#each CHOICES as c (c.value)}
      <button
        type="button"
        class={guess === c.value ? (right ? button.primary : button.secondary) : button.quiet}
        aria-pressed={guess === c.value}
        onclick={() => (guess = c.value)}>{c.label}</button
      >
    {/each}
  </div>
  <FeedbackNote tone={guess === null ? 'info' : right ? 'ok' : 'warn'} text={note} />
</div>
