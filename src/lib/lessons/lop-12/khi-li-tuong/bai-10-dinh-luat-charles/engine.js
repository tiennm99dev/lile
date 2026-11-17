/**
 * Charles's experiment: a fixed mass of gas under a freely moving piston,
 * so its pressure stays that of the load, heated or cooled. At 1,0·10⁵ Pa
 * the gas fills 30,0 cm³ at 27 °C (300 K): V = 0,1·T cm³; at twice the
 * pressure every volume is half as large. Volumes are read to 0,1 cm³.
 */
import { tidy } from '#lib/core/number-format.js';
import { ZERO_C, toKelvin } from '../_shared/gas.js';

export const T_MIN = -50;
export const T_MAX = 150;
/** The pressures the piston can hold, in 10⁵ Pa. */
export const PRESSURES = [1, 2];

/**
 * Volume in cm³ at a Celsius temperature and a pressure in 10⁵ Pa.
 * @param {number} celsius @param {number} pressure
 */
export function volumeAt(celsius, pressure) {
  return tidy(Math.round((toKelvin(celsius) * 0.1 * 10) / pressure) / 10, 1);
}

/** @typedef {{ celsius: number, volume: number, pressure: number }} Reading */

/**
 * The table with one more reading; a repeat replaces the old one, sorted by
 * pressure then temperature.
 * @param {Reading[]} table @param {Reading} reading
 * @returns {Reading[]}
 */
export function record(table, reading) {
  const rest = table.filter(
    (r) => r.celsius !== reading.celsius || r.pressure !== reading.pressure,
  );
  return [...rest, reading].sort((a, b) => a.pressure - b.pressure || a.celsius - b.celsius);
}

/**
 * Least-squares line V = a + b·t through the readings at one pressure, and
 * the temperature where it meets V = 0. Null with fewer than two distinct
 * temperatures.
 * @param {Reading[]} table @param {number} pressure
 */
export function fitLine(table, pressure) {
  const pts = table.filter((r) => r.pressure === pressure);
  if (new Set(pts.map((p) => p.celsius)).size < 2) return null;
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.celsius, 0) / n;
  const my = pts.reduce((s, p) => s + p.volume, 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (const p of pts) {
    sxy += (p.celsius - mx) * (p.volume - my);
    sxx += (p.celsius - mx) ** 2;
  }
  const slope = sxy / sxx;
  const intercept = my - slope * mx;
  return { slope, intercept, zero: -intercept / slope };
}

/**
 * V/T of a reading, in cm³/K.
 * @param {Reading} r
 */
export function ratioOf(r) {
  return r.volume / (r.celsius + ZERO_C);
}
