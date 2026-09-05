# Bike Stories capture data operations

This document is the operational source of truth for locating and inspecting real Bike Stories captures submitted from the iPhone Shortcut.

## Where the phone data lives

**Real iPhone captures are stored in private Vercel Blob, not Supabase.**

The capture-sink implementation currently lives on the `experiment/capture-sink` branch / PR #9.

Vercel project:

- Project: `bike-stories`
- Project ID: `prj_29kfUAmr7mObevQt2w1tlpfDhDNq`
- Team: `Brian's Hobby Repo`
- Team ID: `team_Rxd3UTTXFTHUtPCWU8W8TocP`
- Team slug: `maxs-test-ride`
- Capture-sink preview branch: `experiment/capture-sink`
- Stable preview alias: `https://bike-stories-git-experiment-capture-sink-maxs-test-ride.vercel.app`

Do **not** start by looking in Supabase when asked to inspect Bike Stories phone captures. As of this checkpoint, the connected Supabase project is for the bike-shop application, not Bike Stories.

## Storage layout

`POST /api/capture` accepts the iOS Shortcut payload and stores an immutable raw capture in private Vercel Blob.

Raw captures are stored under:

```text
captures/<capture-id>.json
```

Flickr resolution/enrichment is stored separately under:

```text
enrichments/flickr/<capture-id>.json
```

Keeping enrichment separate means the original owner input remains unchanged even when later processing resolves photos or adds interpretation.

## How to inspect captures

The capture-sink now exposes two read paths.

### List every capture

```text
GET /api/captures
```

This endpoint was added in commit `7f2a552` specifically so a future session can enumerate the actual persisted phone submissions without relying on old Vercel runtime logs or already-known UUIDs.

It:

1. lists Blob objects under `captures/`;
2. reads each raw capture;
3. reads `enrichments/flickr/<capture-id>.json` when present;
4. merges Flickr information into the response without modifying the raw capture;
5. sorts captures newest first;
6. returns `{ ok, count, captures }`.

Use the current READY preview deployment for the `experiment/capture-sink` branch, or the stable preview alias above if it points to that deployment.

### Read one known capture

```text
GET /api/captures/<capture-id>
```

Use this when the UUID is already known. The readback merges the immutable raw capture with any stored Flickr enrichment.

## How to find the correct live deployment

If the stable preview alias is stale or unavailable:

1. Open the Vercel project `bike-stories`.
2. List deployments for project ID `prj_29kfUAmr7mObevQt2w1tlpfDhDNq` under team `team_Rxd3UTTXFTHUtPCWU8W8TocP`.
3. Find the newest **READY** preview deployment whose Git branch/ref is `experiment/capture-sink`.
4. Fetch `<deployment-url>/api/captures`.

Do not depend on runtime logs to reconstruct historical captures. Hobby-plan log retention is too short. Vercel Blob is the durable source.

## Known captures at the 2026-09-05 checkpoint

At the time the listing endpoint was first exercised, Vercel Blob contained **4 persisted captures**:

1. Sep 4 — five-photo capture about vintage road bikes being picked up for a customer and going to a museum in Ohio; owner narration mentions Tom Kellogg and Raleigh Racing USA. Flickr enrichment not yet persisted.
2. Sep 3 — three-photo capture with narration containing the word `Gomez`. **`Gomez` is known to be a voice-to-text error and must not be treated as a bike identity or fact.** The safe description is simply a cool/interesting bike captured for possible later use. Flickr enrichment not yet persisted.
3. Sep 1/2 — five-photo memory about a 1968 Carlton Flyer owned for roughly 10–15 years, including centuries, Montana/Glacier gravel riding, and Bay Area commuting. All five photos matched to Flickr.
4. Sep 1/2 — one-photo test capture: `This is that one time I rode the bike on the street`. Flickr photo ID `55501255400`; matched.

This list is a checkpoint, **not** a substitute for querying `/api/captures`. New phone submissions may have been added since this document was written.

## Raw transcription is evidence, not truth

Voice-to-text output must be preserved as raw owner input, but transcription output is not automatically factual.

Example: the Sep 3 capture transcribed a term as `Gomez`; the owner explicitly confirmed that this is a transcription failure and does not identify the bike.

Processing rules:

- preserve the original transcript unchanged;
- do not silently correct uncertain words;
- do not promote suspicious names, brands, models, places, or dates into structured facts merely because speech-to-text produced them;
- use photos, other artifacts, prior owner context, and later enrichment as evidence;
- ask the owner to confirm an important uncertain identity rather than guessing;
- store corrected/confirmed interpretation separately from raw capture data.

## Shortcut flow

Current experimental flow:

```text
Photo(s)
  → iOS Share Sheet
  → Save Bike Thought
  → owner speaks/types thought
  → POST /api/capture
  → immutable raw capture in Vercel Blob
  → Flickr resolution/enrichment
  → persisted Flickr enrichment
```

Earlier notes may refer to the Shortcut as `Bike Stories — New Memory`; the current user-facing Share Sheet action has been documented as `Save Bike Thought`.

## Related GitHub history

Useful checkpoints:

- PR #9 — capture-sink implementation and Vercel preview deployment.
- Issue #10 — automatic Flickr resolution from captured metadata; includes the durable-storage/readback checkpoint.
- Issue #11 — desired automatic capture → Flickr-resolution flow.
- Issue #12 — multi-photo capture experiment.
- Commit `7f2a552` — added `GET /api/captures` enumeration endpoint.

## Future-session rule

When Brian asks anything equivalent to **“what have I sent to Bike Stories from my phone?”**, do this before answering from memory or experiment notes:

1. inspect this document;
2. inspect the live `experiment/capture-sink` deployment;
3. call `GET /api/captures`;
4. answer from the persisted capture records;
5. distinguish raw transcript from confirmed facts and enrichment.

The live persisted data is authoritative for what was actually submitted from the phone.