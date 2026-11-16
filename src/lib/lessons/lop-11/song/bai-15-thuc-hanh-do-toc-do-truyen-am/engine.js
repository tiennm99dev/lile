/**
 * A virtual resonance tube: a loudspeaker driven by a signal generator sits
 * at the open mouth of a tube, and a piston closes the tube at a distance l
 * (cm) from the mouth. The air column is closed at the piston (a node) and
 * open at the mouth (an antinode a little outside it, by the end correction
 * e), so the sound is loudest when l + e = (2k + 1)λ/4. Two neighbouring
 * loud positions are λ/2 apart whatever e is, which is why the book takes
 * λ = 2(l₂ − l₁) and v = 2(l₂ − l₁)f.
 */
import { rng } from '#lib/core/drill.js';
import { tidy } from '#lib/core/number-format.js';

/** Length of the tube, cm. */
export const TUBE = 100;

/** Frequencies the generator offers, Hz. */
export const FREQUENCIES = [400, 500, 600, 800];

/** Loss in the column: the width of each resonance. */
const DAMPING = 0.08;

/**
 * Hidden conditions of one tube: air temperature (°C), the speed of sound
 * v = 331 + 0,6t (m/s) and the end correction e (cm).
 * @param {number} seed
 */
export function makeTube(seed) {
  const rand = rng(seed * 2654435761);
  const temperature = 18 + Math.floor(rand() * 15);
  const speed = tidy(331 + 0.6 * temperature, 6);
  const endCorrection = tidy(0.8 + Math.floor(rand() * 9) / 10, 6);
  return { temperature, speed, endCorrection };
}

/**
 * Wavelength in cm of a sound of frequency f (Hz) at speed v (m/s).
 * @param {number} f @param {number} speed
 */
export const wavelengthCm = (f, speed) => (100 * speed) / f;

/**
 * Loudness heard at the mouth for a column of length l (cm), from about 0 to 1.
 * @param {number} l @param {number} f @param {{ speed: number, endCorrection: number }} tube
 */
export function loudness(l, f, tube) {
  const q = (2 * Math.PI) / wavelengthCm(f, tube.speed);
  const c = Math.cos(q * (l + tube.endCorrection));
  return DAMPING / Math.hypot(c, DAMPING);
}

/**
 * Column lengths (cm) at which the sound is loudest, inside the tube.
 * @param {number} f @param {{ speed: number, endCorrection: number }} tube
 */
export function loudPositions(f, tube) {
  const lambda = wavelengthCm(f, tube.speed);
  const out = [];
  for (let k = 0; ; k++) {
    const l = ((2 * k + 1) * lambda) / 4 - tube.endCorrection;
    if (l > TUBE) break;
    if (l > 0) out.push(tidy(l, 6));
  }
  return out;
}

/**
 * How far a recorded column length is from the nearest loudest position.
 * @param {number} l @param {number} f @param {{ speed: number, endCorrection: number }} tube
 */
export function readingOffset(l, f, tube) {
  return Math.min(...loudPositions(f, tube).map((p) => Math.abs(p - l)));
}

/**
 * Speed from two neighbouring loud positions: v = 2(l₂ − l₁)f, in m/s.
 * @param {number} l1 cm @param {number} l2 cm @param {number} f Hz
 */
export const speedFrom = (l1, l2, f) => tidy((2 * Math.abs(l2 - l1) * f) / 100, 6);

/**
 * Judges a typed speed against the speed the learner's own readings give
 * (within 1 %) and against the true speed (within 3 %).
 * @param {number} guess @param {number} fromReadings @param {number} truth
 */
export function judgeSpeed(guess, fromReadings, truth) {
  return {
    computed: Math.abs(guess - fromReadings) <= 0.01 * fromReadings,
    accurate: Math.abs(guess - truth) <= 0.03 * truth,
    error: tidy((100 * Math.abs(guess - truth)) / truth, 1),
  };
}

/**
 * Mean and mean absolute deviation of repeated measurements, as the book
 * writes a result v = v̄ ± Δv.
 * @param {number[]} values
 */
export function meanAndError(values) {
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const error = values.reduce((s, v) => s + Math.abs(v - mean), 0) / values.length;
  return { mean: tidy(mean, 6), error: tidy(error, 6) };
}
