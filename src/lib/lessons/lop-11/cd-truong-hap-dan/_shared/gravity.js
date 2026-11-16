/**
 * Newton's gravitation in SI units with the book's rounded constants: the
 * force between two masses, the field strength, the gravitational potential
 * and potential energy, orbital and escape speeds, and quantities written as
 * a mantissa times a power of ten (6,68·10⁻¹¹).
 */
import { formatNumber, numTex, sup } from '#lib/core/number-format.js';

/** Gravitational constant, N·m²/kg², as the book rounds it. */
export const G = 6.68e-11;

/**
 * The bodies the book's exercises use, mass in kg and radius in m.
 * @type {Readonly<Record<'earth' | 'moon' | 'mars', { name: string, mass: number, radius: number }>>}
 */
export const BODIES = {
  earth: { name: 'Trái Đất', mass: 6.0e24, radius: 6.4e6 },
  moon: { name: 'Mặt Trăng', mass: 7.2e22, radius: 1.738e6 },
  mars: { name: 'Hoả tinh', mass: 6.4e23, radius: 3.396e6 },
};

/** Distance between the centres of the Earth and the Moon, m. */
export const EARTH_MOON = 3.84e8;

/**
 * Size of the gravitational force F = Gm₁m₂/r², in N.
 * @param {number} m1 kg @param {number} m2 kg @param {number} r m
 */
export function gravityForce(m1, m2, r) {
  if (!(r > 0)) return Infinity;
  return (G * m1 * m2) / (r * r);
}

/**
 * Field strength g = GM/r² at r from the centre of a mass M, in N/kg.
 * @param {number} mass kg @param {number} r m
 */
export function fieldStrength(mass, r) {
  return gravityForce(mass, 1, r);
}

/**
 * Gravitational potential Φ = −GM/r, zero at infinity, in J/kg.
 * @param {number} mass kg @param {number} r m
 */
export function potential(mass, r) {
  if (!(r > 0)) return -Infinity;
  return (-G * mass) / r;
}

/**
 * Gravitational potential energy Wt = −GMm/r, zero at infinity, in J.
 * @param {number} mass kg @param {number} m kg @param {number} r m
 */
export function potentialEnergy(mass, m, r) {
  return potential(mass, r) * m;
}

/**
 * Speed of a circular orbit of radius r, v = √(GM/r), in m/s.
 * @param {number} mass kg @param {number} r m
 */
export function orbitSpeed(mass, r) {
  return Math.sqrt((G * mass) / r);
}

/**
 * Speed that just escapes from r, v = √(2GM/r), in m/s.
 * @param {number} mass kg @param {number} r m
 */
export function escapeSpeed(mass, r) {
  return Math.sqrt((2 * G * mass) / r);
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
 * Plain text: 6,68·10⁻¹¹; values with an exponent from −2 to 3 as decimals.
 * @param {number} value @param {number} [digits]
 */
export function sciText(value, digits = 2) {
  const { mantissa, exponent } = sciParts(value, digits);
  if (exponent >= -2 && exponent <= 3) return formatNumber(value, Math.max(0, digits - exponent));
  return `${formatNumber(mantissa, digits)}·10${supSigned(exponent)}`;
}

/**
 * TeX source: 6{,}68 \cdot 10^{-11}, with the same decimal range as `sciText`.
 * @param {number} value @param {number} [digits]
 */
export function sciTex(value, digits = 2) {
  const { mantissa, exponent } = sciParts(value, digits);
  if (exponent >= -2 && exponent <= 3) return numTex(value, Math.max(0, digits - exponent));
  return `${numTex(mantissa, digits)} \\cdot 10^{${exponent}}`;
}
