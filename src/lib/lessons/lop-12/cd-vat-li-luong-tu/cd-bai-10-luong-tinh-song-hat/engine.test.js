import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  HALF_SCREEN,
  deBroglie,
  electronLambda,
  fringe,
  histogram,
  intensity,
  landing,
} from './engine.js';

describe('de Broglie wavelength', () => {
  it('gives the book values', () => {
    expect(deBroglie(9.1e-31, 25000) / 1e-8).toBeCloseTo(2.912, 3);
    expect(deBroglie(50, 20) / 1e-37).toBeCloseTo(6.625, 9);
  });

  it('gives about 0,123 nm for an electron through 100 V, halving at 4 times U', () => {
    expect(electronLambda(100) / 1e-10).toBeCloseTo(1.2277, 3);
    expect(electronLambda(400) * 2).toBeCloseTo(electronLambda(100), 20);
  });
});

describe('two-slit pattern', () => {
  const lambda = electronLambda(100);

  it('has bright fringes every i = λD/a and dark ones half way', () => {
    const i = fringe(lambda);
    expect(intensity(0, lambda, true)).toBe(1);
    expect(intensity(i / 2, lambda, true)).toBeCloseTo(0, 12);
    expect(intensity(i, lambda, true)).toBeGreaterThan(0.8);
    expect(intensity(i / 2, lambda, false)).toBeGreaterThan(0.8);
  });

  it('builds the pattern from random single hits', () => {
    const rand = rng(11);
    const hits = Array.from({ length: 3000 }, () => landing(rand, lambda, true));
    expect(hits.every((x) => Math.abs(x) <= HALF_SCREEN)).toBe(true);
    const i = fringe(lambda);
    const near = (/** @type {number} */ c) => hits.filter((x) => Math.abs(x - c) < i / 10).length;
    expect(near(0)).toBeGreaterThan(10 * Math.max(1, near(i / 2)));
    const counts = histogram(hits, 40);
    expect(counts.reduce((s, n) => s + n, 0)).toBe(3000);
  });
});
