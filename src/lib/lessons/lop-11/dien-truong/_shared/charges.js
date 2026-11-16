/**
 * Point charges in SI units: Coulomb's law, the field and the potential of a
 * set of charges, the book's constants and quantities written as a mantissa
 * times a power of ten (3,6·10⁻³). Positions are plain `{ x, y }` with y up.
 */
import { formatNumber, numTex, sup, tidy } from '#lib/core/number-format.js';

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
 * Splits a value into a mantissa in [1, 10) rounded to `digits` decimals and
 * an exponent, carrying a mantissa that rounds up to 10. The sign stays on
 * the mantissa.
 * @param {number} value @param {number} [digits]
 */
export function sciParts(value, digits = 2) {
  if (value === 0) return { mantissa: 0, exponent: 0 };
  let exponent = Math.floor(Math.log10(Math.abs(value)));
  let mantissa = Number((value / 10 ** exponent).toFixed(digits));
  if (Math.abs(mantissa) >= 10) {
    exponent += 1;
    mantissa = Number((value / 10 ** exponent).toFixed(digits));
  }
  return { mantissa, exponent };
}

/** @param {number} n */
const supSigned = (n) => (n < 0 ? `⁻${sup(-n)}` : sup(n));

/**
 * Plain text: 3,6·10⁻³; values with an exponent from −2 to 3 as decimals.
 * @param {number} value @param {number} [digits]
 */
export function sciText(value, digits = 2) {
  const { mantissa, exponent } = sciParts(value, digits);
  if (exponent >= -2 && exponent <= 3) return formatNumber(value, Math.max(0, digits - exponent));
  const m = formatNumber(mantissa, digits);
  if (m === '1') return `10${supSigned(exponent)}`;
  if (m === '−1') return `−10${supSigned(exponent)}`;
  return `${m}·10${supSigned(exponent)}`;
}

/**
 * TeX source: 3{,}6 \cdot 10^{-3}, with the same decimal range as `sciText`.
 * @param {number} value @param {number} [digits]
 */
export function sciTex(value, digits = 2) {
  const { mantissa, exponent } = sciParts(value, digits);
  if (exponent >= -2 && exponent <= 3) return numTex(value, Math.max(0, digits - exponent));
  const m = numTex(mantissa, digits);
  if (m === '1') return `10^{${exponent}}`;
  if (m === '-1') return `-10^{${exponent}}`;
  return `${m} \\cdot 10^{${exponent}}`;
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
