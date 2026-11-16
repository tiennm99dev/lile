import { describe, expect, it } from 'vitest';
import {
  BODIES,
  EARTH_MOON,
  escapeSpeed,
  fieldStrength,
  gravityForce,
  orbitSpeed,
  potential,
  potentialEnergy,
  sciParts,
  sciTex,
  sciText,
} from './gravity.js';

const { earth, moon, mars } = BODIES;

describe('gravitation with the book’s constants', () => {
  it('gives the force between two masses', () => {
    // Two 3 kg balls whose centres are 80 cm apart.
    expect(gravityForce(3, 3, 0.8)).toBeCloseTo(9.39375e-10, 18);
    expect(gravityForce(earth.mass, moon.mass, EARTH_MOON) / 1e20).toBeCloseTo(1.957, 3);
    expect(gravityForce(1, 1, 0)).toBe(Infinity);
  });

  it('gives the field strength at and above the surface', () => {
    expect(fieldStrength(earth.mass, earth.radius)).toBeCloseTo(9.785, 3);
    expect(fieldStrength(earth.mass, earth.radius + 3100)).toBeCloseTo(9.776, 3);
    expect(fieldStrength(earth.mass, earth.radius + 8800)).toBeCloseTo(9.758, 3);
    expect(fieldStrength(earth.mass, 2 * earth.radius)).toBeCloseTo(9.785 / 4, 3);
    expect(fieldStrength(moon.mass, moon.radius)).toBeCloseTo(1.59, 2);
    expect(fieldStrength(mars.mass, mars.radius)).toBeCloseTo(3.71, 2);
  });

  it('gives the potential and the potential energy', () => {
    expect(potential(earth.mass, earth.radius)).toBeCloseTo(-6.2625e7, 0);
    expect(potentialEnergy(earth.mass, 2, earth.radius)).toBeCloseTo(-1.2525e8, 0);
    expect(potential(earth.mass, 0)).toBe(-Infinity);
  });

  it('gives the cosmic speeds', () => {
    expect(orbitSpeed(earth.mass, earth.radius)).toBeCloseTo(7913.6, 1);
    expect(escapeSpeed(earth.mass, earth.radius)).toBeCloseTo(11191.5, 1);
    expect(orbitSpeed(moon.mass, moon.radius)).toBeCloseTo(1663.5, 1);
    expect(orbitSpeed(mars.mass, mars.radius)).toBeCloseTo(3548.1, 1);
  });
});

describe('powers of ten', () => {
  it('writes text and TeX the book way', () => {
    expect(sciText(6.68e-11)).toBe('6,68·10⁻¹¹');
    expect(sciText(1.957e20)).toBe('1,96·10²⁰');
    expect(sciText(9.785)).toBe('9,79');
    expect(sciTex(-6.2625e7)).toBe('-6{,}26 \\cdot 10^{7}');
    expect(sciTex(0.0027)).toBe('2{,}7 \\cdot 10^{-3}');
    expect(sciTex(0.027)).toBe('0{,}027');
    expect(sciParts(9.996e5)).toEqual({ mantissa: 1, exponent: 6 });
    expect(sciParts(0)).toEqual({ mantissa: 0, exponent: 0 });
  });
});
