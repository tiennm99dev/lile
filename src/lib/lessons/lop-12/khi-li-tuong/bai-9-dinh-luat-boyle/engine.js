/**
 * Boyle's experiment: a fixed mass of air in a syringe at constant
 * temperature. Volumes are in cm³, pressures in 10⁵ Pa as the gauge reads
 * them. At 300 K the air holds 1,00·10⁵ Pa at 30 cm³, so pV = 30 there;
 * a warmer isotherm has pV larger in proportion to T.
 */
import { tidy } from '#lib/core/number-format.js';
import { curve } from '../_shared/gas.js';

export const V_MIN = 10;
export const V_MAX = 40;
/** The temperatures the learner can hold the air at, in K. */
export const TEMPERATURES = [300, 400];

/**
 * The product pV (10⁵ Pa·cm³) on the isotherm of `kelvin`.
 * @param {number} kelvin
 */
export function constantAt(kelvin) {
  return (30 * kelvin) / 300;
}

/**
 * The gauge reading at a volume and temperature, to the gauge's 0,01.
 * @param {number} volume cm³ @param {number} kelvin
 */
export function readingAt(volume, kelvin) {
  return tidy(Math.round((constantAt(kelvin) / volume) * 100) / 100, 2);
}

/** @typedef {{ volume: number, pressure: number, kelvin: number }} Reading */

/**
 * The table with one more reading; a repeat of a volume and temperature
 * replaces the old one, and the table stays sorted by temperature then
 * volume.
 * @param {Reading[]} table @param {Reading} reading
 * @returns {Reading[]}
 */
export function record(table, reading) {
  const rest = table.filter((r) => r.volume !== reading.volume || r.kelvin !== reading.kelvin);
  return [...rest, reading].sort((a, b) => a.kelvin - b.kelvin || a.volume - b.volume);
}

/**
 * The isotherm p = C/V across the syringe's range of volumes.
 * @param {number} kelvin
 */
export function isotherm(kelvin) {
  const c = constantAt(kelvin);
  return curve((v) => c / v, V_MIN - 2, V_MAX + 5);
}

/**
 * Largest relative difference of pV within the readings of one
 * temperature from their mean: small (rounding of the gauge) when Boyle's
 * law holds.
 * @param {Reading[]} table @param {number} kelvin
 */
export function spreadOf(table, kelvin) {
  const pv = table.filter((r) => r.kelvin === kelvin).map((r) => r.pressure * r.volume);
  if (pv.length < 2) return 0;
  const mean = pv.reduce((s, x) => s + x, 0) / pv.length;
  return Math.max(...pv.map((x) => Math.abs(x - mean))) / mean;
}
