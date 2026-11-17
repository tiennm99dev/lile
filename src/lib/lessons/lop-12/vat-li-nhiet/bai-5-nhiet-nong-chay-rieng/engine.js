/**
 * Heating ice at a constant power until it has melted and the water is at
 * `END_T`: three stages, the middle one flat at 0 °C, where the heat
 * Q = λm melts the ice. Reading the start and end of the flat part off the
 * graph gives λ = P·(τ₂ − τ₁) / m, as in the book's experiment.
 */
import { tidy } from '#lib/core/number-format.js';
import {
  MELTING,
  SPECIFIC_HEAT,
  curvePoints,
  energyBefore,
  stageAt,
  totalEnergy,
} from '../_shared/thermal.js';

export const LAMBDA_ICE = MELTING['nuoc-da'].lambda;
export const END_T = 40;

/**
 * @param {number} mass kg
 * @param {number} start °C, at most 0
 * @returns {import('../_shared/thermal.js').Stage[]}
 */
export function iceStages(mass, start) {
  return [
    { kind: 'warm', from: start, to: 0, perDegree: mass * SPECIFIC_HEAT['nuoc-da'], phase: 'rắn' },
    { kind: 'change', at: 0, energy: LAMBDA_ICE * mass, from: 'rắn', to: 'lỏng' },
    { kind: 'warm', from: 0, to: END_T, perDegree: mass * SPECIFIC_HEAT.nuoc, phase: 'lỏng' },
  ];
}

/**
 * The run of an experiment: the graph corners, when melting starts and ends,
 * and the heat of each stage.
 * @param {number} mass @param {number} start @param {number} power W
 */
export function run(mass, start, power) {
  const stages = iceStages(mass, start);
  return {
    stages,
    points: curvePoints(stages, power),
    meltStart: tidy(energyBefore(stages, 1) / power, 6),
    meltEnd: tidy(energyBefore(stages, 2) / power, 6),
    end: tidy(totalEnergy(stages) / power, 6),
    heats: [
      tidy(energyBefore(stages, 1), 6),
      tidy(LAMBDA_ICE * mass, 6),
      tidy(mass * SPECIFIC_HEAT.nuoc * END_T, 6),
    ],
  };
}

/**
 * Temperature and state `time` seconds after the heater is switched on.
 * @param {ReturnType<typeof run>} r @param {number} power @param {number} time
 */
export function stateAt(r, power, time) {
  const at = stageAt(r.stages, power * time);
  return {
    temperature: at.temperature,
    stage: at.index,
    melted: at.index === 0 ? 0 : at.index === 1 ? at.progress : 1,
  };
}

/**
 * λ worked out from two marked times.
 * @param {number} power @param {number} t1 @param {number} t2 @param {number} mass
 */
export function lambdaFrom(power, t1, t2, mass) {
  return (power * (t2 - t1)) / mass;
}

/**
 * How far a measured λ is from the book's value, as a fraction.
 * @param {number} lambda
 */
export function relativeError(lambda) {
  return Math.abs(lambda - LAMBDA_ICE) / LAMBDA_ICE;
}
