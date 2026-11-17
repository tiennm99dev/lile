import { describe, expect, it } from 'vitest';
import { SCENARIOS, checkScenario, deltaU, signMeaning, signed } from './engine.js';

describe('first law', () => {
  it('adds work and heat', () => {
    expect(deltaU(-70, 100)).toBe(30);
    expect(deltaU(200, -50)).toBe(150);
  });

  it('reads the signs the book way', () => {
    expect(signMeaning('A', 10)).toContain('nhận công');
    expect(signMeaning('A', -10)).toContain('thực hiện công');
    expect(signMeaning('Q', -5)).toContain('truyền nhiệt');
    expect(signMeaning('U', 0)).toBe('nội năng không đổi');
    expect(signed(30)).toBe('+30');
    expect(signed(-70)).toBe('-70');
  });

  it('checks every scenario and points at a wrong sign', () => {
    const wrong = SCENARIOS.filter((s) => !checkScenario(s, s.work, s.heat).ok);
    expect(wrong).toEqual([]);
    const first = SCENARIOS[0];
    const flipped = checkScenario(first, -first.work, first.heat);
    expect(flipped.ok).toBe(false);
    expect(flipped.text).toContain('dấu của $A$');
    expect(checkScenario(first, first.work - 10, first.heat).text).toContain('độ lớn');
  });
});
