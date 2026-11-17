import { describe, expect, it } from 'vitest';
import { TASKS, answerOf, crossDir, dirOf, dirWords, isRight, wrap } from './engine.js';

describe('direction helpers', () => {
  it('finds the force by the left-hand rule (F = I l × B)', () => {
    expect(crossDir(0, 'vao')).toBe(90);
    expect(crossDir(90, 'ra')).toBe(0);
    expect(crossDir(180, 90)).toBe('vao');
    expect(crossDir(270, 0)).toBe('ra');
    expect(crossDir(45, 'vao')).toBe(135);
  });

  it('gives no force along the field', () => {
    expect(crossDir(0, 0)).toBeNull();
    expect(crossDir(0, 180)).toBeNull();
    expect(dirOf({ x: 0, y: 0, z: 0 })).toBeNull();
  });

  it('wraps angles and names directions', () => {
    expect(wrap(-90)).toBe(270);
    expect(wrap(450)).toBe(90);
    expect(dirWords(90)).toBe('lên trên');
    expect(dirWords(135)).toBe('chéo lên bên trái');
    expect(dirWords('vao')).toContain('⊗');
  });
});

describe('drill answers', () => {
  it('matches the answers worked out by hand', () => {
    expect(TASKS.map(answerOf)).toEqual([
      90, // I right, B in: F up
      0, // I up, B out: F right
      'vao', // I left, B up: F into the page
      'cw', // B out growing: induced field in, clockwise
      90, // rod moving right, B in: current up the rod
      'ra', // I down, B right: F out of the page
      'ccw', // B in growing: induced field out, counterclockwise
      135, // I up-right, B in: F up-left
      'cw', // B in, flux falling: induced field in, clockwise
      270, // rod moving left, B in: current down the rod
      'ccw', // B out falling: induced field out, counterclockwise
    ]);
  });

  it('accepts only the right guess', () => {
    expect(isRight(TASKS[0], 90)).toBe(true);
    expect(isRight(TASKS[0], 450)).toBe(true);
    expect(isRight(TASKS[0], 270)).toBe(false);
    expect(isRight(TASKS[0], 'ra')).toBe(false);
    expect(isRight(TASKS[3], 'cw')).toBe(true);
    expect(isRight(TASKS[3], 'ccw')).toBe(false);
    expect(isRight(TASKS[3], null)).toBe(false);
  });
});
