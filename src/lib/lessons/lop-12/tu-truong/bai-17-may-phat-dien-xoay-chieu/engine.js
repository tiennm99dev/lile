/**
 * A simple alternator: a coil of N turns and area S turning at n turns per
 * second in a uniform field B (axis perpendicular to B). Its emf is
 * e = E₀ sin ωt with ω = 2πn and E₀ = NBSω, the coil's normal along B at
 * t = 0.
 */
import { tidy } from '#lib/core/number-format.js';
import { coilAt, peakEmf } from '../_shared/loop.js';

/** Area of the generator's coil, m². */
export const AREA = 0.02;

/**
 * The quantities of the generator's output.
 * @param {number} N turns @param {number} B tesla @param {number} n turns per second
 * @param {number} [S] m²
 */
export function outputOf(N, B, n, S = AREA) {
  const omega = 2 * Math.PI * n;
  const E0 = peakEmf(N, B, S, omega);
  return {
    omega: tidy(omega, 9),
    f: n,
    T: tidy(1 / n, 9),
    E0,
    E: tidy(E0 / Math.SQRT2, 9),
  };
}

/**
 * Emf at time t, volts.
 * @param {number} N @param {number} B @param {number} n @param {number} t
 * @param {number} [S]
 */
export function emfAt(N, B, n, t, S = AREA) {
  return coilAt({ N, B, S, omega: 2 * Math.PI * n }, t).emf;
}

/**
 * Root-mean-square value of a sine quantity of peak `peak`.
 * @param {number} peak
 */
export function rms(peak) {
  return tidy(peak / Math.SQRT2, 9);
}
