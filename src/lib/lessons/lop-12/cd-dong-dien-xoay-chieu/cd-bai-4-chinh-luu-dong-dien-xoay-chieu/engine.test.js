import { describe, expect, it } from 'vitest';
import { BRIDGE, bridgeStatus, conductingFor, outputStats, rectify, simulate } from './engine.js';

const BASE = { U0: 10, f: 50, flipped: false, RC: null };
const T_MAX = 0.04;

describe('rectifying without a capacitor', () => {
  it('keeps one half or folds the negative half up', () => {
    expect(rectify('half', false, -3)).toBe(0);
    expect(rectify('half', false, 3)).toBe(3);
    expect(rectify('half', true, 3)).toBe(0);
    expect(rectify('half', true, -3)).toBe(-3);
    expect(rectify('full', false, -3)).toBe(3);
    expect(rectify('none', false, -3)).toBe(-3);
  });

  it('gives the averages U0/π and 2U0/π', () => {
    const half = outputStats(simulate({ ...BASE, mode: 'half' }, T_MAX, 800));
    const full = outputStats(simulate({ ...BASE, mode: 'full' }, T_MAX, 800));
    const none = outputStats(simulate({ ...BASE, mode: 'none' }, T_MAX, 800));
    expect(half.mean).toBeCloseTo(10 / Math.PI, 1);
    expect(full.mean).toBeCloseTo(20 / Math.PI, 1);
    expect(Math.abs(none.mean)).toBeLessThan(0.05);
    expect(half.lo).toBe(0);
    expect(full.hi).toBeCloseTo(10, 9);
  });

  it('names the bridge diodes that conduct in each half', () => {
    expect(conductingFor('full', 2)).toEqual(['D1', 'D3']);
    expect(conductingFor('full', -2)).toEqual(['D2', 'D4']);
    expect(conductingFor('half', 2)).toEqual(['D']);
    expect(conductingFor('none', 2)).toEqual([]);
  });
});

describe('smoothing capacitor', () => {
  it('leaves a small ripple, smaller for full-wave and for a larger RC', () => {
    const full = outputStats(simulate({ ...BASE, mode: 'full', RC: 0.1 }, T_MAX, 800));
    const half = outputStats(simulate({ ...BASE, mode: 'half', RC: 0.1 }, T_MAX, 800));
    const big = outputStats(simulate({ ...BASE, mode: 'full', RC: 0.5 }, T_MAX, 800));
    expect(full.ripple).toBeGreaterThan(0.7);
    expect(full.ripple).toBeLessThan(1.0);
    expect(half.ripple).toBeGreaterThan(full.ripple * 1.6);
    expect(big.ripple).toBeLessThan(full.ripple / 3);
    expect(full.mean).toBeGreaterThan(9);
  });

  it('lets the diodes conduct only while the capacitor charges', () => {
    const s = simulate({ ...BASE, mode: 'full', RC: 0.1 }, T_MAX, 800);
    const share = s.filter((p) => p.on).length / s.length;
    expect(share).toBeGreaterThan(0.05);
    expect(share).toBeLessThan(0.4);
  });

  it('keeps a turned-round diode negative', () => {
    const s = outputStats(simulate({ ...BASE, mode: 'half', flipped: true, RC: 0.1 }, T_MAX, 800));
    expect(s.hi).toBeLessThan(0);
    expect(s.lo).toBeCloseTo(-10, 1);
  });
});

describe('building the bridge', () => {
  /** @param {string} code four letters u/d for D1..D4 */
  const of = (code) =>
    /** @type {Record<'D1' | 'D2' | 'D3' | 'D4', 'up' | 'down'>} */ (
      Object.fromEntries(BRIDGE.map((k, i) => [k, code[i] === 'u' ? 'up' : 'down']))
    );

  it('works only with all four diodes pointing the same way', () => {
    expect(bridgeStatus(of('uuuu'))).toBe('ok');
    expect(bridgeStatus(of('dddd'))).toBe('reversed');
    expect(bridgeStatus(of('uudd'))).toBe('open');
    expect(bridgeStatus(of('dduu'))).toBe('open');
    expect(bridgeStatus(of('uduu'))).toBe('short');
    expect(bridgeStatus(of('uuud'))).toBe('short');
  });

  it('swaps the conducting pair when the bridge is turned round', () => {
    expect(conductingFor('full', 2, true)).toEqual(['D2', 'D4']);
    expect(conductingFor('half', -2, true)).toEqual(['D']);
    expect(conductingFor('half', -2)).toEqual([]);
  });
});
