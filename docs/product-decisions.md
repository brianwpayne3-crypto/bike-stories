# Product decisions and findings

This document is the maintained BikeStories product-research source of truth. It consolidates the useful findings from the original `personal-backlog#14` discussion and supersedes earlier assumptions where noted.

## Product purpose

BikeStories is primarily a **storytelling and story-preservation product centered on physical bicycles**. It is not primarily a digital garage, inventory system, maintenance database, or generic social network.

Useful framing:

> Every bike has a story. Give it somewhere to live.

> People have profiles. Bikes have biographies.

The physical bicycle provides continuity across stories over time, but the **story is the atomic unit**. Do not begin by making the user create empty bike records or populate a garage.

## Core problem

The main competitor in v0 is **doing nothing**. Photos remain in the camera roll, notes and links disappear, and the story never gets told because organizing, writing, captioning, laying out, and publishing it is too much work.

Success is therefore not perfect documentation. A useful success question is:

> Did a worthwhile story exist afterward that otherwise probably would not have existed?

Completeness is not the initial goal. Preservation is.

## Emerging v0 interaction

At its simplest:

> **Stuff → Story**

More explicitly:

> **Dump assets + ramble → AI evaluates what is known → ask one high-value clarification if needed → reevaluate after every answer → construct a grounded visual draft → optional lightweight correction/enrichment → save.**

Input can be messy: photos, screenshots, notes, dictation, links, documents, receipts, PDFs, build lists, etc. The user should not have to organize or classify it first.

The dump should be treated as a **candidate evidence pile**, not as a declaration that every supplied artifact belongs in the published story. A realistic user request is closer to “here is a pile of stuff I think might help; make a story out of it” than “here are the ten correctly selected and sequenced assets for this story.”

## AI role: editor, not author

The AI should do nearly all of the organizational/editorial work while avoiding invented personal meaning.

Core rules:

> **Infer structure; be reluctant to infer meaning.**

> **Preserve the owner's voice; remove the owner's workload.**

> **When meaning matters and the source material does not establish it, ask or omit — don't invent.**

The AI should be comfortable:
- grouping related assets;
- identifying supported chronology and structure;
- extracting reliable details from supplied material;
- turning rambling input into readable prose;
- removing repetition;
- proposing title and layout;
- selecting useful image groupings and placements;
- revising conversationally after user feedback.

It should be conservative about inventing:
- motives;
- feelings;
- memories;
- significance;
- causal relationships;
- reasons for choices;
- polished connective tissue that changes the owner's meaning.

The quality bar is:

> **This is basically what I would have written if I'd actually taken the time to write it.**

The user should not have to polish generic AI prose.

## Story repeating: recover rather than manufacture

A useful emerging description of the AI task is **story repeating** rather than conventional story writing.

The story already happened and belongs to the owner. The AI should recover the story latent in the supplied photographs, documents, chronology, and messy owner input, then repeat it back coherently without manufacturing a more dramatic or meaningful narrative than the evidence supports.

This creates a central research question:

> **How good is AI at discovering the story that is already embedded in a pile of real artifacts plus some owner input?**

The system should attempt to understand narrative relationships among artifacts, not merely rank them by photographic quality or arrange them attractively. For example, an image may function as setup/before, historical context, process/transition, turning point, result/after, or payoff. These are useful internal editorial roles, not formal story types that users must choose.

A key Voyager finding is that **composition selection and narrative sequencing are separate problems**. A good-looking layout can still tell the story poorly if it reveals the visual payoff too early or fails to recognize a before/process/after relationship.

Working rule:

> **Infer the narrative role of artifacts when the evidence is strong. When that role materially affects the story and is uncertain, ask rather than silently inventing it.**

This applies the product's grounding rules to visual sequencing as well as prose.

## Artifact selection: the dump is not the edit

Voyager Experiment 003 exposed another distinct editorial task: **deciding whether a supplied artifact belongs in the inferred story at all**.

A visually compelling photograph can be authentic and still be misleading in a particular narrative role. In Voyager, a riding photograph looked like a natural resolution in both blinded passes, but owner clarification later established that the ride occurred before some of the changes being discussed. If the story is specifically about those changes, presenting that photograph as the final result would imply a chronology the evidence does not support.

Therefore:

> **Supplying an artifact means “consider this as evidence,” not “publish this in the story.”**

The system should be able to classify candidate artifacts as central, supporting, uncertain, or unused. Leaving an image out is legitimate editorial work, not a failure to use the user's material.

Artifact roles are also **story-dependent rather than inherent**. The same riding photograph might be misleading as the payoff to a transformation story but highly relevant to a broader story about learning and riding the bike over time.

A more complete internal pipeline is therefore:

> **messy evidence pile → infer candidate story → infer chronology and artifact roles → identify conflicts/uncertainties → select the subset that actually supports this story → construct the visual narrative**

The AI should not force every source artifact into the output merely because the user supplied it.

## Clarification behavior

Do not optimize for a fixed number of questions. Optimize for closing only the information gaps necessary to tell a grounded, worthwhile story.

> **Minimize information gaps, not question count.**

Questions should be asked **one at a time**, never as a questionnaire the user must remember and answer in bulk.

After each answer:
1. absorb the answer;
2. reevaluate what is now known;
3. determine whether the answer also closed other gaps;
4. ask a simple follow-up only if the prior answer was too vague to be useful;
5. stop as soon as enough grounded context exists.

Information density matters. One long answer may close several gaps; short answers may require more exchanges. The number of questions also scales with the story: a tiny component-change story may need zero, while a large tour may need several.

Do not keep interviewing merely to make a story marginally richer.

