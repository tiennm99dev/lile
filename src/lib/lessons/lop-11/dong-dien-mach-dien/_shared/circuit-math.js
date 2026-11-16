/**
 * Direct-current relations of this chapter in SI units: a source of
 * electromotive force E and internal resistance r feeding an outer resistance
 * R, and the straight line fitted through measured (I, U) points.
 */
import { tidy } from '#lib/core/number-format.js';

/** Charge of an electron in magnitude, C. */
export const E_CHARGE = 1.6e-19;

/**
 * Current of a closed circuit, Ohm's law for the whole circuit I = E/(R + r).
 * A short circuit (R = 0) gives E/r; with no internal resistance it is
 * Infinity.
 * @param {number} emf V @param {number} r Ω @param {number} outer Ω
 */
export function circuitCurrent(emf, r, outer) {
  const total = outer + r;
  return total > 0 ? tidy(emf / total, 12) : Infinity;
}

/**
 * Voltage between the poles of a source while it gives a current I:
 * U = E − Ir.
 * @param {number} emf V @param {number} r Ω @param {number} current A
 */
export const terminalVoltage = (emf, r, current) => tidy(emf - current * r, 12);

/**
 * Least-squares straight line y = a + bx through the points. Null for fewer
 * than two points or when every point has the same x.
 * @param {Array<{ x: number, y: number }>} points
 * @returns {{ intercept: number, slope: number } | null}
 */
export function fitLine(points) {
  const n = points.length;
  if (n < 2) return null;
  const mx = points.reduce((s, p) => s + p.x, 0) / n;
  const my = points.reduce((s, p) => s + p.y, 0) / n;
  const sxx = points.reduce((s, p) => s + (p.x - mx) ** 2, 0);
  if (sxx < 1e-15) return null;
  const sxy = points.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0);
  const slope = sxy / sxx;
  return { intercept: tidy(my - slope * mx, 12), slope: tidy(slope, 12) };
}
