/**
 * Two uses of electromagnetic induction: the ideal transformer,
 * U₁/U₂ = N₁/N₂, and sending power P down a line of resistance R at
 * voltage U (power factor 1), which loses ΔP = P²R/U² as heat.
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * Secondary voltage of an ideal transformer, U₂ = U₁·N₂/N₁. A direct
 * current gives no changing flux, so no secondary voltage.
 * @param {number} U1 @param {number} N1 @param {number} N2
 * @param {boolean} [alternating]
 */
export function secondaryVoltage(U1, N1, N2, alternating = true) {
  return alternating ? tidy((U1 * N2) / N1, 9) : 0;
}

/**
 * Whether a transformer steps the voltage up, down or leaves it.
 * @param {number} N1 @param {number} N2
 * @returns {'tang' | 'ha' | 'giu'}
 */
export function kindOf(N1, N2) {
  if (N2 > N1) return 'tang';
  if (N2 < N1) return 'ha';
  return 'giu';
}

/**
 * Losses on a transmission line: current I = P/U, lost power ΔP = I²R,
 * voltage drop ΔU = IR and efficiency H = (P − ΔP)/P.
 * @param {number} P watt @param {number} U volt @param {number} R ohm
 */
export function lineLoss(P, U, R) {
  const I = P / U;
  const loss = I * I * R;
  return {
    I: tidy(I, 9),
    loss: tidy(loss, 9),
    drop: tidy(I * R, 9),
    efficiency: tidy((P - loss) / P, 9),
  };
}
