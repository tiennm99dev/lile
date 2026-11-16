/**
 * Models of the chapter's electronic parts: a light-dependent resistor
 * (LDR), an NTC thermistor, the potential divider they sit in, and an ideal
 * operational amplifier (op-amp) that saturates at its supply voltage.
 * Resistances are in ohms, voltages in volts.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/** Supply of the op-amp, ±SUPPLY volts; the output saturates there. */
export const SUPPLY = 12;

/** Resistance of the LDR at 10 lux, in ohms. */
const LDR_AT_10_LUX = 20_000;
/** Slope of lg R against lg E for a cadmium sulphide LDR. */
const LDR_GAMMA = 0.7;

/**
 * Resistance of the LDR under an illuminance `lux`: R = R₁₀·(E/10)^(−γ),
 * about 100 kΩ at 1 lx, 20 kΩ at 10 lx and a few hundred ohms in daylight.
 * @param {number} lux illuminance, at least 1 lx
 */
export function ldrResistance(lux) {
  return LDR_AT_10_LUX * (Math.max(1, lux) / 10) ** -LDR_GAMMA;
}

/** Resistance of the NTC thermistor at 25 °C, in ohms. */
export const NTC_R25 = 10_000;
/** The thermistor's B constant, in kelvin. */
export const NTC_B = 3950;

/**
 * Resistance of the NTC thermistor at a temperature in °C:
 * R = R₂₅·e^{B(1/T − 1/T₂₅)}, falling as the temperature rises.
 * @param {number} celsius
 */
export function ntcResistance(celsius) {
  const t = celsius + 273.15;
  return NTC_R25 * Math.exp(NTC_B * (1 / t - 1 / 298.15));
}

/**
 * Output of a potential divider: the voltage across the lower resistor,
 * U_ra = U·R₂/(R₁ + R₂).
 * @param {number} u supply voltage
 * @param {number} rTop R₁, between the supply and the output
 * @param {number} rBottom R₂, between the output and the ground
 */
export function dividerOut(u, rTop, rBottom) {
  return tidy((u * rBottom) / (rTop + rBottom));
}

/**
 * The illuminance at a step of a logarithmic slider: 10^(step/10) lux, so
 * steps 0, 10, 20, 30, 40 give 1, 10, 100, 1 000 and 10 000 lx.
 * @param {number} step
 */
export const luxAt = (step) => tidy(10 ** (step / 10), 6);

/**
 * A resistance written the book's way: "160 Ω", "8,04 kΩ", "1,2 MΩ".
 * @param {number} r ohms
 */
export function ohmText(r) {
  if (r >= 1e6) return `${formatNumber(r / 1e6, 2)} MΩ`;
  if (r >= 1e3) return `${formatNumber(r / 1e3, r >= 1e5 ? 0 : r >= 1e4 ? 1 : 2)} kΩ`;
  return `${formatNumber(r, 0)} Ω`;
}

/**
 * An illuminance written with sensible precision: "3,2 lx", "250 lx".
 * @param {number} lux
 */
export const luxText = (lux) => `${formatNumber(lux, lux < 10 ? 1 : 0)} lx`;

/** @typedef {'comparator' | 'inverting' | 'non-inverting'} OpampMode */

/**
 * Clip a voltage to the saturation levels ±usat.
 * @param {number} u @param {number} [usat]
 */
export const saturate = (u, usat = SUPPLY) => Math.max(-usat, Math.min(usat, u));

/**
 * Output of an op-amp circuit fed by `uin`.
 * - comparator: +usat when U₊ = uin is above U₋ = uref, −usat when below.
 * - inverting: U_ra = −(R_f/R₁)·U_vào.
 * - non-inverting: U_ra = (1 + R_f/R₁)·U_vào.
 * The two amplifiers saturate at ±usat.
 * @param {OpampMode} mode
 * @param {{ uin: number, uref?: number, r1?: number, rf?: number, usat?: number }} p
 * @returns {{ gain: number | null, ideal: number, out: number, saturated: boolean }}
 */
export function opampOut(mode, { uin, uref = 0, r1 = 1, rf = 1, usat = SUPPLY }) {
  if (mode === 'comparator') {
    const diff = tidy(uin - uref);
    const out = diff > 0 ? usat : diff < 0 ? -usat : 0;
    return { gain: null, ideal: out, out, saturated: out !== 0 };
  }
  const gain = tidy(mode === 'inverting' ? -rf / r1 : 1 + rf / r1);
  const ideal = tidy(gain * uin);
  const out = saturate(ideal, usat);
  return { gain, ideal, out, saturated: Math.abs(ideal) > usat };
}
