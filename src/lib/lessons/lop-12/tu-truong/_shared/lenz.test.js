import { describe, expect, it } from 'vitest';
import { inducedTurn } from './lenz.js';

describe('inducedTurn', () => {
  it('opposes the change of flux through a loop in the page', () => {
    expect(inducedTurn('ra', 'tang')).toBe('cw');
    expect(inducedTurn('ra', 'giam')).toBe('ccw');
    expect(inducedTurn('vao', 'tang')).toBe('ccw');
    expect(inducedTurn('vao', 'giam')).toBe('cw');
  });

  it('gives no current while the flux stays the same', () => {
    expect(inducedTurn('ra', 'khong')).toBeNull();
    expect(inducedTurn('vao', 'khong')).toBeNull();
  });
});
