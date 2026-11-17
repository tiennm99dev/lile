/**
 * Constants and small helpers shared by the quantum physics lessons, with the
 * values the book computes with: h = 6,625·10⁻³⁴ J·s, c = 3·10⁸ m/s,
 * e = 1,6·10⁻¹⁹ C, mₑ = 9,1·10⁻³¹ kg.
 */
import { numTex } from '#lib/core/number-format.js';

export const H = 6.625e-34;
export const C = 3e8;
export const E_CHARGE = 1.6e-19;
export const M_ELECTRON = 9.1e-31;

/** hc in eV·nm with these constants (about 1 242), so ε(eV) = HC_EV_NM / λ(nm). */
export const HC_EV_NM = ((H * C) / E_CHARGE) * 1e9;

/**
 * Photon energy (eV) of light of wavelength `nm`.
 * @param {number} nm
 */
export const photonEv = (nm) => HC_EV_NM / nm;

/**
 * Wavelength (nm) of a photon of energy `ev`.
 * @param {number} ev
 */
export const wavelengthNm = (ev) => HC_EV_NM / ev;

/**
 * Very large and very small quantities in TeX the way the book writes them,
 * a·10ⁿ with a decimal comma: 9.6e-15 → '9{,}6 \cdot 10^{-15}'.
 * @param {number} value
 * @param {number} [decimals] places kept in the mantissa
 */
export function sciTex(value, decimals = 2) {
  if (value === 0) return '0';
  let exp = Math.floor(Math.log10(Math.abs(value)));
  let mant = Number((value / 10 ** exp).toPrecision(decimals + 1));
  if (Math.abs(mant) >= 10) {
    mant /= 10;
    exp += 1;
  }
  if (exp === 0) return numTex(mant, decimals);
  return `${numTex(mant, decimals)} \\cdot 10^{${exp}}`;
}

/** Visible light, as the book bounds it (nm). */
export const VISIBLE = /** @type {const} */ ({ min: 380, max: 760 });

/**
 * The part of the electromagnetic spectrum a wavelength (nm) falls in, for
 * the radiations met in these lessons.
 * @param {number} nm
 * @returns {'tia X' | 'tử ngoại' | 'nhìn thấy' | 'hồng ngoại'}
 */
export function regionOf(nm) {
  if (nm < 10) return 'tia X';
  if (nm < VISIBLE.min) return 'tử ngoại';
  if (nm <= VISIBLE.max) return 'nhìn thấy';
  return 'hồng ngoại';
}

/** Colour stops of the visible spectrum: wavelength (nm) and RGB. */
const STOPS = /** @type {const} */ ([
  [380, [120, 40, 170]],
  [430, [80, 40, 220]],
  [460, [40, 90, 255]],
  [490, [0, 190, 230]],
  [520, [30, 200, 60]],
  [565, [200, 220, 20]],
  [590, [255, 180, 0]],
  [620, [255, 90, 0]],
  [660, [230, 20, 20]],
  [760, [140, 0, 0]],
]);

/**
 * An approximate display colour for a visible wavelength, or null outside the
 * visible range.
 * @param {number} nm
 * @returns {string | null}
 */
export function spectrumColor(nm) {
  if (nm < VISIBLE.min || nm > VISIBLE.max) return null;
  let i = 0;
  while (i < STOPS.length - 2 && nm > STOPS[i + 1][0]) i += 1;
  const [l0, c0] = STOPS[i];
  const [l1, c1] = STOPS[i + 1];
  const t = (nm - l0) / (l1 - l0);
  const hex = c0
    .map((v, k) => Math.round(v + (c1[k] - v) * t))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
  return `#${hex}`;
}

/**
 * The book's names of the seven colours, by the wavelength they start at (nm).
 * Chàm starts at 430 nm so that hydrogen's 434 nm line is chàm, as the book
 * names it.
 */
const COLOUR_NAMES = /** @type {const} */ ([
  [380, 'tím'],
  [430, 'chàm'],
  [460, 'lam'],
  [500, 'lục'],
  [570, 'vàng'],
  [590, 'da cam'],
  [620, 'đỏ'],
]);

/**
 * The colour name of a visible wavelength (nm), or null outside it.
 * @param {number} nm
 * @returns {string | null}
 */
export function colourName(nm) {
  if (nm < VISIBLE.min || nm > VISIBLE.max) return null;
  /** @type {string} */
  let name = COLOUR_NAMES[0][1];
  for (const [from, n] of COLOUR_NAMES) if (nm >= from) name = n;
  return name;
}
