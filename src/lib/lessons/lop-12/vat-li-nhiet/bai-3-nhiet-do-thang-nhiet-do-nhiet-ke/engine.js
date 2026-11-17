/**
 * Temperature scales the grade 12 way, T (K) = t (°C) + 273, and two bodies
 * in thermal contact settling to a common temperature.
 */
import { tidy } from '#lib/core/number-format.js';

/** The school offset between the Kelvin and Celsius scales. */
export const OFFSET = 273;

/** @param {number} celsius */
export function toKelvin(celsius) {
  return tidy(celsius + OFFSET, 6);
}

/** @param {number} kelvin */
export function toCelsius(kelvin) {
  return tidy(kelvin - OFFSET, 6);
}

/** Readings to set on the thermometer, given on the Kelvin scale. */
export const TARGETS = [300, 250, 373, 310, 263, 330];

/**
 * @typedef {{ name: string, celsius: number, capacity: number }} Body
 * `capacity` is the heat the body needs per degree (m·c), J/K.
 */

/**
 * Common temperature two bodies reach when they exchange heat only with each
 * other: the capacity-weighted mean.
 * @param {Body} a @param {Body} b
 */
export function equilibrium(a, b) {
  return tidy((a.capacity * a.celsius + b.capacity * b.celsius) / (a.capacity + b.capacity), 6);
}

/**
 * Temperatures of the two bodies `time` seconds after contact. The gap
 * between them shrinks exponentially with time constant `tau` scaled by how
 * fast both capacities can follow; each body keeps the heat balance
 * m₁c₁·Δt₁ = −m₂c₂·Δt₂ at every instant.
 * @param {Body} a @param {Body} b @param {number} time @param {number} tau
 * @returns {[number, number]}
 */
export function temperaturesAt(a, b, time, tau) {
  const eq = equilibrium(a, b);
  const k = Math.exp(-Math.max(0, time) / tau);
  return [tidy(eq + (a.celsius - eq) * k, 6), tidy(eq + (b.celsius - eq) * k, 6)];
}

/**
 * Which way heat flows between the bodies, as a sentence.
 * @param {Body} a @param {Body} b @param {number} ta @param {number} tb
 */
export function flowText(a, b, ta, tb) {
  if (Math.abs(ta - tb) < 0.05)
    return `${a.name} và ${b.name} đã cùng nhiệt độ: cân bằng nhiệt, không còn truyền nhiệt.`;
  const [hot, cold] = ta > tb ? [a, b] : [b, a];
  return `Năng lượng nhiệt truyền từ ${hot.name} (nóng hơn) sang ${cold.name} (lạnh hơn).`;
}
