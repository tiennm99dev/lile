/**
 * Coulomb's law on a board in centimetres with charges in microcoulombs:
 * the force between two charges, how it scales against a remembered state,
 * and the resultant force on a third charge.
 */
import { tidy } from '#lib/core/number-format.js';
import { coulomb, forceOn } from '../_shared/charges.js';

/** @typedef {{ x: number, y: number, q: number }} Placed position in cm, charge in µC */

const UC = 1e-6;
const CM = 1e-2;

/**
 * Force between two placed charges in a medium of dielectric constant eps.
 * `attract` is true for unlike charges; `unit` points from a to b.
 * @param {Placed} a @param {Placed} b @param {number} [eps]
 */
export function pairForce(a, b, eps = 1) {
  const r = tidy(Math.hypot(b.x - a.x, b.y - a.y));
  const force = r > 0 ? coulomb(a.q * UC, b.q * UC, r * CM, eps) : 0;
  return {
    r,
    force,
    attract: a.q * b.q < 0,
    none: a.q === 0 || b.q === 0,
    unit: r > 0 ? { x: (b.x - a.x) / r, y: (b.y - a.y) / r } : { x: 0, y: 0 },
  };
}

/**
 * How the force changed against a remembered state, with the reason the law
 * gives: the ratio of charge products, of squared distances and of media.
 * @param {{ q1: number, q2: number, r: number, eps: number }} now
 * @param {{ q1: number, q2: number, r: number, eps: number }} before
 */
export function compare(now, before) {
  const charges = Math.abs(now.q1 * now.q2) / Math.abs(before.q1 * before.q2);
  const distance = (before.r / now.r) ** 2;
  const medium = before.eps / now.eps;
  return {
    charges: tidy(charges, 6),
    distance: tidy(distance, 6),
    medium: tidy(medium, 6),
    ratio: tidy(charges * distance * medium, 6),
  };
}

/**
 * Forces on the test charge q0 from q1 and q2 and their sum, in N.
 * @param {Placed} q1 @param {Placed} q2 @param {Placed} q0 @param {number} [eps]
 */
export function resultant(q1, q2, q0, eps = 1) {
  /** @param {Placed} p */
  const si = (p) => ({ x: p.x * CM, y: p.y * CM, q: p.q * UC });
  const f1 = forceOn([si(q1), si(q0)], 1, eps);
  const f2 = forceOn([si(q2), si(q0)], 1, eps);
  const total = { x: f1.x + f2.x, y: f1.y + f2.y };
  return {
    f1,
    f2,
    total,
    size: tidy(Math.hypot(total.x, total.y), 12),
    f1Size: tidy(Math.hypot(f1.x, f1.y), 12),
    f2Size: tidy(Math.hypot(f2.x, f2.y), 12),
  };
}
