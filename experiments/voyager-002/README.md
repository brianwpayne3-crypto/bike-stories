# Voyager Experiment 002 — constrained editorial composition

## Hypothesis

BikeStories should not ask AI to invent a page layout from scratch. It should use AI to select and configure proven editorial composition patterns inside a constrained design system.

## Control

This experiment deliberately reuses the **exact frozen Voyager 001 source bundle and grounded story content**. It does not add new photos, new owner memories, or a new narrative. The variable under test is composition.

Canonical source remains `experiments/voyager-001/source/`.

## Design research foundation

Primary reference: [XD-QIN/astro-photo-folio](https://github.com/XD-QIN/astro-photo-folio), an MIT-licensed Astro photography portfolio/blog template by Xudong Qin.

Useful patterns observed there include:
- restrained editorial serif typography;
- readable constrained prose width;
- responsive image presentation;
- single-photo and multi-photo primitives;
- image viewing that preserves the full source;
- separation between content description and visual rendering.

Experiment 002 does not attempt to port the entire Astro application. It uses those proven patterns as design-system research for a static controlled artifact.

License verified from the upstream repository on 2026-08-29: MIT License, copyright (c) 2026 Xudong Qin.

## Composition selected for Voyager

The Voyager material is mixed-media and history-heavy: a complete bike, surviving paperwork/original-owner material, workshop/change images, and later/current-state imagery. For this experiment the simulated AI selector chooses an **archive/editorial** composition rather than a generic hero-photo blog layout.

Allowed primitives used:
1. restrained story header;
2. contained lead photograph with no destructive crop;
3. narrow readable prose;
4. artifact spread for historical material;
5. asymmetric photo pair/triptych for process imagery;
6. quiet text-only turning point;
7. contained closing photographs.

## Visual rules under test

- Do not silently crop meaningful subject matter.
- “Show the whole image” is a constraint, not a layout strategy.
- Prefer intentional contained presentation over giant natural-size JPEGs.
- Let imperfect source images remain authentic; compensate with composition before editing the source.
- Avoid making every image equally large or equally important.
- Use supplied artifacts as narrative content, not a gallery appended to prose.
- On small screens, collapse compositions without introducing destructive crops.

## Evaluation

Compare the rendered Draft 002 against Draft 001 and ask:
- Does this feel intentionally designed rather than like ad hoc HTML?
- Is the bicycle/source content preserved?
- Do documents and photos feel integrated into the story?
- Is any image unnecessarily dominant?
- Does the page work at desktop and mobile widths?
- Would the owner want to keep or share the result?
- Can feedback be expressed as lightweight editorial direction rather than manual layout work?

## Important constraint

Draft 001 remains the baseline evidence. Do not keep polishing it to resemble Draft 002.