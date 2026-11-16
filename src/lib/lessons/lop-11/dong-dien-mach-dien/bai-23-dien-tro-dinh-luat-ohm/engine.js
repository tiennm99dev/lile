/**
 * Current–voltage characteristics of three components a class can test: a
 * fixed resistor that obeys Ohm's law, a filament lamp whose filament heats up
 * so its resistance grows with the voltage, and a diode that conducts only one
 * way and only above about 0,6 V. The lamp and diode are simple smooth models,
 * close enough in shape to school measurements.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {'dien-tro' | 'den' | 'diot'} Component */

/** Resistance of the fixed resistor, Ω. */
export const FIXED = 20;

/** Lamp: cold resistance (Ω) and how much it grows per volt (Ω/V). */
const LAMP_COLD = 3;
const LAMP_GROWTH = 1.5;

/** Diode: knee voltage (V), knee softness (V) and resistance once on (Ω). */
const KNEE = 0.6;
const SOFT = 0.04;
const DIODE_ON = 10;

/** @type {Array<{ value: Component, label: string }>} */
export const COMPONENTS = [
  { value: 'dien-tro', label: 'Điện trở' },
  { value: 'den', label: 'Đèn sợi đốt' },
  { value: 'diot', label: 'Điốt' },
];

/** log(1 + eˣ) without overflow. @param {number} x */
const softplus = (x) => (x > 30 ? x : Math.log1p(Math.exp(x)));

/**
 * Current (A) through a component with voltage U (V) across it; a negative U
 * means the component is connected the other way round.
 * @param {Component} kind @param {number} u
 */
export function currentAt(kind, u) {
  if (kind === 'dien-tro') return tidy(u / FIXED, 12);
  if (kind === 'den') return tidy(u / (LAMP_COLD + LAMP_GROWTH * Math.abs(u)), 12);
  return tidy((SOFT * softplus((u - KNEE) / SOFT)) / DIODE_ON, 12);
}

/**
 * Resistance R = U/I at a working point, or null when almost no current flows
 * (the component then blocks the current).
 * @param {Component} kind @param {number} u
 */
export function resistanceAt(kind, u) {
  const i = currentAt(kind, u);
  if (Math.abs(i) < 1e-4) return null;
  return tidy(u / i, 9);
}

/**
 * Points of the whole characteristic from U = lo to U = hi.
 * @param {Component} kind @param {number} lo @param {number} hi @param {number} [count]
 */
export function characteristic(kind, lo, hi, count = 121) {
  return Array.from({ length: count }, (_, k) => {
    const u = lo + ((hi - lo) * k) / (count - 1);
    return { x: u, y: currentAt(kind, u) };
  });
}
