import { describe, expect, it } from 'vitest';
import { V1, V2, apogee, energyPerKg, motionPath, orbitOf, outcomeOf, pathOf } from './engine.js';

describe('cosmic speeds of the Earth', () => {
  it('match the book’s 7,9 km/s and 11,2 km/s', () => {
    expect(V1).toBeCloseTo(7.91, 2);
    expect(V2).toBeCloseTo(11.19, 2);
    expect(V2 / V1).toBeCloseTo(Math.SQRT2, 12);
  });

  it('give zero mechanical energy at the escape speed', () => {
    expect(energyPerKg(V2)).toBeCloseTo(0, 9);
    expect(energyPerKg(V2) < 0).toBe(false);
    expect(energyPerKg(0)).toBeCloseTo(-62.625, 9);
  });
});

describe('launches from the surface', () => {
  it('sorts the outcomes by speed and angle', () => {
    const cases = [
      { v: 7, a: 0, want: 'roi-ngay' },
      { v: 7.9, a: 0, want: 'roi-ngay' },
      { v: V1, a: 0, want: 'tron' },
      { v: 9, a: 0, want: 'elip' },
      { v: 11.1, a: 0, want: 'elip' },
      { v: V2, a: 0, want: 'thoat' },
      { v: 12, a: 30, want: 'thoat' },
      { v: 9, a: 10, want: 'roi' },
      { v: 5, a: 45, want: 'roi' },
    ];
    const bad = cases.filter((c) => outcomeOf(c.v, c.a) !== c.want);
    expect(bad).toEqual([]);
  });

  it('closes a circular orbit at one Earth radius', () => {
    const { points, landedAfter } = pathOf(V1, 0);
    expect(landedAfter).toBeNull();
    expect(points).toHaveLength(721);
    const off = points.filter((p) => Math.abs(Math.hypot(p.x, p.y) - 1) > 1e-9);
    expect(off).toEqual([]);
  });

  it('lands a lob at the ground, farther for a faster throw', () => {
    const slow = pathOf(4, 45);
    const fast = pathOf(6, 45);
    expect(slow.landedAfter).toBeGreaterThan(0);
    expect(fast.landedAfter ?? 0).toBeGreaterThan(slow.landedAfter ?? 0);
    const end = slow.points.at(-1) ?? { x: 0, y: 0 };
    expect(Math.hypot(end.x, end.y)).toBeCloseTo(1, 6);
    // The highest point lies above the ground.
    expect(apogee(4, 45)).toBeGreaterThan(1);
  });

  it('falls at once when thrown level below the first cosmic speed', () => {
    const { points, landedAfter } = pathOf(7, 0);
    expect(landedAfter).toBe(0);
    expect(points).toHaveLength(1);
  });

  it('leaves the picture on an escape', () => {
    const { points, landedAfter } = pathOf(12, 0);
    expect(landedAfter).toBeNull();
    const last = points.at(-1) ?? { x: 0, y: 0 };
    expect(Math.hypot(last.x, last.y)).toBeGreaterThan(5);
    expect(apogee(12, 0)).toBe(Infinity);
  });

  it('puts the perigee at the launch point for a level elliptic orbit', () => {
    const o = orbitOf(9, 0);
    expect(o.p / (1 + o.e)).toBeCloseTo(1, 12);
    expect(apogee(9, 0)).toBeGreaterThan(1.5);
  });
});

describe('drawing the launch', () => {
  it('reveals the path bit by bit in pixels', () => {
    const pts = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 2, y: -1 },
    ];
    const view = { cx: 100, cy: 100, scale: 10 };
    expect(motionPath(pts, 0, view)).toEqual({ points: '100.0,90.0', tip: { x: 100, y: 90 } });
    expect(motionPath(pts, 0.5, view).tip).toEqual({ x: 110, y: 90 });
    expect(motionPath(pts, 1, view).tip).toEqual({ x: 120, y: 110 });
  });
});
