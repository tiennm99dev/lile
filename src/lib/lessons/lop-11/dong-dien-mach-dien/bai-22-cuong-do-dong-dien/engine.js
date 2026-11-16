/**
 * A model wire in which drawn carriers drift at one speed along a few lanes.
 * Lengths are in model centimetres; the number of lanes stands for the cross
 * section S and the carriers per centimetre of a lane for the density n. Every
 * drawn carrier stands for the same charge, so the count through the cross
 * section in a time Δt gives I = Δq/Δt, and it matches I = Snvq.
 */
import { rng } from '#lib/core/drill.js';
import { tidy } from '#lib/core/number-format.js';

/** Length of the drawn wire, model cm. */
export const WIRE = 12;

/** Where the counted cross section sits along the wire, model cm. */
export const SECTION = WIRE / 2;

/** Charge one drawn carrier stands for, C. */
export const CHARGE = 0.1;

/**
 * Carriers evenly spaced along each lane, `density` per cm, each lane shifted
 * by a seeded offset so the lanes do not line up.
 * @param {number} density carriers per cm of a lane
 * @param {number} lanes
 * @param {number} seed
 * @returns {Array<{ lane: number, x: number }>}
 */
export function makeCarriers(density, lanes, seed = 1) {
  const rand = rng(seed * 7919 + density * 31 + lanes);
  const gap = 1 / density;
  const out = [];
  for (let lane = 0; lane < lanes; lane++) {
    // Offsets stay off the grid of gaps so no carrier sits on the section.
    const offset = (0.15 + 0.7 * rand()) * gap;
    for (let k = 0; k < WIRE * density; k++) out.push({ lane, x: tidy(offset + k * gap, 9) });
  }
  return out;
}

/**
 * Moves every carrier `dx` cm along the wire (wrapping round at the end) and
 * counts how many pass the cross section.
 * @param {Array<{ lane: number, x: number }>} carriers
 * @param {number} dx less than the wire length
 */
export function drift(carriers, dx) {
  let passed = 0;
  const moved = carriers.map((c) => {
    const ahead = (((SECTION - c.x) % WIRE) + WIRE) % WIRE;
    if (ahead > 0 && ahead <= dx) passed += 1;
    return { lane: c.lane, x: (((c.x + dx) % WIRE) + WIRE) % WIRE };
  });
  return { carriers: moved, passed };
}

/**
 * Current the model wire carries, I = S·n·v·q in its own units.
 * @param {number} lanes @param {number} density @param {number} speed cm/s
 */
export const modelCurrent = (lanes, density, speed) => tidy(lanes * density * speed * CHARGE, 9);
