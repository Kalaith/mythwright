# Mythwright

Mythwright is a fantasy progression-world workshop based on the author's canonical rules in `docs/01_CANONICAL_RULES.md`.

The first replacement slice provides a searchable rules reference, all 15 author-provided prompt templates, a complete generation-brief export, and a browser-saved continuity draft notebook. Draft records remain drafts; the app does not adopt mechanics or claim to validate energy budgets.

## Current scope

- Rules and prompts are loaded directly from the source Markdown at build time.
- Prompt briefs include the full rules and operating instructions for use in an external AI chat.
- Continuity drafts use an isolated `mythwright-continuity-v1` browser storage key. Markdown export preserves unspecified values and marks the record as draft.
- No AI requests, copied backend calls, login requirement, or server persistence are active in this slice.
- Copied Writers Studio source and backend remain available for review, but are disconnected from the app entry point. Their credentials, schema, data, and AI configuration are not approved Mythwright infrastructure.

See `docs/04_PRODUCT_PLAN.md` for the review, milestones, and adoption boundaries.

## Local validation and preview

Use the shared dependencies in `D:\WebHatchery\node_modules`; no per-app dev server is needed.

```powershell
Set-Location D:\WebHatchery\apps\mythwright\frontend
npm run build
D:\WebHatchery\node_modules\.bin\vitest.cmd run src/data/mythwright-reference.test.ts src/components/mythwright/workshop.test.tsx --environment jsdom
Set-Location ..
.\publish.ps1 -Frontend -FileSystemOnly
```

Open `http://127.0.0.1/mythwright/`. The app wrapper defaults to frontend publication and blocks the inherited backend until it has been replaced. Do not use the copied backend setup instructions or migrations to initialize Mythwright.

