/**
 * Gravitational field of a few heavy balls on a board in metres (y up): the
 * field at a point, the force on a test mass, and the field lines drawn from
 * the edge of the board into each ball.
 */
import { tidy } from '#lib/core/number-format.js';
import { fieldAt, traceFieldLine } from '#lib/domain/vector-field.js';
import { G } from '../_shared/gravity.js';

/** One tonne, kg. */
export const TONNE = 1000;

/** @typedef {{ x: number, y: number }} Vec */
/** @typedef {{ x: number, y: number, tonnes: number }} Ball */
/** @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Bounds */

/**
 * The balls as field sources: a mass pulls toward itself, so its strength is
 * −GM.
 * @param {Ball[]} balls
 */
const sourcesOf = (balls) =>
  balls.map((b) => ({ x: b.x, y: b.y, strength: -G * b.tonnes * TONNE }));

/**
 * Field strength at `p` (N/kg): the vector sum and the part of each ball.
 * @param {Ball[]} balls @param {Vec} p
 */
export function fieldAtPoint(balls, p) {
  const parts = sourcesOf(balls).map((s) => fieldAt([s], p));
  const total = parts.reduce((sum, f) => ({ x: sum.x + f.x, y: sum.y + f.y }), { x: 0, y: 0 });
  return { total, parts, size: Math.hypot(total.x, total.y) };
}

/**
 * Gravitational force on a test mass m (kg) at `p`, in N.
 * @param {Ball[]} balls @param {Vec} p @param {number} m
 */
export function forceOnTest(balls, p, m) {
  const { total } = fieldAtPoint(balls, p);
  return { x: total.x * m, y: total.y * m, size: Math.hypot(total.x, total.y) * m };
}

/**
 * Number of field lines drawn into a ball: proportional to its mass, so the
 * lines crowd where the field is strong.
 * @param {number} tonnes
 */
export const linesFor = (tonnes) => 6 * tonnes;

/**
 * Field lines of the balls. Each starts on a small circle round a ball and is
 * traced against the field, out to the board's edge; the field itself points
 * the other way, into the ball.
 * @param {Ball[]} balls @param {Bounds} bounds
 * @returns {Vec[][]}
 */
export function fieldLines(balls, bounds) {
  const sources = sourcesOf(balls);
  return balls.flatMap((b, i) =>
    Array.from({ length: linesFor(b.tonnes) }, (_, k) => {
      const a = (2 * Math.PI * k) / linesFor(b.tonnes) + i * 0.3;
      const start = { x: b.x + 0.4 * Math.cos(a), y: b.y + 0.4 * Math.sin(a) };
      return traceFieldLine(sources, start, { bounds, step: -0.12, maxSteps: 160 });
    }),
  );
}

/**
 * A point and direction halfway along a traced line, pointing the way the
 * field points (into the ball), or null for a line too short to carry one.
 * @param {Vec[]} line
 */
export function midArrow(line) {
  if (line.length < 8) return null;
  const i = Math.floor(line.length / 2);
  const a = line[i];
  const b = line[i - 1];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  if (len === 0) return null;
  return { at: b, dir: { x: (b.x - a.x) / len, y: (b.y - a.y) / len } };
}

/**
 * Arrow length in pixels for a size `m`: grows with log(1 + m/ref), at most
 * `max`, so a weak far force stays visible next to a strong near one.
 * @param {number} m @param {number} ref @param {number} max
 */
export function arrowPx(m, ref, max) {
  if (!(m > 0)) return 0;
  return tidy(Math.min(max, (max * Math.log1p(m / ref)) / Math.log1p(8)), 6);
}

/**
 * True when the pulls of the balls nearly cancel at `p`: the total is less
 * than a fifth of the strongest single pull.
 * @param {Ball[]} balls @param {Vec} p
 */
export function nearBalance(balls, p) {
  if (balls.length < 2) return false;
  const { parts, size } = fieldAtPoint(balls, p);
  const strongest = Math.max(...parts.map((f) => Math.hypot(f.x, f.y)));
  return size < strongest / 5;
}

/**
 * Compass-like words for a direction on the board (y up).
 * @param {Vec} v
 */
export function directionWords(v) {
  const deg = (Math.atan2(v.y, v.x) * 180) / Math.PI;
  const names = [
    'sang phải',
    'chếch lên bên phải',
    'lên trên',
    'chếch lên bên trái',
    'sang trái',
    'chếch xuống bên trái',
    'xuống dưới',
    'chếch xuống bên phải',
  ];
  return names[(Math.round(deg / 45) + 8) % 8];
}
