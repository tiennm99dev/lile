import { describe, expect, it } from 'vitest';
import { sciTex } from './science.js';

describe('sciTex', () => {
  it('writes a·10ⁿ with a decimal comma', () => {
    expect(sciTex(9.6e-15)).toBe('9{,}6 \\cdot 10^{-15}');
    expect(sciTex(5.93e7)).toBe('5{,}93 \\cdot 10^{7}');
    expect(sciTex(9.999e7, 2)).toBe('1 \\cdot 10^{8}');
    expect(sciTex(3.5)).toBe('3{,}5');
    expect(sciTex(0)).toBe('0');
  });
});
