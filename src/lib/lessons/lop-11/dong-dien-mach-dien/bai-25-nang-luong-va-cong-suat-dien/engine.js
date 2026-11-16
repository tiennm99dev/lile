/**
 * Electric energy and power at home and in a resistor: devices on the 220 V
 * mains, what the electricity meter counts (kWh), and the heat a resistor
 * gives off by the Joule–Lenz law Q = RI²t, here used to warm a pot of water.
 */
import { tidy } from '#lib/core/number-format.js';

/** Mains voltage, V. */
export const MAINS = 220;

/** Joules in one kilowatt-hour. */
export const KWH = 3.6e6;

/** Specific heat of water, J/(kg·K). */
export const WATER_C = 4200;

/** Household devices with their rated power at 220 V, W. */
export const DEVICES = [
  { id: 'den-led', label: 'Đèn LED', power: 9 },
  { id: 'quat', label: 'Quạt điện', power: 50 },
  { id: 'tivi', label: 'Tivi', power: 100 },
  { id: 'tu-lanh', label: 'Tủ lạnh', power: 120 },
  { id: 'noi-com', label: 'Nồi cơm điện', power: 700 },
  { id: 'am-dun', label: 'Ấm siêu tốc', power: 1800 },
];

/**
 * Total power of the devices switched on, W.
 * @param {string[]} on ids of the devices that are on
 */
export const totalPower = (on) =>
  DEVICES.filter((d) => on.includes(d.id)).reduce((s, d) => s + d.power, 0);

/**
 * Energy used A = Pt, in kWh, by a power P (W) during t hours.
 * @param {number} power @param {number} hours
 */
export const energyKWh = (power, hours) => tidy((power * hours) / 1000, 9);

/**
 * Current drawn from the mains by a power P: I = P/U, in A.
 * @param {number} power
 */
export const mainsCurrent = (power) => tidy(power / MAINS, 9);

/**
 * Heat given off by a resistor, Q = RI²t, in J.
 * @param {number} r Ω @param {number} i A @param {number} t s
 */
export const jouleHeat = (r, i, t) => tidy(r * i * i * t, 9);

/**
 * Temperature rise of a mass of water that takes in heat Q: Δt = Q/(mc), in °C.
 * @param {number} heat J @param {number} mass kg
 */
export const waterRise = (heat, mass) => tidy(heat / (mass * WATER_C), 9);
