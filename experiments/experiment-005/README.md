# Experiment 005 — Messy archive discovery

## Status

**Planned / checkpointed. Not yet run.**

This experiment extends the BikeStories research from curated or semi-curated image sets into a larger, naturally messy source collection.

## Scope note

Experiment 005 deliberately uses a **photo archive** because it is testing discovery at larger scale with a convenient, naturally noisy corpus. This does **not** make BikeStories a photo-only product.

The broader product model remains:

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

Artifacts can include photographs, documents, receipts, spreadsheets/build sheets, notes, ride or route data, screenshots, audio recollections, and other owner-supplied or owner-authorized source material. Mixed-artifact understanding is a separate, currently untested research problem and should be evaluated in a future controlled experiment.

## Research question

Can BikeStories discover useful bicycle memories from an uncurated photo archive without requiring the owner to manually select the right images first?

The intended shift is from:

> **Here are some photos I selected. What do they mean?**

Toward:

> **Here is a larger pile of old photos. Is there anything about this bike worth remembering in here?**

This tests **discovery before preservation**, not just interpretation of already-selected artifacts.

## Initial experiment shape

Do **not** begin with hundreds or thousands of images. The first controlled version should use approximately **30–50 consecutive, naturally bounded photos** from an existing archive such as Flickr.

The set should be selected mechanically rather than editorially — for example, every photo from a particular date range — so that the owner is not pre-curating only the useful bicycle material.

The source set may legitimately contain:

- the target bicycle;
- other bicycles;
- landscapes;
- people;
- duplicate or low-quality photographs;
- unrelated subjects;
- multiple rides or trips;
- photos that depict the bicycle but do not currently support any meaningful memory.

Noise is part of the experiment.

## Why 30–50 images

A 30–50 image set is large enough to test retrieval, filtering, clustering, and memory discovery while remaining small enough to inspect manually and hand to a fresh multimodal model.

A much larger archive would introduce infrastructure and ingestion problems before the underlying product intelligence has been validated.

The first goal is **not** to prove that one model can ingest an entire 10,000-photo Flickr archive in a single prompt.

## Candidate source workflow

For the controlled experiment today, the simplest workflow is likely:

1. Identify a naturally bounded section of an existing Flickr or photo archive.
2. Download approximately 30–50 consecutive photos without hand-selecting only the useful ones.
3. Freeze the exact source set in the BikeStories repository before the blinded run.
4. Use a fresh ChatGPT conversation so prior BikeStories context does not contaminate the result.
5. Upload the frozen images to that conversation.
6. Ask the model to search the collection for material concerning one target bicycle and identify candidate memories without forcing unrelated images into stories.

Direct Flickr/API access is a future product/infrastructure experiment. It is not required to test the underlying discovery behavior first.

## Ground truth

Before the blinded model sees the source set, establish a private owner ground-truth note where possible.

This does **not** require identifying every photograph perfectly. Record enough known information to evaluate discovery quality, such as:

- memories or events the owner knows should be somewhere in the collection;
- photographs that look similar but actually belong to different events;
- photographs that appear unrelated but the owner knows belong to the same memory;
- images of the bicycle that do not carry meaningful memory value;
- known uncertainty or forgotten details.

Freeze this ground truth before reviewing the model output so the expected answer is not retrofitted after the experiment.

## Capabilities under test

### 1. Retrieval

Can the model identify likely images of the target bicycle among unrelated material?

### 2. Candidate memory discovery

Can the model identify plausible memory clusters without assuming that visually similar photographs are the same event?

Experiment 004 already established that:

> **Image similarity can discover candidate relationships, but cannot reliably determine memory boundaries.**

Experiment 005 should test that principle in a noisier environment.

### 3. Editorial judgment

Can the system distinguish between:

- material that appears worth preserving as a memory;
- supporting evidence;
- unresolved or weakly related artifacts;
- images that currently add nothing useful?

Finding a bicycle in a photograph is not sufficient reason to manufacture a memory or story.

### 4. Restraint

The model should be comfortable finding very little.

A valid result might be:

> I found material that may support two memories, several supporting artifacts, and a number of bicycle photographs that do not currently establish anything worth grouping.

The system should not equate every discovered bicycle photograph with a separate BikeStory.

## Working discovery model

Conceptually:

> **Source corpus → candidate evidence → Memory → Story**

The first two stages are provisional.

An external archive is a **search corpus**, not automatically BikeStories content. Giving BikeStories access to a collection should not imply that every asset is imported, copied, published, or permanently attached to a bicycle.

Potential long-term interaction:

> **Connect source → search broadly → surface candidate evidence → owner confirms/clarifies → preserve selectively**

This aligns with the existing principle:

> **Search broadly; preserve selectively.**

## Possible blinded prompt

A future blinded prompt can be intentionally simple. For example:

> These images come from a larger personal photo archive. I used to ride one particular bicycle a lot. Search this collection for material that appears to concern that bicycle and tell me whether anything here looks worth preserving as a memory. Do not assume every photograph of the bicycle belongs to the same event, memory, or story. Leave uncertain material unresolved. Distinguish likely supporting artifacts from candidate memories and from images that do not currently add anything meaningful. Do not invent chronology, motives, events, locations, relationships, or significance. Ask only one clarification if it would materially improve the result.

The exact prompt should be finalized only after the frozen source set and target bicycle are chosen.

## Success indicators

Strong evidence for the product concept would include the model:

- finding the target bicycle among noisy material;
- surfacing one or more candidate memories the owner recognizes;
- avoiding false grouping of separate events;
- rejecting or leaving unrelated photos alone;
- preserving uncertainty rather than guessing;
- recognizing that some bicycle photographs have no current memory/story value;
- asking a high-value clarification only where owner knowledge genuinely matters.

A particularly strong result would be rediscovery: the system surfaces something that causes the owner to realize, **I had forgotten about that.**

## Failure indicators

Failure modes include:

- treating all target-bike photographs as one story;
- treating each bicycle photograph as its own story;
- inventing chronology from visual similarity;
- confusing topic similarity with memory/event identity;
- forcing unrelated archive material into a bicycle narrative;
- requiring extensive owner classification before doing useful discovery;
- importing or treating the whole archive as permanent BikeStories content merely because it was searchable.

## Longer-term scale architecture hypothesis

If the discovery behavior works, the eventual application should process large archives in stages rather than send every full-resolution image through expensive narrative reasoning.

A possible future pipeline is:

> **Large archive → inexpensive visual/metadata indexing → likely target-bike evidence → candidate relationship clusters → deeper memory reasoning → selectively preserved memories/artifacts**

For example, a future system might reduce 10,000 archive photos to 100–200 likely target-bike images before deeper reasoning, then further reduce those to a small number of candidate memories.

This is an architectural hypothesis, not an implementation commitment.

## Checkpoint

No source collection has been selected yet. No files have been frozen. No blinded model run has occurred. No Experiment 005 result should be inferred from this document.

The next step, when research resumes, is to choose a real naturally bounded archive slice and determine the easiest reliable way to obtain approximately 30–50 consecutive source images without manually curating them.