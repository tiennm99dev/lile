import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { texOptions, texSource } from '#lib/core/katex-options.js';
import { richParts } from '#lib/core/rich-parts.js';
import { REACTIONS, SKILLS, missingSteps, reactionTex } from './engine.js';

describe('generated TeX', () => {
  it('renders without KaTeX errors or warnings', () => {
    /** @type {string[]} */
    const texts = [];
    for (let seed = 1; seed <= 30; seed++)
      for (const q of buildSet(SKILLS, 3, seed))
        texts.push(q.prompt, ...q.steps, ...(q.hints ?? []));
    for (const r of REACTIONS) texts.push(`$${reactionTex(r)}$`, ...missingSteps(r));
    /** @type {string[]} */
    const warned = [];
    for (const t of texts)
      for (const part of richParts(t)) {
        if (part.kind !== 'tex') continue;
        const base = texOptions(false);
        try {
          katex.renderToString(texSource(part.tex), {
            ...base,
            throwOnError: true,
            strict: (/** @type {string} */ code, /** @type {string} */ msg) => {
              if (base.strict(code, msg) === 'warn') warned.push(`${part.tex}: ${msg}`);
              return 'ignore';
            },
          });
        } catch (e) {
          warned.push(`${part.tex}: ${e}`);
        }
      }
    expect(warned).toEqual([]);
  });
});
