import { describe, expect, it } from 'vitest';
import { fitLine } from '../_shared/circuit-math.js';
import { RHEOSTAT, judgeReading, makeCell, readingAt } from './engine.js';

describe('cells', () => {
  it('makes new cells stronger than used ones', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const fresh = makeCell('moi', seed);
      const used = makeCell('cu', seed);
      if (!(fresh.emf > used.emf && fresh.r < used.r)) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});

describe('measuring', () => {
  it('recovers E and r from a fitted U–I line', () => {
    const bad = [];
    for (const kind of /** @type {const} */ (['moi', 'cu'])) {
      for (let seed = 1; seed <= 20; seed++) {
        const cell = makeCell(kind, seed);
        const pts = RHEOSTAT.map((r) => readingAt(cell, r, seed)).map((p) => ({
          x: p.mA / 1000,
          y: p.u,
        }));
        const fit = fitLine(pts);
        if (!fit) {
          bad.push({ kind, seed });
          continue;
        }
        const { emfOk, rOk } = judgeReading({ emf: fit.intercept, r: -fit.slope }, cell);
        if (!emfOk || !rOk) bad.push({ kind, seed, fit, cell });
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives the same readings for the same seed', () => {
    const cell = makeCell('cu', 4);
    expect(readingAt(cell, 30, 4)).toEqual(readingAt(cell, 30, 4));
    const r = readingAt({ emf: 1.5, r: 1 }, 0, 1);
    expect(r.mA).toBeGreaterThan(71);
    expect(r.mA).toBeLessThan(72);
  });

  it('judges a learner reading against the fitted line', () => {
    expect(judgeReading({ emf: 1.5, r: 1.1 }, { emf: 1.51, r: 1 })).toEqual({
      emfOk: true,
      rOk: true,
    });
    expect(judgeReading({ emf: 1.45, r: 2 }, { emf: 1.51, r: 1 })).toEqual({
      emfOk: false,
      rOk: false,
    });
  });
});
