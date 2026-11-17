/**
 * A kettle of water on a balance, heated by a resistor through a joulemeter
 * (oát kế that also counts the energy). The water warms to 100 °C, then boils
 * at constant temperature while its mass falls as vapour leaves: the heat
 * Q = Lm turns the lost mass into vapour. Two readings taken while it boils
 * give L = (Q₂ − Q₁) / (m₁ − m₂), as in the book's experiment.
 */
import { tidy } from '#lib/core/number-format.js';
import { SPECIFIC_HEAT, energyBefore, stageAt, totalEnergy } from '../_shared/thermal.js';

/** Specific heat of vaporization of water at 100 °C, J/kg. */
export const L_WATER = 2.26e6;
export const BOIL = 100;
/** Share of the water the simulation boils away before it stops. */
export const BOIL_SHARE = 0.4;

/**
 * @param {number} mass kg
 * @param {number} start °C, at most 100
 * @returns {import('../_shared/thermal.js').Stage[]}
 */
export function kettleStages(mass, start) {
  return [
    { kind: 'warm', from: start, to: BOIL, perDegree: mass * SPECIFIC_HEAT.nuoc, phase: 'lỏng' },
    { kind: 'change', at: BOIL, energy: L_WATER * mass * BOIL_SHARE, from: 'lỏng', to: 'khí' },
  ];
}

/**
 * The run of an experiment: stages, when boiling starts and when the run ends.
 * @param {number} mass @param {number} start @param {number} power W
 */
export function run(mass, start, power) {
  const stages = kettleStages(mass, start);
  return {
    mass,
    stages,
    boilStart: tidy(energyBefore(stages, 1) / power, 6),
    end: tidy(totalEnergy(stages) / power, 6),
  };
}

/**
 * What the instruments show `time` seconds after switching on: thermometer,
 * joulemeter (J) and balance (kg of water left).
 * @param {ReturnType<typeof run>} r @param {number} power @param {number} time
 */
export function readingAt(r, power, time) {
  const energy = tidy(power * time, 6);
  const at = stageAt(r.stages, energy);
  const boiling = at.index === 1 && energy > energyBefore(r.stages, 1) + 1e-9;
  const boiled = boiling
    ? Math.min(BOIL_SHARE * r.mass, (energy - energyBefore(r.stages, 1)) / L_WATER)
    : 0;
  return {
    time,
    temperature: at.temperature,
    energy,
    mass: tidy(r.mass - boiled, 12),
    boiling,
  };
}

/**
 * Corners of the mass – time graph, in grams.
 * @param {ReturnType<typeof run>} r
 */
export function massPoints(r) {
  const m = r.mass * 1000;
  return [
    { x: 0, y: m },
    { x: r.boilStart, y: m },
    { x: r.end, y: tidy(m * (1 - BOIL_SHARE), 6) },
  ];
}

/**
 * Ticks for the mass axis, g, every 50 g from below the lowest to above the
 * highest mass.
 * @param {number} lo @param {number} hi
 */
export function massTicks(lo, hi) {
  const ticks = [];
  for (let v = Math.floor(lo / 50) * 50; v <= Math.ceil(hi / 50) * 50; v += 50) ticks.push(v);
  return ticks;
}

/**
 * L from two readings, J/kg; null when no water has gone between them.
 * @param {{ energy: number, mass: number }} first
 * @param {{ energy: number, mass: number }} second
 */
export function latentFrom(first, second) {
  const lost = first.mass - second.mass;
  if (lost <= 1e-9) return null;
  return (second.energy - first.energy) / lost;
}

/**
 * How far a measured L is from the book's value, as a fraction.
 * @param {number} value
 */
export function relativeError(value) {
  return Math.abs(value - L_WATER) / L_WATER;
}
