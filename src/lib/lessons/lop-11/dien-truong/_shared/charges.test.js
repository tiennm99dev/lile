import { describe, expect, it } from 'vitest';
import {
  arrowPx,
  coulomb,
  fieldAt,
  forceOn,
  pointField,
  potentialAt,
  sciParts,
  sciTex,
  sciText,
} from './charges.js';

describe('point charges', () => {
  it('follows Coulomb’s law with the book’s k', () => {
    // q1 = 10⁻⁵ C, q2 = 10⁻⁷ C, r = 10 cm: F = 0,9 N.
    expect(coulomb(1e-5, 1e-7, 0.1)).toBeCloseTo(0.9, 12);
    expect(coulomb(-2e-6, 3e-6, 0.3)).toBeCloseTo(0.6, 12);
    expect(coulomb(2e-6, 3e-6, 0.3, 2)).toBeCloseTo(0.3, 12);
    expect(coulomb(1, 1, 0)).toBe(Infinity);
  });

  it('gives the field of a point charge and of several charges', () => {
    expect(pointField(4e-9, 0.2)).toBeCloseTo(900, 9);
    const e = fieldAt([{ x: 0, y: 0, q: 4e-9 }], { x: 0, y: 0.2 });
    expect(e.x).toBeCloseTo(0, 9);
    expect(e.y).toBeCloseTo(900, 9);
    // Equal charges: the fields cancel at the midpoint.
    const pair = [
      { x: -0.1, y: 0, q: 1e-9 },
      { x: 0.1, y: 0, q: 1e-9 },
    ];
    expect(Math.hypot(fieldAt(pair, { x: 0, y: 0 }).x, fieldAt(pair, { x: 0, y: 0 }).y)).toBe(0);
  });

  it('adds the forces on one charge', () => {
    // q0 = 1 µC midway between +2 µC and −2 µC 20 cm apart: both forces point to the − charge.
    const set = [
      { x: -0.1, y: 0, q: 2e-6 },
      { x: 0.1, y: 0, q: -2e-6 },
      { x: 0, y: 0, q: 1e-6 },
    ];
    const f = forceOn(set, 2);
    expect(f.x).toBeCloseTo(3.6, 9);
    expect(f.y).toBeCloseTo(0, 9);
  });

  it('adds potentials as numbers', () => {
    expect(potentialAt([{ x: 0, y: 0, q: 1e-9 }], { x: 0.09, y: 0 })).toBeCloseTo(100, 9);
    const dipole = [
      { x: -0.1, y: 0, q: 1e-9 },
      { x: 0.1, y: 0, q: -1e-9 },
    ];
    expect(potentialAt(dipole, { x: 0, y: 0.3 })).toBeCloseTo(0, 9);
    expect(potentialAt(dipole, { x: -0.1, y: 0 })).toBe(Infinity);
  });
});

describe('powers of ten', () => {
  it('writes text and TeX the book way', () => {
    expect(sciParts(9.999e5)).toEqual({ mantissa: 1, exponent: 6 });
    expect(sciText(3.6e-3)).toBe('3,6·10⁻³');
    expect(sciText(-1.6e-19)).toBe('−1,6·10⁻¹⁹');
    expect(sciText(1e-12)).toBe('10⁻¹²');
    expect(sciText(0.9)).toBe('0,9');
    expect(sciTex(9e9)).toBe('9 \\cdot 10^{9}');
    expect(sciTex(-1e-6)).toBe('-10^{-6}');
    expect(sciTex(4500)).toBe('4\\,500');
  });

  it('draws longer arrows for bigger values but never past the limit', () => {
    expect(arrowPx(0, 1, 50)).toBe(0);
    expect(arrowPx(1, 1, 50)).toBeLessThan(arrowPx(10, 1, 50));
    expect(arrowPx(1e9, 1, 50)).toBe(50);
  });
});
