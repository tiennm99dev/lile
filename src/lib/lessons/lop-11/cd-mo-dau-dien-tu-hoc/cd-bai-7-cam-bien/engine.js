/**
 * A sensor in a potential divider: an LDR driven by the light or an NTC
 * thermistor driven by the temperature, above or below a fixed resistor,
 * and the output voltage across the lower resistor as the surroundings change.
 */
import { dividerOut, ldrResistance, luxAt, ntcResistance } from '../_shared/electronics.js';

/** @typedef {'ldr' | 'ntc'} SensorKind */

/**
 * The surroundings each sensor reads. For the LDR the setting is a step of
 * the logarithmic light slider (`luxAt`), for the thermistor a temperature.
 */
export const SENSORS = {
  ldr: { name: 'Điện trở quang (LDR)', quantity: 'Độ rọi', min: 0, max: 40, start: 20 },
  ntc: { name: 'Điện trở nhiệt NTC', quantity: 'Nhiệt độ', min: 0, max: 100, start: 25 },
};

/**
 * Resistance of the sensor at a setting of its slider.
 * @param {SensorKind} kind @param {number} setting
 */
export const sensorResistance = (kind, setting) =>
  kind === 'ldr' ? ldrResistance(luxAt(setting)) : ntcResistance(setting);

/**
 * The divider at one setting.
 * @param {{ kind: SensorKind, onTop: boolean, fixed: number, u: number }} c
 *   the sensor, whether it is R₁ (between the supply and the output), the
 *   fixed resistance in ohms and the supply voltage
 * @param {number} setting
 */
export function reading(c, setting) {
  const rs = sensorResistance(c.kind, setting);
  const uout = c.onTop ? dividerOut(c.u, rs, c.fixed) : dividerOut(c.u, c.fixed, rs);
  return { rs, uout };
}

/**
 * Output voltage over the whole slider, `n` + 1 points.
 * @param {{ kind: SensorKind, onTop: boolean, fixed: number, u: number }} c
 * @param {number} [n]
 */
export function curve(c, n = 40) {
  const { min, max } = SENSORS[c.kind];
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = min + ((max - min) * i) / n;
    return { x, u: reading(c, x).uout };
  });
}

/**
 * Whether the output rises or falls when the light or the temperature
 * grows. Both sensors lose resistance then, so only the place matters:
 * on top the output rises, at the bottom it falls.
 * @param {boolean} onTop
 */
export const trend = (onTop) => (onTop ? 'up' : 'down');
