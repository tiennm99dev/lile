/**
 * Point charges in SI units: Coulomb's law, the field and the potential of a
 * set of charges and the book's constants. Positions are plain `{ x, y }`
 * with y up.
 */
import { tidy } from '#lib/core/number-format.js';

/** Coulomb constant k = 1/(4πε₀), N·m²/C², the book's rounded value. */
export const K = 9e9;
/** Vacuum permittivity ε₀, C²/(N·m²). */
export const EPS0 = 8.85e-12;
/** Elementary charge e, C. */
export const E_CHARGE = 1.6e-19;
/** Electron mass, kg. */
export const ELECTRON_MASS = 9.1e-31;
/** Proton mass, kg. */
export const PROTON_MASS = 1.67e-27;

/**
 * Dielectric constants of a few media, as the tables of the book print them.
 * @type {ReadonlyArray<{ id: string, name: string, eps: number }>}
 */
export const MEDIA = [
  { id: 'chan-khong', name: 'Chân không (không khí)', eps: 1 },
  { id: 'dau-hoa', name: 'Dầu hoả', eps: 2 },
  { id: 'nuoc', name: 'Nước nguyên chất', eps: 81 },
];

/** @typedef {{ x: number, y: number }} Vec */
/** @typedef {{ x: number, y: number, q: number }} Charge */

/**
 * Size of the Coulomb force F = k|q₁q₂|/(εr²), in N.
 * @param {number} q1 C @param {number} q2 C @param {number} r m
 * @param {number} [eps] dielectric constant of the medium
 */
export function coulomb(q1, q2, r, eps = 1) {
  if (!(r > 0)) return Infinity;
  return tidy((K * Math.abs(q1 * q2)) / (eps * r * r), 15);
}

/**
 * Field strength of a point charge E = k|Q|/(εr²), in V/m.
 * @param {number} q C @param {number} r m @param {number} [eps]
 */
export function pointField(q, r, eps = 1) {
  return coulomb(q, 1, r, eps);
}

/**
 * Field vector at p of every charge (positions in m, charges in C), in V/m.
 * Points closer than `skip` to a charge are left out.
 * @param {Charge[]} charges @param {Vec} p @param {number} [eps] @param {number} [skip]
 * @returns {Vec}
 */
export function fieldAt(charges, p, eps = 1, skip = 0) {
  let x = 0;
  let y = 0;
  for (const c of charges) {
    const dx = p.x - c.x;
    const dy = p.y - c.y;
    const r = Math.hypot(dx, dy);
    if (r <= skip || r === 0) continue;
    const k = (K * c.q) / (eps * r * r * r);
    x += k * dx;
    y += k * dy;
  }
  return { x, y };
}

/**
 * Force on charge `i` from all the others: the vector sum of the Coulomb
 * forces, in N.
 * @param {Charge[]} charges @param {number} i @param {number} [eps]
 * @returns {Vec}
 */
export function forceOn(charges, i, eps = 1) {
  const others = charges.filter((_, j) => j !== i);
  const f = fieldAt(others, charges[i], eps);
  return { x: f.x * charges[i].q, y: f.y * charges[i].q };
}

/**
 * Potential at p of every charge, V = Σ kq/(εr), zero at infinity, in V.
 * @param {Charge[]} charges @param {Vec} p @param {number} [eps]
 */
export function potentialAt(charges, p, eps = 1) {
  let v = 0;
  for (const c of charges) {
    const r = Math.hypot(p.x - c.x, p.y - c.y);
    if (r === 0) return c.q > 0 ? Infinity : -Infinity;
    v += (K * c.q) / (eps * r);
  }
  return v;
}

/**
 * Arrow length in px for a quantity of size m: grows like log(1 + m/ref) and
 * stops at `max`, so a force ten times bigger still looks bigger but stays on
 * the board.
 * @param {number} m @param {number} ref size drawn at about 40% of max
 * @param {number} max
 */
export function arrowPx(m, ref, max) {
  if (!(m > 0) || !(ref > 0)) return 0;
  return Math.min(max, (max * Math.log1p(m / ref)) / Math.log1p(4));
}
