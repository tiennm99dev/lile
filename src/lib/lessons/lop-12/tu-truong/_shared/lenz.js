/**
 * Lenz's law for a loop lying in the page, in a field B⃗ that points out of
 * the page (`ra`, ⊙) or into it (`vao`, ⊗): the induced current makes its own
 * field oppose the change of flux, and by the right-hand grip rule a
 * counterclockwise current (seen from the front) makes a field out of the
 * page. The same turn gives the vortex electric field lines there.
 */

/** @typedef {'ra' | 'vao'} Way */
/** @typedef {'tang' | 'giam' | 'khong'} Change */

/**
 * The turn of the induced current seen from the front.
 * @param {Way} way @param {Change} change
 * @returns {'cw' | 'ccw' | null} clockwise, counterclockwise, or none for a steady flux
 */
export function inducedTurn(way, change) {
  if (change === 'khong') return null;
  // The opposing field points out of the page when B⃗ is out and the flux
  // shrinks, or B⃗ is in and the flux grows.
  const opposingOut = (way === 'ra') === (change === 'giam');
  return opposingOut ? 'ccw' : 'cw';
}
