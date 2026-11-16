/**
 * A standing wave on a string of length L (m) driven with a small amplitude
 * by a vibrator at x = 0, with the far end x = L either fixed ('co-dinh') or
 * free ('tu-do', a light ring sliding on a rod). The incident and reflected
 * waves add to an envelope
 *
 *   fixed far end: |sin(q(L − x))|,   free far end: |cos(q(L − x))|,   q = 2πf/v,
 *
 * scaled by DAMPING / √(base² + DAMPING²), where base is sin(qL) or cos(qL).
 * At resonance base = 0 and the string swings with full relative amplitude
 * 1; away from it the amplitude stays small, as on a real string.
 *
 * Modes are counted by their number of loops n (số bụng):
 *   two fixed ends:      L = nλ/2,        n bụng, n + 1 nút;
 *   one end free:        L = (2n − 1)λ/4, n bụng, n nút.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {'co-dinh' | 'tu-do'} EndKind */

/** Loss in the string: the width of each resonance. */
export const DAMPING = 0.05;

/** A peak swing at least this large (of the resonant one) counts as a standing wave. */
export const STANDING = 0.7;

/** @param {number} f @param {number} speed */
const waveNumber = (f, speed) => (2 * Math.PI * f) / speed;

/**
 * The frequency that gives n loops.
 * @param {EndKind} end @param {number} n @param {number} length @param {number} speed
 */
export function modeFrequency(end, n, length, speed) {
  return tidy(
    end === 'co-dinh' ? (n * speed) / (2 * length) : ((2 * n - 1) * speed) / (4 * length),
  );
}

/**
 * Wavelength λ = v/f.
 * @param {number} f @param {number} speed
 */
export const wavelength = (f, speed) => tidy(speed / f);

/**
 * Number of nodes and antinodes of mode n, counting both ends.
 * @param {EndKind} end @param {number} n
 */
export function pattern(end, n) {
  return { antinodes: n, nodes: end === 'co-dinh' ? n + 1 : n };
}

/** @param {EndKind} end @param {number} f @param {number} length @param {number} speed */
function base(end, f, length, speed) {
  const ql = waveNumber(f, speed) * length;
  return end === 'co-dinh' ? Math.sin(ql) : Math.cos(ql);
}

/**
 * Signed relative amplitude of the point at x (m) along the string, between −1 and 1.
 * @param {EndKind} end @param {number} f @param {number} length @param {number} speed @param {number} x
 */
export function profile(end, f, length, speed, x) {
  const arg = waveNumber(f, speed) * (length - x);
  const shape = end === 'co-dinh' ? Math.sin(arg) : Math.cos(arg);
  const b = base(end, f, length, speed);
  return (DAMPING * shape) / Math.hypot(b, DAMPING);
}

/**
 * Largest relative amplitude on the string, from 0 to 1.
 * @param {EndKind} end @param {number} f @param {number} length @param {number} speed
 */
export function peak(end, f, length, speed) {
  const ql = waveNumber(f, speed) * length;
  // The envelope reaches 1 inside the string once it is a quarter wave long.
  const top = end === 'co-dinh' ? (ql >= Math.PI / 2 ? 1 : Math.sin(ql)) : 1;
  return (DAMPING * top) / Math.hypot(base(end, f, length, speed), DAMPING);
}

/**
 * The mode closest to frequency f, with its frequency, and whether f is close
 * enough to it for a clear standing wave.
 * @param {EndKind} end @param {number} f @param {number} length @param {number} speed
 */
export function nearestMode(end, f, length, speed) {
  const ratio = (f * 4 * length) / speed;
  const n = Math.max(1, end === 'co-dinh' ? Math.round(ratio / 2) : Math.round((ratio + 1) / 2));
  return {
    n,
    frequency: modeFrequency(end, n, length, speed),
    standing: peak(end, f, length, speed) >= STANDING,
  };
}

/**
 * Positions (m from the vibrator) of the nodes and antinodes of mode n.
 * @param {EndKind} end @param {number} n @param {number} length
 */
export function markPositions(end, n, length) {
  const lambda = end === 'co-dinh' ? (2 * length) / n : (4 * length) / (2 * n - 1);
  const from = (/** @type {number} */ d) => tidy(length - d);
  /** @type {number[]} */
  const nodes = [];
  /** @type {number[]} */
  const antinodes = [];
  if (end === 'co-dinh') {
    for (let j = 0; j <= n; j++) nodes.push(from((j * lambda) / 2));
    for (let j = 0; j < n; j++) antinodes.push(from(((2 * j + 1) * lambda) / 4));
  } else {
    for (let j = 0; j < n; j++) nodes.push(from(((2 * j + 1) * lambda) / 4));
    for (let j = 0; j < n; j++) antinodes.push(from((j * lambda) / 2));
  }
  const up = (/** @type {number} */ a, /** @type {number} */ b) => a - b;
  return { nodes: nodes.sort(up), antinodes: antinodes.sort(up), lambda: tidy(lambda) };
}
