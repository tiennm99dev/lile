import { describe, expect, it } from 'vitest';
import { GOALS, PART_IDS, SLOT_IDS, check, emptyBoard, evaluate, fits } from './engine.js';

/** @typedef {import('./engine.js').Board} Board */

/** @type {Board} */
const NIGHT = { top: 'fixed', bottom: 'ldr', output: 'relay' };
/** @type {Board} */
const HEAT = { top: 'ntc', bottom: 'fixed', output: 'buzzer' };

describe('slots', () => {
  it('takes divider parts in R1 and R2 and devices at the output', () => {
    const wrong = [];
    for (const slot of SLOT_IDS) {
      for (const part of PART_IDS) {
        const device = part === 'led' || part === 'relay' || part === 'buzzer';
        if (fits(slot, part) !== (slot === 'output' ? device : !device))
          wrong.push(`${slot} ${part}`);
      }
    }
    expect(wrong).toEqual([]);
  });
});

describe('evaluate', () => {
  it('gives the divider voltage and switches on a positive output', () => {
    const dark = evaluate(NIGHT, GOALS.night.on, 6);
    expect(dark?.us).toBeCloseTo(9.18, 2);
    expect(dark?.on).toBe(true);
    const bright = evaluate(NIGHT, GOALS.night.off, 6);
    expect(bright?.us).toBeCloseTo(1.87, 2);
    expect(bright?.on).toBe(false);
    expect(evaluate(emptyBoard(), GOALS.night.on, 6)).toBeNull();
  });
});

describe('check', () => {
  it('accepts the night lamp with the LDR below the fixed resistor', () => {
    expect(check(NIGHT, GOALS.night, 6).ok).toBe(true);
  });

  it('asks for a higher U0 on the heat alarm, then accepts it', () => {
    const low = check(HEAT, GOALS.heat, 6);
    expect(low.ok).toBe(false);
    expect(low.text).toContain('thấp quá');
    expect(check(HEAT, GOALS.heat, 8).ok).toBe(true);
    expect(check({ ...HEAT, output: 'led' }, GOALS.heat, 8).ok).toBe(true);
    expect(check(HEAT, GOALS.heat, 11).text).toContain('cao quá');
  });

  it('names what is wrong with a bad board', () => {
    expect(check(emptyBoard(), GOALS.night, 6).text).toContain('Còn trống');
    expect(check({ ...NIGHT, top: 'ldr', bottom: 'fixed' }, GOALS.night, 6).text).toContain(
      'ngược',
    );
    expect(check({ ...NIGHT, bottom: 'ntc' }, GOALS.night, 6).text).toContain('không cảm nhận');
    expect(check({ ...NIGHT, bottom: 'fixed' }, GOALS.night, 6).text).toContain('cố định');
    expect(check({ ...NIGHT, top: 'ldr' }, GOALS.night, 6).text).toContain('một điện trở cố định');
    expect(check({ ...NIGHT, output: 'led' }, GOALS.night, 6).text).toContain('relay');
  });
});
