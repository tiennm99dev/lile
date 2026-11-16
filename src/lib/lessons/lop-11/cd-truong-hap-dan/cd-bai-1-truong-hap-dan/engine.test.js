import { describe, expect, it } from 'vitest';
import {
  arrowPx,
  directionWords,
  fieldAtPoint,
  fieldLines,
  forceOnTest,
  linesFor,
  midArrow,
  nearBalance,
} from './engine.js';

const BOUNDS = { xMin: -6, xMax: 6, yMin: -4, yMax: 4 };

describe('field of heavy balls', () => {
  it('points toward a single ball and follows the inverse square law', () => {
    const ball = [{ x: 0, y: 0, tonnes: 1 }];
    const near = fieldAtPoint(ball, { x: 2, y: 0 });
    // g = GM/r² = 6,68·10⁻¹¹ · 1000 / 4.
    expect(near.size).toBeCloseTo(1.67e-8, 18);
    expect(near.total.x).toBeLessThan(0);
    const far = fieldAtPoint(ball, { x: 4, y: 0 });
    expect(near.size / far.size).toBeCloseTo(4, 9);
  });

  it('gives a force proportional to the test mass', () => {
    const ball = [{ x: 0, y: 0, tonnes: 2 }];
    const f1 = forceOnTest(ball, { x: 0, y: 1 }, 1);
    const f5 = forceOnTest(ball, { x: 0, y: 1 }, 5);
    expect(f5.size / f1.size).toBeCloseTo(5, 9);
    expect(f1.y).toBeLessThan(0);
  });

  it('cancels midway between two equal balls', () => {
    const pair = [
      { x: -2, y: 0, tonnes: 1 },
      { x: 2, y: 0, tonnes: 1 },
    ];
    expect(fieldAtPoint(pair, { x: 0, y: 0 }).size).toBeCloseTo(0, 18);
    expect(nearBalance(pair, { x: 0, y: 0 })).toBe(true);
    expect(nearBalance(pair, { x: -1, y: 0 })).toBe(false);
    expect(nearBalance([pair[0]], { x: 0, y: 0 })).toBe(false);
  });

  it('draws more lines into a heavier ball, each leaving the ball', () => {
    expect(linesFor(3)).toBe(3 * linesFor(1));
    const lines = fieldLines([{ x: 0, y: 0, tonnes: 2 }], BOUNDS);
    expect(lines).toHaveLength(linesFor(2));
    const bad = lines.filter((l) => {
      const first = Math.hypot(l[0].x, l[0].y);
      const last = Math.hypot(l.at(-1)?.x ?? 0, l.at(-1)?.y ?? 0);
      return !(last > 3.5 && last > first);
    });
    expect(bad).toEqual([]);
    const arrow = midArrow(lines[0]);
    expect(arrow).not.toBeNull();
    // The arrow points back toward the ball at the origin.
    const toward = arrow ? arrow.at.x * arrow.dir.x + arrow.at.y * arrow.dir.y : 0;
    expect(toward).toBeLessThan(0);
  });

  it('sizes arrows and names directions', () => {
    expect(arrowPx(0, 1, 60)).toBe(0);
    expect(arrowPx(1000, 1, 60)).toBe(60);
    expect(arrowPx(1, 1, 60)).toBeGreaterThan(0);
    expect(directionWords({ x: -1, y: 0 })).toBe('sang trái');
    expect(directionWords({ x: 0, y: -2 })).toBe('xuống dưới');
    expect(directionWords({ x: 1, y: 1 })).toBe('chếch lên bên phải');
  });
});
