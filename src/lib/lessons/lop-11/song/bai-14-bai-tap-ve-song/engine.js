/**
 * The checking bench of the wave exercises: the learner types the data of a
 * problem and the simulation says what really happens, a standing wave on a
 * string or the maxima and minima between two coherent sources.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { countMaxima, countMinima, extremaPositions } from '../_shared/interference.js';
import { modeFrequency, nearestMode, pattern } from '../_shared/standing.js';

/** Most loops the string picture can still draw clearly. */
export const MAX_LOOPS = 30;

/**
 * Reads typed data: every value must be a positive number within its range.
 * @param {Record<string, number | null>} values
 * @param {Record<string, [number, number]>} ranges
 */
export function valid(values, ranges) {
  return Object.entries(ranges).every(([key, [lo, hi]]) => {
    const v = values[key];
    return v !== null && v !== undefined && v >= lo && v <= hi;
  });
}

/**
 * What a string of length l (m) with wave speed v (m/s) does at frequency f (Hz).
 * @param {import('../_shared/standing.js').EndKind} end
 * @param {number} length @param {number} speed @param {number} f
 */
export function standingReport(end, length, speed, f) {
  const mode = nearestMode(end, f, length, speed);
  const counts = pattern(end, mode.n);
  const lambda = tidy(speed / f, 6);
  const head = `$\\lambda = \\frac{v}{f} = ${numTex(lambda, 4)}$ m.`;
  if (mode.standing) {
    return {
      standing: true,
      drawable: mode.n <= MAX_LOOPS,
      text: `${head} Có sóng dừng với $${counts.antinodes}$ bụng và $${counts.nodes}$ nút (kể cả hai đầu dây).`,
    };
  }
  const near = [mode.n - 1, mode.n, mode.n + 1]
    .filter((n) => n >= 1)
    .map((n) => `$${numTex(modeFrequency(end, n, length, speed), 3)}$ Hz`);
  return {
    standing: false,
    drawable: mode.n <= MAX_LOOPS,
    text: `${head} Không có sóng dừng: chiều dài dây không bằng ${
      end === 'co-dinh'
        ? 'một số nguyên lần $\\frac{\\lambda}{2}$'
        : 'một số lẻ lần $\\frac{\\lambda}{4}$'
    }. Các tần số gần đó cho sóng dừng: ${near.join('; ')}.`,
  };
}

/**
 * Maxima and minima strictly between two in-phase sources a (cm) apart.
 * @param {number} a @param {number} lambda
 */
export function interferenceReport(a, lambda) {
  const maxima = countMaxima(a, lambda);
  const minima = countMinima(a, lambda);
  return {
    ...extremaPositions(a, lambda),
    text: `$\\frac{S_1S_2}{\\lambda} = ${numTex(tidy(a / lambda, 6), 3)}$. Trên đoạn $S_1S_2$ (không kể hai nguồn) có $${maxima}$ cực đại và $${minima}$ cực tiểu; hai cực đại liên tiếp cách nhau $\\frac{\\lambda}{2} = ${numTex(tidy(lambda / 2, 6), 3)}$ cm.`,
  };
}
