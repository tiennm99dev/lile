import { describe, expect, it } from 'vitest';
import { trace, xOf, yOf } from './scope.js';

const S = { left: 10, width: 200, mid: 50, half: 40, tMax: 2, yMax: 1 };

describe('oscilloscope strip', () => {
  it('maps time and value onto the strip', () => {
    expect(xOf(S, 0)).toBe(10);
    expect(xOf(S, 2)).toBe(210);
    expect(yOf(S, 0)).toBe(50);
    expect(yOf(S, 1)).toBe(10);
    expect(yOf(S, -1)).toBe(90);
  });

  it('traces n + 1 points from the start to the end of the window', () => {
    const pts = trace(S, (t) => t / 2, 4).split(' ');
    expect(pts).toHaveLength(5);
    expect(pts[0]).toBe('10.0,50.0');
    expect(pts[4]).toBe('210.0,10.0');
  });
});
