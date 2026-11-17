import { describe, expect, it } from 'vitest';
import { LAMBDA_ICE, lambdaFrom, relativeError, run, stateAt } from './engine.js';

describe('melting ice at constant power', () => {
  // 0,2 kg of ice from −10 °C at 200 W.
  const r = run(0.2, -10, 200);

  it('splits the heat into the three stages', () => {
    expect(r.heats).toEqual([4200, 66800, 33600]);
    expect(r.meltStart).toBe(21);
    expect(r.meltEnd).toBe(355);
    expect(r.end).toBe(523);
  });

  it('stays at 0 °C while melting', () => {
    const half = stateAt(r, 200, (21 + 355) / 2);
    expect(half.temperature).toBe(0);
    expect(half.stage).toBe(1);
    expect(half.melted).toBeCloseTo(0.5, 9);
    expect(stateAt(r, 200, 10.5).temperature).toBeCloseTo(-5, 9);
    expect(stateAt(r, 200, 523).temperature).toBe(40);
  });

  it('gives back λ from the flat part', () => {
    expect(lambdaFrom(200, r.meltStart, r.meltEnd, 0.2)).toBeCloseTo(LAMBDA_ICE, 6);
    expect(relativeError(lambdaFrom(200, 25, 355, 0.2))).toBeCloseTo(0.012, 3);
  });

  it('starts melting at once for ice already at 0 °C', () => {
    expect(run(0.1, 0, 100).meltStart).toBe(0);
  });
});
