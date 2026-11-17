import { describe, expect, it } from 'vitest';
import { angleToField, fieldFrom, forceSize, forceVector, forceWords } from './engine.js';

describe('force on a current in a magnetic field', () => {
  it('is BIL when the wire is perpendicular to B and zero when parallel', () => {
    expect(forceSize(0.5, 4, 0.2, 90)).toBeCloseTo(0.4, 12);
    expect(forceSize(0.5, 4, 0.2, 0)).toBe(0);
    expect(forceSize(0.5, 4, 0.2, 180)).toBe(0);
    expect(forceSize(0.5, 4, 0.2, 30)).toBeCloseTo(0.2, 12);
  });

  it('measures α between the current and B', () => {
    expect(angleToField(0, 'phai')).toBe(0);
    expect(angleToField(180, 'phai')).toBe(180);
    expect(angleToField(60, 'trai')).toBe(120);
    expect(angleToField(37, 'vao')).toBe(90);
  });

  it('points the way the left-hand rule says', () => {
    // Current to the right, B out of the page: force down.
    expect(forceVector(1, 1, 1, 0, 'ra')).toEqual({ x: 0, y: -1, z: 0 });
    // Current up, B to the right: force into the page.
    expect(forceVector(1, 1, 1, 90, 'phai')).toEqual({ x: 0, y: 0, z: -1 });
    // Reversing the current reverses the force.
    expect(forceVector(1, 1, 1, 270, 'phai')).toEqual({ x: 0, y: 0, z: 1 });
  });

  it('agrees in size with BIL sin α for every direction', () => {
    const bad = [];
    for (const way of /** @type {const} */ (['phai', 'trai', 'ra', 'vao'])) {
      for (let t = 0; t < 360; t += 15) {
        const f = forceVector(0.3, 2, 0.5, t, way);
        const size = Math.hypot(f.x, f.y, f.z);
        if (Math.abs(size - forceSize(0.3, 2, 0.5, angleToField(t, way))) > 1e-9)
          bad.push([way, t]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('finds B back from a measured force', () => {
    expect(fieldFrom(0.06, 5, 0.12, 90)).toBeCloseTo(0.1, 9);
  });

  it('describes force directions', () => {
    expect(forceWords({ x: 0, y: 0, z: -1 })).toBe('hướng vào mặt phẳng hình vẽ');
    expect(forceWords({ x: 0, y: -1, z: 0 })).toBe('nằm trong mặt phẳng hình vẽ, xuống dưới');
    expect(forceWords({ x: 0, y: 0, z: 0 })).toBe('không có lực');
  });
});
