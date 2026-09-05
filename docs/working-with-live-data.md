# Working with Bike Stories live data

This is the short runbook for future Bike Stories sessions. For implementation details, see [`capture-data-operations.md`](capture-data-operations.md).

## If the question is about what Brian actually sent from his phone

Do **not** answer from conversation memory, experiment fixtures, GitHub issue prose, Flickr alone, or Supabase.

Query the durable capture store:

```text
Vercel project: bike-stories
branch: experiment/capture-sink
GET /api/captures
```

The capture store is **private Vercel Blob**.

The endpoint returns all raw persisted captures plus Flickr enrichment when it exists.

## If `/api/captures` does not respond

Find the newest READY Vercel preview deployment for branch `experiment/capture-sink`, then request:

```text
https://<ready-preview-deployment>/api/captures
```

Stable preview alias when available:

```text
https://bike-stories-git-experiment-capture-sink-maxs-test-ride.vercel.app/api/captures
```

## Important data rule

Treat these as different layers:

```text
raw owner input
≠ speech-to-text accuracy
≠ enrichment
≠ confirmed fact
≠ final story interpretation
```

Never overwrite the raw capture to make it cleaner.

Known example: `Gomez` in the Sep 3, 2026 capture is a speech-to-text error, not a confirmed bike name/model/brand.

## Durable paths

```text
captures/<capture-id>.json

enrichments/flickr/<capture-id>.json
```

Raw capture is immutable. Flickr enrichment is separate.

## Why this file exists

On 2026-09-04/05 we temporarily lost track of where phone submissions were stored and incorrectly investigated Supabase before re-establishing that Bike Stories captures were in Vercel Blob. The listing endpoint and these docs exist so that should not need to happen again.