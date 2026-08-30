# Product decisions and findings

This document is the maintained BikeStories product-research source of truth. It consolidates the useful findings from the original `personal-backlog#14` discussion and supersedes earlier assumptions where noted.

## Product purpose

BikeStories is primarily a **storytelling and story-preservation product centered on physical bicycles**. It is not primarily a digital garage, inventory system, maintenance database, or generic social network.

Useful framing:

> Every bike has a story. Give it somewhere to live.

> People have profiles. Bikes have biographies.

The physical bicycle provides continuity across memories and stories over time.

An earlier product decision said **the story is the atomic unit**. Voyager research has superseded that assumption:

> **The memory is the atomic unit of capture. Stories emerge from one or more memories.**

Do not begin by making the user create empty bike records, populate a garage, or decide what kind of finished story they are creating.

## Core product hierarchy

The emerging conceptual hierarchy is:

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

These levels should be derived from the material rather than imposed as organizational work on the owner.

- **Artifacts** are source evidence: photographs, documents, receipts, screenshots, links, ride data, notes, voice input, etc.
- **Memories** are the atomic captured units: a pile of relevant artifacts plus whatever the owner remembers or wants to say at that moment. A memory can be incomplete, unresolved, tiny, mundane, or still in progress.
- **Stories** are coherent narratives that emerge when one memory is sufficient on its own or when several related memories together reveal a worthwhile story.
- **Chapters** may emerge when multiple stories form a larger period, theme, project, relationship, or arc in the bicycle's life.
- **Life of a Bike** is the evolving long-form biography that can eventually be synthesized from those chapters, stories, and memories while retaining provenance back to the original evidence.

There is no requirement that every memory become a story, every story become a chapter, or every bicycle eventually become a book-length biography. The hierarchy should emerge only where the accumulated material supports it.

A single strong memory can become a story immediately. “Story” therefore does not imply a minimum number of memories.

## Core problem

The main competitor in v0 is **doing nothing**. Photos remain in the camera roll, notes and links disappear, and potentially meaningful memories never become stories because organizing, writing, captioning, laying out, and publishing is too much work.

The immediate capture promise can therefore be simpler than “write your bike story”:

> **Don't write the story. Just save the memory.**

Success at capture time is not perfect documentation or a finished narrative. It is preserving something that otherwise probably would have disappeared.

Over time, another success question becomes:

> **Can BikeStories recognize when accumulated memories contain a story worth telling?**

Completeness is not the initial goal. Preservation is.

## Long-term preservation vision

The Memory → Story → Chapter → Life of a Bike hierarchy matters for more than information architecture. It creates the possibility of preserving a person's lived experience around a physical object over years or decades with very little effort at any individual moment.

A bicycle can function as a **persistent memory anchor**. Owners, places, rides, equipment, eras, friendships, family relationships, and life circumstances may change while the same physical bicycle provides continuity among otherwise disconnected memories.

Over a long enough period, ordinary captures can become personally significant in ways the owner could not have predicted when they were recorded: a purchase photo, a receipt, a first ride, an unfinished repair, a trip, a crash, a race, a child riding the bike, a change of owner, or a final photograph years later.

The product opportunity is therefore not merely “AI writes bicycle stories.” A deeper formulation is:

> **Preserve small memories while they are easy to capture, then discover the larger stories that become visible only over time.**

This also creates an intergenerational preservation possibility. A sufficiently rich Life of a Bike could eventually be shared with children, grandchildren, a future owner, or another person who did not experience those events directly. What is being passed forward is not just a catalog of the bicycle, but a grounded record of pieces of a person's life that happened around it.

The AI must not manufacture nostalgia or significance after the fact. Its value is almost the opposite:

> **Preserve enough authentic little pieces that the real meaning can survive.**

Any later story, chapter, biography, or generational presentation should remain grounded in and traceable to the original memories and artifacts. Long-term synthesis increases the importance of provenance rather than reducing it.

BikeStories should remain bicycle-centered while this is being explored. The broader pattern may eventually apply to other persistent physical objects, but expanding the product beyond bicycles is not a current requirement.

## Emerging v0 interaction

At capture time:

> **Stuff + ramble → Memory**

Over time:

> **Memories → discovered Stories → possible Chapters → evolving Life of a Bike**

Input can be messy: photos, screenshots, notes, dictation, links, documents, receipts, PDFs, build lists, etc. The user should not have to organize or classify it first, and should not need to know what larger story the material may eventually belong to.

The dump should be treated as a **candidate evidence pile**, not as a declaration that every supplied artifact belongs in a published story. A realistic user interaction is closer to “here is a pile of stuff I think might help, plus what I remember” than “here are the correctly selected and sequenced assets for a finished story.”

