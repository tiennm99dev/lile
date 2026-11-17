/**
 * The series RLC circuit of the lesson (pure inductor, ideal capacitor) under
 * an effective voltage U at frequency f: reactances, impedance, current, the
 * voltages of the phasor diagram, the phase difference and the resonance.
 */
import { TAU } from '../_shared/ac.js';

/**
 * @typedef {{ R: number, L: number, C: number, f: number, U: number }} Rlc
 * R in Ω, L in H, C in F, f in Hz, U (effective) in V.
 */

/**
 * Cảm kháng Z_L = ωL.
 * @param {number} L @param {number} f
 */
export const inductive = (L, f) => TAU * f * L;

/**
 * Dung kháng Z_C = 1/(ωC).
 * @param {number} C @param {number} f
 */
export const capacitive = (C, f) => 1 / (TAU * f * C);

/**
 * The resonance frequency f₀ = 1/(2π√(LC)), where Z_L = Z_C.
 * @param {number} L @param {number} C
 */
export const resonance = (L, C) => 1 / (TAU * Math.sqrt(L * C));

/**
 * How close f must be to f₀ to call it resonance in the widget: 1 % of f₀,
 * and at least half a hertz, since its slider moves in steps of 1 Hz.
 * @param {number} f0
 */
export const resonanceBand = (f0) => Math.max(0.01 * f0, 0.5);

/**
 * Everything about the circuit at its frequency.
 * @param {Rlc} c
 */
export function solve(c) {
  const ZL = inductive(c.L, c.f);
  const ZC = capacitive(c.C, c.f);
  const X = ZL - ZC;
  const Z = Math.hypot(c.R, X);
  const I = c.U / Z;
  const phi = Math.atan2(X, c.R);
  const f0 = resonance(c.L, c.C);
  return {
    ZL,
    ZC,
    Z,
    I,
    UR: I * c.R,
    UL: I * ZL,
    UC: I * ZC,
    tanPhi: X / c.R,
    phi,
    cosPhi: c.R / Z,
    f0,
    Imax: c.U / c.R,
    /** 'L' when the circuit is mostly inductive (u leads i), 'C' when capacitive, 'R' at resonance. */
    character: /** @type {'L' | 'C' | 'R'} */ (
      Math.abs(c.f - f0) <= resonanceBand(f0) ? 'R' : X > 0 ? 'L' : 'C'
    ),
  };
}

/**
 * The resonance curve: the effective current against frequency.
 * @param {Omit<Rlc, 'f'>} c
 * @param {number} fMin @param {number} fMax @param {number} n pieces
 */
export function currentCurve(c, fMin, fMax, n) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const f = fMin + ((fMax - fMin) * i) / n;
    return { x: f, y: solve({ ...c, f }).I };
  });
}
