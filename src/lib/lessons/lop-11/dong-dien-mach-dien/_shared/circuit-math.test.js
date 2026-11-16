import { describe, expect, it } from 'vitest';
import { circuitCurrent, fitLine, terminalVoltage } from './circuit-math.js';

describe('whole-circuit Ohm law', () => {
  it('gives I = E/(R + r) and U = E − Ir', () => {
    expect(circuitCurrent(12, 1, 5)).toBe(2);
    expect(terminalVoltage(12, 1, 2)).toBe(10);
    expect(circuitCurrent(1.5, 0.5, 0)).toBe(3);
    expect(circuitCurrent(1.5, 0, 0)).toBe(Infinity);
  });
});

describe('fitted line', () => {
  it('recovers an exact line and needs two distinct x', () => {
    const pts = [0.02, 0.04, 0.06].map((x) => ({ x, y: 1.5 - 2 * x }));
    const fit = fitLine(pts);
    expect(fit?.intercept).toBeCloseTo(1.5, 10);
    expect(fit?.slope).toBeCloseTo(-2, 10);
    expect(fitLine([{ x: 1, y: 1 }])).toBeNull();
    expect(
      fitLine([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ]),
    ).toBeNull();
  });

  it('averages scattered points', () => {
    const fit = fitLine([
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 4 },
    ]);
    expect(fit?.slope).toBeCloseTo(1.5, 10);
    expect(fit?.intercept).toBeCloseTo(7 / 6, 10);
  });
});
