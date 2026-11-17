/**
 * Very large and very small quantities in TeX the way the book writes them,
 * a·10ⁿ with a decimal comma: 9.6e-15 → '9{,}6 \cdot 10^{-15}'.
 */
import { numTex } from '#lib/core/number-format.js';

/**
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
