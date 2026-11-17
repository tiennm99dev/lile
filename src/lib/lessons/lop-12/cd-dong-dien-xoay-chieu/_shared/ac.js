/**
 * Sinusoidal alternating quantities the way the book writes them,
 * x = X₀ cos(ωt + φ), with their effective value and the oscilloscope range
 * a widget switches to for a given peak.
 */

export const TAU = 2 * Math.PI;

/**
 * The instantaneous value X₀ cos(2πf·t + φ).
 * @param {number} peak X₀ @param {number} f Hz @param {number} phi rad
 * @param {number} t s
 */
export const acAt = (peak, f, phi, t) => peak * Math.cos(TAU * f * t + phi);

/**
 * The effective (hiệu dụng) value of a sinusoid of peak X₀: X₀/√2.
 * @param {number} peak
 */
export const rms = (peak) => peak / Math.SQRT2;

/**
 * The smallest range in `ranges` that holds the peak with a little room,
 * like the volts/div knob of an oscilloscope; the largest when none does.
 * @param {number} peak
 * @param {number[]} ranges in increasing order
 */
export function rangeFor(peak, ranges) {
  return ranges.find((r) => r >= Math.abs(peak) * 1.1) ?? ranges[ranges.length - 1];
}
