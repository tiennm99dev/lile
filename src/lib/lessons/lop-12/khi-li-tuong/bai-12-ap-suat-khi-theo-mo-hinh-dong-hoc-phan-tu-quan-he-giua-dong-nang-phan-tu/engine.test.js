import { describe, expect, it } from 'vitest';
import { K_B } from '../_shared/gas.js';
import {
  DENSITY,
  histogram,
  massOf,
  maxwell,
  meanEnergy,
  meanSquare,
  pressureOf,
  speedsOf,
  unitSample,
} from './engine.js';

describe('kinetic theory of the vessel', () => {
  it('gives nitrogen at 300 K a root mean square speed near 517 m/s', () => {
    expect(Math.sqrt(meanSquare(300, 28))).toBeCloseTo(517, -1);
  });

  it('gives every gas the same mean kinetic energy at one temperature', () => {
    const e = [4, 28, 44].map((M) => (massOf(M) * meanSquare(400, M)) / 2);
    const off = e.filter((x) => Math.abs(x / meanEnergy(400) - 1) > 1e-9);
    expect(off).toEqual([]);
    expect(meanEnergy(300)).toBeCloseTo(6.21e-21, 23);
  });

  it('matches p = μkT and about one atmosphere at 300 K', () => {
    const p = pressureOf(DENSITY, massOf(32), meanSquare(300, 32));
    expect(p / (DENSITY * K_B * 300)).toBeCloseTo(1, 9);
    expect(p).toBeCloseTo(1.035e5, -3);
  });

  it('draws a sample whose mean square speed is close to 3kT/m', () => {
    const speeds = speedsOf(unitSample(4), 300, 28);
    const ms = speeds.reduce((s, v) => s + v * v, 0) / speeds.length;
    expect(ms / meanSquare(300, 28)).toBeGreaterThan(0.9);
    expect(ms / meanSquare(300, 28)).toBeLessThan(1.1);
  });

  it('has a speed density that integrates to one', () => {
    let sum = 0;
    for (let v = 0; v < 5000; v += 5) sum += maxwell(v + 2.5, 300, 28) * 5;
    expect(sum).toBeCloseTo(1, 3);
  });

  it('turns a histogram into shares that add up to 100 %', () => {
    const speeds = speedsOf(unitSample(4), 300, 28);
    const steps = histogram(speeds, 4000);
    let total = 0;
    for (let i = 0; i < steps.length; i += 2) total += (steps[i].y * 200) / 100;
    expect(total).toBeCloseTo(100, 0);
  });
});
