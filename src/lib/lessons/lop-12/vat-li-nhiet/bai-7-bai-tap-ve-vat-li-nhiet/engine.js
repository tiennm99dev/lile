/**
 * Mixing two bodies in an insulated calorimeter (its own heat capacity
 * ignored) until they reach thermal equilibrium. A body is a metal, water or
 * ice; water and ice are the same substance, so ice may melt or water freeze
 * at 0 °C.
 *
 * The heat balance is solved through each body's heat content H(t), counted
 * from ice at 0 °C: H rises by m·c per degree, and by λm at 0 °C for water.
 * The total H stays the same, H(t) only rises with t, so the final state is
 * found by comparing the total with its values at 0 °C, all frozen and all
 * melted.
 */
import { tidy } from '#lib/core/number-format.js';
import { MELTING, SPECIFIC_HEAT } from '../_shared/thermal.js';

const LAMBDA = MELTING['nuoc-da'].lambda;
const C_ICE = SPECIFIC_HEAT['nuoc-da'];
const C_WATER = SPECIFIC_HEAT.nuoc;

/** The substances a body can be, with their names and the temperature range offered. */
export const SUBSTANCES = {
  nuoc: { name: 'nước', min: 0, max: 100 },
  'nuoc-da': { name: 'nước đá', min: -20, max: 0 },
  nhom: { name: 'nhôm', min: 0, max: 100 },
  sat: { name: 'sắt', min: 0, max: 100 },
  dong: { name: 'đồng', min: 0, max: 100 },
};

/** @typedef {keyof typeof SUBSTANCES} Substance */
/** @typedef {{ substance: Substance, mass: number, temperature: number }} Body */

/** @param {Body} body */
function isH2O(body) {
  return body.substance === 'nuoc' || body.substance === 'nuoc-da';
}

/**
 * Heat content at the start, J.
 * @param {Body} body
 */
export function startHeat(body) {
  const { substance, mass: m, temperature: t } = body;
  if (substance === 'nuoc-da') return m * C_ICE * t;
  if (substance === 'nuoc') return m * LAMBDA + m * C_WATER * t;
  return m * SPECIFIC_HEAT[substance] * t;
}

/**
 * Heat content at temperature t ≠ 0, or at 0 °C with a given melted share
 * of its water and ice.
 * @param {Body} body @param {number} t @param {number} [melted]
 */
function heatAt(body, t, melted = 1) {
  const m = body.mass;
  if (!isH2O(body))
    return m * SPECIFIC_HEAT[/** @type {'nhom' | 'sat' | 'dong'} */ (body.substance)] * t;
  if (t < 0) return m * C_ICE * t;
  if (t > 0) return m * LAMBDA + m * C_WATER * t;
  return melted * m * LAMBDA;
}

/**
 * Equilibrium of two bodies: the common temperature, how much ice is left,
 * and the heat the hotter body gives (equal to the heat the colder takes).
 * @param {Body} a @param {Body} b
 */
export function mix(a, b) {
  const total = startHeat(a) + startHeat(b);
  const bodies = [a, b];
  const h2o = bodies.filter(isH2O).reduce((s, x) => s + x.mass, 0);
  const frozen = bodies.reduce((s, x) => s + heatAt(x, 0, 0), 0);
  const melted = frozen + h2o * LAMBDA;
  let temperature;
  let share = 1;
  if (h2o > 0 && total >= frozen && total <= melted) {
    temperature = 0;
    share = (total - frozen) / (h2o * LAMBDA);
  } else if (total < frozen) {
    const perDegree = bodies.reduce((s, x) => s + heatAt(x, -1) * -1, 0);
    temperature = (total - frozen) / perDegree;
    share = 0;
  } else {
    const perDegree = bodies.reduce((s, x) => s + heatAt(x, 1) - heatAt(x, 0, 1), 0);
    temperature = (total - melted) / perDegree;
  }
  const iceLeft = temperature > 0 ? 0 : (1 - share) * h2o;
  const hotIsA = a.temperature >= b.temperature;
  const [hot, cold] = hotIsA ? [a, b] : [b, a];
  // At 0 °C the hotter body keeps as much of the liquid as it can.
  const hotMelted = temperature === 0 && isH2O(hot) ? Math.min(1, (share * h2o) / hot.mass) : 1;
  const heat = startHeat(hot) - heatAt(hot, temperature, hotMelted);
  return {
    temperature: tidy(temperature, 9),
    iceLeft: tidy(iceLeft, 9),
    iceMelted: tidy(iceStart(a) + iceStart(b) - iceLeft, 9),
    heat: tidy(heat, 6),
    hotIsA,
    hot,
    cold,
  };
}

/** @param {Body} body */
function iceStart(body) {
  return body.substance === 'nuoc-da' ? body.mass : 0;
}

/**
 * Whether a predicted temperature is right, within half a degree.
 * @param {number} predicted @param {number} actual
 */
export function isClose(predicted, actual) {
  return Math.abs(predicted - actual) <= 0.5;
}
