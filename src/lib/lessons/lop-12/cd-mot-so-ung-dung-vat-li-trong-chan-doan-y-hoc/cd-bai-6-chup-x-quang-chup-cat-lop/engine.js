/**
 * A head slice for a virtual CT scanner: a grid of attenuation coefficients
 * μ (cm⁻¹), the line integrals ∫μ ds a detector row records from one
 * direction (the beam leaves it with I = I₀e^(−∫μ ds)), and the slice rebuilt
 * from many directions by filtered back-projection.
 */

/** Grid cells across the slice and the slice width (cm). */
export const N = 40;
export const FIELD = 30;
export const CELL = FIELD / N;

/** Attenuation coefficients (cm⁻¹) of the slice's parts for a CT beam. */
export const MU = {
  air: 0,
  brain: 0.21,
  fluid: 0.19,
  bone: 0.6,
  lesion: 0.235,
  lesionContrast: 0.32,
};

/**
 * Whether a point (cm, centre of the slice at 0) lies in an axis-aligned
 * ellipse.
 * @param {number} x @param {number} y
 * @param {number} cx @param {number} cy @param {number} a @param {number} b
 */
const inEllipse = (x, y, cx, cy, a, b) => ((x - cx) / a) ** 2 + ((y - cy) / b) ** 2 <= 1;

/** Lesion centre and radius (cm). */
export const LESION = { x: 3.5, y: -3, r: 1.8 };

/**
 * μ at a point of the slice: a skull 1 cm thick, brain, two fluid-filled
 * ventricles and a small lesion that takes up contrast agent.
 * @param {number} x @param {number} y @param {boolean} contrast
 */
export function muAtPoint(x, y, contrast) {
  if (!inEllipse(x, y, 0, 0, 9, 11)) return MU.air;
  if (!inEllipse(x, y, 0, 0, 8, 10)) return MU.bone;
  if (inEllipse(x, y, LESION.x, LESION.y, LESION.r, LESION.r)) {
    return contrast ? MU.lesionContrast : MU.lesion;
  }
  if (inEllipse(x, y, -1.6, 1, 0.9, 2.6) || inEllipse(x, y, 1.6, 1, 0.9, 2.6)) return MU.fluid;
  return MU.brain;
}

/** Centre (cm) of grid cell `i`. */
export const cellCentre = (/** @type {number} */ i) => (i - (N - 1) / 2) * CELL;

/**
 * The slice as an N×N grid of μ, row-major with y growing down the rows.
 * @param {boolean} contrast
 */
export function phantom(contrast) {
  const img = new Float64Array(N * N);
  for (let r = 0; r < N; r += 1) {
    for (let c = 0; c < N; c += 1) {
      img[r * N + c] = muAtPoint(cellCentre(c), cellCentre(r), contrast);
    }
  }
  return img;
}

/**
 * Bilinear sample of a grid at a point (cm); zero outside it.
 * @param {Float64Array} img @param {number} x @param {number} y
 */
function sample(img, x, y) {
  const fc = x / CELL + (N - 1) / 2;
  const fr = y / CELL + (N - 1) / 2;
  const c0 = Math.floor(fc);
  const r0 = Math.floor(fr);
  const tc = fc - c0;
  const tr = fr - r0;
  /** @param {number} r @param {number} c */
  const at = (r, c) => (r < 0 || c < 0 || r >= N || c >= N ? 0 : img[r * N + c]);
  return (
    (1 - tr) * ((1 - tc) * at(r0, c0) + tc * at(r0, c0 + 1)) +
    tr * ((1 - tc) * at(r0 + 1, c0) + tc * at(r0 + 1, c0 + 1))
  );
}

/** Detector bins across the beam, one per grid cell. */
export const BINS = N;
/** Position (cm) of detector bin `k` across the beam. */
export const binAt = (/** @type {number} */ k) => (k - (BINS - 1) / 2) * CELL;

/**
 * The beam direction at `deg`: 0° shines from the top of the slice
 * downwards (front to back of the head), angles turn clockwise.
 * @param {number} deg
 */
