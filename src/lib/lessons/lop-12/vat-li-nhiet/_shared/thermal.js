/**
 * Thermal data of the grade 12 book and the heating curve of a substance
 * that warms, changes state at a fixed temperature, then warms again.
 *
 * A heating curve is a list of stages. A `warm` stage raises the temperature
 * from `from` to `to` and needs `perDegree` joules for each degree (m·c); a
 * `change` stage keeps the temperature at `at` while `energy` joules (λm or
 * Lm) change the state. Heat flows in at a constant rate, so the temperature –
 * time graph is made of straight pieces with flat steps at the changes.
 */
import { numTex, tidy } from '#lib/core/number-format.js';

/**
 * Specific heat c, J/kg.K: the values of the book's table, plus aluminium,
 * which the book's examples use with c = 880 J/kg.K.
 */
export const SPECIFIC_HEAT = {
  nuoc: 4200,
  'nuoc-da': 2100,
  dau: 1670,
  'khong-khi': 1000,
  nhom: 880,
  'thuy-tinh': 840,
  dat: 800,
  sat: 440,
  dong: 390,
  chi: 130,
};

/** Specific heat of melting λ, J/kg, and melting point, °C, at normal pressure. */
export const MELTING = {
  'nuoc-da': { lambda: 3.34e5, point: 0 },
  nhom: { lambda: 3.97e5, point: 660 },
  sat: { lambda: 2.77e5, point: 1535 },
  dong: { lambda: 1.8e5, point: 1084 },
  chi: { lambda: 0.25e5, point: 327 },
};

/**
 * @typedef {{ kind: 'warm', from: number, to: number, perDegree: number, phase: string }} WarmStage
 * @typedef {{ kind: 'change', at: number, energy: number, from: string, to: string }} ChangeStage
 * @typedef {WarmStage | ChangeStage} Stage
 */

/**
 * Energy a stage takes in, J.
 * @param {Stage} stage
 */
export function stageEnergy(stage) {
  return stage.kind === 'warm' ? Math.abs(stage.to - stage.from) * stage.perDegree : stage.energy;
}

/**
 * Energy the whole curve takes in, J.
 * @param {Stage[]} stages
 */
export function totalEnergy(stages) {
  return tidy(
    stages.reduce((sum, s) => sum + stageEnergy(s), 0),
    6,
  );
}

/**
 * Energy taken in before stage `index` starts, J.
 * @param {Stage[]} stages @param {number} index
 */
export function energyBefore(stages, index) {
  return tidy(
    stages.slice(0, index).reduce((sum, s) => sum + stageEnergy(s), 0),
    6,
  );
}

/**
 * Where the substance is once it has taken in `energy` joules: the stage, how
 * far through it (0 to 1) and the temperature.
 * @param {Stage[]} stages
 * @param {number} energy
 * @returns {{ index: number, progress: number, temperature: number, stage: Stage }}
 */
export function stageAt(stages, energy) {
  let left = Math.max(0, energy);
  for (let index = 0; index < stages.length; index++) {
    const stage = stages[index];
    const need = stageEnergy(stage);
    const last = index === stages.length - 1;
    if (left <= need + 1e-9 || last) {
      const progress = need > 0 ? Math.min(1, left / need) : 1;
      const temperature =
        stage.kind === 'warm' ? stage.from + (stage.to - stage.from) * progress : stage.at;
      return { index, progress: tidy(progress, 9), temperature: tidy(temperature, 9), stage };
    }
    left -= need;
  }
  throw new Error('A heating curve needs at least one stage');
}

/**
 * Corners of the temperature – time graph when heat flows in at `power`
 * watts: one point at the start and one at the end of every stage.
 * @param {Stage[]} stages @param {number} power
 * @returns {Array<{ x: number, y: number }>}
 */
export function curvePoints(stages, power) {
  const first = stages[0];
  const start = first.kind === 'warm' ? first.from : first.at;
  /** @type {Array<{ x: number, y: number }>} */
  const points = [{ x: 0, y: start }];
  let energy = 0;
  for (const stage of stages) {
    energy += stageEnergy(stage);
    points.push({ x: tidy(energy / power, 6), y: stage.kind === 'warm' ? stage.to : stage.at });
  }
  return points;
}

/**
 * A number in scientific notation for TeX, the book's way: `3{,}34 \cdot 10^{5}`.
 * Numbers from 0,01 to 9 999 are written plainly.
 * @param {number} value @param {number} [digits] significant decimals of the mantissa
 */
export function sciTex(value, digits = 2) {
  if (value === 0) return '0';
  const sign = value < 0 ? '-' : '';
  const v = Math.abs(value);
  if (v >= 0.01 && v < 1e4) return sign + numTex(v, digits);
  let exp = Math.floor(Math.log10(v));
  let mantissa = tidy(v / 10 ** exp, digits);
  if (mantissa >= 10) {
    mantissa = tidy(mantissa / 10, digits);
    exp += 1;
  }
  return `${sign}${numTex(mantissa, digits)} \\cdot 10^{${exp}}`;
}
