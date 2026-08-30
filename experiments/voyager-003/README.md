# Voyager Experiment 003 — Story Understanding

## Research question

Can BikeStories discover the story latent in a set of real bicycle artifacts without the owner explaining what each picture means or how the pictures should be sequenced?

This experiment tests **story understanding / story repeating**, not visual design.

## Protocol

Two blinded passes were run in fresh contexts using the same ten frozen Voyager source images.

- **Pass A:** photos only.
- **Pass B:** photos plus ordinary owner context.

The experiment was intended to measure how much reliable narrative structure AI could recover before needing clarification from the owner.

## Key findings

Pass A found a plausible visual narrative skeleton, but over-read the material as a restoration/recommissioning story. Pass B improved substantially once ordinary owner context was added and reframed the material around a smaller tension between preservation and use.

The experiment also exposed two important failures after owner review:

- the riding POV looked like a natural ending but actually predates some later changes;
- the latest/current bike image still shows unfinished work, so the material does not contain a clean finished-state payoff.

Those failures changed the product model. BikeStories should not assume that a supplied evidence pile is already a complete story. The Voyager source can be understood more safely as a **candidate memory** whose eventual story may only become clear after later memories accumulate.

## Product learnings

- Visual plausibility is not enough to establish chronology.
- Artifact selection and narrative sequencing are separate editorial tasks.
- Owner context can radically change the interpretation of identical source material.
- A strong-looking ending can still be historically wrong.
- The correct system behavior may be to preserve an incomplete memory rather than force it into a finished narrative.
- AI should recognize when there is not yet enough evidence for a story.

## Frozen outputs

- `pass-a-photos-only.md`
- `pass-b-photos-plus-owner-context.md`

The original branch remains part of the experiment lineage, but these artifacts are now recorded on `main` so the research history and GitHub Pages summary can evolve from the current product model.