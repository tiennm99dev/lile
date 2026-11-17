/**
 * The ideal transformer (U₁/U₂ = N₁/N₂ = I₂/I₁, no loss) and the power line
 * between a plant and a town: the heat lost in the wires,
 * P_hp = P²R/U², against the voltage the step-up transformer gives.
 */

/**
 * @typedef {{ U1: number, N1: number, N2: number, R: number, ac: boolean }} Transformer
 * Primary effective voltage (V), turns, load resistance (Ω) and whether the
 * primary is fed with alternating current.
 */

/**
 * The secondary voltage and both currents of an ideal transformer with a
 * resistive load. A direct current makes no changing flux, so nothing is
 * induced in the secondary.
 * @param {Transformer} t
 */
export function transformer(t) {
  if (!t.ac) return { U2: 0, I2: 0, I1: 0, P: 0, ratio: t.N2 / t.N1 };
  const ratio = t.N2 / t.N1;
  const U2 = t.U1 * ratio;
  const I2 = U2 / t.R;
  return { U2, I2, I1: I2 * ratio, P: U2 * I2, ratio };
}

/**
 * The book's name for the machine: 'tăng áp' when N₂ > N₁, 'hạ áp' when
 * N₂ < N₁.
 * @param {number} N1 @param {number} N2
 */
export function kindOf(N1, N2) {
  if (N2 > N1) return 'máy tăng áp';
  if (N2 < N1) return 'máy hạ áp';
  return 'máy có điện áp ra bằng điện áp vào';
}

/** Resistivities at 20 °C, Ω·m. */
export const METALS = {
  dong: { name: 'Đồng', rho: 1.7e-8 },
  nhom: { name: 'Nhôm', rho: 2.8e-8 },
};

/**
 * Resistance R = ρl/S of the two wires of a line `km` kilometres long.
 * @param {number} rho Ω·m @param {number} km distance @param {number} mm2 cross-section
 */
export const lineResistance = (rho, km, mm2) => (rho * 2 * km * 1000) / (mm2 * 1e-6);

/**
 * @typedef {{ P: number, U: number, R: number }} Line
 * Power sent (W), voltage at the start of the line (V), line resistance (Ω);
 * the power factor is taken as 1.
 */

/**
 * The line's current, heat loss, delivered power, efficiency and voltage drop.
 * @param {Line} l
 */
export function transmit(l) {
  const I = l.P / l.U;
  const loss = Math.min(I * I * l.R, l.P);
  return {
    I,
    loss,
    delivered: l.P - loss,
    efficiency: (l.P - loss) / l.P,
    drop: Math.min(I * l.R, l.U),
  };
}
