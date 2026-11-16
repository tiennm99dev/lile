import { describe, expect, it } from 'vitest';
import { TASKS, noteFor, reading, solves } from './engine.js';

describe('standing-wave bench', () => {
  it('reads the book pattern at the mode frequencies', () => {
    expect(reading('co-dinh', 15)).toMatchObject({ standing: true, antinodes: 3, nodes: 4 });
    expect(reading('tu-do', 7.5)).toMatchObject({ standing: true, antinodes: 2, nodes: 2 });
    expect(reading('co-dinh', 12)).toMatchObject({ standing: false });
  });

  it('has a frequency on the 0,5 Hz slider that solves every task', () => {
    const unsolved = TASKS.filter((task) => {
      for (let f = 0.5; f <= 40; f += 0.5) if (solves(task, task.end, f)) return false;
      return true;
    });
    expect(unsolved).toEqual([]);
    expect(solves(TASKS[2], 'co-dinh', 20)).toBe(true);
    expect(solves(TASKS[2], 'tu-do', 20)).toBe(false);
  });

  it('explains the wavelength and the condition when the wave stands', () => {
    expect(noteFor('co-dinh', 15)).toContain('= 0{,}8$ m');
    expect(noteFor('tu-do', 12.5)).toContain('k = 2');
    expect(noteFor('co-dinh', 13)).toContain('lăn tăn');
  });
});
