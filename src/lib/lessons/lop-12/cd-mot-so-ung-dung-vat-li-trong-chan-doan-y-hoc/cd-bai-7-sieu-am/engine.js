/**
 * A virtual ultrasound probe on an abdomen cross-section. At each boundary
 * between two media a share R = ((Z₂ − Z₁)/(Z₂ + Z₁))² of the intensity is
 * reflected, where Z = ρv is the acoustic impedance; the echo returns after
 * t = 2d/v. A-mode draws the echoes against time, B-mode turns each echo and
 * the weak scattering inside tissue into a brightness, column by column as
 * the probe moves.
 */

/** Density (kg/m³) and sound speed (m/s) of the media, typical values. */
export const MEDIA = {
  air: { name: 'không khí', rho: 1.2, v: 340, scatter: 0 },
  gel: { name: 'gel', rho: 1000, v: 1500, scatter: 0 },
  fat: { name: 'mỡ', rho: 950, v: 1450, scatter: 3e-4 },
  muscle: { name: 'cơ', rho: 1070, v: 1580, scatter: 5e-4 },
  liver: { name: 'gan', rho: 1060, v: 1550, scatter: 8e-4 },
  fluid: { name: 'dịch (nang)', rho: 1020, v: 1570, scatter: 0 },
  bone: { name: 'xương', rho: 1900, v: 4080, scatter: 0 },
};

/** @typedef {keyof typeof MEDIA} Medium */

/**
 * Acoustic impedance Z = ρv, in 10⁶ kg/(m²·s).
 * @param {Medium} m
 */
export const impedance = (m) => (MEDIA[m].rho * MEDIA[m].v) / 1e6;

/**
 * Share of the incoming intensity reflected at a boundary.
 * @param {number} z1 @param {number} z2
 */
export const reflectance = (z1, z2) => ((z2 - z1) / (z2 + z1)) ** 2;

/** Body width and depth shown (cm). */
export const WIDTH = 24;
export const DEPTH = 12;
/** Speed the machine assumes in soft tissue (m/s). */
export const V_TISSUE = 1540;

export const RIB = { x: 19, z: 2.1, rx: 0.9, rz: 0.5 };
export const CYST = { x: 9, z: 6, r: 1.4 };

/**
 * The medium at a point: across x (cm) and down from the skin, z (cm).
 * @param {number} x @param {number} z
 * @returns {Medium}
 */
export function mediumAt(x, z) {
  if (((x - RIB.x) / RIB.rx) ** 2 + ((z - RIB.z) / RIB.rz) ** 2 <= 1) return 'bone';
  if (z < 1.2) return 'fat';
  if (z < 2.6) return 'muscle';
  if (z < 10) {
    return (x - CYST.x) ** 2 + (z - CYST.z) ** 2 <= CYST.r ** 2 ? 'fluid' : 'liver';
  }
  return 'muscle';
}

/** Depth step (cm) and B-mode rows. */
const DZ = 0.05;
export const ROWS = 60;
/** Intensity lost per cm in bone, there and back (most of it absorbed). */
const BONE_LOSS = 6;

/** A small fixed hash noise in [0.4, 1.6), the grain of tissue echoes. */
function grain(/** @type {number} */ x, /** @type {number} */ z) {
  const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return 0.4 + 1.2 * (s - Math.floor(s));
}

/**
 * @typedef {{ z: number, t: number, I: number, from: Medium, to: Medium }} Echo
 * Depth (cm), return time (μs), echo intensity as a share of the pulse, and
 * the media on each side.
 */

/**
 * Everything one pulse sent down at `x` brings back.
 * @param {number} x
 * @param {boolean} gel whether gel fills the gap between probe and skin
 */
export function scanColumn(x, gel) {
  /** @type {Echo[]} */
  const echoes = [];
  const rows = new Float64Array(ROWS);
  /** @type {Medium} */
  let prev = gel ? 'gel' : 'air';
  // The probe face is matched to soft tissue.
  let T = 1 - reflectance(1.5, impedance(prev));
  if (!gel) echoes.push({ z: 0, t: 0, I: 1 - T, from: 'gel', to: 'air' });
  let t = 0;
  for (let z = 0; z < DEPTH; z += DZ) {
    const m = mediumAt(x, z + DZ / 2);
    if (m !== prev) {
      const R = reflectance(impedance(prev), impedance(m));
      echoes.push({ z, t, I: T * R, from: prev, to: m });
      T *= 1 - R;
      prev = m;
    }
    if (m === 'bone') T *= Math.exp(-BONE_LOSS * DZ);
    const row = Math.min(ROWS - 1, Math.floor((z / DEPTH) * ROWS));
    rows[row] += T * MEDIA[m].scatter * grain(x, z) * DZ;
    t += (2 * DZ * 1e-2 * 1e6) / MEDIA[m].v;
  }
  for (const e of echoes) {
    const row = Math.min(ROWS - 1, Math.floor((e.z / DEPTH) * ROWS));
    rows[row] += e.I;
  }
  return { echoes, rows: Array.from(rows, brightness) };
}

/**
 * Display brightness 0..1 of an echo intensity on a 60 dB scale, as a
 * scanner compresses it.
 * @param {number} I
 */
export const brightness = (I) => (I <= 0 ? 0 : Math.max(0, Math.min(1, 1 + Math.log10(I) / 6)));

/**
 * The machine's depth (cm) for an echo time (μs), d = vt/2 with v = 1540 m/s.
 * @param {number} us
 */
export const depthFromTime = (us) => (V_TISSUE * us * 1e-6 * 100) / 2;

/**
 * The A-mode trace: echo heights against time (μs), each echo a short pulse.
 * @param {Echo[]} echoes @param {number} tMax
 */
export function aTrace(echoes, tMax) {
  const pts = [];
  for (let i = 0; i <= 400; i += 1) {
    const t = (tMax * i) / 400;
    let y = 0;
    for (const e of echoes) {
      y = Math.max(y, brightness(e.I) * Math.exp(-(((t - e.t) / 0.9) ** 2)));
    }
    pts.push({ x: t, y });
  }
  return pts;
}
