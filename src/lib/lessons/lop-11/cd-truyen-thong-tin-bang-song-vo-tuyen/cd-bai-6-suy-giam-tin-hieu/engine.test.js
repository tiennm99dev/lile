import { describe, expect, it } from 'vitest';
import {
  CABLES,
  GAIN,
  NOISE_LEVEL,
  dbOf,
  fewestAmps,
  levelAt,
  levelProfile,
  powerAfter,
  ratioOf,
} from './engine.js';

describe('decibels', () => {
  it('converts power ratios to decibels and back', () => {
    expect(dbOf(10)).toBeCloseTo(10, 12);
    expect(dbOf(100)).toBeCloseTo(20, 12);
    expect(dbOf(0.5)).toBeCloseTo(-3.0103, 4);
    expect(ratioOf(-30)).toBeCloseTo(0.001, 12);
  });

  it('gives the output of the book example: 2 mW through 5 km at 0.3 dB/km', () => {
    expect(powerAfter(2, -0.3 * 5)).toBeCloseTo(1.416, 3);
  });
});

describe('level along a cable', () => {
  it('falls by α·L without amplifiers', () => {
    const p = levelProfile(0.3, 100, []);
    expect(p.output).toBeCloseTo(-30, 9);
    expect(p.clear).toBe(true);
    expect(levelProfile(0.3, 105, []).clear).toBe(false);
  });

  it('jumps by the gain at each amplifier and records the level before it', () => {
    const p = levelProfile(1, 100, [70, 30, 50, 90]);
    expect(p.before).toEqual([-30, -30, -30, -30]);
    expect(p.output).toBe(-20);
    expect(p.clear).toBe(true);
    expect(p.points).toHaveLength(10);
    expect(p.points[2]).toEqual({ x: 30, db: -30 + GAIN });
  });

  it('reads the level at any point of the cable', () => {
    expect(levelAt(1, [30], 20)).toBe(-20);
    expect(levelAt(1, [30], 30)).toBe(-10);
    expect(levelAt(0.3, [], 50)).toBeCloseTo(-15, 9);
  });

  it('fails when an amplifier comes after the signal has sunk into the noise', () => {
    const p = levelProfile(1, 100, [40, 60, 80, 95]);
    expect(p.lowest).toBe(-40);
    expect(p.clear).toBe(false);
  });

  it('counts the fewest amplifiers needed', () => {
    expect(fewestAmps(0.3, 100)).toBe(0);
    expect(fewestAmps(1, 100)).toBe(4);
    expect(fewestAmps(1, 50)).toBe(1);
    const bad = CABLES.filter((c) => !(c.alpha > 0));
    expect(bad).toEqual([]);
    expect(NOISE_LEVEL).toBeLessThan(0);
  });
});
