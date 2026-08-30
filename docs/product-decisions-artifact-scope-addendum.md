# Product decision addendum — artifact scope

## Decision

BikeStories is **not a photo-only product**.

The product hierarchy remains:

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

An **artifact** is any owner-supplied or owner-authorized source material that can help preserve or ground a bicycle memory. Photographs are only one artifact type.

## Artifact types in scope

Potential source artifacts include, but are not limited to:

- photographs and scanned images;
- receipts, invoices, brochures, manuals, warranty documents, and PDFs;
- Excel spreadsheets or other build/project spreadsheets;
- component lists, build sheets, cost/weight/gearing calculations, and maintenance records;
- notes and text documents;
- screenshots;
- emails and forum posts supplied or authorized by the owner;
- ride data, race results, route files, GPX files, and maps;
- links and other web references preserved by the owner;
- audio or voice recollections;
- other structured or unstructured files that contribute evidence or context to a bicycle memory.

This list defines product scope, not a promise that every format must be supported in the first implementation.

## Why this matters

A memory may be grounded more strongly by a non-image artifact than by a photograph. For example, a spreadsheet kept during a bicycle build could establish components considered, costs, dates, weights, gearing, alternatives, or changes that photographs alone cannot reliably explain.

BikeStories should be able to combine different artifact types with owner recollection while preserving provenance and uncertainty. The AI should use artifacts as evidence and context; it should not infer personal meaning merely because a file contains structured information.

## Research status

The controlled experiments to date have been heavily image-based. That reflects convenient test material, **not a narrowing of the product definition**.

Mixed-artifact understanding remains untested and should become a future controlled experiment. A useful test might combine photographs, a build spreadsheet, a receipt or document, and ordinary owner recollection, then evaluate whether BikeStories can identify and preserve grounded memories without inventing relationships or meaning.

Experiment 005 remains intentionally focused on discovery within a messy photo archive. Its photo-specific design should not be generalized into a photo-only product requirement.

## Working principle

> **Artifacts are evidence. Memories are what BikeStories preserves. Stories emerge only when the evidence and memories support them.**
