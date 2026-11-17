/**
 * State-change puzzles for a fixed mass of ideal gas: from state 1 the gas
 * goes through two processes (isothermal, isobaric or isochoric), each
 * stopping at a given value of one quantity. The learner drags the state
 * along the process on a p–V, p–T or V–T graph, then works out the
 * quantity the puzzle asks for. Pressures are in kPa, volumes in litres,
 * temperatures in kelvin.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { curve } from '../_shared/gas.js';

/** @typedef {'p' | 'V' | 'T'} Quantity */
/** @typedef {{ p: number, V: number, T: number }} State */
/** @typedef {'pV' | 'pT' | 'VT'} View */
/**
 * @typedef {{
 *   fixed: Quantity;
 *   target: { q: Quantity, value: number };
 *   ask: Quantity;
 *   text: string;
 * }} Leg
 * - `fixed`: the quantity the process holds constant.
 * - `target`: where the process stops.
 * - `ask`: the quantity the learner works out at the end of the leg.
 * - `text`: the leg as the puzzle states it (rich text).
 */
/** @typedef {{ start: State, legs: [Leg, Leg] }} Puzzle */

/** Plot ranges and drag limits of each quantity. */
export const RANGE = {
  p: { min: 20, max: 350 },
  V: { min: 1, max: 14 },
  T: { min: 60, max: 700 },
};

/** Snapping step of each quantity while dragging. */
export const STEP = { p: 10, V: 0.5, T: 10 };

/** Units of each quantity, as the widget writes them. */
export const UNIT = { p: 'kPa', V: 'lít', T: 'K' };

/** @type {Puzzle[]} */
export const PUZZLES = [
  {
    start: { p: 100, V: 12, T: 300 },
    legs: [
      {
        fixed: 'T',
        target: { q: 'V', value: 4 },
        ask: 'p',
        text: 'Nén đẳng nhiệt đến $V_2 = 4$ lít.',
      },
      {
        fixed: 'p',
        target: { q: 'T', value: 600 },
        ask: 'V',
        text: 'Đun nóng đẳng áp đến $T_3 = 600$ K.',
      },
    ],
  },
  {
    start: { p: 200, V: 6, T: 300 },
    legs: [
      {
        fixed: 'V',
        target: { q: 'T', value: 450 },
        ask: 'p',
        text: 'Đun nóng đẳng tích đến $T_2 = 450$ K.',
      },
      {
        fixed: 'T',
        target: { q: 'V', value: 9 },
        ask: 'p',
        text: 'Cho dãn đẳng nhiệt đến $V_3 = 9$ lít.',
      },
    ],
  },
  {
    start: { p: 150, V: 10, T: 400 },
    legs: [
      {
        fixed: 'p',
        target: { q: 'T', value: 200 },
        ask: 'V',
        text: 'Làm lạnh đẳng áp đến $T_2 = 200$ K.',
      },
      {
        fixed: 'V',
        target: { q: 'p', value: 300 },
        ask: 'T',
        text: 'Đun nóng đẳng tích đến $p_3 = 300$ kPa.',
      },
    ],
  },
  {
    start: { p: 300, V: 4, T: 600 },
    legs: [
      {
        fixed: 'T',
        target: { q: 'p', value: 100 },
        ask: 'V',
        text: 'Cho dãn đẳng nhiệt đến $p_2 = 100$ kPa.',
      },
      {
        fixed: 'V',
        target: { q: 'T', value: 300 },
        ask: 'p',
        text: 'Làm lạnh đẳng tích đến $T_3 = 300$ K.',
      },
    ],
  },
];

/**
 * The state reached from `start` by a process holding `fixed` constant,
 * once quantity `q` (not `fixed`) has the value `value`.
 * @param {Quantity} fixed @param {State} start @param {Quantity} q @param {number} value
 * @returns {State}
 */
export function stateFrom(fixed, start, q, value) {
  const s = { ...start, [q]: value };
  if (fixed === 'T') {
    const pV = start.p * start.V;
    return q === 'V' ? { ...s, p: pV / value } : { ...s, V: pV / value };
  }
  if (fixed === 'p') {
    return q === 'V'
      ? { ...s, T: (start.T * value) / start.V }
      : { ...s, V: (start.V * value) / start.T };
  }
  return q === 'T'
    ? { ...s, p: (start.p * value) / start.T }
    : { ...s, T: (start.T * value) / start.p };
}

/**
 * The quantities on the horizontal and vertical axis of a view.
 * @param {View} view
 * @returns {{ x: Quantity, y: Quantity }}
 */
export function axesOf(view) {
  if (view === 'pV') return { x: 'V', y: 'p' };
  if (view === 'pT') return { x: 'T', y: 'p' };
  return { x: 'T', y: 'V' };
}

/**
 * Where a state sits on a view.
 * @param {View} view @param {State} s
 */
export function pointOf(view, s) {
  const a = axesOf(view);
  return { x: s[a.x], y: s[a.y] };
}

