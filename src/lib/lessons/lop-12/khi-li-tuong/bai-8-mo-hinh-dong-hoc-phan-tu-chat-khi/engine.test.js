import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { HEIGHT, WIDTH, energyOf, freshBox, rateOf, reheat, step, withCount } from './engine.js';

/** @param {import('./engine.js').Box} box @param {number} seconds */
function run(box, seconds) {
  let b = box;
  for (let t = 0; t < seconds; t += 0.1) b = step(b, 0.1);
  return b;
}

describe('the gas box', () => {
  it('keeps every body inside and conserves energy', () => {
    const start = freshBox(40, 300, rng(3));
    const end = run(start, 5);
    const out = end.molecules.filter((m) => m.x < 0 || m.x > WIDTH || m.y < 0 || m.y > HEIGHT);
    expect(out).toEqual([]);
    expect(energyOf(end) / energyOf(start)).toBeCloseTo(1, 6);
  });

  it('counts about twice the wall hits for twice the molecules', () => {
    const few = run(freshBox(30, 300, rng(5)), 6);
    const many = run(freshBox(60, 300, rng(5)), 6);
    const ratio = many.hits / few.hits;
    expect(ratio).toBeGreaterThan(1.6);
    expect(ratio).toBeLessThan(2.4);
  });

  it('hits the walls more often and harder when hotter', () => {
    const cold = run(freshBox(40, 300, rng(9)), 6);
    const hot = reheat(freshBox(40, 300, rng(9)), 300, 1200);
    const hotRun = run(hot, 6);
    expect(hotRun.hits / cold.hits).toBeCloseTo(2, 0);
    expect(hotRun.impulse / cold.impulse).toBeCloseTo(4, 0);
  });

  it('lets the molecules kick the Brown particle about', () => {
    const end = run(freshBox(60, 300, rng(11)), 8);
    const moved = Math.hypot(end.brown.x - WIDTH / 2, end.brown.y - HEIGHT / 2);
    expect(moved).toBeGreaterThan(1);
  });

  it('adds or removes molecules without touching the others', () => {
    const box = freshBox(20, 300, rng(1));
    expect(withCount(box, 30, 300, rng(2)).molecules.slice(0, 20)).toEqual(box.molecules);
    expect(withCount(box, 10, 300, rng(2)).molecules).toHaveLength(10);
  });

  it('measures a rate over the kept samples', () => {
    expect(
      rateOf([
        { t: 0, value: 10 },
        { t: 1, value: 30 },
        { t: 2, value: 50 },
      ]),
    ).toBe(20);
    expect(rateOf([])).toBe(0);
  });
});
