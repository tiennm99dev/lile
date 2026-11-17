<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    PROCESS,
    PUZZLES,
    RANGE,
    UNIT,
    answerTex,
    axesOf,
    dragTo,
    driverOf,
    isClose,
    lawTex,
    legPath,
    nudge,
    pointOf,
    processLine,
    reached,
  } from './engine.js';

  const W = 340;
  const H = 230;
  const LEFT = 42;
  const RIGHT = 14;
  const TOP = 22;
  const BOTTOM = 30;
  const TICKS = { p: [100, 200, 300], V: [4, 8, 12], T: [200, 400, 600] };
  const SUB = ['₀', '₁', '₂', '₃'];
  const QUANTITIES = /** @type {import('./engine.js').Quantity[]} */ (['p', 'V', 'T']);
  const LEG_COLORS = ['#4f46e5', '#0d9488'];
  const VIEWS = [
    { value: 'pV', label: 'p–V' },
    { value: 'pT', label: 'p–T' },
    { value: 'VT', label: 'V–T' },
  ];
  const uid = $props.id();
  const clipId = `state-chain-${uid}`;

  let index = $state(0);
  /** @type {import('./engine.js').View} */
  let view = $state('pV');
  /** @type {import('./engine.js').State[]} */
  let states = $state([{ ...PUZZLES[0].start }]);
  let now = $state({ ...PUZZLES[0].start });
  let phase = $state(/** @type {'drag' | 'ask' | 'done'} */ ('drag'));
  let typed = $state('');
  let wrong = $state(false);
  let invalid = $state(false);
  let shown = $state(false);
  /** @type {SVGSVGElement | null} */
  let svg = $state(null);

  const puzzle = $derived(PUZZLES[index]);
  const legNo = $derived(states.length - 1);
  const leg = $derived(phase === 'done' ? null : puzzle.legs[legNo]);
  const last = $derived(states[states.length - 1]);
  const axes = $derived(axesOf(view));
  const sx = $derived(linear(0, RANGE[axes.x].max, LEFT, W - RIGHT));
  const sy = $derived(linear(0, RANGE[axes.y].max, H - BOTTOM, TOP));

  /** @param {import('./engine.js').State[]} list */
  const toScreen = (list) =>
    pointsAttr(
      list.map((s) => {
        const pt = pointOf(view, s);
        return { x: sx.map(pt.x), y: sy.map(pt.y) };
      }),
    );

  /** @param {number} i state number (1, 2, 3) @param {import('./engine.js').Quantity} q */
  const name = (q, i) => `${q}${SUB[i]}`;

  /** @param {number} v @param {import('./engine.js').Quantity} q */
  const value = (v, q) => `${formatNumber(v, 1)} ${UNIT[q]}`;

  /** Starts puzzle `i` from its first state. @param {number} i */
  function load(i) {
    index = i;
    states = [{ ...PUZZLES[i].start }];
    now = { ...PUZZLES[i].start };
    phase = 'drag';
    typed = '';
    wrong = false;
    invalid = false;
    shown = false;
  }

  /** @param {import('./engine.js').State | null} s */
  function place(s) {
    if (!s || !leg || phase !== 'drag') return;
    now = s;
    if (reached(leg, s)) phase = 'ask';
  }

  /** The leg's answer is in: keep the state and go on. */
  function advance() {
    states = [...states, now];
    typed = '';
    wrong = false;
    invalid = false;
    shown = false;
    phase = states.length > puzzle.legs.length ? 'done' : 'drag';
  }

  function check() {
    if (!leg) return;
    const v = readNumber(typed);
    invalid = v === null;
    if (v === null) return;
    if (isClose(v, now[leg.ask])) advance();
    else wrong = true;
  }

  const drag = $derived({
    point: { x: sx.map(pointOf(view, now).x), y: sy.map(pointOf(view, now).y) },
    svg: () => svg,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} pt */
    projector: (pt) => {
      if (leg) place(dragTo(leg, last, view, { x: sx.invert(pt.x), y: sy.invert(pt.y) }));
      return pt;
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy */
    onKeyMove: (dx, dy) => {
      if (!leg) return;
      const along = driverOf(leg.fixed, view);
      const sign = along === 'x' ? dx || -dy : -dy || dx;
      const here = pointOf(view, now)[along];
      const next = [nudge(leg, last, now, 1), nudge(leg, last, now, -1)].find(
        (s) => s && (pointOf(view, s)[along] - here) * sign > 0,
      );
      place(next ?? null);
    },
  });

  /** The worked answer of the current leg. */
  const solution = $derived.by(() => {
    if (!leg) return '';
    const i = legNo + 1;
    return `Quá trình ${PROCESS[leg.fixed]} ($${leg.fixed}$ không đổi): $${lawTex(leg.fixed, i, i + 1)}$, nên $${answerTex(leg, last, now, i, i + 1)}$ ${UNIT[leg.ask]}.`;
  });

  const note = $derived.by(() => {
    if (phase === 'done') {
      const c = numTex((last.p * last.V) / last.T, 2);
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Xong bài ${index + 1}! Ở cả ba trạng thái, $pV/T = ${c}$ kPa.lít/K. Đổi hệ toạ độ để xem cùng chuỗi biến đổi trên đồ thị khác.`,
      };
    }
    if (!leg) return { tone: /** @type {const} */ ('info'), text: '' };
    if (phase === 'drag') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Kéo điểm trạng thái dọc đường ${PROCESS[leg.fixed]} (nét đứt) tới $${leg.target.q} = ${numTex(leg.target.value)}$ ${UNIT[leg.target.q]}.`,
      };
    }
    if (shown) return { tone: /** @type {const} */ ('info'), text: solution };
    if (invalid) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Hãy nhập một số, không kèm đơn vị, ví dụ $12{,}5$.`,
      };
    }
    if (wrong) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Chưa đúng. Đây là quá trình ${PROCESS[leg.fixed]}: dùng $${lawTex(leg.fixed, legNo + 1, legNo + 2)}$.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đã tới trạng thái ${legNo + 2}. Tính ${name(leg.ask, legNo + 2)} rồi bấm Kiểm tra.`,
    };
  });

  /** The text of the state a row shows; the asked quantity stays hidden. */
  const rows = $derived.by(() => {
    const list = states.map((s, i) => ({
      no: i + 1,
      s,
      hide: /** @type {string | null} */ (null),
    }));
    if (phase !== 'done' && leg && (phase === 'ask' || !reached(leg, now))) {
      list.push({ no: states.length + 1, s: now, hide: leg.ask });
    }
    return list;
  });

  const graphLabel = $derived(
    `Đồ thị ${axes.y}–${axes.x}. ` +
      rows
        .map(
          (r) =>
            `Trạng thái ${r.no}: ` +
            QUANTITIES.map((q) =>
              q === r.hide ? `${q} chưa biết` : `${q} = ${value(r.s[q], q)}`,
            ).join(', '),
        )
        .join('. '),
  );

  const guide = $derived(leg ? processLine(leg.fixed, last) : []);
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Bài"
      options={PUZZLES.map((_, i) => ({ value: i, label: `Bài ${i + 1}` }))}
      value={index}
      onchange={(v) => load(Number(v))}
    />
    <SegmentedControl
      label="Hệ toạ độ"
      options={VIEWS}
      value={view}
      onchange={(v) => (view = /** @type {import('./engine.js').View} */ (v))}
    />
  </div>

  <div class="{card} space-y-1 p-3 text-sm">
    <p class="font-semibold text-slate-800">
      <LiveRichText
        text={`Trạng thái 1: $p_1 = ${puzzle.start.p}$ kPa, $V_1 = ${puzzle.start.V}$ lít, $T_1 = ${puzzle.start.T}$ K.`}
      />
    </p>
    <ol class="list-decimal space-y-0.5 pl-5 text-slate-700">
      {#each puzzle.legs as l, i (i)}
        <li class={i === legNo && phase !== 'done' ? 'font-semibold text-indigo-700' : ''}>
          <LiveRichText text={`${l.text} Tính $${l.ask}_${i + 2}$.`} />
        </li>
      {/each}
    </ol>
  </div>

  <div class="{card} p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-lg touch-none select-none"
      role="group"
      aria-label={graphLabel}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={LEFT} y={TOP - 6} width={W - LEFT - RIGHT + 6} height={H - TOP - BOTTOM + 6} />
        </clipPath>
      </defs>
      {#each TICKS[axes.y] as tick (tick)}
        <line x1={LEFT} x2={W - RIGHT} y1={sy.map(tick)} y2={sy.map(tick)} stroke="#e2e8f0" />
        <text x={LEFT - 5} y={sy.map(tick) + 4} font-size="10" fill="#475569" text-anchor="end"
          >{formatNumber(tick)}</text
        >
      {/each}
      {#each TICKS[axes.x] as tick (tick)}
        <line x1={sx.map(tick)} x2={sx.map(tick)} y1={TOP} y2={H - BOTTOM} stroke="#e2e8f0" />
        <text
          x={sx.map(tick)}
          y={H - BOTTOM + 13}
          font-size="10"
          fill="#475569"
          text-anchor="middle">{formatNumber(tick)}</text
        >
      {/each}
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={H - BOTTOM}
        y2={H - BOTTOM}
        stroke="#334155"
        stroke-width="1.5"
      />
      <text x="2" y="12" font-size="11" font-weight="600" fill="#334155"
        >{axes.y} ({UNIT[axes.y]})</text
      >
      <text
        x={W - RIGHT}
        y={H - 3}
        font-size="11"
        font-weight="600"
        fill="#334155"
        text-anchor="end">{axes.x} ({UNIT[axes.x]})</text
      >
      <g clip-path="url(#{clipId})">
        {#if leg && phase === 'drag'}
          <polyline
            points={toScreen(guide)}
            fill="none"
            stroke="#94a3b8"
            stroke-width="1.6"
            stroke-dasharray="6 4"
          />
        {/if}
        {#each states.slice(1) as s, i (i)}
          <polyline
            points={toScreen(legPath(puzzle.legs[i].fixed, states[i], s))}
            fill="none"
            stroke={LEG_COLORS[i]}
            stroke-width="2.5"
          />
        {/each}
        {#if leg}
          <polyline
            points={toScreen(legPath(leg.fixed, last, now))}
            fill="none"
            stroke="#f59e0b"
            stroke-width="2.5"
          />
        {/if}
        {#each states as s, i (i)}
          <circle
            cx={sx.map(pointOf(view, s).x)}
            cy={sy.map(pointOf(view, s).y)}
            r="4.5"
            fill="#e11d48"
          />
          <text
            x={sx.map(pointOf(view, s).x) + 7}
            y={sy.map(pointOf(view, s).y) - 6}
            font-size="11"
            font-weight="700"
            fill="#e11d48">{i + 1}</text
          >
        {/each}
      </g>
      {#if leg && phase === 'drag'}
        <g
          class="drag-handle cursor-move outline-none"
          role="slider"
          tabindex="0"
          aria-label={`Điểm trạng thái ${legNo + 2}: kéo dọc đường ${PROCESS[leg.fixed]}, hoặc dùng phím mũi tên`}
          aria-valuemin={RANGE[leg.target.q].min}
          aria-valuemax={RANGE[leg.target.q].max}
          aria-valuenow={now[leg.target.q]}
          aria-valuetext={`${leg.target.q} = ${value(now[leg.target.q], leg.target.q)}`}
          use:draggable={drag}
        >
          <circle
            class="drag-knob"
            cx={sx.map(pointOf(view, now).x)}
            cy={sy.map(pointOf(view, now).y)}
            r="8"
            fill="#f59e0b"
            stroke="#92400e"
            stroke-width="2"
          />
        </g>
      {:else if leg}
        <circle
          cx={sx.map(pointOf(view, now).x)}
          cy={sy.map(pointOf(view, now).y)}
          r="6"
          fill="#f59e0b"
          stroke="#92400e"
          stroke-width="2"
        />
      {/if}
    </svg>
    <table class="mt-2 w-full text-center text-sm tabular-nums">
      <thead>
        <tr class="text-slate-500">
          <th scope="col" class="font-medium">Trạng thái</th>
          <th scope="col" class="font-medium">p (kPa)</th>
          <th scope="col" class="font-medium">V (lít)</th>
          <th scope="col" class="font-medium">T (K)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r (r.no)}
          <tr>
            <th scope="row" class="font-semibold">{r.no}</th>
            {#each QUANTITIES as q (q)}
              <td>{r.hide === q ? '?' : formatNumber(r.s[q], 1)}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if phase === 'ask' && leg}
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <div class="min-w-0 flex-1">
        <label for="{uid}-answer" class="mb-1 block text-sm font-semibold text-slate-700"
          >{name(leg.ask, legNo + 2)} ({UNIT[leg.ask]})</label
        >
        <input
          id="{uid}-answer"
          class={textInput}
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed}
          oninput={() => {
            wrong = false;
            invalid = false;
          }}
        />
      </div>
      <button type="submit" class={button.primary}>Kiểm tra</button>
      {#if shown}
        <button type="button" class={button.secondary} onclick={advance}>Đi tiếp</button>
      {:else}
        <button type="button" class={button.quiet} onclick={() => (shown = true)}
          >Xem lời giải</button
        >
      {/if}
    </form>
  {/if}

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => load(index)}>Làm lại</button>
    {#if phase === 'done'}
      <button
        type="button"
        class={button.secondary}
        onclick={() => load((index + 1) % PUZZLES.length)}>Bài tiếp theo</button
      >
    {/if}
  </div>
</div>
