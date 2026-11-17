import { describe, expect, it } from 'vitest';
import { PERIOD, angleAt, lenzOutcome, readingAt } from './engine.js';

describe('the turning coil', () => {
  it('turns once per period', () => {
    expect(angleAt(0)).toBe(0);
    expect(angleAt(0.5)).toBe(90);
    expect(angleAt(PERIOD)).toBe(0);
  });

  it('has the largest flux and no emf when the coil faces the field', () => {
    expect(readingAt(0).flux).toBeCloseTo(2, 9);
    expect(readingAt(0).emf).toBeCloseTo(0, 9);
    expect(readingAt(0.5).flux).toBeCloseTo(0, 9);
    expect(readingAt(0.5).emf).toBeCloseTo(2 * Math.PI, 9);
  });
});

describe("Lenz's law with a bar magnet", () => {
  it('repels an approaching pole and holds back a retreating one', () => {
    expect(lenzOutcome('N', 'gan')).toMatchObject({ face: 'N', force: 'đẩy', grows: true });
    expect(lenzOutcome('N', 'xa')).toMatchObject({ face: 'S', force: 'hút', grows: false });
    expect(lenzOutcome('S', 'gan').face).toBe('S');
    expect(lenzOutcome('S', 'xa').face).toBe('N');
  });

  it('turns the current counterclockwise, seen from the magnet, for a north face', () => {
    expect(lenzOutcome('N', 'gan').turn).toBe('ngược chiều kim đồng hồ');
    expect(lenzOutcome('S', 'gan').turn).toBe('cùng chiều kim đồng hồ');
  });
});
