import { describe, expect, it } from 'vitest';
import {
  HC_EV_NM,
  colourName,
  photonEv,
  regionOf,
  sciTex,
  spectrumColor,
  wavelengthNm,
} from './quantum.js';

describe('photon energy', () => {
  it('uses the book constants', () => {
    expect(HC_EV_NM).toBeCloseTo(1242.1875, 6);
    expect(photonEv(621.09375)).toBeCloseTo(2, 9);
    expect(wavelengthNm(photonEv(500))).toBeCloseTo(500, 9);
  });
});

describe('sciTex', () => {
  it('writes a·10ⁿ with a decimal comma', () => {
    expect(sciTex(6.625e-19)).toBe('6{,}63 \\cdot 10^{-19}');
    expect(sciTex(5.68e-19, 3)).toBe('5{,}68 \\cdot 10^{-19}');
    expect(sciTex(9.999e7, 2)).toBe('1 \\cdot 10^{8}');
    expect(sciTex(3.5)).toBe('3{,}5');
    expect(sciTex(0)).toBe('0');
  });
});

describe('spectrum regions and colours', () => {
  it('names the region and colour of a wavelength', () => {
    expect(regionOf(122)).toBe('tử ngoại');
    expect(regionOf(656)).toBe('nhìn thấy');
    expect(regionOf(1875)).toBe('hồng ngoại');
    expect(colourName(656)).toBe('đỏ');
    expect(colourName(486)).toBe('lam');
    expect(colourName(410)).toBe('tím');
    expect(colourName(434)).toBe('chàm');
    expect(colourName(300)).toBeNull();
  });

  it('gives a hex colour only inside the visible range', () => {
    expect(spectrumColor(656)).toMatch(/^#[0-9a-f]{6}$/);
    expect(spectrumColor(380)).toBe('#7828aa');
    expect(spectrumColor(760)).toBe('#8c0000');
    expect(spectrumColor(200)).toBeNull();
    expect(spectrumColor(900)).toBeNull();
  });
});
