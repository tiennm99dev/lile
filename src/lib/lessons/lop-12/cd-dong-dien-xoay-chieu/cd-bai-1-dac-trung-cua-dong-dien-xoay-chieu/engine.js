/**
 * The virtual oscilloscope of the lesson: a voltage u = U₀cos(ωt + φu) and a
 * current i = I₀cos(ωt + φi) of the same frequency, their characteristic
 * values, the phase difference φ = φu − φi said the book's way, and the
 * reading tasks where the learner reads U, f and φ off the screen.
 */
import { formatNumber } from '#lib/core/number-format.js';
import { lagOf, phaseRelation, piTex, piText } from '#lib/domain/oscillation.js';
import { TAU, rangeFor, rms } from '../_shared/ac.js';

/** Phases are set in steps of π/6. */
export const PHASE_STEP = Math.PI / 6;

/** The time shown on the screen, s. */
export const SCREEN_T = 0.04;

/** The volts/div and amperes/div ranges of the two channels. */
export const U_RANGES = [2, 4, 6, 10];
export const I_RANGES = [1, 2, 4, 6];

/**
 * The range a channel switches to for a peak and the spacing of its grid
 * lines, one unit up to a range of 4 and two above.
 * @param {number} peak @param {number[]} ranges
 */
export function screenScale(peak, ranges) {
  const range = rangeFor(peak, ranges);
  return { range, step: range <= 4 ? 1 : 2 };
}

/**
 * @typedef {{ U0: number, I0: number, f: number, phiU: number, phiI: number }} Signals
 * Peaks in V and A, frequency in Hz, initial phases in rad.
 */

/**
 * Every characteristic value of the pair.
 * @param {Signals} s
 */
export function characteristics(s) {
  const omega = TAU * s.f;
  const T = 1 / s.f;
  const dphi = s.phiU - s.phiI;
  const rel = phaseRelation(dphi);
  return {
    omega,
    T,
    U: rms(s.U0),
    I: rms(s.I0),
    dphi: rel.dphi,
    relation: rel,
    lag: lagOf(dphi, T),
  };
}

/**
 * The phase difference as a sentence about u and i, rich text:
 * 'u sớm pha $\frac{\pi}{3}$ so với i'.
 * @param {number} dphi φu − φi
 */
export function relationText(dphi) {
  const rel = phaseRelation(dphi);
  if (rel.name === 'cùng pha') return '$u$ và $i$ cùng pha';
  if (rel.name === 'ngược pha') return '$u$ và $i$ ngược pha';
  const amount = `$${piTex(Math.abs(rel.dphi))}$`;
  const tail = rel.name === 'vuông pha' ? ' (vuông pha)' : '';
  return rel.lead === 1
    ? `$u$ sớm pha ${amount} so với $i$${tail}`
    : `$u$ trễ pha ${amount} so với $i$${tail}`;
}

/**
 * The same as plain text for screen readers: 'u sớm pha π/3 so với i'.
 * @param {number} dphi
 */
export function relationPlain(dphi) {
  const rel = phaseRelation(dphi);
  if (rel.name === 'cùng pha') return 'u và i cùng pha';
  if (rel.name === 'ngược pha') return 'u và i ngược pha';
  const amount = piText(Math.abs(rel.dphi));
  return rel.lead === 1 ? `u sớm pha ${amount} so với i` : `u trễ pha ${amount} so với i`;
}

/** The phase differences offered in the reading tasks, φu − φi. */
export const DPHI_OPTIONS = [0, Math.PI / 3, -Math.PI / 3, Math.PI / 2, -Math.PI / 2, Math.PI];

/**
 * Screens to read: peaks on grid lines, periods on whole ticks, and two
 * successive peaks of at least one curve on the screen.
 * @type {ReadonlyArray<Signals>}
 */
export const TASKS = [
  { U0: 4, I0: 2, f: 50, phiU: 0, phiI: -Math.PI / 2 },
  { U0: 6, I0: 3, f: 25, phiU: 0, phiI: 0 },
  { U0: 3, I0: 1, f: 100, phiU: 0, phiI: Math.PI / 2 },
  { U0: 6, I0: 2, f: 50, phiU: Math.PI / 3, phiI: 0 },
  { U0: 2, I0: 3, f: 50, phiU: 0, phiI: Math.PI },
  { U0: 8, I0: 4, f: 25, phiU: -Math.PI / 3, phiI: 0 },
];

/**
 * Checks a reading of a task: effective voltage U (V, within 0,05 V),
 * frequency f (Hz) and the index of the chosen phase difference.
 * @param {Signals} task
 * @param {{ U: number | null, f: number | null, pick: number | null }} reading
 */
export function checkReading(task, reading) {
  const c = characteristics(task);
  const uOk = reading.U !== null && Math.abs(reading.U - c.U) <= 0.05;
  const fOk = reading.f !== null && Math.abs(reading.f - task.f) < 0.5;
  const phiOk =
    reading.pick !== null &&
    Math.abs(phaseRelation(DPHI_OPTIONS[reading.pick] - c.dphi).dphi) < 1e-9;
  return { uOk, fOk, phiOk, all: uOk && fOk && phiOk, U: c.U, T: c.T, dphi: c.dphi };
}

/**
 * The effective voltage written the book's way, two decimals: '2,83'.
 * @param {number} peak
 */
export const rmsText = (peak) => formatNumber(rms(peak), 2);
