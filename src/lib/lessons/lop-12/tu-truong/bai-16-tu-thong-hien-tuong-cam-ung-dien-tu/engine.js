/**
 * The two experiments of the lesson on magnetic flux and induction: a coil
 * turning in a uniform field (flux and emf against time) and a bar magnet
 * pushed toward or pulled from a ring (Lenz's law).
 */
import { coilAt, wrapDeg } from '../_shared/loop.js';

/** The turning coil: one turn of 100 cm² in 0,2 T, half a turn per second. */
export const COIL = { N: 1, B: 0.2, S: 0.01, omega: Math.PI };
/** One period of the turning coil, in seconds. */
export const PERIOD = 2;

/**
 * Angle α between n⃗ and B⃗ at time t, in degrees within [0, 360).
 * @param {number} t
 */
export function angleAt(t) {
  return wrapDeg((COIL.omega * t * 180) / Math.PI);
}

/**
 * Flux in mWb and emf in mV of the turning coil at time t.
 * @param {number} t
 */
export function readingAt(t) {
  const { flux, emf } = coilAt(COIL, t);
  return { flux: flux * 1000, emf: emf * 1000 };
}

/** @typedef {'N' | 'S'} Pole */
/** @typedef {'gan' | 'xa'} Motion */

/**
 * What Lenz's law gives when the `pole` of a bar magnet faces a ring and is
 * moved toward it (`gan`) or away (`xa`): whether the flux through the ring
 * grows, the pole the ring's face shows the magnet (the same pole to repel
 * an approach, the other to hold back a retreat) and the way the induced
 * current turns as seen from the magnet (counterclockwise for a north face).
 * @param {Pole} pole @param {Motion} motion
 */
export function lenzOutcome(pole, motion) {
  const grows = motion === 'gan';
  /** @type {Pole} */
  const face = grows ? pole : pole === 'N' ? 'S' : 'N';
  return {
    grows,
    face,
    turn: face === 'N' ? 'ngược chiều kim đồng hồ' : 'cùng chiều kim đồng hồ',
    force: grows ? 'đẩy' : 'hút',
  };
}