/**
 * The axis a drag follows: a process drawn as a vertical line (its fixed
 * quantity is the view's horizontal one) follows the vertical axis, every
 * other process the horizontal one.
 * @param {Quantity} fixed @param {View} view
 * @returns {'x' | 'y'}
 */
export function driverOf(fixed, view) {
  return axesOf(view).x === fixed ? 'y' : 'x';
}

/**
 * Whether every quantity of a state lies in its drag range.
 * @param {State} s
 */
export function inRange(s) {
  return /** @type {Quantity[]} */ (['p', 'V', 'T']).every(
    (q) => s[q] >= RANGE[q].min - 1e-9 && s[q] <= RANGE[q].max + 1e-9,
  );
}

/**
 * The state of a leg with its stopping quantity at `value`, snapped to
 * that quantity's step; null when it leaves the graph.
 * @param {Leg} leg @param {State} start @param {number} value
 */
export function snapped(leg, start, value) {
  const q = leg.target.q;
  const v = tidy(Math.round(value / STEP[q]) * STEP[q], 6);
  const s = stateFrom(leg.fixed, start, q, v);
  return inRange(s) ? s : null;
}

/**
 * The state a pointer at graph point `pt` (in the view's units) drags the
 * leg to, or null when it would leave the graph.
 * @param {Leg} leg @param {State} start @param {View} view @param {{ x: number, y: number }} pt
 */
export function dragTo(leg, start, view, pt) {
  const axis = driverOf(leg.fixed, view);
  const q = axesOf(view)[axis];
  if (pt[axis] <= 0) return null;
  const raw = stateFrom(leg.fixed, start, q, pt[axis]);
  return snapped(leg, start, raw[leg.target.q]);
}

/**
 * One key press along a leg: the stopping quantity moves by one step.
 * @param {Leg} leg @param {State} start @param {State} now @param {number} dir -1 or 1
 */
export function nudge(leg, start, now, dir) {
  const q = leg.target.q;
  return snapped(leg, start, now[q] + dir * STEP[q]);
}

/**
 * Whether a state is where the leg stops.
 * @param {Leg} leg @param {State} s
 */
export function reached(leg, s) {
  return Math.abs(s[leg.target.q] - leg.target.value) < 1e-6;
}

/**
 * The states along a process from `a` to `b`, for drawing it.
 * @param {Quantity} fixed @param {State} a @param {State} b
 */
export function legPath(fixed, a, b) {
  const q = fixed === 'V' ? 'T' : 'V';
  return curve((v) => v, a[q], b[q], 40).map((pt) => stateFrom(fixed, a, q, pt.x));
}

/**
 * The whole line of a process through `s` across the graph, as states:
 * an isotherm over every volume, an isobar or isochore from 0 K up.
 * @param {Quantity} fixed @param {State} s
 */
export function processLine(fixed, s) {
  if (fixed === 'T') {
    return curve((V) => V, 0.6, RANGE.V.max + 1, 80).map((pt) => stateFrom('T', s, 'V', pt.x));
  }
  return curve((T) => T, 0.001, RANGE.T.max + 50, 2).map((pt) => stateFrom(fixed, s, 'T', pt.x));
}

/**
 * Whether a typed answer is within 1 % of the exact one.
 * @param {number} typed @param {number} exact
 */
export function isClose(typed, exact) {
  return Math.abs(typed - exact) <= 0.01 * Math.abs(exact);
}

/** Process names, by the quantity they hold constant. */
export const PROCESS = { T: 'đẳng nhiệt', p: 'đẳng áp', V: 'đẳng tích' };

/**
 * The law of a process, in TeX, for states i → j.
 * @param {Quantity} fixed @param {number} i @param {number} j
 */
export function lawTex(fixed, i, j) {
  if (fixed === 'T') return `p_${i}V_${i} = p_${j}V_${j}`;
  if (fixed === 'p') return `\\dfrac{V_${i}}{T_${i}} = \\dfrac{V_${j}}{T_${j}}`;
  return `\\dfrac{p_${i}}{T_${i}} = \\dfrac{p_${j}}{T_${j}}`;
}

/**
 * The worked answer of a leg i → j in TeX: the asked quantity from the
 * process law, with the numbers put in.
 * @param {Leg} leg @param {State} from @param {State} to @param {number} i @param {number} j
 */
export function answerTex(leg, from, to, i, j) {
  const a = leg.ask;
  const t = leg.target.q;
  const product = leg.fixed === 'T';
  const sym = product
    ? `\\dfrac{${a}_${i}${t}_${i}}{${t}_${j}}`
    : `\\dfrac{${a}_${i}${t}_${j}}{${t}_${i}}`;
  const nums = product
    ? `\\dfrac{${numTex(from[a])} \\cdot ${numTex(from[t])}}{${numTex(to[t])}}`
    : `\\dfrac{${numTex(from[a])} \\cdot ${numTex(to[t])}}{${numTex(from[t])}}`;
  return `${a}_${j} = ${sym} = ${nums} = ${numTex(tidy(to[a], 3))}`;
}
