import { describe as group, expect, it } from 'vitest';
import {
  X_MAX,
  curvePoints,
  describe,
  fieldAtRadii,
  heightKm,
  surfaceField,
  weakerBy,
} from './engine.js';

group('field strength against distance', () => {
  it('starts at the book’s surface values', () => {
    expect(surfaceField('earth')).toBeCloseTo(9.785, 3);
    expect(surfaceField('moon')).toBeCloseTo(1.59, 2);
    expect(surfaceField('mars')).toBeCloseTo(3.71, 2);
  });

  it('falls as the inverse square of the distance to the centre', () => {
    const g0 = surfaceField('earth');
    const bad = [2, 3, 4, 5.5, 8].filter(
      (x) => Math.abs(fieldAtRadii('earth', x) - g0 / (x * x)) > 1e-12,
    );
    expect(bad).toEqual([]);
    expect(weakerBy(3)).toBe(9);
    expect(heightKm('earth', 2)).toBe(6400);
    expect(heightKm('moon', 1)).toBe(0);
  });

  it('samples the curve from the surface out', () => {
    const pts = curvePoints('mars', 10);
    expect(pts).toHaveLength(11);
    expect(pts[0].x).toBe(1);
    expect(pts.at(-1)?.x).toBe(X_MAX);
    expect(pts[0].y).toBeCloseTo(surfaceField('mars'), 12);
  });

  it('writes the readout', () => {
    expect(describe('earth', 1)).toContain('g_0 \\approx 9{,}79');
    const two = describe('earth', 2);
    expect(two).toContain('6\\,400');
    expect(two).toContain('2{,}45');
    expect(two).toContain('\\dfrac{g_0}{4}');
    expect(describe('earth', 1.5)).toContain('2{,}25');
  });
});
