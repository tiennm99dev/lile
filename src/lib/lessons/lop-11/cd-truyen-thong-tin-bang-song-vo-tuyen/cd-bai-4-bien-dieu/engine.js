/**
 * Amplitude and frequency modulation of a sine carrier by a sine audio
 * signal. Time is in ms and frequencies in kHz, so f·t is a number of
 * cycles. The carrier has amplitude 1.
 */

/** @typedef {'am' | 'fm'} Mode */
/**
 * @typedef {{ fa: number, fc: number, m: number, df: number }} Settings
 * fa: audio frequency, fc: carrier frequency, m: AM depth (0 to about 1),
 * df: FM peak frequency deviation (kHz).
 */

const TAU = 2 * Math.PI;

/**
 * The audio (message) signal, amplitude 1.
 * @param {number} t ms @param {number} fa kHz
 */
export const audioAt = (t, fa) => Math.sin(TAU * fa * t);

/**
 * The unmodulated carrier, amplitude 1.
 * @param {number} t ms @param {number} fc kHz
 */
export const carrierAt = (t, fc) => Math.sin(TAU * fc * t);

/**
 * AM envelope: the carrier's amplitude at time t, 1 + m·audio.
 * @param {number} t @param {Settings} s
 */
export const envelopeAt = (t, s) => 1 + s.m * audioAt(t, s.fa);

/**
 * Instantaneous frequency of the FM wave, fc + df·audio, kHz.
 * @param {number} t @param {Settings} s
 */
export const instantFrequency = (t, s) => s.fc + s.df * audioAt(t, s.fa);

/**
 * The modulated wave. AM: (1 + m·sin 2πfa·t)·sin 2πfc·t. FM: the phase is
 * 2πfc·t − (df/fa)·cos 2πfa·t, whose rate of change is 2π(fc + df·sin 2πfa·t),
 * so the frequency follows the audio while the amplitude stays 1.
 * @param {Mode} mode @param {number} t @param {Settings} s
 */
export function modulatedAt(mode, t, s) {
  if (mode === 'am') return envelopeAt(t, s) * carrierAt(t, s.fc);
  const beta = s.fa > 0 ? s.df / s.fa : 0;
  return Math.sin(TAU * s.fc * t - beta * Math.cos(TAU * s.fa * t));
}

/**
 * What changes and what stays: the range of the amplitude and of the
 * frequency of the modulated wave.
 * @param {Mode} mode @param {Settings} s
 */
export function ranges(mode, s) {
  if (mode === 'am') {
    return {
      ampMin: 1 - s.m,
      ampMax: 1 + s.m,
      fMin: s.fc,
      fMax: s.fc,
      overModulated: s.m > 1,
    };
  }
  return { ampMin: 1, ampMax: 1, fMin: s.fc - s.df, fMax: s.fc + s.df, overModulated: false };
}

/**
 * Recognition puzzles: a modulated wave to name as AM or FM.
 * @type {ReadonlyArray<{ mode: Mode, s: Settings }>}
 */
export const PUZZLES = [
  { mode: 'fm', s: { fa: 1, fc: 12, m: 0, df: 6 } },
  { mode: 'am', s: { fa: 1.5, fc: 15, m: 0.6, df: 0 } },
  { mode: 'fm', s: { fa: 0.5, fc: 10, m: 0, df: 5 } },
  { mode: 'am', s: { fa: 1, fc: 20, m: 0.9, df: 0 } },
  { mode: 'am', s: { fa: 0.5, fc: 12, m: 0.4, df: 0 } },
  { mode: 'fm', s: { fa: 1.5, fc: 18, m: 0, df: 8 } },
];
