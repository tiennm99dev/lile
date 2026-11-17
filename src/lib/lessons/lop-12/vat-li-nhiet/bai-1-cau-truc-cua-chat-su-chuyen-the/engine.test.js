import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  BOX,
  COUNT,
  MAX_ENERGY,
  SPACING,
  freshSample,
  liquidTop,
  nearestGap,
  roleOf,
  sampleAt,
  screenSpeed,
  siteOf,
  step,
} from './engine.js';

describe('the sample as heat comes in', () => {
  it('warms the ice, then melts it at 0 °C', () => {
    expect(sampleAt(0)).toMatchObject({ temperature: -30, state: 'ran', solid: COUNT });
    expect(sampleAt(15)).toMatchObject({ temperature: 0, state: 'ran' });
    const half = sampleAt(15 + 40);
    expect(half).toMatchObject({ temperature: 0, state: 'nong-chay', solid: COUNT / 2 });
  });

  it('keeps 100 °C while boiling and ends as steam', () => {
    const boiling = sampleAt(15 + 80 + 100 + 270);
    expect(boiling).toMatchObject({ temperature: 100, state: 'soi', gas: COUNT / 2 });
    expect(sampleAt(MAX_ENERGY)).toMatchObject({ temperature: 150, state: 'khi', gas: COUNT });
    expect(MAX_ENERGY).toBe(15 + 80 + 100 + 540 + 25);
  });

  it('gives roles from the bottom of the lattice up', () => {
    expect(roleOf(0, 10, 5)).toBe('ran');
    expect(roleOf(10, 10, 5)).toBe('long');
    expect(roleOf(COUNT - 1, 10, 5)).toBe('khi');
    expect(siteOf(0).y).toBeGreaterThan(siteOf(COUNT - 1).y);
  });

  it('moves faster when hotter', () => {
    expect(screenSpeed(100)).toBeGreaterThan(screenSpeed(0));
  });
});

describe('molecule motion', () => {
  const rand = rng(1);

  /** @param {number} energy @param {number} seconds */
  function run(energy, seconds) {
    let m = freshSample(rand);
    const sample = sampleAt(energy);
    for (let t = 0; t < seconds; t += 0.05) m = step(m, 0.05, sample, t, rand);
    return { m, sample };
  }

  it('keeps solid molecules next to their sites', () => {
    const { m } = run(5, 2);
    const far = m.filter((p, i) => Math.hypot(p.x - siteOf(i).x, p.y - siteOf(i).y) > 4);
    expect(far).toEqual([]);
  });

  it('spreads a liquid over the floor and keeps it packed', () => {
    const { m } = run(150, 6);
    const top = liquidTop(COUNT);
    const out = m.filter((p) => p.y < top - SPACING || p.x < BOX.x0 || p.x > BOX.x1);
    expect(out).toEqual([]);
    const gap = nearestGap(m);
    expect(gap).toBeGreaterThan(0.9);
    expect(gap).toBeLessThan(1.3);
  });

  it('lets a gas fill the box with molecules far apart', () => {
    const { m } = run(MAX_ENERGY, 6);
    const out = m.filter((p) => p.x < BOX.x0 || p.x > BOX.x1 || p.y < BOX.y0 || p.y > BOX.y1);
    expect(out).toEqual([]);
    // The gas reaches the top of the box, far above where the liquid lay.
    expect(Math.min(...m.map((p) => p.y))).toBeLessThan(BOX.y0 + 40);
    expect(nearestGap(m)).toBeGreaterThan(1.1);
  });
});
