import { describe, expect, it } from 'vitest';
import {
  GRIP_QUESTIONS,
  fieldAt,
  fieldLine,
  gripAnswer,
  linesOf,
  needleAngle,
  northEnd,
  pushOut,
  wayOf,
  wiresOf,
} from './engine.js';

describe('field of a straight wire', () => {
  it('turns counterclockwise round a current out of the page (right-hand grip rule)', () => {
    const out = wiresOf('day-thang', 1);
    // To the right of the wire the field points up, above it to the left.
    expect(needleAngle(out, { x: 2, y: 0 })).toBeCloseTo(90, 6);
    expect(Math.abs(needleAngle(out, { x: 0, y: 2 }))).toBeCloseTo(180, 6);
    // Into the page: clockwise, so down on the right.
    expect(needleAngle(wiresOf('day-thang', -1), { x: 2, y: 0 })).toBeCloseTo(-90, 6);
  });

  it('weakens as 1/r', () => {
    const w = wiresOf('day-thang', 1);
    const near = fieldAt(w, { x: 1, y: 0 });
    const far = fieldAt(w, { x: 2, y: 0 });
    expect(Math.hypot(near.x, near.y) / Math.hypot(far.x, far.y)).toBeCloseTo(2, 9);
  });

  it('has circular closed field lines', () => {
    const lines = linesOf('day-thang', 1);
    const bad = lines.filter(
      (l) =>
        !l.closed ||
        l.points.some((p) => Math.abs(Math.hypot(p.x, p.y) - Math.hypot(l.points[0].x, 0)) > 0.02),
    );
    expect(bad).toEqual([]);
  });
});

describe('field of a solenoid', () => {
  it('points along the axis inside, to the right for the positive current', () => {
    const w = wiresOf('ong-day', 1);
    expect(needleAngle(w, { x: 0, y: 0 })).toBeCloseTo(0, 6);
    expect(Math.abs(needleAngle(w, { x: 1, y: 0.4 }))).toBeLessThan(5);
    expect(Math.abs(needleAngle(wiresOf('ong-day', -1), { x: 0, y: 0 }))).toBeCloseTo(180, 6);
    expect(northEnd(1)).toBe('phải');
  });

  it('is nearly uniform in the middle of the coil', () => {
    const w = wiresOf('ong-day', 1);
    const a = fieldAt(w, { x: 0, y: 0 }).x;
    const b = fieldAt(w, { x: 0, y: 0.5 }).x;
    expect(Math.abs(a - b) / a).toBeLessThan(0.1);
  });

  it('points backwards outside the coil beside its middle', () => {
    const w = wiresOf('ong-day', 1);
    expect(Math.abs(needleAngle(w, { x: 0, y: 2.5 }))).toBeGreaterThan(150);
  });

  it('traces lines that leave the coil at its north end', () => {
    const w = wiresOf('ong-day', 1);
    const l = fieldLine(w, { x: 0, y: 0 });
    expect(l.points.length).toBeGreaterThan(50);
    const i = l.points.findIndex((p) => p.x > 3);
    expect(i).toBeGreaterThan(0);
  });
});

describe('helpers', () => {
  it('keeps the compass off the wires', () => {
    const w = wiresOf('day-thang', 1);
    const q = pushOut(w, { x: 0.1, y: 0 });
    expect(Math.hypot(q.x, q.y)).toBeCloseTo(0.45, 9);
  });

  it('names directions', () => {
    expect(wayOf(90)).toBe('lên trên');
    expect(wayOf(-180)).toBe('sang trái');
    expect(wayOf(-44)).toBe('chéo xuống bên phải');
  });
});

describe('grip-rule questions', () => {
  it('agree with the traced field of a wire', () => {
    const at = {
      phai: { x: 2, y: 0 },
      len: { x: 0, y: 2 },
      trai: { x: -2, y: 0 },
      xuong: { x: 0, y: -2 },
    };
    const deg = { phai: 0, len: 90, trai: 180, xuong: -90 };
    const bad = GRIP_QUESTIONS.filter((q) => q.kind === 'day').filter((q) => {
      if (q.kind !== 'day') return true;
      const a = needleAngle(wiresOf('day-thang', q.out ? 1 : -1), at[q.spot]);
      const want = deg[/** @type {'phai' | 'len' | 'trai' | 'xuong'} */ (gripAnswer(q))];
      return Math.abs(((a - want + 540) % 360) - 180) > 1e-6;
    });
    expect(bad).toEqual([]);
  });

  it('gives a counterclockwise loop a field out of the page', () => {
    expect(gripAnswer({ kind: 'vong', cw: false })).toBe('ra');
    expect(gripAnswer({ kind: 'vong', cw: true })).toBe('vao');
  });
});