export function beamFrame(deg) {
  const a = (deg * Math.PI) / 180;
  return { ux: -Math.sin(a), uy: Math.cos(a), tx: Math.cos(a), ty: Math.sin(a) };
}

/**
 * Line integrals ∫μ ds (no unit) along the parallel rays at `deg`, one per
 * detector bin.
 * @param {Float64Array} img @param {number} deg
 */
export function project(img, deg) {
  const { ux, uy, tx, ty } = beamFrame(deg);
  const half = (FIELD / 2) * Math.SQRT2;
  const step = CELL / 2;
  const p = new Float64Array(BINS);
  for (let k = 0; k < BINS; k += 1) {
    const t = binAt(k);
    let sum = 0;
    for (let s = -half; s <= half; s += step) {
      sum += sample(img, t * tx + s * ux, t * ty + s * uy);
    }
    p[k] = sum * step;
  }
  return p;
}

/**
 * Ram-Lak (ramp) filtering of one projection, spacing CELL.
 * @param {Float64Array} p
 */
function rampFilter(p) {
  const q = new Float64Array(BINS);
  for (let k = 0; k < BINS; k += 1) {
    let sum = 0;
    for (let j = 0; j < BINS; j += 1) {
      const n = k - j;
      let h = 0;
      if (n === 0) h = 1 / (4 * CELL * CELL);
      else if (n % 2 !== 0) h = -1 / (Math.PI * Math.PI * n * n * CELL * CELL);
      sum += p[j] * h;
    }
    q[k] = sum * CELL;
  }
  return q;
}

/**
 * The `count` scan angles spread evenly over half a turn.
 * @param {number} count
 */
export const scanAngles = (count) => Array.from({ length: count }, (_, i) => (180 * i) / count);

/**
 * The slice rebuilt from projections at `count` even angles by filtered
 * back-projection, as an N×N grid of μ.
 * @param {Float64Array} img @param {number} count
 */
export function reconstruct(img, count) {
  const out = new Float64Array(N * N);
  for (const deg of scanAngles(count)) {
    const q = rampFilter(project(img, deg));
    const { tx, ty } = beamFrame(deg);
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
        const f = (cellCentre(c) * tx + cellCentre(r) * ty) / CELL + (BINS - 1) / 2;
        const k0 = Math.floor(f);
        const w = f - k0;
        const a = k0 >= 0 && k0 < BINS ? q[k0] : 0;
        const b = k0 + 1 >= 0 && k0 + 1 < BINS ? q[k0 + 1] : 0;
        out[r * N + c] += (1 - w) * a + w * b;
      }
    }
  }
  const k = Math.PI / count;
  for (let i = 0; i < out.length; i += 1) out[i] *= k;
  return out;
}

/**
 * Root-mean-square difference (cm⁻¹) between two grids.
 * @param {Float64Array} a @param {Float64Array} b
 */
export function rmsError(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i += 1) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s / a.length);
}

/**
 * Mean of a grid over the cells inside the lesion, and over a ring of brain
 * around it: the contrast a radiologist reads.
 * @param {Float64Array} img
 */
export function lesionContrast(img) {
  let inSum = 0;
  let inN = 0;
  let outSum = 0;
  let outN = 0;
  for (let r = 0; r < N; r += 1) {
    for (let c = 0; c < N; c += 1) {
      const d = Math.hypot(cellCentre(c) - LESION.x, cellCentre(r) - LESION.y);
      if (d <= LESION.r - CELL / 2) {
        inSum += img[r * N + c];
        inN += 1;
      } else if (d >= LESION.r + CELL && d <= LESION.r + 2.5 * CELL) {
        outSum += img[r * N + c];
        outN += 1;
      }
    }
  }
  return { lesion: inSum / inN, around: outSum / outN };
}

/**
 * Grey level 0 (black) to 1 (white) of μ in a display window [lo, hi].
 * @param {number} mu @param {number} lo @param {number} hi
 */
export const grey = (mu, lo, hi) => Math.min(1, Math.max(0, (mu - lo) / (hi - lo)));
