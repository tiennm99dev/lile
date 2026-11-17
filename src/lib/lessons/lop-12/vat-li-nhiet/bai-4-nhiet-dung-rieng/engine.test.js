import { describe, expect, it } from 'vitest';
import {
  MAX_T,
  SAMPLES,
  SUSPECTS,
  START_T,
  linePoints,
  measuredC,
  nearest,
  temperatureAt,
  timeToMax,
} from './engine.js';

describe('heating with the same power', () => {
  it('follows Q = m c Δt', () => {
    // 0,5 kg of water, 500 W, 120 s: Δt = 60 000 / (0,5 · 4 200) ≈ 28,57 °C.
    expect(temperatureAt(4200, 0.5, 500, 120)).toBeCloseTo(START_T + 60000 / 2100, 9);
    expect(temperatureAt(4200, 0.5, 500, 1e6)).toBe(MAX_T);
  });

  it('warms water slowest and aluminium fastest', () => {
    const after = SAMPLES.map((s) => temperatureAt(s.c, 0.5, 500, 60));
    expect(after[0]).toBeLessThan(after[1]);
    expect(after[1]).toBeLessThan(after[2]);
  });

  it('bends the line where the heater switches off', () => {
    const knee = timeToMax(880, 0.5, 500);
    expect(knee).toBeCloseTo(66, 9);
    expect(linePoints(880, 0.5, 500, 300)).toEqual([
      { x: 0, y: START_T },
      { x: knee, y: MAX_T },
      { x: 300, y: MAX_T },
    ]);
    expect(linePoints(4200, 0.5, 500, 100)).toHaveLength(2);
  });
});

describe('measuring c', () => {
  it('gets back each substance from a reading', () => {
    const wrong = [...SAMPLES, ...SUSPECTS].filter((s) => {
      const time = timeToMax(s.c, 0.5, 400) * 0.8;
      const c = measuredC(0.5, 400, time, temperatureAt(s.c, 0.5, 400, time));
      return c === null || nearest(c, [...SAMPLES, ...SUSPECTS]).id !== s.id;
    });
    expect(wrong).toEqual([]);
  });

  it('refuses a reading too small or past the cut-off', () => {
    expect(measuredC(0.5, 500, 1, 25.2)).toBeNull();
    expect(measuredC(0.5, 500, 500, MAX_T)).toBeNull();
  });
});
