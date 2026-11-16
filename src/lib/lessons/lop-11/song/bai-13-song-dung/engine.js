/**
 * The standing-wave bench of the lesson: a string 1,2 m long on which waves
 * travel at 12 m/s, so with two fixed ends the standing waves appear at
 * f = 5, 10, 15, … Hz, and with a free end at f = 2,5; 7,5; 12,5; … Hz.
 * The learner tunes the vibrator to produce a requested pattern.
 */
import { numTex } from '#lib/core/number-format.js';
import { nearestMode, pattern } from '../_shared/standing.js';

export const LENGTH = 1.2;
export const SPEED = 12;

/**
 * @typedef {{ end: import('../_shared/standing.js').EndKind, n: number, text: string }} Task
 */

/** Patterns to produce; `n` is the number of antinodes. */
export const TASKS = /** @type {Task[]} */ ([
  { end: 'co-dinh', n: 1, text: 'sóng dừng có $1$ bụng trên dây hai đầu cố định' },
  { end: 'co-dinh', n: 3, text: 'sóng dừng có $3$ bụng trên dây hai đầu cố định' },
  {
    end: 'co-dinh',
    n: 4,
    text: 'sóng dừng có $5$ nút (kể cả hai đầu dây) trên dây hai đầu cố định',
  },
  { end: 'tu-do', n: 2, text: 'sóng dừng có $2$ bụng trên dây có đầu $Q$ tự do' },
  { end: 'tu-do', n: 3, text: 'sóng dừng có $3$ nút trên dây có đầu $Q$ tự do' },
]);

/**
 * What the string shows at frequency f.
 * @param {import('../_shared/standing.js').EndKind} end @param {number} f
 */
export function reading(end, f) {
  const mode = nearestMode(end, f, LENGTH, SPEED);
  return { ...mode, ...pattern(end, mode.n), lambda: SPEED / f };
}

/**
 * Whether the string at frequency f shows the task's pattern.
 * @param {Task} task @param {import('../_shared/standing.js').EndKind} end @param {number} f
 */
export function solves(task, end, f) {
  const r = reading(end, f);
  return end === task.end && r.standing && r.n === task.n;
}

/**
 * The feedback sentence for the string as it is.
 * @param {import('../_shared/standing.js').EndKind} end @param {number} f
 */
export function noteFor(end, f) {
  const r = reading(end, f);
  if (!r.standing) {
    return `Với $f = ${numTex(f, 1)}$ Hz dây chỉ rung lăn tăn: sóng tới và sóng phản xạ chưa tạo thành sóng dừng vì chiều dài dây chưa thoả mãn điều kiện sóng dừng.`;
  }
  const lam = `\\lambda = \\frac{v}{f} = \\frac{${SPEED}}{${numTex(f, 1)}} = ${numTex(r.lambda, 2)}$ m`;
  const law =
    end === 'co-dinh'
      ? `$l = k\\frac{\\lambda}{2}$ với $k = ${r.n}$`
      : `$l = (2k + 1)\\frac{\\lambda}{4}$ với $k = ${r.n - 1}$`;
  return `Có sóng dừng: $${r.antinodes}$ bụng, $${r.nodes}$ nút. $${lam}, khoảng cách hai nút liên tiếp $\\frac{\\lambda}{2} = ${numTex(r.lambda / 2, 2)}$ m, và ${law}.`;
}
