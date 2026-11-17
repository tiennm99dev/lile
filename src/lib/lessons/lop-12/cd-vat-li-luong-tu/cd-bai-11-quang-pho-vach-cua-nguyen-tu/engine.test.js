import { describe, expect, it } from 'vitest';
import { allLines, levelEv, transition } from './engine.js';

describe('hydrogen levels', () => {
  it('gives Eₙ = −13,6/n² eV', () => {
    expect(levelEv(1)).toBe(-13.6);
    expect(levelEv(2)).toBe(-3.4);
    expect(levelEv(3)).toBeCloseTo(-1.511, 3);
  });
});

describe('transitions', () => {
  it('finds the longest wavelength absorbed from the ground state', () => {
    const t = transition(1, 2);
    expect(t.emits).toBe(false);
    expect(t.ev).toBeCloseTo(10.2, 9);
    expect(t.nm / 100).toBeCloseTo(1.218, 3);
    expect(t.region).toBe('tử ngoại');
  });

  it('gives the four visible Balmer lines', () => {
    const visible = allLines().filter((l) => l.region === 'nhìn thấy');
    expect(visible.map((l) => l.from)).toEqual([6, 5, 4, 3]);
    expect(visible.every((l) => l.to === 2 && l.series === 'Balmer')).toBe(true);
    expect(transition(3, 2).nm).toBeCloseTo(657.6, 1);
    expect(transition(4, 2).nm).toBeCloseTo(487.1, 1);
  });

  it('emits the same photon it can absorb', () => {
    expect(transition(4, 2).nm).toBeCloseTo(transition(2, 4).nm, 12);
    expect(transition(4, 3).region).toBe('hồng ngoại');
    expect(transition(4, 3).series).toBe('Paschen');
    expect(allLines()).toHaveLength(15);
  });
});
