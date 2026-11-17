/**
 * Heating equal masses of different substances with the same power: with no
 * heat lost, Q = P·τ = m·c·Δt, so t = t₀ + P·τ / (m·c) and the line with the
 * gentlest slope belongs to the largest specific heat. The heater switches
 * off at `MAX_T`, the top of the graph.
 */
import { tidy } from '#lib/core/number-format.js';
import { SPECIFIC_HEAT } from '../_shared/thermal.js';

export const START_T = 25;
export const MAX_T = 100;

/**
 * @typedef {{ id: string, name: string, c: number, color: string }} Substance
 */

/** The three samples the book's idea compares. @type {Substance[]} */
export const SAMPLES = [
  { id: 'nuoc', name: 'Nước', c: SPECIFIC_HEAT.nuoc, color: '#2563eb' },
  { id: 'dau', name: 'Dầu', c: SPECIFIC_HEAT.dau, color: '#d97706' },
  { id: 'nhom', name: 'Nhôm', c: SPECIFIC_HEAT.nhom, color: '#64748b' },
];

/** Substances an unknown sample may be. @type {Substance[]} */
export const SUSPECTS = [
  { id: 'thuy-tinh', name: 'Thuỷ tinh', c: SPECIFIC_HEAT['thuy-tinh'], color: '#0d9488' },
  { id: 'dat', name: 'Đất', c: SPECIFIC_HEAT.dat, color: '#92400e' },
  { id: 'sat', name: 'Sắt', c: SPECIFIC_HEAT.sat, color: '#475569' },
  { id: 'dong', name: 'Đồng', c: SPECIFIC_HEAT.dong, color: '#c2410c' },
  { id: 'nuoc-da', name: 'Nước đá', c: SPECIFIC_HEAT['nuoc-da'], color: '#0284c7' },
];

/**
 * Seconds until the sample reaches `MAX_T`.
 * @param {number} c @param {number} mass kg @param {number} power W
 */
export function timeToMax(c, mass, power) {
  return ((MAX_T - START_T) * mass * c) / power;
}

/**
 * Temperature after heating for `time` seconds, °C.
 * @param {number} c @param {number} mass @param {number} power @param {number} time
 */
export function temperatureAt(c, mass, power, time) {
  return tidy(Math.min(MAX_T, START_T + (power * Math.max(0, time)) / (mass * c)), 9);
}

/**
 * The graph's corner points from 0 to `end` seconds.
 * @param {number} c @param {number} mass @param {number} power @param {number} end
 */
export function linePoints(c, mass, power, end) {
  const knee = timeToMax(c, mass, power);
  /** @type {Array<{ x: number, y: number }>} */
  const pts = [{ x: 0, y: START_T }];
  if (knee < end) pts.push({ x: knee, y: MAX_T });
  pts.push({ x: end, y: temperatureAt(c, mass, power, end) });
  return pts;
}

/**
 * Specific heat worked out from a reading, as in the book's experiment:
 * c = P·τ / (m·Δt), with the thermometer read to 0,1 °C. Null while the
 * temperature has hardly risen or once the heater is off.
 * @param {number} mass @param {number} power @param {number} time @param {number} reading
 */
export function measuredC(mass, power, time, reading) {
  const rise = tidy(Math.round(reading * 10) / 10 - START_T, 6);
  if (rise < 1 || reading >= MAX_T) return null;
  return (power * time) / (mass * rise);
}

/**
 * The substance whose table value is nearest to a measured c.
 * @param {number} c
 * @param {Substance[]} list
 */
export function nearest(c, list) {
  return list.reduce((best, s) => (Math.abs(s.c - c) < Math.abs(best.c - c) ? s : best));
}