## Supplied assets are first-class story content

A major experiment failure was treating user-supplied images as context for prose and then inserting a generic internet bicycle image into the output.

That is explicitly wrong.

> **Story construction means constructing the visual narrative, not merely writing prose and attaching an album.**

The finished artifact should interweave the owner's supplied photos/documents with narrative blocks. The AI should decide when one image should dominate, when several images belong together, when a document should sit beside a passage, and when text should stand alone.

Default rule:

> **Use the owner's supplied material. Do not introduce outside imagery unless explicitly requested or a future feature clearly calls for sourced external context.**

Provenance matters because a visually similar outside image can falsely imply that it depicts the user's bicycle or event.

## Let the material determine the medium

BikeStories should not assume that every worthwhile story needs a conventional written narrative. The relative importance of words, photographs, documents, and other artifacts should emerge from the supplied material.

> **Understand what story is actually present, understand which supplied artifacts carry that story, and construct the lightest combination of words and visuals that tells it well.**

Story quality and artifact quality are independent variables. A mundane event with exceptional photographs may make an excellent visual BikeStory. A genuinely interesting story with weak or sparse photographs may need to be primarily words. A story with strong narrative and strong artifacts may use both heavily.

The AI should therefore avoid padding visually strong stories with unnecessary prose merely because the output is called a story. A bicycle build documented with excellent process photographs may be mostly visual, with only enough text to establish progression, decisions, and context.

A future contrasting experiment should test this directly using a visually rich bicycle build — for example, a first electronic-shifting build — to see whether the system recognizes a **visually dominant process story** and resists over-writing it.

## Stories can be unfinished because bikes keep changing

A BikeStory does not need to manufacture closure merely because the user has stopped adding material for now. A bike may still be in progress, a planned change may not have happened yet, or the most recent photograph may itself show an unfinished state.

> **A BikeStory does not need to pretend the story is finished just because the user is done adding material today.**

The system should be comfortable preserving an unresolved or in-progress story rather than selecting an older image as a false payoff or writing a tidy conclusion unsupported by the bike's actual state.

This reinforces the biography model: the physical bicycle persists while stories accumulate around it. A later BikeStory may complete, extend, complicate, or change the meaning of an earlier one.

> **New stories can complete, revise, or extend the meaning of earlier stories without rewriting their history.**

The earlier story should remain a historical artifact representing what was known and happening at that point. BikeStories should not silently rewrite it simply because later events provide a cleaner ending.

## Intelligence across stories: biography synthesis

The story remains the atomic unit, but the intelligence layer should eventually operate **across stories attached to the same bicycle**.

Individual stories might document acquisition, an unfinished cockpit experiment, a later completed setup, a first century, a failure, another rebuild, or a trip. Over time, the system may recognize that these separate stories form a larger arc.

Conceptually:

> **Story 1 + Story 2 + Story 3 → evolving bike biography**

A higher-order biography can synthesize material across those stories while preserving each original story independently. This creates a distinction between:
- **story-level truth:** what was known, happening, and worth preserving when that story was created;
- **biography-level understanding:** what becomes visible only after later stories add more evidence and context.

Potential AI behavior includes recognizing that a later story resolves an earlier open thread, that a configuration changed between stories, that an earlier image should no longer be interpreted as the final state, or that several small stories together form a meaningful larger narrative.

This should not initially mean silently merging or rewriting stories. The safer product model is **persistent individual stories plus an evolving synthesized biography**.

A future controlled experiment should provide two or more separate source dumps from different points in the same bicycle's life and test whether the AI can independently:
- recognize that they concern the same evolving object;
- identify which earlier threads are extended or resolved;
- distinguish conflicting or superseded states;
- construct a larger narrative without erasing the integrity of the original stories.

## Timeline decision for v0

Earlier thinking proposed ordering a bike's biography by the historical/event date contained inside each story. That has been superseded for the initial product.

Current decision:

> **A bike's story stream is ordered by each BikeStory's creation timestamp.**

Dates inside the story belong to the story's content and may refer to any point in the bicycle's life. A story created in 2027 could include a 1991 receipt and still appear in the stream as a 2027-created story.

A historical/event-date view may be derived later if real usage demonstrates value. v0 does not need to solve historical reconstruction or multiple timeline modes.

## Story breadth

“Story” is intentionally broad. It can be:
- one photo and one sentence;
- a small component change;
- a build or restoration;
- in-progress thinking about what to do next;
- a ride or event;
- a multi-week trip with many photos and narrative.

Avoid forcing formal story types in the MVP.

Useful principle:

> **A BikeStory can be as small as a moment or as large as an adventure. It can document what happened, what is happening, or what the owner is thinking about doing next.**

## Canonical story and sharing

BikeStories should eventually be the canonical home for the story/biography. Instagram, blogs, forums/BBSs, and other channels can become derived publishing formats later.

Sharing is important, but do not prematurely turn the product into “Instagram for bikes.” The persistent organizing idea is the bicycle and its accumulated stories.

## Research before implementation

Do not jump into application development yet. First use controlled experiments with frozen source datasets to understand:
- minimum useful input;
- clarification behavior;
- grounding rules;
- voice preservation;
- narrative-role inference and sequencing;
- artifact selection and exclusion;
- chronology conflicts between visually plausible and actual sequences;
- visual composition;
- the appropriate balance of words and artifacts;
- unfinished/open-ended stories;
- cross-story synthesis into an evolving biography;
- what constitutes “good enough” without user polishing.

The first reference case is `experiments/voyager-001/`.

After Voyager, add contrasting experiments so the product is not overfit to one medium-size acquisition/build story.