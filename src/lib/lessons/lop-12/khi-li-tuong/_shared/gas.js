/**
 * Ideal-gas helpers for the chapter, with the constants the book uses.
 */

/** Gas constant, J/(mol.K). */
export const R = 8.31;
/** Avogadro constant, 1/mol. */
export const N_A = 6.02e23;
/** Boltzmann constant k = R / N_A, J/K. */
export const K_B = 1.38e-23;
/** The book's conversion between the Celsius and Kelvin scales. */
export const ZERO_C = 273;

/**
 * Kelvin temperature of a Celsius one, T = t + 273.
 * @param {number} celsius
 */
export function toKelvin(celsius) {
  return celsius + ZERO_C;
}

/**
 * Pressure of n moles at volume V and temperature T, from pV = nRT
 * (SI units: Pa, m³, K).
 * @param {number} n @param {number} volume @param {number} kelvin
 */
export function pressureOf(n, volume, kelvin) {
  return (n * R * kelvin) / volume;
}

/**
 * Points of the curve y = f(x) from `from` to `to`, `count` segments.
 * @param {(x: number) => number} f
 * @param {number} from @param {number} to
 * @param {number} [count]
 */
export function curve(f, from, to, count = 60) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const x = from + ((to - from) * i) / count;
    return { x, y: f(x) };
  });
}

/**
 * A standard normal number from a uniform source (Box–Muller).
 * @param {() => number} rand
 */
export function gauss(rand) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
