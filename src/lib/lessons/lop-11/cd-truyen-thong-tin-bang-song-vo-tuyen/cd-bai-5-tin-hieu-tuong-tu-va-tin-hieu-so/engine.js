/**
 * Turning an analog voltage into a digital one and back: sampling at a
 * chosen rate, quantising each sample to the nearest of 2ⁿ levels, writing
 * the level as n bits, and the staircase a DAC rebuilds. Time in ms,
 * frequencies in kHz, voltages in V.
 */

/** Lowest and highest level of the converter, V. */
export const U_MIN = -1.5;
export const U_MAX = 1.5;

/** Highest frequency in the analog signal, kHz (its third harmonic). */
export const F_HIGHEST = 3;

/**
 * The analog signal: a 1 kHz tone with a third harmonic, like a voice
 * vowel, between about −1.4 V and 1.4 V.
 * @param {number} t ms
 */
export const analogAt = (t) => Math.sin(2 * Math.PI * t) + 0.4 * Math.sin(2 * Math.PI * 3 * t);

/**
 * Number of levels of an n-bit converter, 2ⁿ.
 * @param {number} bits
 */
export const levelCount = (bits) => 2 ** bits;

/**
 * Gap between two neighbouring levels, V.
 * @param {number} bits
 */
export const levelStep = (bits) => (U_MAX - U_MIN) / (levelCount(bits) - 1);

/**
 * The level (0 to 2ⁿ − 1) nearest to the voltage u.
 * @param {number} u @param {number} bits
 */
export function levelOf(u, bits) {
  const k = Math.round((u - U_MIN) / levelStep(bits));
  return Math.min(levelCount(bits) - 1, Math.max(0, k));
}

/**
 * Voltage of level k.
 * @param {number} k @param {number} bits
 */
export const levelVoltage = (k, bits) => U_MIN + k * levelStep(bits);

/**
 * The level number written in n binary digits: (5, 3) → '101'.
 * @param {number} k @param {number} bits
 */
export const codeOf = (k, bits) => k.toString(2).padStart(bits, '0');

/**
 * Samples taken every 1/fs ms from t = 0 up to `tMax`, each with its level,
 * quantised voltage and code.
 * @param {number} fs kHz @param {number} bits @param {number} tMax ms
 */
export function sampleSignal(fs, bits, tMax) {
  const n = Math.floor(tMax * fs + 1e-9);
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / fs;
    const u = analogAt(t);
    const level = levelOf(u, bits);
    return { t, u, level, q: levelVoltage(level, bits), code: codeOf(level, bits) };
  });
}

/**
 * The DAC output held at each sample's level until the next sample: the
 * value of the staircase at time t.
 * @param {ReturnType<typeof sampleSignal>} samples @param {number} fs @param {number} t
 */
export function staircaseAt(samples, fs, t) {
  const i = Math.min(samples.length - 1, Math.max(0, Math.floor(t * fs + 1e-9)));
  return samples[i].q;
}

/**
 * Largest gap between the analog signal and the DAC staircase over the
 * window, V, measured on a fine grid.
 * @param {number} fs @param {number} bits @param {number} tMax
 */
export function worstError(fs, bits, tMax) {
  const samples = sampleSignal(fs, bits, tMax);
  let worst = 0;
  const steps = 2000;
  for (let i = 0; i <= steps; i++) {
    const t = (tMax * i) / steps;
    worst = Math.max(worst, Math.abs(analogAt(t) - staircaseAt(samples, fs, t)));
  }
  return worst;
}

/**
 * Bit rate, kbit/s, of fs kHz samples of n bits each.
 * @param {number} fs @param {number} bits
 */
export const bitRate = (fs, bits) => fs * bits;

/**
 * True when the samples are dense enough to rebuild the signal: at least
 * two per period of its highest frequency.
 * @param {number} fs kHz
 */
export const sampledEnough = (fs) => fs >= 2 * F_HIGHEST;
