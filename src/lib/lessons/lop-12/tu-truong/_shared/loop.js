/**
 * A flat coil of N turns and area S turning in a uniform field B about an
 * axis perpendicular to B. α is the angle between the coil's normal n⃗ and
 * B⃗; turning at ω from α = φ at t = 0, α = ωt + φ, so
 * Φ = NBS·cos(ωt + φ) and, by Faraday's law, e = −Φ′ = NBSω·sin(ωt + φ).
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * Flux through N turns of area S at angle α (degrees) between n⃗ and B⃗,
 * Φ = NBS·cos α, in webers.
 * @param {number} B tesla @param {number} S m² @param {number} alpha degrees
 * @param {number} [N]
 */
export function fluxOf(B, S, alpha, N = 1) {
  return tidy(N * B * S * Math.cos((alpha * Math.PI) / 180), 12);
}

/**
 * Peak emf of the turning coil, E₀ = NBSω, in volts.
 * @param {number} N @param {number} B @param {number} S @param {number} omega rad/s
 */
export function peakEmf(N, B, S, omega) {
  return tidy(N * B * S * omega, 12);
}

/**
 * Flux and emf of the turning coil at time t.
 * @param {{ N: number, B: number, S: number, omega: number, phi?: number }} coil
 * @param {number} t seconds
 */
export function coilAt(coil, t) {
  const { N, B, S, omega, phi = 0 } = coil;
  const a = omega * t + phi;
  return {
    flux: tidy(N * B * S * Math.cos(a), 12),
    emf: tidy(N * B * S * omega * Math.sin(a), 12),
  };
}

/**
 * Average induced emf over a change of flux, e = −ΔΦ/Δt (N turns
 * included in the fluxes).
 * @param {number} before Wb @param {number} after Wb @param {number} dt s
 */
export function averageEmf(before, after, dt) {
  return tidy(-(after - before) / dt, 12);
}

/**
 * Angle in [0°, 360°).
 * @param {number} deg
 */
export function wrapDeg(deg) {
  return tidy(((deg % 360) + 360) % 360, 9);
}
