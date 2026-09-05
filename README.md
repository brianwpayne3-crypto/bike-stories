# Bike Stories

BikeStories is a product-research project exploring a simple idea:

> **Every bike has a story. Give it somewhere to live.**

The current phase is **research and controlled product experimentation, not application implementation**.

## Live phone-capture data

Real submissions from the iPhone Shortcut are persisted in **private Vercel Blob**. When inspecting what has actually been sent from the phone, use the live capture store rather than conversation memory or experiment fixtures.

- [`docs/working-with-live-data.md`](docs/working-with-live-data.md) — short future-session runbook.
- [`docs/capture-data-operations.md`](docs/capture-data-operations.md) — storage, Vercel deployment, endpoints, known checkpoint, and troubleshooting details.

## Current product model

The bicycle is the persistent anchor, but the **memory is the atomic unit of capture**.

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

BikeStories should make it easy to preserve small pieces of lived experience around a bicycle without requiring the owner to know the larger story yet.

The capture promise is:

> **Don't write the story. Just save the memory.**

A working interaction model is:

> **Stuff + ramble → Memory**

Over time, related memories may reveal larger Stories, Stories may form Chapters, and those Chapters may contribute to an evolving Life of a Bike. None of those higher-order structures should be forced when the evidence does not support them.

## Artifacts are broader than photographs

BikeStories is not a photo-only product. Potential source material includes photographs, receipts, brochures, PDFs, spreadsheets, build sheets, parts lists, notes, screenshots, emails or forum posts supplied or authorized by the owner, ride data, race results, GPX files, maps, links, audio recollections, and other structured or unstructured evidence.

Current experiments have been heavily image-based because photographs are convenient controlled test material. Mixed-artifact understanding remains a future research problem rather than a product-scope limitation.

## AI role

AI should act as an **editor and organizer, not the author of the owner's memories**.

It can:

- organize artifacts and candidate memories;
- identify possible relationships;
- remove repetition and construct readable narratives;
- ask a high-value clarification when an important information gap remains;
- preserve uncertainty when the owner does not know or remember.

It should be conservative about chronology, motives, significance, causality, relationships, and meaning that the owner or artifacts did not establish.

Important working distinctions include:

- **Bike identity ≠ memory relationship ≠ story relationship**
- **Image similarity ≠ memory identity**
- **Visually plausible chronology ≠ established chronology**
- **Uncertainty is first-class source information**

A valid result can simply be:

> **Saved. I don't think there's a story here yet.**

## Clarification is product data

A newer product realization is that the clarification conversation itself should not be treated as disposable chat.

When AI interprets source material, identifies an uncertainty, asks the owner a question, receives an answer, and then changes its interpretation, that sequence can improve both the biography of that particular bicycle and BikeStories' future behavior.

A useful structured learning record is:

> **Input artifacts → initial AI interpretation → uncertainty / information gap → clarification question → owner answer → revised interpretation → Memory / Story / no-story outcome**

The goal is to learn which questions actually change memory boundaries, chronology, relationships, or story decisions—and which questions merely add burden.

This reinforces the clarification principle:

> **Minimize information gaps, not question count.**

Near-term improvement does not require retraining a foundation model. Properly permissioned prior patterns can support retrieval, evaluation, prompt/agent improvement, ranking, and later model training if it ever becomes justified.

Personal continuity and general product learning must remain separate privacy/consent concerns: an owner's prior answers can naturally help BikeStories understand that owner's bicycle later, while using interaction patterns to improve the product for other users should be governed deliberately.

See [`docs/product-decisions-learning-from-clarification-addendum.md`](docs/product-decisions-learning-from-clarification-addendum.md).

## Research principles

The experiments are deliberately testing the difficult boundaries before implementation:

- when a group of artifacts represents one Memory versus several;
- when related Memories are sufficient to support a Story;
- whether AI can resist manufacturing narrative coherence;
- how owner uncertainty should be preserved;
- what context is necessary to avoid plausible but false chronology or meaning;
- whether AI can discover useful material from a larger messy archive;
- how mixed artifact types should eventually contribute evidence;
- how clarification interactions can become a durable learning loop.

The broader principle is:

> **Preserve first. Organize when confident. Tell a story only when one is actually there.**

## Controlled experiments

Controlled experiments live under [`experiments/`](experiments/). Raw inputs should be frozen so changes in AI behavior can be compared against the same evidence.

- [`voyager-001`](experiments/voyager-001/) — first visual-narrative reference case.
- Voyager 002 — constrained editorial composition research.
- Voyager 003 — blinded story inference; exposed false chronology and the danger of visually satisfying narrative conclusions.
- Experiment 004 — negative control using same-bike material that did not form one story; validated no-story behavior and uncertainty preservation.
- [`experiment-005`](experiments/experiment-005/) — planned messy-photo-archive discovery experiment testing retrieval and candidate-memory discovery without owner pre-curation.

## Current status

Implementation remains intentionally deferred while the product model and AI behavior stabilize through research.

The emerging long-term direction is less a bicycle database than a system for preserving grounded pieces of lived experience around a physical object that persists over time.

A concise statement of the current product direction is:

> **Artifacts are evidence. Memories are what BikeStories preserves. Stories emerge only when the evidence and memories support them.**

## Product decisions

Authoritative product decisions and research addenda live in [`docs/`](docs/), including:

- [`docs/product-decisions.md`](docs/product-decisions.md)
- [`docs/product-decisions-experiment-004-addendum.md`](docs/product-decisions-experiment-004-addendum.md)
- [`docs/product-decisions-artifact-scope-addendum.md`](docs/product-decisions-artifact-scope-addendum.md)
- [`docs/product-decisions-learning-from-clarification-addendum.md`](docs/product-decisions-learning-from-clarification-addendum.md)

## Source of truth

This repository supersedes the original BikeStories planning thread in `brianwpayne3-crypto/personal-backlog#14` and is the current source of truth for the product research.