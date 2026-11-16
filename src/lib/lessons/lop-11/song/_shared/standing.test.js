import { describe, expect, it } from 'vitest';
import {
  STANDING,
  markPositions,
  modeFrequency,
  nearestMode,
  pattern,
  peak,
  profile,
  wavelength,
} from './standing.js';

describe('standing wave on a string', () => {
  it('gives the mode frequencies of both kinds of string', () => {
    // L = 1,2 m, v = 12 m/s: f = 5n Hz with two fixed ends, (2n − 1)·2,5 Hz with a free end.
    expect([1, 2, 3].map((n) => modeFrequency('co-dinh', n, 1.2, 12))).toEqual([5, 10, 15]);
    expect([1, 2, 3].map((n) => modeFrequency('tu-do', n, 1.2, 12))).toEqual([2.5, 7.5, 12.5]);
    expect(wavelength(15, 12)).toBe(0.8);
  });

  it('counts nodes and antinodes including the ends', () => {
    expect(pattern('co-dinh', 3)).toEqual({ antinodes: 3, nodes: 4 });
    expect(pattern('tu-do', 3)).toEqual({ antinodes: 3, nodes: 3 });
  });

  it('swings fully only at a mode frequency', () => {
    expect(peak('co-dinh', 15, 1.2, 12)).toBeCloseTo(1, 9);
    expect(peak('co-dinh', 15.5, 1.2, 12)).toBeLessThan(0.2);
    expect(peak('tu-do', 12.5, 1.2, 12)).toBeCloseTo(1, 9);
    expect(peak('tu-do', 15, 1.2, 12)).toBeLessThan(STANDING);
  });

  it('finds the nearest mode and whether it stands', () => {
    expect(nearestMode('co-dinh', 15, 1.2, 12)).toEqual({ n: 3, frequency: 15, standing: true });
    expect(nearestMode('co-dinh', 16.5, 1.2, 12)).toMatchObject({ n: 3, standing: false });
    expect(nearestMode('tu-do', 7.5, 1.2, 12)).toEqual({ n: 2, frequency: 7.5, standing: true });
    expect(nearestMode('co-dinh', 1, 1.2, 12).n).toBe(1);
  });

  it('places nodes where the envelope vanishes and antinodes where it is largest', () => {
    const misses = [];
    for (const end of /** @type {const} */ (['co-dinh', 'tu-do'])) {
      for (const n of [1, 2, 3, 5]) {
        const f = modeFrequency(end, n, 1.2, 12);
        const { nodes, antinodes, lambda } = markPositions(end, n, 1.2);
        if (Math.abs(lambda - 12 / f) > 1e-9) misses.push({ end, n, lambda });
        for (const x of nodes) {
          if (Math.abs(profile(end, f, 1.2, 12, x)) > 1e-6) misses.push({ end, n, node: x });
        }
        for (const x of antinodes) {
          if (Math.abs(Math.abs(profile(end, f, 1.2, 12, x)) - 1) > 1e-6) {
            misses.push({ end, n, antinode: x });
          }
        }
        if (nodes.length !== pattern(end, n).nodes) misses.push({ end, n, count: nodes.length });
      }
    }
    expect(misses).toEqual([]);
    expect(markPositions('co-dinh', 3, 1.2).nodes).toEqual([0, 0.4, 0.8, 1.2]);
    expect(markPositions('tu-do', 2, 1.2).antinodes).toEqual([0.4, 1.2]);
  });
});
