import { describe, expect, it } from 'vitest';
import { distance, makeBoard } from './board.js';

describe('centimetre board', () => {
  const board = makeBoard({ width: 360, height: 200, scale: 20 });

  it('maps centimetres to pixels with y up and back', () => {
    expect(board.px(0)).toBe(180);
    expect(board.py(2)).toBe(60);
    expect(board.toCm({ x: 220, y: 60 })).toEqual({ x: 2, y: 2 });
  });

  it('snaps and keeps points inside the margin', () => {
    expect(board.place({ x: 1.26, y: -0.24 })).toEqual({ x: 1.5, y: 0 });
    expect(board.place({ x: 40, y: -40 })).toEqual({ x: 8.5, y: -4.5 });
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });
});