A memory should be useful even if no coherent story can yet be constructed from it.

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
- cleaning up a captured memory without changing its meaning;
- recognizing relationships among memories;
- identifying when memories form a coherent candidate story;
- turning rambling input into readable prose when appropriate;
- removing repetition;
- proposing title and layout for stories;
- selecting useful image groupings and placements;
- recognizing larger relationships among stories over time;
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

The events already happened and belong to the owner. The AI should recover stories latent in supplied artifacts and accumulated memories, then repeat them back coherently without manufacturing a more dramatic or meaningful narrative than the evidence supports.

This creates a central research question:

> **How good is AI at discovering stories that are already embedded across a pile of real artifacts, memories, and owner input?**

The system should attempt to understand narrative relationships among artifacts and memories, not merely rank photographs by quality or arrange them attractively. An artifact or memory may eventually function as setup/before, historical context, process/transition, turning point, result/after, payoff, or something that does not belong in a particular story at all. These are useful internal editorial roles, not formal types the user must choose.

A key Voyager finding is that **composition selection and narrative sequencing are separate problems**. A good-looking layout can still tell a story poorly if it reveals the visual payoff too early or fails to recognize a before/process/after relationship.

Working rule:

> **Infer narrative relationships when the evidence is strong. When a relationship materially affects the story and is uncertain, ask rather than silently inventing it.**

## Artifact selection: the dump is not the edit

Voyager Experiment 003 exposed another distinct editorial task: **deciding whether a supplied artifact belongs in an inferred story at all**.

A visually compelling photograph can be authentic and still be misleading in a particular narrative role. In Voyager, a riding photograph looked like a natural resolution in both blinded passes, but owner clarification later established that the ride occurred before some of the changes being discussed. If the story is specifically about those changes, presenting that photograph as the final result would imply a chronology the evidence does not support.

Therefore:

> **Supplying an artifact means “consider this as evidence,” not “publish this in the story.”**

The system should be able to classify candidate artifacts as central, supporting, uncertain, or unused. Leaving an image out is legitimate editorial work, not a failure to use the user's material.

Artifact roles are also **story-dependent rather than inherent**. The same riding photograph might be misleading as the payoff to a transformation story but highly relevant to a broader story about learning and riding the bike over time.

A more complete internal story-discovery pipeline is therefore:

> **memories + their evidence → infer candidate story → infer chronology and roles → identify conflicts/uncertainties → select the subset that actually supports this story → construct the visual narrative**

The AI should not force every source artifact or memory into an output merely because the user supplied it.

## Clarification behavior

Do not optimize for a fixed number of questions. Optimize for closing only the information gaps necessary for the current task.

> **Minimize information gaps, not question count.**

Capture should have an especially low burden. If enough exists to preserve a useful memory, the system should not interrogate the owner merely because a future polished story could be richer.

When constructing a story, questions should be asked **one at a time**, never as a questionnaire the user must remember and answer in bulk.

After each answer:
1. absorb the answer;
2. reevaluate what is now known;
3. determine whether the answer also closed other gaps;
4. ask a simple follow-up only if the prior answer was too vague to be useful;
5. stop as soon as enough grounded context exists.

Information density matters. One long answer may close several gaps; short answers may require more exchanges. The number of questions also scales with the material.

Do not keep interviewing merely to make a memory or story marginally richer.

## Supplied assets are first-class content

A major experiment failure was treating user-supplied images as context for prose and then inserting a generic internet bicycle image into the output.

That is explicitly wrong.

> **Story construction means constructing the visual narrative from the owner's evidence, not merely writing prose and attaching an album.**

The finished artifact should interweave the owner's supplied photos/documents with narrative blocks. The AI should decide when one image should dominate, when several images belong together, when a document should sit beside a passage, and when text should stand alone.

Default rule:

> **Use the owner's supplied material. Do not introduce outside imagery unless explicitly requested or a future feature clearly calls for sourced external context.**

Provenance matters because a visually similar outside image can falsely imply that it depicts the user's bicycle or event.

## Let the material determine the medium

BikeStories should not assume that every worthwhile story needs a conventional written narrative. The relative importance of words, photographs, documents, and other artifacts should emerge from the supplied material.

> **Understand what story is actually present, understand which supplied artifacts and memories carry that story, and construct the lightest combination of words and visuals that tells it well.**

Story quality and artifact quality are independent variables. A mundane event with exceptional photographs may make an excellent visual BikeStory. A genuinely interesting story with weak or sparse photographs may need to be primarily words. A story with strong narrative and strong artifacts may use both heavily.

