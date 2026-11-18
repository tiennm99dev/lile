/**
 * Newton's gravitation in SI units with the book's rounded constants: the
 * force between two masses, the field strength, the gravitational potential
 * and potential energy, and orbital and escape speeds.
 */

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
