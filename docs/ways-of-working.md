# BikeStories — Ways of Working

This document captures working practices learned during the early BikeStories experiments. These are defaults, not product requirements; change them when evidence shows a better way.

## Preserve a clean checkpoint before changing direction

When an experiment reaches a meaningful proof, failure boundary, or architectural decision, checkpoint the state in GitHub before moving on. Record what is proven, what is inferred, what remains unproven, relevant capture/issue/PR identifiers, and the next narrow question.

The goal is to make it safe to stop, change tools, hand work to another agent, or resume later without reconstructing the experiment from conversation history.

## Use Codex for narrow implementation and diagnosis

Codex is most useful when the product question is already understood and the remaining work is a bounded engineering task. Before handing work to Codex, make the task explicit about:

- repository, branch, issue/PR, and current checkpoint;
- the narrow goal and success criteria;
- what has already been empirically proven and should not be re-solved;
- constraints and invariants that must be preserved;
- the specific boundaries to inspect or validate;
- what is explicitly out of scope;
- required tests or concrete validation evidence;
- Git/checkpoint expectations;
- stop conditions and the required final report.

Codex should **inspect before modifying**. A diagnosis that no code change is necessary is a valid outcome. Do not manufacture changes merely to produce a commit.

## Prefer the smallest experiment that answers the question

BikeStories is still in an experimental/product-discovery phase. Do not turn a narrow proof into production architecture work. Make the smallest safe change that proves or disproves the capability under investigation.

If solving the immediate technical problem would require a material change to the product model, privacy model, capture workflow, or broader architecture, stop and surface that decision instead of silently making it.

## Separate proven behavior from suspected failures

When a workflow appears stuck, identify the boundary that is actually failing. Validate components independently where possible instead of assuming the newest code is broken.

For example, distinguish among application behavior, external-service behavior, hosting/runtime behavior, and limitations of the tool being used to inspect the result.

A debugging tool's inability to display an output is not itself proof that the underlying application output is invalid.

## Validate with real experiment data

Prefer concrete evidence from known captures/artifacts over synthetic assumptions. Validation should establish observable outcomes such as status, identity, byte/content validity, counts, or exact matches.

Do not call something proven merely because code exists for it or a deployment succeeded.

## Protect established invariants

During narrow experiments, preserve already-proven behavior unless the experiment specifically challenges it. Current examples include immutable raw captures, derived enrichment kept separately, per-artifact identity, private source artifacts remaining private, and keeping phone-side capture as simple as possible.

## Avoid unnecessary phone-side complexity

If deterministic server-side normalization can absorb an awkward but complete payload from iOS Shortcuts, prefer that over making the owner perform more actions or maintain more Shortcut logic. The capture experience should remain focused on selecting artifacts and preserving the memory.

## Be conscious of agent budget

Agent work can consume significant token/usage budget even when the eventual code change is small, particularly when diagnosis crosses external-service or deployment boundaries. When budget is constrained, prefer stopping at a clean checkpoint rather than starting an uncertain investigation unless the task is important enough to justify the spend.

When using Codex under a constrained budget, keep prompts narrow and provide the existing evidence so the agent does not spend time rediscovering already-proven behavior.

## Finish with a checkpoint, not scope creep

After a narrow task is solved, validate it, review the diff, commit/push if appropriate, checkpoint the result in the relevant issue/PR, report what remains unproven, and stop.

Do not automatically continue into the next BikeStories feature just because the agent has context and momentum.
