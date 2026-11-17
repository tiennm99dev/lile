/**
 * Matter waves: the de Broglie wavelength λ = h/p = h/(mv) of a particle, the
 * wavelength of an electron accelerated from rest through U volts
 * (p = √(2meU)), and the two-slit pattern those electrons build up one hit
 * at a time. The model slits: centres `a` apart, each `b` wide, the screen
 * `D` from the slits; the bright fringes are i = λD/a apart, inside the
 * single-slit envelope sinc²(πbx/(λD)).
 */
import { E_CHARGE, H, M_ELECTRON } from '../_shared/quantum.js';

/**
 * de Broglie wavelength (m) of a body of mass `m` (kg) moving at `v` (m/s).
 * @param {number} m
 * @param {number} v
 */
export const deBroglie = (m, v) => H / (m * v);

/**
 * Momentum (kg·m/s) of an electron accelerated from rest through `U` volts:
 * ½mv² = eU, so p = mv = √(2meU).
 * @param {number} U
 */
export const electronMomentum = (U) => Math.sqrt(2 * M_ELECTRON * E_CHARGE * U);

/**
 * Wavelength (m) of that electron.
 * @param {number} U
 */
export const electronLambda = (U) => H / electronMomentum(U);

/** The model's slits and screen, in metres. */
export const SLITS = /** @type {const} */ ({ a: 1e-6, b: 0.25e-6, D: 1 });

/** Half the width of the screen shown (m). */
export const HALF_SCREEN = 0.6e-3;

/**
 * Fringe spacing (m) on the screen for wavelength `lambda`: i = λD/a.
 * @param {number} lambda
 */
export const fringe = (lambda) => (lambda * SLITS.D) / SLITS.a;

/**
 * Relative chance (0..1, 1 at the centre) of an electron landing at `x` (m).
 * @param {number} x
 * @param {number} lambda
 * @param {boolean} two both slits open, else only one
 */
export function intensity(x, lambda, two) {
  const beta = (Math.PI * SLITS.b * x) / (lambda * SLITS.D);
  const envelope = beta === 0 ? 1 : (Math.sin(beta) / beta) ** 2;
  if (!two) return envelope;
  const alpha = (Math.PI * SLITS.a * x) / (lambda * SLITS.D);
  return envelope * Math.cos(alpha) ** 2;
}

/**
 * Where one electron lands (m), drawn from the pattern by rejection.
 * @param {() => number} rand
 * @param {number} lambda
 * @param {boolean} two
 */
export function landing(rand, lambda, two) {
  for (;;) {
    const x = (2 * rand() - 1) * HALF_SCREEN;
    if (rand() <= intensity(x, lambda, two)) return x;
  }
}

/**
 * Counts landings in `bins` equal strips across the screen.
 * @param {number[]} hits
 * @param {number} bins
 */
export function histogram(hits, bins) {
  const counts = Array.from({ length: bins }, () => 0);
  for (const x of hits) {
    const k = Math.floor(((x + HALF_SCREEN) / (2 * HALF_SCREEN)) * bins);
    counts[Math.min(bins - 1, Math.max(0, k))] += 1;
  }
  return counts;
}
