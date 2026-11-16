/**
 * Signal level along a cable in decibels: the loss α·L of the cable, the
 * gain of amplifiers placed along it, and the lowest level the signal
 * reaches, compared with the level where it sinks into the noise.
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * A power ratio in decibels, 10·lg(P₂/P₁).
 * @param {number} ratio P₂/P₁
 */
export const dbOf = (ratio) => 10 * Math.log10(ratio);

/**
 * The power ratio P₂/P₁ for a level change in decibels.
 * @param {number} db
 */
export const ratioOf = (db) => 10 ** (db / 10);

/**
 * Output power after a level change of `db` decibels.
 * @param {number} p1 input power (any unit) @param {number} db
 */
export const powerAfter = (p1, db) => p1 * ratioOf(db);

/** @typedef {{ id: string, name: string, alpha: number }} Cable */

/**
 * Cables to try, with attenuation coefficients in dB/km. The optical value
 * is the book's; the coaxial one is a typical order of magnitude.
 * @type {ReadonlyArray<Cable>}
 */
export const CABLES = [
  { id: 'quang', name: 'Cáp quang', alpha: 0.3 },
  { id: 'dong-truc', name: 'Cáp đồng trục', alpha: 1 },
];

/** Gain of one amplifier, dB. */
export const GAIN = 20;

/** Level, relative to the input, below which the signal is lost in noise, dB. */
export const NOISE_LEVEL = -30;

/**
 * Level along the cable: the points of the level graph (a jump up at each
 * amplifier), the level just before each amplifier, the output level, the
 * lowest level reached and whether it stayed above the noise.
 * @param {number} alpha dB/km @param {number} length km @param {number[]} amps positions, km
 */
export function levelProfile(alpha, length, amps) {
  const at = [...amps].filter((x) => x > 0 && x < length).sort((a, b) => a - b);
  /** @type {Array<{ x: number, db: number }>} */
  const points = [{ x: 0, db: 0 }];
  /** @type {number[]} */
  const before = [];
  let gain = 0;
  for (const x of at) {
    const db = gain - alpha * x;
    before.push(db);
    points.push({ x, db });
    gain += GAIN;
    points.push({ x, db: db + GAIN });
  }
  const output = gain - alpha * length;
  points.push({ x: length, db: output });
  const lowest = Math.min(output, ...before);
  return { points, before, output, lowest, clear: lowest >= NOISE_LEVEL - 1e-9 };
}

/**
 * Fewest amplifiers that can keep the signal above the noise over the whole
 * cable, each placed where the level has just reached the noise level.
 * @param {number} alpha @param {number} length
 */
export function fewestAmps(alpha, length) {
  const reach = -NOISE_LEVEL / alpha;
  if (length <= reach) return 0;
  const hop = GAIN / alpha;
  return Math.ceil((length - reach) / hop - 1e-9);
}

/**
 * Level at x km from the input, dB: the cable's loss so far plus the gain of
 * the amplifiers at or before x.
 * @param {number} alpha @param {number[]} amps @param {number} x
 */
export const levelAt = (alpha, amps, x) =>
  amps.filter((a) => a > 0 && a <= x).length * GAIN - alpha * x;

/**
 * A positive number as mantissa · 10^exponent with 1 ≤ mantissa < 10,
 * the mantissa rounded to two decimals: 2.3e-8 → { mantissa: 2.3, exponent: -8 }.
 * @param {number} x
 */
export function scientific(x) {
  let exponent = Math.floor(Math.log10(x));
  let mantissa = tidy(x / 10 ** exponent, 2);
  if (mantissa >= 10) {
    mantissa /= 10;
    exponent += 1;
  }
  return { mantissa, exponent };
}
