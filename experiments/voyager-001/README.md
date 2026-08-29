# Voyager Experiment 001

First controlled BikeStories reference experiment.

## Purpose

Use one fixed source bundle to test BikeStories story-generation behavior without accidentally changing the evidence between iterations.

The frozen visual source set lives in [`source/`](source/). Do **not** replace or add source assets when comparing prompt/product-behavior changes. If the source bundle changes materially, create a new experiment/source version.

## Subject

1991 Schwinn Voyager purchased for $35.

## Source context available from the original manual experiment

The original conversational description was not preserved verbatim in Git before this repo existed, so the initial narrative below is a **reconstruction from the experiment checkpoint**, not a claimed word-for-word transcript.

Known initial context:
- 1991 Schwinn Voyager;
- purchased for $35;
- came with the original sales receipt, original brochure, and a photograph taken by the original owner;
- initial plan was a quick once-over and to keep/restore it basically as-is;
- possibly ride a century as an early/first significant ride;
- considered changing the wheelset/wheel size;
- ultimately made some comfort-oriented changes;
- added touring racks already on hand;
- current state represented in the supplied images.

## Clarification experiment

BikeStories was tested with adaptive, one-question-at-a-time clarification rather than a fixed questionnaire.

### Question 1

**BikeStories:** When you found the Voyager for $35, what made you decide it was worth bringing home?

**Owner:** “It was a cool old touring bike for a cheap price that had some aspects to it that I wanted to try like index down tube shifting but also at that price it was complete.”

This answer closed several gaps at once: attraction to the old touring bike, low price, completeness, and interest in indexed downtube shifting.

### Question 2

**BikeStories:** You said you eventually changed some things to make the Voyager more comfortable. What did you actually change?

**Owner:** “Well, experiment with changing the wheel set, but decided in the end to keep the original wheel set because I procured some decent tires that fit that wheel set for Cheap and then I ended up to sign to change the contact points meaning the saddle and the handlebars just because I had other ones on hand that kind of fit the touring vibe and my butt a little bit better I kind of went back-and-forth with this decision, but in the end, I decided to improve it a little bit in those areas just because based on my experience, I knew that would be a net positive”

This answer resolved both the wheelset decision and the comfort/contact-point changes, so no additional clarification was judged necessary.

## Findings already produced by this experiment

### 1. Do not invent plausible meaning

An early draft wrote that the touring racks felt appropriate because the bike was named “Voyager.” That was invented connective tissue. The actual reason supplied by the owner was simply that it is a touring bike and touring racks made sense.

Rule: **when meaning matters and it is not supplied, ask or omit.**

### 2. Clarification must be adaptive

The initial thought was to ask four questions. In practice, two detailed answers closed multiple information gaps.

Rule: **minimize information gaps, not question count.** Ask one question at a time, reevaluate after every answer, and stop when enough grounded context exists.

### 3. The visual assets must appear in the story

A later draft produced reasonable prose but inserted a generic web image and did not actually compose the supplied Voyager assets into the story.

That was a product failure.

Rule: the owner's photos/documents are first-class story content. The output should be a composed **visual narrative**, not prose plus an unrelated image or a flat album.

## Frozen source manifest

The following 10 files are the fixed visual input set for this experiment:

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

## Output/versioning convention

Keep raw inputs immutable. Store generated work separately, for example:

- `outputs/draft-001/`
- `outputs/draft-002/`

Each output should record the generation behavior/prompt version, any clarification answers used, generated story/layout, owner feedback, and findings.

## Next step

Rerun the story construction using this fixed source bundle plus the clarification answers above. Evaluate the combined **visual + written artifact**, not prose alone.