/**
 * A control panel for n moles of ideal gas: hold one of p, V, T fixed and
 * change another; the third follows from pV = nRT. Pressures are in kPa
 * and volumes in litres, so p·V comes out in joules and R = 8,31 needs no
 * power of ten.
 */
import { R, curve } from '../_shared/gas.js';

/** @typedef {'T' | 'p' | 'V'} Fixed which quantity the process holds constant */
/** @typedef {{ p: number, V: number, T: number }} State */

export const V_RANGE = { min: 5, max: 30 };
export const T_RANGE = { min: 150, max: 600 };

/**
 * The state at volume V (l) and temperature T (K) of n moles.
 * @param {number} n @param {number} V @param {number} T
 * @returns {State}
 */
export function stateAt(n, V, T) {
  return { p: (n * R * T) / V, V, T };
}

/**
 * pV/T of a state, in J/K: equal to nR for every state of the gas.
 * @param {State} s
 */
export function ratioOf(s) {
  return (s.p * s.V) / s.T;
}

/**
 * The quantity the slider changes in a process: V when T is fixed, T
 * otherwise.
 * @param {Fixed} fixed
 */
export function freeOf(fixed) {
  return fixed === 'T' ? 'V' : 'T';
}

/**
 * Slider bounds for the free quantity; an isobaric process is limited so
 * the volume stays inside the cylinder.
 * @param {Fixed} fixed @param {State} s @param {number} n
 */
export function rangeOf(fixed, s, n) {
  if (fixed === 'T') return V_RANGE;
  if (fixed === 'V') return T_RANGE;
  const lo = (s.p * V_RANGE.min) / (n * R);
  const hi = (s.p * V_RANGE.max) / (n * R);
  return {
    min: Math.max(T_RANGE.min, Math.ceil(lo / 10) * 10),
    max: Math.min(T_RANGE.max, Math.floor(hi / 10) * 10),
  };
}

/**
 * The state after moving the free quantity to `value` in a process.
 * @param {Fixed} fixed @param {State} s @param {number} value @param {number} n
 * @returns {State}
 */
export function move(fixed, s, value, n) {
  if (fixed === 'T') return stateAt(n, value, s.T);
  if (fixed === 'V') return stateAt(n, s.V, value);
  return { p: s.p, V: (n * R * value) / s.p, T: value };
}

/**
 * The graph a process is drawn on and its whole line through `s`:
 * p–V for an isotherm, V–T for an isobar, p–T for an isochore.
 * @param {Fixed} fixed @param {State} s @param {number} n
 */
export function processLine(fixed, s, n) {
  if (fixed === 'T') return curve((V) => (n * R * s.T) / V, V_RANGE.min - 1, V_RANGE.max + 5);
  if (fixed === 'p') return curve((T) => (n * R * T) / s.p, 0, T_RANGE.max + 50, 2);
  return curve((T) => (n * R * T) / s.V, 0, T_RANGE.max + 50, 2);
}

/**
 * Where a state sits on the graph of a process.
 * @param {Fixed} fixed @param {State} s
 */
export function pointOf(fixed, s) {
  if (fixed === 'T') return { x: s.V, y: s.p };
  if (fixed === 'p') return { x: s.T, y: s.V };
  return { x: s.T, y: s.p };
}
