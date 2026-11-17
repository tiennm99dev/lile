import { describe, expect, it } from 'vitest';
import { MATERIALS, attenuate, halfLayer, muAt } from './xray.js';

describe('x-ray attenuation', () => {
  it('follows I = I0 e^(-μd) and halves over ln2/μ', () => {
    expect(attenuate(100, 20, 0.05)).toBeCloseTo(100 / Math.E, 9);
    expect(attenuate(1, 3, halfLayer(3))).toBeCloseTo(0.5, 12);
  });

  it('reads table rows exactly and interpolates between them', () => {
    expect(muAt('mo-mem', 60)).toBeCloseTo(0.2059, 9);
    expect(muAt('xuong', 40)).toBeCloseTo(0.6655 * 1.92, 9);
    const mid = muAt('nhom', 25);
    expect(mid).toBeLessThan(muAt('nhom', 20));
    expect(mid).toBeGreaterThan(muAt('nhom', 30));
  });

  it('keeps lead K edge as a jump and bone above soft tissue', () => {
    expect(muAt('chi', 88.001)).toBeGreaterThan(3 * muAt('chi', 87.9));
    const bad = [];
    for (const E of [15, 30, 50, 80, 120]) {
      if (!(muAt('xuong', E) > muAt('mo-mem', E))) bad.push(E);
      if (!(muAt('chi', E) > muAt('xuong', E))) bad.push(E);
    }
    expect(bad).toEqual([]);
    expect(Object.keys(MATERIALS)).toHaveLength(4);
  });
});
