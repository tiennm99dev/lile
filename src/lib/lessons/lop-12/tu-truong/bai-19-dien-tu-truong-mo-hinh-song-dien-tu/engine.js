/**
 * A plane electromagnetic wave travelling along +x in vacuum. In the model
 * space of `#lib/geom-engine/solid.js` (z up) E⃗ oscillates along z and B⃗
 * along −y, so E⃗ × B⃗ points along +x, the way the wave travels. Both vary
 * in phase: e = E₀cos(ωt − 2πx/λ), b = B₀cos(ωt − 2πx/λ), with λ = c/f.
 *
 * And the vortex electric field: a magnetic field that changes in time
 * produces an electric field whose field lines close on themselves, turning
 * the way an induced current would (Lenz).
 */
import { tidy } from '#lib/core/number-format.js';
import { inducedTurn } from '../_shared/lenz.js';

/** Speed of light in vacuum, m/s. */
export const C = 3e8;

/** Unit vectors of the model: E⃗ along z, B⃗ along −y, travel along +x. */
export const E_AXIS = { x: 0, y: 0, z: 1 };
export const B_AXIS = { x: 0, y: -1, z: 0 };
export const TRAVEL = { x: 1, y: 0, z: 0 };

/**
 * Wavelength λ = c/f, in metres.
 * @param {number} f hertz
 */
export function wavelengthOf(f) {
  return tidy(C / f, 9);
}

/**
 * The fields at distance x along the wave at time t, as fractions of their
 * amplitudes: e = E/E₀ and b = B/B₀. Time is counted in periods.
 * @param {number} x metres
 * @param {number} periods t/T
 * @param {number} lambda metres
 */
export function fieldsAt(x, periods, lambda) {
  const v = tidy(Math.cos(2 * Math.PI * (periods - x / lambda)), 9);
  return { e: v, b: v };
}

/**
 * Points of the wave for drawing: `count + 1` samples from x = 0 to
 * `length`, each with its field values.
 * @param {number} length metres @param {number} periods @param {number} lambda
 * @param {number} [count]
 */
export function samples(length, periods, lambda, count = 120) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const x = (length * i) / count;
    return { x, ...fieldsAt(x, periods, lambda) };
  });
}

/** @typedef {import('../_shared/lenz.js').Way} Way */
/** @typedef {import('../_shared/lenz.js').Change} Change */

/**
 * The turn of the vortex electric field lines seen from the front, for a
 * field B⃗ out of (`ra`) or into (`vao`) the page that grows, shrinks or
 * stays the same: the field lines run like the current a closed ring there
 * would carry (Lenz), and there are none for a steady field.
 * @param {Way} way @param {Change} change
 */
export function vortexTurn(way, change) {
  return inducedTurn(way, change);
}
