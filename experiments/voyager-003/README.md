# Voyager Experiment 003 — Story Understanding

## Research question

Can BikeStories discover the story latent in a set of real bicycle artifacts without the owner explaining what each picture means or how the pictures should be sequenced?

This experiment tests **story understanding / story repeating**, not visual design.

## Why this must be a blinded rerun

The current BikeStories research conversation is already contaminated by later owner feedback: we now know the owner considers Voyager a before/after story, that the bike came home basically needing repair, and that the most recent finished-bike photograph should function as the payoff.

A model/session that has seen those findings cannot honestly be used to test whether AI would have discovered them independently.

Therefore the actual inference passes must run in a **fresh context** that is given only the allowed inputs below. Do not provide it with prior experiment findings, product-decisions commentary about Voyager's narrative arc, previous generated stories, or owner feedback about before/after sequencing.

## Frozen visual input

Use the exact 10 images from `../voyager-001/source/` without adding, removing, renaming, editing, or reordering them for narrative purposes.

- `IMG_7503.jpeg`
- `IMG_7505.jpeg`
- `IMG_7507.jpeg`
- `IMG_7509.jpeg`
- `IMG_8102 2.JPG`
- `IMG_8112.JPG`
- `IMG_8122.JPG`
- `IMG_8131.jpeg`
- `IMG_8194.JPG`
- `IMG_8199.JPG`

## Pass A — Photos only

Give the fresh model only the frozen visual source set and the following task:

> These images were supplied by one bicycle owner as material for a BikeStory. Do not write the finished story yet. Analyze the images as a set and produce an editorial story plan. Identify what appears to be happening, the likely relationships among the images, the narrative role each artifact might play, a likely sequence, what should receive the most visual emphasis, and any important uncertainty. Do not invent motives, memories, chronology, or meaning that the images do not support. If a missing fact would materially change the story, identify the single highest-value clarification question you would ask the owner.

Record the response verbatim before revealing any additional context.

## Pass B — Photos + ordinary owner context

Start another fresh context. Give it the same frozen images plus only the reconstructed original owner context that was available before later experiment learnings:

- the owner identifies the bike as a Schwinn Voyager and says it was purchased for $35;
- it came with the original sales receipt, brochure, and a photograph taken by the original owner;
- the initial plan was a quick once-over and to keep/restore it basically as-is;
- the owner considered changing the wheelset/wheel size;
- the owner ultimately made some comfort-oriented changes;
- touring racks already on hand were added;
- the supplied images include the bike across this period.

Then give the same editorial-planning task used in Pass A.

Do **not** provide the two later clarification answers in the first Pass B run. They can become a separate B2 run if useful, allowing us to measure what additional owner narration buys us.

## What we evaluate

Do not score prose beauty. Evaluate whether the model:

1. recognizes meaningful relationships among the artifacts rather than treating them as an album;
2. identifies a plausible transformation/process arc if supported by the evidence;
3. assigns useful narrative roles to images/documents;
4. chooses a sequence that creates a coherent telling rather than simply ranking images by attractiveness;
5. recognizes when a visually strong image may work better as a payoff than an opening hero;
6. distinguishes observation from inference;
7. surfaces consequential uncertainty instead of filling gaps with plausible fiction;
8. asks only a high-value clarification when one is actually needed;
9. adjusts appropriately when ordinary owner context is added in Pass B.

## Ground-truth comparison held back from the model

Only after Pass A and Pass B outputs are frozen should they be compared with later owner feedback already discovered in the research process:

- the owner describes this as essentially a before/after story;
- the bike came home basically needing repair;
- the last/most recent nice-bike photograph is the after state;
- the owner believes that image works better as the payoff at the end.

These facts are **evaluation material, not model input** for the blinded passes.

## Output convention

Store results under:

- `outputs/pass-a-photos-only.md`
- `outputs/pass-b-photos-plus-context.md`
- optionally `outputs/pass-b2-with-clarifications.md`
- `outputs/evaluation.md`

Freeze each output before proceeding to the next pass.

## Decision this experiment should inform

The purpose is not to prove that AI can always infer a story from photographs. It is to learn how much BikeStories can reliably infer before it needs the owner.

The product question is:

> **How little explanation can BikeStories ask from the owner while still recovering and repeating the owner's actual story rather than manufacturing one?**
