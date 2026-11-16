import { describe, expect, it } from 'vitest';
import {
  FREQUENCIES,
  judgeSpeed,
  loudPositions,
  loudness,
  makeTube,
  meanAndError,
  readingOffset,
  speedFrom,
} from './engine.js';

const tube = { temperature: 25, speed: 346, endCorrection: 1 };

describe('virtual resonance tube', () => {
  it('makes tubes with a plausible speed of sound and end correction', () => {
    const misses = [];
    for (let seed = 1; seed <= 50; seed++) {
      const t = makeTube(seed);
      if (t.speed < 340 || t.speed > 351 || t.endCorrection < 0.8 || t.endCorrection > 1.6) {
        misses.push(t);
      }
      for (const f of FREQUENCIES) if (loudPositions(f, t).length < 2) misses.push({ seed, f });
    }
    expect(misses).toEqual([]);
    expect(makeTube(3)).toEqual(makeTube(3));
  });

  it('is loudest at odd quarter wavelengths, shifted by the end correction', () => {
    // f = 500 Hz, v = 346 m/s: λ = 69,2 cm, loud at 17,3 − 1 and 51,9 − 1 and 86,5 − 1.
    expect(loudPositions(500, tube)).toEqual([16.3, 50.9, 85.5]);
    expect(loudness(16.3, 500, tube)).toBeCloseTo(1, 9);
    expect(loudness(33.6, 500, tube)).toBeLessThan(0.1);
    expect(readingOffset(51.2, 500, tube)).toBeCloseTo(0.3, 9);
  });

  it('gets the speed from two neighbouring loud positions whatever the end correction', () => {
    const [l1, l2] = loudPositions(500, tube);
    expect(speedFrom(l1, l2, 500)).toBe(346);
    const v = speedFrom(17, 51, 500);
    expect(v).toBe(340);
    expect(judgeSpeed(340, v, 346)).toMatchObject({ computed: true, accurate: true });
    expect(judgeSpeed(170, v, 346)).toMatchObject({ computed: false, accurate: false });
  });

  it('writes a result as mean and mean deviation', () => {
    expect(meanAndError([340, 342, 338])).toEqual({ mean: 340, error: 1.333333 });
  });
});
