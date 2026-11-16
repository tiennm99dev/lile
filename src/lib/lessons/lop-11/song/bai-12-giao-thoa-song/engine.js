/**
 * Two in-phase coherent sources S1, S2 on a water surface, a distance `a`
 * apart on the x axis, each sending a wave of amplitude A and wavelength λ.
 * At a point M at distances d1, d2 the waves add to an oscillation of
 * amplitude 2A|cos(π(d2 − d1)/λ)|: a maximum when d2 − d1 = kλ, a minimum
 * when d2 − d1 = (k + ½)λ. Also Young's double slit: bright fringes at
 * x = kλD/a, fringe spacing i = λD/a.
 */
import { tidy } from '#lib/core/number-format.js';

/** Wave speed on the water surface, cm/s. */
export const WATER_SPEED = 30;

/**
 * @typedef {{ x: number, y: number }} Point
 */

/**
 * Positions of the two sources for a separation a (cm), centred on the origin.
 * @param {number} a
 * @returns {[Point, Point]}
 */
export const sources = (a) => [
  { x: -a / 2, y: 0 },
  { x: a / 2, y: 0 },
];

/**
 * Path difference d2 − d1 at point m, in cm.
 * @param {Point} m @param {number} a
 */
export function pathDifference(m, a) {
  const [s1, s2] = sources(a);
  const d1 = Math.hypot(m.x - s1.x, m.y - s1.y);
  const d2 = Math.hypot(m.x - s2.x, m.y - s2.y);
  return { d1: tidy(d1), d2: tidy(d2), delta: tidy(d2 - d1) };
}

/**
 * Amplitude at a point relative to one source's amplitude (0 to 2).
 * @param {number} delta d2 − d1 @param {number} lambda
 */
export const relativeAmplitude = (delta, lambda) =>
  tidy(2 * Math.abs(Math.cos((Math.PI * delta) / lambda)));

/**
 * Surface displacement at time t (in periods) relative to one source's
 * amplitude: u = 2cos(πΔ/λ)·cos(2πt − π(d1 + d2)/λ).
 * @param {Point} m @param {number} a @param {number} lambda @param {number} t
 */
export function surfaceAt(m, a, lambda, t) {
  const { d1, d2 } = pathDifference(m, a);
  return (
    2 *
    Math.cos((Math.PI * (d2 - d1)) / lambda) *
    Math.cos(2 * Math.PI * t - (Math.PI * (d1 + d2)) / lambda)
  );
}

/**
 * Names a point by its path difference: a maximum of order k, a minimum
 * (d2 − d1 = (k + ½)λ), or in between, within a reading tolerance given as
 * a fraction of λ.
 * @param {number} delta @param {number} lambda @param {number} [slack]
 * @returns {{ kind: 'max' | 'min' | 'between', k: number, ratio: number }}
 */
export function classify(delta, lambda, slack = 0.08) {
  const ratio = tidy(delta / lambda, 6);
  const k = Math.round(ratio);
  if (Math.abs(ratio - k) <= slack) return { kind: 'max', k, ratio };
  const h = Math.floor(ratio);
  if (Math.abs(ratio - (h + 0.5)) <= slack) return { kind: 'min', k: h, ratio };
  return { kind: 'between', k: 0, ratio };
}

export { countMaxima, countMinima } from '../_shared/interference.js';

/**
 * Fringe spacing i = λD/a. With λ in µm, D in m and a in mm the result is
 * in mm.
 * @param {number} lambdaUm @param {number} distanceM @param {number} slitsMm
 */
export const fringeSpacing = (lambdaUm, distanceM, slitsMm) =>
  tidy((lambdaUm * distanceM) / slitsMm, 9);

/**
 * Relative brightness on the screen at x (mm): cos²(πx/i), 1 on a bright
 * fringe and 0 on a dark one.
 * @param {number} x @param {number} spacing i in mm
 */
export const brightness = (x, spacing) => Math.cos((Math.PI * x) / spacing) ** 2;
