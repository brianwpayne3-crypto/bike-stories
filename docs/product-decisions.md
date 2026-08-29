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
- visual composition;
- what constitutes “good enough” without user polishing.

The first reference case is `experiments/voyager-001/`.

After Voyager, add contrasting experiments so the product is not overfit to one medium-size acquisition/build story.