/**
 * X-rays passing through matter: the book's attenuation law I = I₀e^(−μd),
 * the half-value layer, and linear attenuation coefficients of the materials
 * met in medical imaging, from mass attenuation coefficients (NIST XCOM, with
 * coherent scattering) times density.
 */

/** Elementary charge (C) and electron mass (kg), as the book rounds them. */
export const E_CHARGE = 1.6e-19;
export const M_ELECTRON = 9.1e-31;

/**
 * Intensity left after a path `d` through a uniform material:
 * I = I₀e^(−μd). `mu` and `d` in matching units (m⁻¹ and m, or cm⁻¹ and cm).
 * @param {number} I0 @param {number} mu @param {number} d
 */
export const attenuate = (I0, mu, d) => I0 * Math.exp(-mu * d);

/**
 * The thickness that halves the intensity, d = ln 2 / μ.
 * @param {number} mu
 */
export const halfLayer = (mu) => Math.LN2 / mu;

/**
 * Mass attenuation coefficients μ/ρ (cm²/g) against photon energy (keV) and
 * density (g/cm³). Lead's K edge at 88 keV is kept as a jump.
 */
export const MATERIALS = {
  'mo-mem': {
    name: 'mô mềm',
    rho: 1,
    table: [
      [10, 5.329],
      [15, 1.673],
      [20, 0.8096],
      [30, 0.3756],
      [40, 0.2683],
      [50, 0.2269],
      [60, 0.2059],
      [80, 0.1837],
      [100, 0.1707],
      [150, 0.1505],
    ],
  },
  xuong: {
    name: 'xương',
    rho: 1.92,
    table: [
      [10, 28.51],
      [15, 9.032],
      [20, 4.001],
      [30, 1.331],
      [40, 0.6655],
      [50, 0.4242],
      [60, 0.3148],
      [80, 0.2229],
      [100, 0.1855],
      [150, 0.148],
    ],
  },
  nhom: {
    name: 'nhôm',
    rho: 2.699,
    table: [
      [10, 26.21],
      [15, 7.955],
      [20, 3.441],
      [30, 1.128],
      [40, 0.5685],
      [50, 0.3681],
      [60, 0.2778],
      [80, 0.2018],
      [100, 0.1704],
      [150, 0.1378],
    ],
  },
  chi: {
    name: 'chì',
    rho: 11.35,
    table: [
      [10, 130.6],
      [15, 111.6],
      [20, 86.36],
      [30, 30.32],
      [40, 14.36],
      [50, 8.041],
      [60, 5.021],
      [80, 2.419],
      [88, 1.91],
      [88.0001, 7.683],
      [100, 5.549],
      [150, 2.014],
    ],
  },
};

/** @typedef {keyof typeof MATERIALS} Material */

/**
 * Linear attenuation coefficient μ (cm⁻¹) of a material at photon energy
 * `keV`, interpolated log-log between table rows and extended from the end
 * rows outside the table.
 * @param {Material} material @param {number} keV
 */
export function muAt(material, keV) {
  const { rho, table } = MATERIALS[material];
  let i = 0;
  while (i < table.length - 2 && keV > table[i + 1][0]) i += 1;
  const [e0, m0] = table[i];
  const [e1, m1] = table[i + 1];
  const t = Math.log(keV / e0) / Math.log(e1 / e0);
  return rho * Math.exp(Math.log(m0) + t * Math.log(m1 / m0));
}
