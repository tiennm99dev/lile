<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { angleToField, currentUnit, forceSize, forceVector, forceWords } from './engine.js';

  const W = 360;
  const H = 260;
  const CX = W / 2;
  const CY = H / 2;

  let way = $state(/** @type {import('./engine.js').FieldWay} */ ('phai'));
  let theta = $state(90);
  let current = $state(4);
  let field = $state(0.5);
  let lengthCm = $state(20);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** Half the drawn wire: it stays inside the board (CY − 118 > 10) at the longest L. */
  const half = $derived(30 + lengthCm * 2.2);
  const unit = $derived(currentUnit(theta));
  const tip = $derived({ x: CX + unit.x * half, y: CY - unit.y * half });
  const handle = $state({ x: CX, y: CY - 88 });
  $effect(() => {
    handle.x = tip.x;
    handle.y = tip.y;
  });

  const alpha = $derived(angleToField(theta, way));
  const size = $derived(forceSize(field, current, lengthCm / 100, alpha));
  const vec = $derived(forceVector(field, current, lengthCm / 100, theta, way));
  /** Drawn force length: 20 px for a tiny force up to 110 px for the largest, 4 N. */
  const fLen = $derived(Math.min(110, 20 + 22.5 * size));
  const inPlane = $derived(way === 'ra' || way === 'vao');

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const deg = (Math.atan2(CY - p.y, p.x - CX) * 180) / Math.PI;
      theta = (((Math.round(deg / 5) * 5) % 360) + 360) % 360;
      const u = currentUnit(theta);
      return { x: CX + u.x * half, y: CY - u.y * half };
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      const step = (big ? 30 : 5) * (dx || -dy);
      theta = (((theta + step) % 360) + 360) % 360;
    },
  });

  const fieldRows = [40, 80, 120, 160, 200, 240];
  const dots = $derived.by(() => {
    /** @type {Array<{ x: number, y: number }>} */
    const out = [];
    for (let x = 30; x < W; x += 50) for (let y = 25; y < H; y += 50) out.push({ x, y });
    return out;
  });

  const status = $derived.by(() => {
    const head = `α = ${formatNumber(alpha)}°, sin α = ${formatNumber(Math.sin((alpha * Math.PI) / 180), 3)}. F = BIL sin α = ${formatNumber(field)} · ${formatNumber(current)} · ${formatNumber(lengthCm / 100)} · ${formatNumber(Math.sin((alpha * Math.PI) / 180), 3)} ≈ ${formatNumber(size, 3)} N.`;
    if (size === 0) {
      return `${head} ${current === 0 || field === 0 ? 'Không có dòng điện hoặc không có từ trường thì không có lực từ.' : 'Dây dẫn song song với đường sức từ (α = 0° hoặc 180°) thì không chịu lực từ.'}`;
    }
    const hand = inPlane
      ? `Đặt bàn tay trái sao cho đường sức từ hướng vào lòng bàn tay (lòng bàn tay ${way === 'ra' ? 'úp về phía tờ giấy, vì B hướng ra' : 'quay về phía em, vì B hướng vào'}), chiều từ cổ tay đến ngón giữa theo dòng điện: ngón cái choãi ra 90° chỉ lực từ.`
      : 'Đặt bàn tay trái sao cho đường sức từ hướng vào lòng bàn tay, chiều từ cổ tay đến ngón giữa theo dòng điện: ngón cái choãi ra 90° chỉ lực từ.';
    return `${head} Lực từ vuông góc với cả dây dẫn và B, ${forceWords(vec)}. ${hand}${alpha === 90 ? ' Dây vuông góc với đường sức nên lực từ lớn nhất.' : ''}`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chiều của cảm ứng từ B"
    options={[
      { value: 'phai', label: 'Sang phải' },
      { value: 'trai', label: 'Sang trái' },
      { value: 'ra', label: 'Hướng ra ⊙' },
      { value: 'vao', label: 'Hướng vào ⊗' },
    ]}
    bind:value={way}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto w-full max-w-md touch-none select-none"
      role="group"
      aria-label="Đoạn dây dẫn trong từ trường đều. {status}"
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
      <g aria-hidden="true">
        {#if inPlane}
          {#each dots as d (`${d.x},${d.y}`)}
            {#if way === 'ra'}
              <circle cx={d.x} cy={d.y} r="6" fill="none" stroke="#7c3aed" stroke-width="1.5" />
              <circle cx={d.x} cy={d.y} r="1.8" fill="#7c3aed" />
            {:else}
              <path
                d="M {d.x - 5} {d.y - 5} L {d.x + 5} {d.y + 5} M {d.x - 5} {d.y + 5} L {d.x +
                  5} {d.y - 5}"
                stroke="#7c3aed"
                stroke-width="1.5"
              />
            {/if}
          {/each}
        {:else}
          {#each fieldRows as y (y)}
            <line x1="8" y1={y} x2={W - 8} y2={y} stroke="#c4b5fd" stroke-width="1.5" />
            {#each [90, 270] as x (x)}
              <path
                d={way === 'phai'
                  ? `M ${x - 6} ${y - 5} L ${x + 4} ${y} L ${x - 6} ${y + 5} Z`
                  : `M ${x + 6} ${y - 5} L ${x - 4} ${y} L ${x + 6} ${y + 5} Z`}
                fill="#7c3aed"
              />
            {/each}
          {/each}
        {/if}
        <text x="10" y="18" class="fill-violet-700 text-[13px] font-semibold">B</text>

        <line
          x1={CX - unit.x * half}
          y1={CY + unit.y * half}
          x2={tip.x}
          y2={tip.y}
          stroke="#b45309"
          stroke-width="6"
          stroke-linecap="round"
        />
        <ForceArrow
          x1={CX + unit.x * (half * 0.3) + unit.y * 16}
          y1={CY - unit.y * (half * 0.3) + unit.x * 16}
          x2={CX + unit.x * (half * 0.8) + unit.y * 16}
          y2={CY - unit.y * (half * 0.8) + unit.x * 16}
          color="#92400e"
          label="I"
        />

        {#if size > 0}
          {#if inPlane}
            <ForceArrow
              x1={CX}
              y1={CY}
              x2={CX + (vec.x / size) * fLen}
              y2={CY - (vec.y / size) * fLen}
              color="#dc2626"
              label="F"
            />
          {:else}
            {@const r = 8 + Math.min(14, size * 12)}
            <circle cx={CX} cy={CY} {r} fill="#fff" stroke="#dc2626" stroke-width="2.5" />
            {#if vec.z > 0}
              <circle cx={CX} cy={CY} r="3" fill="#dc2626" />
            {:else}
              <path
                d="M {CX - r * 0.6} {CY - r * 0.6} L {CX + r * 0.6} {CY + r * 0.6} M {CX -
                  r * 0.6} {CY + r * 0.6} L {CX + r * 0.6} {CY - r * 0.6}"
                stroke="#dc2626"
                stroke-width="2.5"
              />
            {/if}
            <text
              x={CX + r + 4}
              y={CY + 18}
              stroke="#fff"
              stroke-width="4"
              paint-order="stroke"
              class="fill-red-600 text-[13px] font-semibold"
              >F {vec.z > 0 ? 'hướng ra' : 'hướng vào'}</text
            >
          {/if}
        {/if}
      </g>
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Đầu dây dẫn: kéo hoặc dùng phím mũi tên để xoay dây"
        aria-valuemin="0"
        aria-valuemax="355"
        aria-valuenow={theta}
        aria-valuetext="góc giữa dây và cảm ứng từ {formatNumber(alpha)} độ"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={handle.x}
          cy={handle.y}
          r="10"
          fill="#fff"
          stroke="#b45309"
          stroke-width="3"
        />
      </g>
    </svg>
    <figcaption class="px-2 pt-1 text-xs text-slate-500">
      Kéo đầu tròn của dây để xoay dây. Mũi tên I chỉ chiều dòng điện; F màu đỏ là lực từ.
    </figcaption>
  </figure>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Cường độ dòng điện I"
      bind:value={current}
      min={0}
      max={10}
      step={0.5}
      unit="A"
    />
    <SliderField label="Cảm ứng từ B" bind:value={field} min={0} max={1} step={0.05} unit="T" />
    <SliderField
      label="Chiều dài dây L"
      bind:value={lengthCm}
      min={5}
      max={40}
      step={5}
      unit="cm"
    />
  </div>

  <FeedbackNote tone={size > 0 ? 'ok' : 'info'} text={status} />
</div>
