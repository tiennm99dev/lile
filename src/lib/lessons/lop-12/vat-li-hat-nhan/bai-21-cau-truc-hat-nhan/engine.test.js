import { describe, expect, it } from 'vitest';
import {
  MAX_N,
  MAX_Z,
  TASKS,
  describe as say,
  isotopesOf,
  packing,
  radiusFm,
  statusOf,
} from './engine.js';

describe('statusOf', () => {
  it('knows stable and radioactive isotopes', () => {
    expect(statusOf(6, 6).kind).toBe('stable');
    expect(statusOf(6, 8)).toMatchObject({ kind: 'radioactive', half: '5 730 năm' });
    expect(statusOf(1, 2).kind).toBe('radioactive');
    expect(statusOf(2, 3).kind).toBe('unbound');
    expect(statusOf(0, 3).kind).toBe('neutrons');
    expect(statusOf(0, 0).kind).toBe('empty');
  });

  it('lists every isotope inside the builder range', () => {
    const bad = [];
    for (let z = 1; z <= MAX_Z; z++)
      for (const a of isotopesOf(z)) if (a - z > MAX_N || a - z < 0) bad.push(`${z}/${a}`);
    expect(bad).toEqual([]);
  });

  it('has every task reachable and named in the feedback', () => {
    for (const t of TASKS) {
      expect(t.Z).toBeLessThanOrEqual(MAX_Z);
      expect(t.N).toBeLessThanOrEqual(MAX_N);
      expect(statusOf(t.Z, t.N).kind).not.toBe('unbound');
    }
  });
});

describe('describe', () => {
  it('says too few or too many neutrons against the stable isotopes', () => {
    expect(say(8, 5)).toContain('thiếu neutron');
    expect(say(8, 14)).toContain('thừa neutron');
    expect(say(6, 6)).toContain('carbon-12');
  });
});

describe('radius', () => {
  it('follows R = 1,2·A^(1/3) fm', () => {
    expect(radiusFm(27)).toBeCloseTo(3.6, 9);
    expect(radiusFm(1)).toBeCloseTo(1.2, 9);
  });
});

describe('packing', () => {
  it('places Z protons and N neutrons', () => {
    const pts = packing(6, 8, 10);
    expect(pts).toHaveLength(14);
    expect(pts.filter((p) => p.proton)).toHaveLength(6);
    expect(packing(3, 0, 10).every((p) => p.proton)).toBe(true);
    expect(packing(0, 2, 10).some((p) => p.proton)).toBe(false);
  });
});
