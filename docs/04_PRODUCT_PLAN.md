# Mythwright product plan

Prepared: 11 October 2026

## Review of the supplied documentation

`00_PROJECT_SETUP.md` describes a ChatGPT Project workflow, not a web product specification. `01_CANONICAL_RULES.md` v1.0 is the authority: 14 confirmed rules, 5 unadopted proposals, 11 unresolved mechanics, source limitations, and review safeguards. `02_PROJECT_INSTRUCTIONS.md` supplies the generation workflow and required consistency check. `03_SAMPLE_PROMPTS.md` supplies 15 author-reviewed starting requests.

The rules intentionally leave quantitative mechanics unfinished. Mythwright must support useful qualitative generation without inventing caps, reset numbers, reserve relationships, reproduction splits, inheritance probabilities, or skill ranks. A consistency report must distinguish consistent, conditional, contradiction, and outside established rules. A qualitative review cannot prove a numeric balance.

The clearest product direction is a fantasy progression-world workshop: prepare generation, review results against canon, keep accepted continuity, and propose explicit reference revisions. This direction is inferred from the docs; multi-world management, AI providers, collaboration, monetization, and a full manuscript editor are not specified.

## Review of the copied site

The copied app is Writers Studio: a broad React/TypeScript writing suite with character, series/book, timeline, worldbuilding, import/export, analytics, and AI components plus a PHP backend. The original entry point initialized analytics, multiple state stores, backend synchronization, and API loads behind an authentication guard. None of those flows expresses the new progression-world workflow.

Reusable foundations: React, Vite, strict TypeScript, shared dependency workspace, Zustand persistence, the shared Web Hatchery authentication package for future private server features, and the local publishing pipeline.

Review before reuse: the legacy canon vault and AI service may contain useful patterns, but their business models and prompts require an explicit redesign. Old level/stat systems, combat logic, automatic consistency checks, sample records, and seeded data must not become Mythwright canon.

Isolation concerns: copied frontend/backend environment files and backend storage may still target the source application's services and data. This slice makes no requests to them and publishes only the new frontend. Retain the copied source during migration; remove it in a later coherent cleanup after the useful pieces have been selected. The current folder has no Git repository; no commit can be made here without initialization.

## Product boundaries

1. Confirmed mechanics are sourced from the authoritative reference, with C-IDs and source version.
2. Proposals and unresolved questions remain visibly separate; generated material is draft by default.
3. Accepted setting continuity and adopted world mechanics are separate operations. Adopting mechanics requires exact replacement wording, affected C/P/U IDs, source decision, version change, and consequences.
4. Track identity/lineage, form/level, evolution history, experiences, current option status, energy, reproduction deductions/losses, skills, enhancements, and open dependencies separately.
5. No automatic naming service, numeric progression engine, energy simulator, universal evolution tree, or deterministic inheritance model is needed for the first product slice.
6. Generation requests include the complete reference and operating instructions. Source updates take effect after rebuilding the app; browser drafts do not edit the reference.

## Ordered implementation milestones

### M01 — Replace the active site with a useful local workshop

Implemented in this first slice:
- Mythwright branding and a responsive world desk.
- Searchable confirmed/provisional/unresolved reference, with full source and safeguards accessible.
- All 15 sample prompts, editable requests, full-reference brief preview/copy/Markdown download.
- A continuity notebook with separate fields, isolated browser persistence, draft labels, and Markdown export.
- New project README and catalog metadata; inherited startup and API flows disconnected.
- Frontend-only local publishing guard while the backend remains inherited.

Validation: build, focused lint, source parsing/brief/continuity tests, and a local published preview. Browser storage is a working first slice, not an account backup. Record actual check outcomes below after execution.

### M02 — Establish private project persistence

Audit and replace copied environment settings, API identity, schema, seed/storage data, routes, tenant ownership, and tests. Add ordered Mythwright migrations inside `backend/database/migrations`. Integrate only shared Web Hatchery bearer authentication; no local login flow. Provide named world workspaces and server-authoritative continuity records, import/export, and clear storage errors. Verify that the old project's data and endpoints cannot be accessed through Mythwright.

### M03 — Add generation and review

Select the existing shared AI gateway or an explicitly configured provider after reviewing its contract. Assemble requests from a versioned rules snapshot and explicitly accepted continuity. Store requests, outputs, relevant C-IDs, and review status. Review output as consistent/conditional/contradiction/outside established rules; preserve provenance and unknowns. No claim of numeric validation without defined values and accounting boundaries. Add retry/error handling without silently substituting canned generation.

### M04 — Accepted continuity and canon revisions

Add an explicit author acceptance action for setting facts. Separately provide reviewable rule patches, version history, affected C/P/U IDs, and impact checks on accepted records. Acceptance never occurs from repeated generation or an assistant suggestion. Keep sandbox overrides scoped to their experiment. Export the actual adopted source and distinguish it from unsaved proposals.

### M05 — Retire inherited implementation and prepare release

Remove obsolete writing pages, stores, old tests, copied sample data, backend routes, and stale deployment/CI metadata once replacements exist. Validate desktop/mobile navigation, keyboard access, source exports, authenticated tenant isolation, and failed AI/persistence behavior. Establish a project Git repository and initial coherent history if requested. Public deployment is a later release task.

## First-slice limits

No integrated AI generation, automated contradiction audit, accepted canon promotion, server storage, reference editing, or copied-data migration. These are planned work, not functional buttons or implied completed features. Original source docs remain unchanged.

## M01 validation record — 11 October 2026

- `npm run build`: passed (strict TypeScript project build and Vite production bundle).
- Focused ESLint for the replacement entry points, components, source integration, tests, and store: passed.
- `vitest run src/data/mythwright-reference.test.ts src/components/mythwright/workshop.test.tsx --environment jsdom`: 10 tests passed. Covers all C/P/U IDs and status groups, full source/safeguard preservation, all prompts, draft unknowns, replacement/rehydration, status search, request retention across navigation, and saving/reopening/exporting a record.
- `publish.ps1 -Frontend -FileSystemOnly`: built preview and copied frontend assets to `\\wsl.localhost\Ubuntu\home\kalai\dev\mythwright`. No backend or FTP publication.
- Browser attempt at `http://127.0.0.1/mythwright/` failed with `ERR_CONNECTION_REFUSED`. The shared HTTP service on port 80 was unavailable. Visual desktop/mobile checks, real clipboard/download behavior, and live browser storage remain unverified; jsdom tests are not a browser playtest.
- Project Roost publish tracking and apps catalog refresh also failed because port 80 refused connections. Local file publication succeeded independently; catalog metadata has only been updated in source.
- No Git commit: this folder is not a Git checkout. No repository was initialized during this planning/replacement slice.
