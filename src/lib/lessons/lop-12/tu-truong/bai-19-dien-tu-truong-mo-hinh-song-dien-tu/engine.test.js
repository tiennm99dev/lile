import { describe, expect, it } from 'vitest';
import { cross3 } from '#lib/geom-engine/solid.js';
import { B_AXIS, E_AXIS, TRAVEL, fieldsAt, samples, vortexTurn, wavelengthOf } from './engine.js';

describe('electromagnetic wave', () => {
  it('has E, B and the travel direction as a right-handed set', () => {
    const c = cross3(E_AXIS, B_AXIS);
    // Adding 0 turns a −0 component into 0.
    expect({ x: c.x + 0, y: c.y + 0, z: c.z + 0 }).toEqual(TRAVEL);
  });

  it('turns frequency into wavelength with λ = c/f', () => {
    expect(wavelengthOf(100e6)).toBe(3);
    expect(wavelengthOf(300e6)).toBe(1);
  });

  it('keeps E and B in phase and repeats every wavelength and period', () => {
    const bad = [];
    for (const x of [0, 0.3, 0.75, 1.2, 2.9]) {
      for (const t of [0, 0.1, 0.25, 0.6]) {
        const a = fieldsAt(x, t, 1.5);
        const later = fieldsAt(x + 1.5, t + 1, 1.5);
        if (a.e !== a.b || Math.abs(a.e - later.e) > 1e-9) bad.push([x, t]);
      }
    }
    expect(bad).toEqual([]);
    expect(fieldsAt(0, 0, 2).e).toBe(1);
    expect(fieldsAt(0.5, 0, 2).e).toBe(0);
    expect(fieldsAt(1, 0, 2).e).toBe(-1);
  });

  it('moves a crest forward along +x as time goes on', () => {
    // At t = T/4 the crest that was at x = 0 sits at x = λ/4.
    expect(fieldsAt(0.5, 0.25, 2).e).toBe(1);
  });

  it('samples the wave from 0 to the given length', () => {
    const s = samples(6, 0, 3, 60);
    expect(s).toHaveLength(61);
    expect(s[0].x).toBe(0);
    expect(s[60].x).toBe(6);
    expect(s[30].e).toBe(1);
  });
});

describe('vortex electric field', () => {
  it('turns like the induced current and vanishes for a steady field', () => {
    expect(vortexTurn('ra', 'tang')).toBe('cw');
    expect(vortexTurn('ra', 'giam')).toBe('ccw');
    expect(vortexTurn('vao', 'tang')).toBe('ccw');
    expect(vortexTurn('vao', 'giam')).toBe('cw');
    expect(vortexTurn('ra', 'khong')).toBeNull();
  });
});