The AI should therefore avoid padding visually strong stories with unnecessary prose merely because the output is called a story. A bicycle build documented with excellent process photographs may be mostly visual, with only enough text to establish progression, decisions, and context.

A future contrasting experiment should test this directly using a visually rich bicycle build — for example, a first electronic-shifting build — to see whether the system recognizes a **visually dominant process story** and resists over-writing it.

## Memories can be unfinished because bikes keep changing

A memory does not need closure. It may record an unfinished project, a question, a temporary configuration, a plan, a ride that happened in the middle of a build, or simply what the owner knew and cared about at that moment.

Voyager exposed the danger of forcing an incomplete memory into a finished-story shape. The most recent available photograph can still show an unfinished bicycle, while an older riding photograph may visually resemble an ending even though it predates later changes.

> **BikeStories should preserve an unfinished memory rather than manufacture a finished story.**

A later memory may complete, extend, contradict, or change the meaning of an earlier one without making the earlier memory wrong. Each remains evidence of a point in the bicycle's life.

## Stories emerge across memories

The system should not assume that the owner knows the story at capture time. Often they cannot know it yet.

For example:

> **Memory A:** bought a cheap old touring bike with its original paperwork  
> **Memory B:** experimented with wheels and contact points  
> **Memory C:** eventually finished the cockpit  
> **Memory D:** rode a meaningful long ride

Any one of these can be worth preserving independently. Later, AI may recognize that together they contain a stronger coherent story.

This suggests a central intelligence behavior:

> **Recognize when accumulated memories have become a story worth telling.**

The system should propose or construct that higher-order story while retaining the underlying memories rather than replacing them.

## Stories can become chapters; chapters can become a life of a bike

The same emergence can continue above the story level.

Several related stories may eventually form a chapter in the bicycle's life: an initial build period, racing years, touring years, a restoration, a change of owner, or another theme that becomes visible only with time. Several chapters may eventually support a long-form biography or “Life of a Bike.”

Conceptually:

> **Artifacts → Memories → Stories → Chapters → Life of a Bike**

The important product behavior is that the owner should not have to design this hierarchy in advance. AI can discover and suggest higher-order structure as the evidence accumulates.

The hierarchy must also preserve provenance. A synthesized chapter or biography should remain traceable back through stories and memories to the original artifacts and owner input from which its claims were derived.

## Intelligence across time: biography synthesis

The intelligence layer should eventually operate **across the complete history attached to the same physical bicycle**.

This creates several levels of understanding:
- **memory-level truth:** what was captured, known, happening, or being considered at a particular point;
- **story-level understanding:** the coherent narrative that becomes visible across one or more memories;
- **chapter-level understanding:** a larger arc visible across multiple stories;
- **biography-level understanding:** the evolving life of the bicycle that becomes visible only after substantial history accumulates.

Potential AI behavior includes recognizing that a later memory resolves an earlier open thread, that a configuration changed, that an earlier photograph was not actually a final state, that several memories form a story, or that several stories form a larger chapter.

This should not initially mean silently merging or rewriting historical material. The safer model is **persistent source memories and stories plus evolving higher-order synthesis**.

A future controlled experiment should provide two or more separate source dumps from different points in the same bicycle's life and test whether the AI can independently:
- recognize that they concern the same evolving object;
- determine whether each dump is best treated as a memory or already supports a story;
- identify which earlier threads are extended or resolved;
- distinguish conflicting, temporary, or superseded states;
- recognize when several memories form a coherent story;
- recognize when several stories form a larger arc;
- construct higher-order narrative without erasing the integrity of the original captures.

## Timeline decision for v0

The earlier story-centric timeline assumption needs to be reconsidered in light of the memory model. The safest current rule is to preserve **capture/creation timestamps on memories as immutable provenance** rather than requiring the system to reconstruct a perfect historical chronology at capture time.

Dates contained within a memory may refer to earlier events and remain part of its content. Higher-order stories, chapters, and biographies can later derive historical sequencing where the evidence supports it.

v0 does not need to solve a perfect historical timeline before memories can be captured.

## Memory and story breadth

A memory can be extremely small:
- one photo and one sentence;
- a component change;
- a thought about what to try next;
- an unfinished build update;
- a ride;
- a receipt or historical document plus a remembered detail.

A story can likewise vary dramatically in scale once enough coherent material exists: from a single strong memory to a build, restoration, event, trip, or longer arc assembled from multiple memories.

Avoid forcing formal memory or story types in the MVP.

Useful principle:

> **Capture what the owner remembers now. Let larger stories emerge when the material supports them.**

## Canonical home and sharing

