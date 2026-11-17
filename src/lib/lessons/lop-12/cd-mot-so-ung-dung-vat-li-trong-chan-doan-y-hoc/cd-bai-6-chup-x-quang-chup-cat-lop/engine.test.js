import { describe, expect, it } from 'vitest';
import {
  MU,
  N,
  grey,
  lesionContrast,
  muAtPoint,
  phantom,
  project,
  reconstruct,
  rmsError,
  scanAngles,
} from './engine.js';

describe('head slice', () => {
  it('has air, skull, brain and a lesion that takes up contrast', () => {
    expect(muAtPoint(14, 14, false)).toBe(MU.air);
    expect(muAtPoint(0, 10.5, false)).toBe(MU.bone);
    expect(muAtPoint(0, -6, false)).toBe(MU.brain);
    expect(muAtPoint(3.5, -3, false)).toBe(MU.lesion);
    expect(muAtPoint(3.5, -3, true)).toBe(MU.lesionContrast);
    expect(phantom(false)).toHaveLength(N * N);
  });
});

describe('projections', () => {
  const img = phantom(false);

  it('sums μ along each ray: zero outside the head, largest through its middle', () => {
    const p = project(img, 0);
    expect(p[0]).toBe(0);
    const mid = p[N / 2];
    // 22 cm across the head on the long axis, 2 cm of it skull.
    expect(mid).toBeGreaterThan(4);
    expect(mid).toBeLessThan(6.5);
  });

  it('spreads the scan angles over half a turn', () => {
    expect(scanAngles(4)).toEqual([0, 45, 90, 135]);
  });
});

describe('filtered back-projection', () => {
  it('gets closer to the slice with more angles', () => {
    const img = phantom(false);
    const errors = [1, 4, 18, 36].map((k) => rmsError(reconstruct(img, k), img));
    const bad = errors.filter((e, i) => i > 0 && !(e < errors[i - 1]));
    expect(bad).toEqual([]);
    expect(errors[3]).toBeLessThan(0.06);
  });

  it('shows the lesion brighter than the brain around it, more so with contrast', () => {
    const plain = lesionContrast(reconstruct(phantom(false), 36));
    const dyed = lesionContrast(reconstruct(phantom(true), 36));
    expect(plain.lesion).toBeGreaterThan(plain.around);
    expect(dyed.lesion - dyed.around).toBeGreaterThan(3 * (plain.lesion - plain.around));
  });

  it('maps μ to a clipped grey level', () => {
    expect(grey(0.1, 0.2, 0.3)).toBe(0);
    expect(grey(0.25, 0.2, 0.3)).toBeCloseTo(0.5, 12);
    expect(grey(0.6, 0.2, 0.3)).toBe(1);
  });
});
