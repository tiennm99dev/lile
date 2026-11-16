/**
 * A virtual bench for measuring a cell: the cell (E, r), a protective
 * resistor R0, a rheostat R and an ammeter in series, and a voltmeter across
 * the poles of the cell, so U = E − Ir. Readings carry a small, repeatable
 * scatter and are rounded the way the meters show them.
 */
import { rng } from '#lib/core/drill.js';
import { tidy } from '#lib/core/number-format.js';
import { scatter } from '#lib/domain/scatter.js';

/** Protective resistor, Ω. */
export const R0 = 20;

/** Rheostat settings the bench offers, Ω. */
export const RHEOSTAT = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

/** @typedef {'moi' | 'cu'} CellKind */

/**
 * A hidden cell: a new one has a higher EMF and a small internal resistance,
 * a used one a lower EMF and a larger internal resistance.
 * @param {CellKind} kind @param {number} seed
 * @returns {{ emf: number, r: number }}
 */
export function makeCell(kind, seed) {
  const rand = rng(seed * 2654435761 + (kind === 'cu' ? 17 : 3));
  if (kind === 'moi')
    return {
      emf: tidy(1.55 + 0.01 * Math.floor(rand() * 8), 6),
      r: tidy(0.5 + 0.1 * Math.floor(rand() * 5), 6),
    };
  return {
    emf: tidy(1.38 + 0.01 * Math.floor(rand() * 10), 6),
    r: tidy(2 + 0.5 * Math.floor(rand() * 5), 6),
  };
}

/**
 * Meter readings with the rheostat at R: I in mA (to 0,1 mA) and U in V (to
 * 0,01 V). The same cell, R and seed always give the same readings.
 * @param {{ emf: number, r: number }} cell @param {number} rheostat Ω @param {number} seed
 */
export function readingAt(cell, rheostat, seed) {
  const amps = cell.emf / (rheostat + R0 + cell.r);
  const volts = cell.emf - amps * cell.r;
  const draw = seed * 101 + rheostat;
  const mA = Math.round((amps * 1000 + 0.15 * scatter(draw)) * 10) / 10;
  const u = Math.round((volts + 0.004 * scatter(draw + 0.5)) * 100) / 100;
  return { mA: tidy(mA, 6), u: tidy(u, 6) };
}

/**
 * Checks the E and r a learner read off their graph against the line fitted
 * through their own points: E within 0,02 V, r within 0,15 Ω or 15 %.
 * @param {{ emf: number, r: number }} guess
 * @param {{ emf: number, r: number }} fitted
 */
export function judgeReading(guess, fitted) {
  const emfOk = Math.abs(guess.emf - fitted.emf) <= 0.02;
  const rOk = Math.abs(guess.r - fitted.r) <= Math.max(0.15, 0.15 * fitted.r);
  return { emfOk, rOk };
}
