import { describe, expect, it } from 'vitest';
import { capacitorState, combine, energy, equivalent, plateCapacitance } from './engine.js';

describe('plate capacitor', () => {
  it('grows with area and dielectric, shrinks with the gap', () => {
    const c = plateCapacitance(1, 0.01, 0.001);
    expect(c).toBeCloseTo(8.842e-11, 13);
    expect(plateCapacitance(2, 0.01, 0.001) / c).toBeCloseTo(2, 12);
    expect(plateCapacitance(1, 0.02, 0.001) / c).toBeCloseTo(2, 12);
    expect(plateCapacitance(1, 0.01, 0.002) / c).toBeCloseTo(0.5, 12);
    expect(plateCapacitance(1, 0.01, 0)).toBe(Infinity);
  });

  it('keeps U on the source and Q once cut off', () => {
    const on = capacitorState({ eps: 1, area: 0.01, gap: 0.001, u: 100 });
    expect(on.onSource).toBe(true);
    expect(on.u).toBe(100);
    expect(on.q).toBeCloseTo(8.842e-9, 11);
    const off = capacitorState({ eps: 1, area: 0.01, gap: 0.002, u: 100, kept: on.q });
    expect(off.onSource).toBe(false);
    expect(off.q).toBe(on.q);
    expect(off.u).toBeCloseTo(200, 9);
    expect(off.w / on.w).toBeCloseTo(2, 9);
  });

  it('stores W = QU/2', () => {
    expect(energy(2e-6 * 10, 10)).toBeCloseTo(1e-4, 15);
  });
});

describe('joined capacitors', () => {
  it('adds in parallel and adds reciprocals in series', () => {
    expect(equivalent([2, 3], 'song-song')).toBe(5);
    expect(equivalent([3, 6], 'noi-tiep')).toBe(2);
    expect(equivalent([2, 2, 2], 'noi-tiep')).toBeCloseTo(2 / 3, 12);
  });

  it('shares one charge in series and one voltage in parallel', () => {
    const s = combine([3, 6], 'noi-tiep', 12);
    expect(s.c).toBe(2);
    expect(s.q).toBe(24);
    expect(s.parts.map((p) => p.u)).toEqual([8, 4]);
    expect(s.parts.map((p) => p.q)).toEqual([24, 24]);
    const p = combine([3, 6], 'song-song', 12);
    expect(p.c).toBe(9);
    expect(p.parts.map((x) => x.q)).toEqual([36, 72]);
    expect(p.parts.map((x) => x.u)).toEqual([12, 12]);
    expect(p.w).toBe(648);
  });
});