BikeStories should eventually be the canonical home for the bike's accumulated memories and the stories/chapters/biography derived from them. Instagram, blogs, forums/BBSs, and other channels can become derived publishing formats later.

Sharing is important, but do not prematurely turn the product into “Instagram for bikes.” The persistent organizing idea is the physical bicycle and the history accumulating around it.

## External collections as discovery sources

BikeStories should not require a user to manually upload every candidate artifact before the system can look for memories or stories. A future input mode could point BikeStories at an **existing external collection** — for example a Flickr album, photo library, cloud folder, or another user-authorized archive — and let the AI search that collection for relevant evidence.

This changes the input model from:

> **user selects artifacts → uploads them → AI interprets them**

into a possible discovery model:

> **user points to a source → AI searches the source → identifies candidate memories/stories → imports only the artifacts that actually contribute**

The external collection should be treated as a **source corpus, not automatically as BikeStories content**. Merely giving BikeStories access to an album should not imply that every photograph is imported, copied, published, or attached to a bicycle.

A useful first version could be deliberately narrow: the user points BikeStories at one album or collection and asks it to find material related to a particular bicycle, memory, period, or possible story. BikeStories examines the available material, identifies the strongest relevant artifacts, and only then brings selected artifacts into the BikeStories provenance chain.

This is consistent with the broader editorial principle that the dump is not the edit. In this case, the “dump” may remain outside BikeStories entirely until the system finds evidence worth preserving.

Potential product principle:

> **Search broadly; preserve selectively.**

This may lower capture friction substantially for people who already have years of bicycle photographs scattered through existing services. Instead of requiring them to reconstruct their history manually, BikeStories could help rediscover memories already sitting in archives they have forgotten about.

The product must preserve source provenance for anything selected from an external collection, including enough information to distinguish the original source from the BikeStories copy or reference. Questions about permissions, source longevity, whether BikeStories stores a durable copy, and what happens if the external source disappears are implementation concerns to research later rather than assumptions to bake into the concept now.

## When a dump does not contain a story

BikeStories must be comfortable concluding that a set of authentic artifacts does **not yet contain a coherent story**. A user may upload many photographs of the same bicycle that are unrelated except for depicting the same physical object.

> **The same bike is a relationship, but it is not necessarily a story.**

The system should separate three kinds of confidence:

1. **Preservation confidence** — very little evidence is required to save an artifact or memory. Uncertain material should usually be preserved rather than rejected.
2. **Relationship confidence** — stronger evidence is required to associate artifacts or memories, such as recognizing that several photographs depict the same bike or likely belong to the same ride, repair, or period.
3. **Story confidence** — substantially stronger evidence is required before claiming that a collection of memories forms a coherent narrative.

Conceptually:

> **Bike identity ≠ memory relationship ≠ story relationship**

When a random dump contains useful clusters, the AI may organize those clusters into candidate memories: several photos from one ride, several images of a component change, or a document and photograph that clearly belong together. Other artifacts may remain individually attached to the bicycle without being forced into a larger structure.

The correct product response may sometimes be essentially:

> **Saved. I don't think there's a story here yet.**

That is a successful outcome, not a failure. A later memory may supply context that makes an older, previously isolated artifact important. The system should retain enough provenance and association information to recognize those relationships when they become visible later.

Working principle:

> **Preserve first. Organize when confident. Tell a story only when one is actually there.**

This is a direct guardrail against BikeStories becoming a story-manufacturing machine.

## Research before implementation

Do not jump into application development yet. First use controlled experiments with frozen source datasets to understand:
- minimum useful input for a memory;
- whether capture and story-construction clarification should behave differently;
- grounding rules;
- voice preservation;
- memory relationship detection;
- behavior when a dump contains no coherent story;
- confidence thresholds for preservation, association, and story formation;
- whether AI can leave artifacts intentionally ungrouped without treating that as failure;
- discovery from an external collection without importing everything;
- whether AI can identify which external-source artifacts actually contribute to a memory or story;
- provenance and source-reference requirements for externally discovered artifacts;
- when one or more memories actually support a coherent story;
- narrative-role inference and sequencing;
- artifact selection and exclusion;
- chronology conflicts between visually plausible and actual sequences;
- visual composition;
- the appropriate balance of words and artifacts;
- unfinished/open-ended memories;
- cross-memory story discovery;
- cross-story chapter discovery;
- higher-order synthesis into an evolving biography;
- what constitutes “good enough” without user polishing.

The Voyager experiments remain useful reference cases, but the original Voyager input should now be reconsidered as a **candidate memory**, not automatically as a finished story.

After Voyager, add contrasting experiments so the product is not overfit to one medium-size acquisition/build memory.