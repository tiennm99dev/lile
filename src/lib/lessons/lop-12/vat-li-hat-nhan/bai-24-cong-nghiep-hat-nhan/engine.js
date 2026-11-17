/**
 * The virtual reactor of the lesson on nuclear industry. The control rods,
 * pushed in to a depth from 0 to 1, absorb neutrons and lower the neutron
 * multiplication factor k; the fuel slowly burns up and lowers it too. The
 * power follows the neutron count: each generation multiplies it by k, so
 * P grows when k > 1, stays when k = 1 and dies away when k < 1.
 */

/** k with the rods fully out and fresh fuel. */
export const K_OUT = 1.06;
/** How much fully inserted rods lower k. */
export const ROD_WORTH = 0.12;
/** How fast burn-up lowers k, per second of the game. */
export const BURN_RATE = 0.0006;
/** Average neutron generation time of the game, in seconds (slowed down to be playable). */
export const GENERATION = 0.1;

/** Power band the operator must hold, in % of the rated power. */
export const BAND = { lo: 80, hi: 120 };
/** Power at which the safety system drops every rod. */
export const TRIP = 200;
/** Seconds of steady power that win the game. */
export const GOAL = 20;

/**
 * Neutron multiplication factor.
 * @param {number} depth rods inserted, 0 to 1 @param {number} burn k lost to burn-up
 */
export function kOf(depth, burn) {
  return K_OUT - ROD_WORTH * depth - burn;
}

/**
 * Burn-up after `seconds` of the game, capped so the rods can always make up for it.
 * @param {number} seconds
 */
export function burnAt(seconds) {
  return Math.min(0.05, BURN_RATE * seconds);
}

/**
 * The rod depth at which the reactor is exactly critical (k = 1).
 * @param {number} burn
 */
export function criticalDepth(burn) {
  return (K_OUT - burn - 1) / ROD_WORTH;
}

/**
 * Power after dt seconds: P·k^(dt/generation).
 * @param {number} power @param {number} k @param {number} dt
 */
export function stepPower(power, k, dt) {
  return power * k ** (dt / GENERATION);
}

/**
 * The regime of the chain reaction for a multiplication factor.
 * @param {number} k
 * @returns {'duoi' | 'toi' | 'vuot'}
 */
export function regime(k) {
  if (Math.abs(k - 1) < 0.002) return 'toi';
  return k < 1 ? 'duoi' : 'vuot';
}

/**
 * How the game stands after a step: a trip above TRIP, out when the power
 * has died away, a win after GOAL seconds in the band, else running.
 * @param {number} power @param {number} steady seconds in the band so far
 * @returns {'trip' | 'out' | 'won' | 'run'}
 */
export function verdict(power, steady) {
  if (power >= TRIP) return 'trip';
  if (power < 5) return 'out';
  if (steady >= GOAL) return 'won';
  return 'run';
}

/**
 * Seconds in the band after a step: they add up while the power stays in
 * the band and start again from 0 when it leaves.
 * @param {number} steady @param {number} power @param {number} dt
 */
export function steadyAfter(steady, power, dt) {
  return power >= BAND.lo && power <= BAND.hi ? steady + dt : 0;
}
