# Experiment 004 — No Story Required

## Status

Source set frozen. Experiment not yet run.

## Research question

Can BikeStories recognize that a set of authentic artifacts from the same bicycle may contain several individual memories without forcing those artifacts into one coherent story?

## Why this experiment exists

A realistic camera-roll sample creates a subtle problem: random photographs of the same bicycle naturally bring back memories. The photographs are not meaningless, but the memories they evoke may be unrelated, may come from different periods, and may not collectively form a single narrative.

The test is therefore not whether AI can recognize a bicycle. It is whether it can distinguish:

**same bicycle → potentially related artifacts → individual/candidate memories → coherent story only when evidence supports one**

## Frozen source

The eight photographs under `source/` were supplied by the owner as a naturally messy same-bike batch. They were moved from the repository root without changing their Git blob contents.

The source set must remain unchanged while the experiment is run.

## Ground truth before inference

The owner describes this batch as random photographs of the same bike that each bring back individual memories, but those memories may be unrelated and are not all necessarily part of the same memory.

This is intentionally different from saying that the photographs contain no meaning. The important ground truth is that **same-bike identity must not be treated as proof of one shared memory or one overarching story.**

Do not add more detailed owner explanations of the individual photographs before the blinded inference pass. Those can be recorded later as evaluation material.

## Blinded task

Give a fresh model only the frozen source images and the BikeStories framing necessary to perform intake. Ask it to determine what, if anything, should be preserved as memories; which artifacts appear related; which should remain separate or uncertain; and whether the material supports any coherent story.

The model should not be told that this is a negative-control experiment or that the owner believes the photographs represent separate memories.

## What we evaluate

- Does it recognize that the images concern the same bicycle without equating that with narrative unity?
- Does it identify defensible artifact relationships or candidate memories?
- Can it leave artifacts separate when the relationship is uncertain?
- Does it avoid inventing chronology, motives, significance, or a transformation arc?
- Does it preserve useful material even if no story exists yet?
- Does it distinguish confidence in bike identity, memory relationships, and story relationships?
- If it claims there is a coherent story, what evidence does it use and does the owner agree?

## Success condition

A successful result does **not** require the model to say that nothing exists here. It may find several legitimate memories or even a small coherent cluster.

Success means it does not manufacture a single story merely because all of the artifacts belong to the same bicycle.

Working principle:

> **Preserve first. Organize when confident. Tell a story only when one is actually there.**
