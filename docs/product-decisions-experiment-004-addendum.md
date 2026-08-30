# Product decisions addendum — Experiment 004

This addendum records product decisions established by Experiment 004 and should be read as part of the maintained BikeStories product-research source of truth in `docs/product-decisions.md`.

## Memory boundaries are inferred, not implied by bike identity

Experiment 004 confirms and strengthens the existing rule:

> **Bike identity ≠ memory relationship ≠ story relationship**

A collection may confidently depict the same physical bicycle while containing several unrelated or only loosely related memories. The system must not use same-bike identity as sufficient evidence that artifacts belong to the same event or memory.

## Visual similarity is candidate evidence, not a memory boundary

Photographs with similar configurations, luggage, setting, or visual appearance may suggest a relationship, but similarity alone is insufficient to establish that they document the same event.

> **Image similarity can discover candidate relationships; it cannot by itself establish memory boundaries.**

Candidate groupings should remain provisional until artifact evidence or owner context supports them strongly enough.

## Clarification can change structure

Owner clarification is not merely a way to add details to an already identified memory. A single answer may reveal that an apparent cluster is actually several separate memories or that several apparent memories belong together.

The AI must be willing to revise its grouping rather than defend its initial interpretation.

## Preserve epistemic provenance

BikeStories must preserve not only the source of a claim but also **how that claim is known and how certain it is**.

The product model should be capable of distinguishing at least:

- **artifact-established** — directly visible or otherwise supported by source evidence;
- **owner-established** — explicitly remembered/stated by the owner without material uncertainty;
- **owner-uncertain** — the owner supplies the recollection as probable, approximate, or uncertain;
- **AI-inferred** — proposed from available evidence but not established by the owner or artifact;
- **unknown/unresolved** — the relationship or fact is not currently known.

These distinctions must survive higher-order synthesis. Stories, chapters, and a Life of a Bike must not silently promote uncertain recollection or AI inference into fact.

## “I don't remember” is a valid preserved state

The product should not treat unresolved owner memory as a failure that must be eliminated through continued questioning.

> **“I don't remember” can be the correct preserved state.**

If the owner remembers that several artifacts concern a period or set of experiences but cannot reliably map each artifact to a specific event, BikeStories should preserve the broader authentic memory and its uncertainty rather than inventing precision.

## Revised working principle

The existing principle remains valid and is extended by Experiment 004:

> **Preserve first. Organize when confident. Tell a story only when one is actually there.**

Operationally:

> **Preserve first. Propose relationships provisionally. Ask only when clarification materially helps. Preserve uncertainty when it remains.**

A successful capture does not require every artifact to be assigned to a named memory, every memory boundary to be resolved, or every memory to become a story.

## Research implications

Future experiments should test:

- whether provisional candidate memories can be revised cleanly after owner clarification;
- whether confidence/provenance distinctions survive story synthesis;
- whether later evidence can resolve an earlier unknown relationship without rewriting the original capture as if it had always been known;
- whether AI can avoid overconfidently assigning externally discovered artifacts to memories based primarily on visual similarity;
- how much uncertainty should be visible to the owner versus retained internally as provenance metadata.

See `experiments/experiment-004/evaluation.md` for the experiment record and rationale.