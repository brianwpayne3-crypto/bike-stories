# Experiment 004 — Evaluation

## Result

**Pass.** The blinded model did not manufacture a single overarching story from a set of photographs that all legitimately concerned the same bicycle.

The experiment also produced findings more useful than the original pass/fail question.

## What happened

The source set contained eight photographs of the same bicycle from different points over time. The owner knew that the images evoked real memories, but that they did not all belong to one memory or one coherent story.

On the blinded pass, the model:

- recognized one bicycle;
- preserved all eight artifacts;
- proposed several candidate clusters rather than one narrative;
- distinguished visible relationships from unsupported event claims;
- explicitly refused to infer a particular trip from loaded-bike photographs;
- asked one high-value clarification rather than forcing a conclusion.

The first owner clarification established that the loaded configurations represented preparation for **several different bikepacking trips with the same bicycle over time**. The model then correctly revised its structure from one visual cluster into multiple possible trip memories while refusing to assign individual photographs to specific trips without evidence.

The second owner clarification introduced genuine uncertainty: the owner believed some material related to Land Between the Lakes in Kentucky and some to the C&O Canal Towpath / Great Allegheny Passage, but could not reliably identify which photograph belonged to which trip, and one photograph might have represented preparation rather than the trip itself.

The model preserved that uncertainty instead of resolving it artificially.

## Findings

### 1. Same-bike identity is not a memory boundary

Experiment 004 strengthens the existing distinction:

> **Bike identity ≠ memory relationship ≠ story relationship**

All eight artifacts can confidently belong to the same bicycle while belonging to different memories and potentially different stories.

### 2. Visual similarity can discover candidates but cannot establish memory boundaries

Several loaded-bike photographs looked like a natural visual cluster. Owner context established that they represented different bikepacking trips or preparations over time.

Therefore:

> **Image similarity is useful for discovering candidate relationships, but it is not sufficient evidence for determining memory boundaries.**

The AI may suggest that artifacts appear related, but it should not silently turn visual similarity into event identity.

### 3. Owner clarification can split an apparent cluster

Clarification is not only for filling missing details inside a proposed memory. It can change the structure itself. One owner answer can establish that what looked like one memory is actually several memories.

The system therefore needs to treat inferred groupings as provisional until confidence is sufficient.

### 4. Uncertainty is valid preserved information

The owner could not reliably map the loaded-bike photographs to specific trips. That is not necessarily a capture failure.

> **“I don't remember” can be the correct preserved state.**

BikeStories should not keep questioning the owner until uncertainty disappears, and it should never silently convert uncertain recollection into false precision.

A useful memory can preserve fuzzy boundaries such as: these photographs came from a period of several bikepacking trips; some likely relate to particular remembered trips, but the exact mapping is no longer known.

### 5. Claims need provenance and confidence

Experiment 004 exposed a stronger requirement than generic provenance. BikeStories should retain **how a claim is known and how certain it is**.

At minimum, the system must be able to distinguish among claims that are:

- directly visible or otherwise established by an artifact;
- explicitly supplied by the owner as remembered fact;
- supplied by the owner as probable or uncertain recollection;
- inferred by the AI from available evidence;
- unresolved or unknown.

These distinctions should survive later synthesis. A story, chapter, or Life of a Bike must not flatten “probably,” “I think,” or “I don't remember” into factual certainty.

### 6. Preservation can succeed without narrative resolution

The experiment began as a test of whether the AI could avoid manufacturing a story. It demonstrated a more useful product behavior:

> **Preserve first. Propose relationships provisionally. Ask only when clarification materially helps. Preserve uncertainty when it remains.**

The system does not need to resolve every artifact into a named memory or every memory into a story at ingestion time.

## Implications for the product model

The existing hierarchy remains useful:

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

But relationships within that hierarchy need epistemic metadata. The product should not merely store a relationship such as “photo belongs to C&O/GAP trip.” It should be capable of representing whether that relationship is established, owner-remembered, owner-uncertain, AI-inferred, or unresolved.

This also suggests that candidate memories should be first-class provisional structures rather than premature permanent classifications.

## Experiment conclusion

Experiment 004 passes its original negative-control test: the AI was willing to conclude that one bicycle and several visually related artifacts did **not** justify one overarching story.

The more important discovery is that **memory boundaries themselves are an inference problem**. Visual evidence can suggest them, owner context can split or revise them, and sometimes the authentic final answer remains uncertain.

That uncertainty should be preserved as part of the bicycle's history rather than cleaned away.