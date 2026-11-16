import { describe, expect, it } from 'vitest';
import { PUZZLES, audioAt, envelopeAt, instantFrequency, modulatedAt, ranges } from './engine.js';

const S = { fa: 1, fc: 10, m: 0.5, df: 4 };

/**
 * Frequency of the FM wave at t from the slope of its phase, kHz.
 * @param {number} t ms
 */
function slopeFrequency(t) {
  const h = 1e-4;
  const beta = S.df / S.fa;
  const phase = (/** @type {number} */ x) =>
    2 * Math.PI * S.fc * x - beta * Math.cos(2 * Math.PI * S.fa * x);
  return (phase(t + h) - phase(t - h)) / (2 * h) / (2 * Math.PI);
}

describe('amplitude modulation', () => {
  it('keeps the wave inside its envelope and the envelope follows the audio', () => {
    const bad = [];
    for (let i = 0; i <= 400; i++) {
      const t = i / 200;
      const v = modulatedAt('am', t, S);
      if (Math.abs(v) > envelopeAt(t, S) + 1e-12) bad.push(t);
    }
    expect(bad).toEqual([]);
    expect(envelopeAt(0.25, S)).toBeCloseTo(1.5, 12);
    expect(envelopeAt(0.75, S)).toBeCloseTo(0.5, 12);
    expect(audioAt(0.25, 1)).toBeCloseTo(1, 12);
  });

  it('reports the amplitude range and over-modulation', () => {
    expect(ranges('am', S)).toEqual({
      ampMin: 0.5,
      ampMax: 1.5,
      fMin: 10,
      fMax: 10,
      overModulated: false,
    });
    expect(ranges('am', { ...S, m: 1.2 }).overModulated).toBe(true);
  });
});

describe('frequency modulation', () => {
  it('keeps amplitude 1 and moves the frequency with the audio', () => {
    const big = [];
    for (let i = 0; i <= 400; i++) {
      if (Math.abs(modulatedAt('fm', i / 200, S)) > 1 + 1e-12) big.push(i);
    }
    expect(big).toEqual([]);
    expect(slopeFrequency(0.25)).toBeCloseTo(instantFrequency(0.25, S), 4);
    expect(instantFrequency(0.25, S)).toBeCloseTo(14, 12);
    expect(instantFrequency(0.75, S)).toBeCloseTo(6, 12);
    expect(ranges('fm', S)).toMatchObject({ ampMin: 1, ampMax: 1, fMin: 6, fMax: 14 });
  });

  it('offers puzzles of both kinds with a carrier frequency above the deviation', () => {
    expect(new Set(PUZZLES.map((p) => p.mode)).size).toBe(2);
    expect(PUZZLES.every((p) => p.s.fc - p.s.df > 0)).toBe(true);
  });
});
