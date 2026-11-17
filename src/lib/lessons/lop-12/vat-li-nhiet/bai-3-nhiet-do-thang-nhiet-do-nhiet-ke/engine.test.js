import { describe, expect, it } from 'vitest';
import { TARGETS, equilibrium, flowText, temperaturesAt, toCelsius, toKelvin } from './engine.js';

describe('Celsius and Kelvin', () => {
  it('converts both ways with the offset 273', () => {
    expect(toKelvin(27)).toBe(300);
    expect(toKelvin(-273)).toBe(0);
    expect(toCelsius(373)).toBe(100);
    expect(toCelsius(0)).toBe(-273);
  });

  it('asks only for readings the thermometer can show', () => {
    const out = TARGETS.filter((T) => toCelsius(T) < -30 || toCelsius(T) > 110);
    expect(out).toEqual([]);
  });
});

describe('thermal contact', () => {
  const hot = { name: 'khối A', celsius: 80, capacity: 1 };
  const cold = { name: 'khối B', celsius: 20, capacity: 2 };

  it('settles at the capacity-weighted mean', () => {
    expect(equilibrium(hot, cold)).toBe(40);
    const [a, b] = temperaturesAt(hot, cold, 1000, 10);
    expect(a).toBeCloseTo(40, 6);
    expect(b).toBeCloseTo(40, 6);
  });

  it('keeps the heat balance on the way', () => {
    const [a, b] = temperaturesAt(hot, cold, 5, 10);
    expect(hot.capacity * (a - hot.celsius) + cold.capacity * (b - cold.celsius)).toBeCloseTo(0, 6);
    expect(a).toBeGreaterThan(b);
  });

  it('says which way heat goes', () => {
    expect(flowText(hot, cold, 60, 30)).toContain('từ khối A');
    expect(flowText(hot, cold, 30, 60)).toContain('từ khối B');
    expect(flowText(hot, cold, 40, 40)).toContain('cân bằng nhiệt');
  });
});
