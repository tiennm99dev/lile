/**
 * The op-amp simulator: the transfer curve U_ra(U_vào) of a comparator, an
 * inverting or a non-inverting amplifier, and what the output devices do
 * with the output voltage.
 */
import { tidy } from '#lib/core/number-format.js';
import { opampOut } from '../_shared/electronics.js';

/** @typedef {import('../_shared/electronics.js').OpampMode} OpampMode */

/**
 * The output voltage over input voltages from `from` to `to`, `n` + 1 points.
 * @param {OpampMode} mode
 * @param {{ uref?: number, r1?: number, rf?: number, usat?: number }} p
 * @param {number} from @param {number} to @param {number} [n]
 */
export function transferCurve(mode, p, from, to, n = 80) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const uin = tidy(from + ((to - from) * i) / n);
    return { x: uin, y: opampOut(mode, { ...p, uin }).out };
  });
}

/**
 * Input voltages at which an amplifier reaches saturation, ±usat/|G|.
 * @param {number} gain @param {number} usat
 */
export const saturationInput = (gain, usat) => tidy(usat / Math.abs(gain));

/**
 * What the output devices do: an LED in series with a resistor lights when
 * the output is positive (forward bias); a relay behind a diode closes only
 * on a positive output. The LED current is (U_ra − U_LED)/R in amperes.
 * @param {number} uout @param {number} r series resistor in ohms
 * @param {number} [uled] voltage across a lit LED
 */
export function devices(uout, r, uled = 2) {
  const on = uout > uled;
  return { ledOn: on, ledCurrent: on ? tidy((uout - uled) / r) : 0, relayClosed: uout > 0 };
}
