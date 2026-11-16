/**
 * Maxima and minima on the segment between two in-phase coherent sources a
 * apart, for wavelength λ: maxima where d2 − d1 = kλ, minima where
 * d2 − d1 = (k + ½)λ. On the segment d2 − d1 = 2x, with x measured from the
 * midpoint, so neighbouring maxima (or minima) are λ/2 apart.
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * Number of maxima on the open segment S1S2: integers k with −a/λ < k < a/λ.
 * @param {number} a @param {number} lambda
 */
export function countMaxima(a, lambda) {
  const r = tidy(a / lambda, 9);
  const top = Number.isInteger(r) ? r - 1 : Math.floor(r);
  return 2 * top + 1;
}

/**
 * Number of minima on S1S2: integers k with −a/λ − ½ < k < a/λ − ½.
 * @param {number} a @param {number} lambda
 */
export function countMinima(a, lambda) {
  let n = 0;
  const lo = -a / lambda - 0.5;
  const hi = a / lambda - 0.5;
  for (let k = Math.ceil(lo - 1); k <= Math.floor(hi + 1); k++) {
    if (k > lo + 1e-9 && k < hi - 1e-9) n++;
  }
  return n;
}

/**
 * Positions (from the midpoint, same unit as a) of the maxima and minima
 * strictly between the sources.
 * @param {number} a @param {number} lambda
 */
export function extremaPositions(a, lambda) {
  /** @type {number[]} */
  const maxima = [];
  /** @type {number[]} */
  const minima = [];
  const half = a / 2 - 1e-9;
  for (let k = -Math.ceil(a / lambda) - 1; k <= Math.ceil(a / lambda) + 1; k++) {
    const xMax = (k * lambda) / 2;
    const xMin = ((k + 0.5) * lambda) / 2;
    if (Math.abs(xMax) < half) maxima.push(tidy(xMax));
    if (Math.abs(xMin) < half) minima.push(tidy(xMin));
  }
  return { maxima, minima };
}
