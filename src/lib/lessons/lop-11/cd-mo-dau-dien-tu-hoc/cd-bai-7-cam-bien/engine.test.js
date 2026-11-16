import { describe, expect, it } from 'vitest';
import { SENSORS, curve, reading, sensorResistance, trend } from './engine.js';

describe('sensor in a potential divider', () => {
  it('reads the LDR at 10 lux and the thermistor at 25 °C', () => {
    expect(sensorResistance('ldr', 10)).toBeCloseTo(20000, 6);
    expect(sensorResistance('ntc', 25)).toBeCloseTo(10000, 6);
  });

  it('puts the output across the lower resistor', () => {
    const below = reading({ kind: 'ldr', onTop: false, fixed: 20000, u: 12 }, 10);
    expect(below.uout).toBe(6);
    const above = reading({ kind: 'ntc', onTop: true, fixed: 30000, u: 12 }, 25);
    expect(above.uout).toBe(9);
  });

  it('rises with the light when the sensor is on top, falls when it is below', () => {
    const fails = [];
    for (const kind of /** @type {const} */ (['ldr', 'ntc'])) {
      for (const onTop of [true, false]) {
        const pts = curve({ kind, onTop, fixed: 10000, u: 12 });
        const up = pts.every((p, i) => i === 0 || p.u > pts[i - 1].u);
        const down = pts.every((p, i) => i === 0 || p.u < pts[i - 1].u);
        if ((trend(onTop) === 'up' ? up : down) !== true) fails.push(`${kind} ${onTop}`);
        if (pts[0].x !== SENSORS[kind].min || pts.at(-1)?.x !== SENSORS[kind].max) {
          fails.push(`${kind} range`);
        }
      }
    }
    expect(fails).toEqual([]);
  });
});
