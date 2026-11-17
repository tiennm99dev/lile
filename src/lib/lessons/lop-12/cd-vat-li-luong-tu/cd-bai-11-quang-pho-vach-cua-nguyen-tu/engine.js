/**
 * The hydrogen atom by Bohr's postulates: stationary states of energy
 * Eₙ = −13,6/n² eV (n = 1, 2, … named K, L, M, N, O, P), and the photon
 * hf = E_high − E_low emitted or absorbed when the electron jumps between
 * two of them.
 */
import { regionOf, wavelengthNm } from '../_shared/quantum.js';

/** Ionisation energy of hydrogen from the ground state (eV). */
export const RYDBERG_EV = 13.6;

/** The six lowest states the lesson draws. */
export const LEVELS = /** @type {const} */ ([
  { n: 1, name: 'K' },
  { n: 2, name: 'L' },
  { n: 3, name: 'M' },
  { n: 4, name: 'N' },
  { n: 5, name: 'O' },
  { n: 6, name: 'P' },
]);

/**
 * Energy (eV) of the state with quantum number `n`.
 * @param {number} n
 */
export const levelEv = (n) => -RYDBERG_EV / (n * n);

/** Series names by the lower state of the jump. */
const SERIES = /** @type {Record<number, string>} */ ({ 1: 'Lyman', 2: 'Balmer', 3: 'Paschen' });

/**
 * The photon of a jump from state `from` to state `to` (from ≠ to).
 * @param {number} from
 * @param {number} to
 */
export function transition(from, to) {
  const ev = Math.abs(levelEv(from) - levelEv(to));
  const nm = wavelengthNm(ev);
  const low = Math.min(from, to);
  return {
    ev,
    nm,
    emits: to < from,
    region: regionOf(nm),
    series: SERIES[low] ?? null,
  };
}

/**
 * All emission lines between the drawn states, shortest wavelength first.
 */
export function allLines() {
  const lines = [];
  for (const hi of LEVELS) {
    for (const lo of LEVELS) {
      if (lo.n < hi.n) lines.push({ from: hi.n, to: lo.n, ...transition(hi.n, lo.n) });
    }
  }
  return lines.sort((a, b) => a.nm - b.nm);
}
