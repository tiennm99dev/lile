import { describe, expect, it } from 'vitest';
import { interferenceReport, standingReport, valid } from './engine.js';

describe('wave checking bench', () => {
  it('accepts only numbers within range', () => {
    const ranges = { l: /** @type {[number, number]} */ ([0.1, 10]) };
    expect(valid({ l: 1.2 }, ranges)).toBe(true);
    expect(valid({ l: null }, ranges)).toBe(false);
    expect(valid({ l: 0 }, ranges)).toBe(false);
  });

  it('confirms the standing wave of the book example', () => {
    // L = 1,2 m, 3 bụng, f = 13,3 Hz, v = 10,64 m/s.
    const r = standingReport('co-dinh', 1.2, 10.64, 13.3);
    expect(r).toMatchObject({ standing: true, drawable: true });
    expect(r.text).toContain('$3$ bụng và $4$ nút');
  });

  it('names the nearby mode frequencies when there is no standing wave', () => {
    const r = standingReport('co-dinh', 1, 20, 25);
    expect(r.standing).toBe(false);
    expect(r.text).toContain('$20$ Hz; $30$ Hz');
    const free = standingReport('tu-do', 0.5, 20, 10).text;
    expect(free).toContain('$1$ bụng và $1$ nút (kể cả đầu cố định)');
  });

  it('counts maxima and minima between the sources', () => {
    const r = interferenceReport(9, 2);
    expect(r.maxima).toHaveLength(9);
    expect(r.minima).toHaveLength(8);
    expect(r.text).toContain('$9$ cực đại và $8$ cực tiểu');
  });
});
