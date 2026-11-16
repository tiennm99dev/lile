/**
 * A small oscilloscope screen in SVG pixels: a signal sampled over a time
 * window and mapped onto a strip of the screen, value 0 on the strip's middle
 * line. Used by the modulation and the analog/digital widgets.
 */
import { pointsAttr } from '#lib/utils/svg.js';

/**
 * @typedef {{ left: number, width: number, mid: number, half: number, tMax: number, yMax: number }} Strip
 * A strip of the screen: x from `left` to `left + width` for t from 0 to
 * `tMax`, y = `mid` for the value 0 and `mid ∓ half` for ±`yMax`.
 */

/**
 * Screen x of the time t.
 * @param {Strip} s @param {number} t
 */
export const xOf = (s, t) => s.left + (t / s.tMax) * s.width;

/**
 * Screen y of the value v (y grows downward on screen).
 * @param {Strip} s @param {number} v
 */
export const yOf = (s, v) => s.mid - (v / s.yMax) * s.half;

/**
 * The `points` of a polyline tracing `fn` over the strip with `n` steps.
 * @param {Strip} s @param {(t: number) => number} fn @param {number} n
 */
export function trace(s, fn, n) {
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = (s.tMax * i) / n;
    return { x: xOf(s, t), y: yOf(s, fn(t)) };
  });
  return pointsAttr(pts);
}
