# Bike Stories

BikeStories is a product-research project exploring a simple idea:

> Every bike has a story. Give it somewhere to live.

The current phase is **research and controlled product experimentation, not application implementation**.

## Current product direction

The atomic unit is the **story**, not the bike record. The emerging v0 interaction is:

**Dump assets + ramble → AI evaluates what is known → asks one high-value clarification at a time only if needed → constructs a grounded visual story from the supplied material → optional lightweight correction → save.**

Key principles are maintained in [`docs/product-decisions.md`](docs/product-decisions.md).

## Experiments

Controlled experiments live under `experiments/`. Their raw inputs should be frozen so changes to AI behavior can be compared against the same evidence.

- [`voyager-001`](experiments/voyager-001/) — first reference case, based on a 1991 Schwinn Voyager and 10 supplied visual assets.

## Source of truth

This repository supersedes the original BikeStories planning thread in `brianwpayne3-crypto/personal-backlog#14`.