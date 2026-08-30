# Product decision addendum — learning from clarification interactions

## Realization

The clarification conversation itself is valuable BikeStories product data, not disposable chat.

When BikeStories analyzes an artifact or candidate group of artifacts, asks the owner a question, receives an answer, and then changes its interpretation, that sequence contains useful information about both the specific bicycle and the general problem of discovering memories and stories from imperfect evidence.

This extends the existing hierarchy:

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

The interaction around an artifact can also create durable evidence about how BikeStories should reason.

## What should be preserved

Do not store only a flat transcript of AI questions and owner answers. Where practical, preserve the structured learning sequence:

> **Input artifacts → initial AI interpretation → uncertainty / information gap detected → clarification question → owner answer → revised interpretation → resulting Memory / Story / no-story decision**

Useful fields may eventually include:

- the artifacts or candidate artifact group under consideration;
- what the AI initially believed or proposed;
- what was directly observable versus inferred;
- the uncertainty or information gap that caused a question to be asked;
- the exact clarification question;
- the owner's answer, including uncertainty such as “I don't remember”;
- how the answer changed—or did not change—the interpretation;
- the resulting memory boundary, story relationship, or decision not to form a story;
- confidence/provenance for the resulting claims;
- whether the owner accepted, corrected, rejected, or left the interpretation unresolved.

The purpose is not to score the owner's memory as true or false. It is to preserve provenance and learn which clarifications materially improve grounded interpretation.

## Two kinds of accumulated value

### 1. Better understanding of this bicycle

Owner clarifications become durable provenance-bearing context for the bicycle. Future analysis of later artifacts and memories should be able to use relevant earlier clarifications rather than repeatedly asking the owner the same question or forgetting an established distinction.

### 2. Better BikeStories behavior generally

Across many appropriately permissioned interactions, clarification patterns can become a domain-specific corpus for retrieval, evaluation, prompt/agent improvement, ranking, classification, and potentially later model training or fine-tuning.

Near-term improvement does **not** require retraining a foundation model. BikeStories can retrieve relevant prior patterns and examples to help a capable model reason more conservatively and choose better questions.

Examples already exposed by controlled research include:

- **Visually plausible chronology ≠ established chronology.** A visually satisfying riding image can still predate later changes and should not automatically become the ending of a story.
- **Image similarity ≠ memory identity.** Similar photographs of the same loaded bicycle can represent different trips and different memories.
- **Same bicycle ≠ same story.** Shared bicycle identity creates a relationship but does not establish one narrative.
- **Owner uncertainty is valid evidence.** “I don't remember” should be preserved rather than pressured into false certainty.

These are useful not merely as written product rules but as examples of an AI interpretation being corrected or bounded by owner input.

## Adaptive clarification

This supports the existing principle:

> **Minimize information gaps, not question count.**

Over time, BikeStories should become better at estimating which clarification is likely to materially change a memory boundary, chronology, relationship, or story decision—and which questions create burden without improving the result.

The goal is not a fixed interview script. It is progressively better judgment about:

- when enough grounded information already exists;
- which single question would resolve the most important ambiguity;
- when a question is unlikely to affect the result;
- when to preserve uncertainty instead of asking again;
- when to stop at a Memory rather than forcing a Story.

## Product-learning loop

A useful long-term loop is:

> **Interpret → identify meaningful uncertainty → ask → learn from owner → revise → preserve outcome → reuse the pattern when relevant**

This creates a product that can improve its memory-discovery behavior from accumulated interactions even while the underlying general-purpose model remains unchanged.

The correction cases may be especially valuable because they expose where plausible AI reasoning diverges from owner-supplied context.

## Privacy and consent boundary

Two uses of this information must remain conceptually separate:

1. **Personal continuity:** using an owner's prior answers to understand that owner's bicycle, artifacts, memories, and stories in future sessions.
2. **General product improvement:** using interaction patterns to improve BikeStories behavior for other users.

Personal continuity is part of the core product experience. General product improvement should be governed deliberately with appropriate consent, privacy, minimization, and de-identification rather than silently treating personal photographs, documents, recollections, or conversations as training data.

The product should be designed so that retaining useful reasoning structure does not require exposing another owner's private story to a future user.

## Implementation implication

When a BikeStories data model is eventually designed, clarification should be treated as a first-class provenance-bearing entity or event rather than ephemeral chat history.

The initial implementation does not need fine-tuning infrastructure. It should first preserve enough structured information that future retrieval and evaluation are possible without reconstructing the interaction from raw transcripts.

## Working principle

> **BikeStories should learn not only from what owners remember, but from how owner clarification changes what the AI thought it knew.**
