import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { countLeft, decayChance, decayConstant, lawCurve, remaining, step } from './engine.js';

describe('decay law', () => {
  it('halves the number every half-life', () => {
    expect(remaining(400, 0, 2)).toBe(400);
    expect(remaining(400, 2, 2)).toBe(200);
    expect(remaining(400, 6, 2)).toBe(50);
    expect(decayConstant(8)).toBeCloseTo(0.0866, 4);
  });

  it('splits one half-life into steps with the same overall chance', () => {
    const left = (1 - decayChance(0.5, 2)) ** 4;
    expect(left).toBeCloseTo(0.5, 12);
  });

  it('draws the curve from N₀ down to the end time', () => {
    const pts = lawCurve(100, 2, 10);
    expect(pts[0]).toEqual({ x: 0, y: 100 });
    expect(pts.at(-1)?.y).toBeCloseTo(100 / 32, 9);
  });
});

describe('random sample', () => {
  it('follows the law on average while each nucleus decays at random', () => {
    const rand = rng(7);
    /** @type {Array<number | null>} */
    let sample = Array(4000).fill(null);
    const dt = 0.1;
    const T = 2;
    const off = [];
    for (let k = 1; k <= 60; k++) {
      const t = Math.round(k * dt * 10) / 10;
      sample = step(sample, t, dt, T, rand);
      if (k % 20 === 0) {
        const expected = remaining(4000, t, T);
        const ratio = countLeft(sample) / expected;
        if (Math.abs(ratio - 1) > 0.08) off.push(`${t}: ${countLeft(sample)} vs ${expected}`);
      }
    }
    expect(off).toEqual([]);
    expect(sample.filter((d) => d !== null).every((d) => d !== null && d > 0 && d <= 6)).toBe(true);
  });

  it('never brings a decayed nucleus back', () => {
    const rand = rng(3);
    const once = step([null, 1, null], 2, 1, 1, rand);
    expect(once[1]).toBe(1);
  });
});
