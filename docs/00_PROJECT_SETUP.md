# Fantasy Progression World Generator — Project Setup

Prepared: 11 October 2026

## Add the setup to a ChatGPT Project

Suggested Project name: **Fantasy Progression World Generator**.

1. Create or open the intended ChatGPT Project.
2. Add `01_CANONICAL_RULES.md` to the Project's sources. It is the authority for world mechanics.
3. Paste the complete contents of `02_PROJECT_INSTRUCTIONS.md` into the Project instructions. Keep the rules reference as a separate source for detailed decisions and open questions.
4. Add `03_SAMPLE_PROMPTS.md` as a source, or keep it locally and copy prompts into Project chats.
5. Run the first-run source-check prompt before generating. Confirm that the reference is accessible and its version is 1.0.
6. Start a focused chat for each outcome, such as a creature, lineage, scene, or rules proposal. Add explicitly accepted continuity records as Project sources when they should inform future generation.

ChatGPT Projects share uploaded files, instructions, and connected sources across their chats. Add the files to the Project rather than relying on their presence in this local folder. See [official Project documentation](https://learn.chatgpt.com/docs/projects).

## What each file does

| File | Use |
| --- | --- |
| `01_CANONICAL_RULES.md` | Confirmed C-rules, source evidence, generation safeguards, unadopted P-proposals, and unresolved U-mechanics. |
| `02_PROJECT_INSTRUCTIONS.md` | Concise operating instructions to paste into the Project. |
| `03_SAMPLE_PROMPTS.md` | Editable requests for generation, audits, rules exploration, and continuity records. |
| `00_PROJECT_SETUP.md` | Installation and ongoing maintenance guidance. |

## Source limitation

The original chat was retrieved, but only five user turns were available. Assistant replies were reference markers, and earlier turns were unavailable. The rules reference therefore uses those visible user decisions and the current request, including the clarification that some energy toward next levels goes into reproduction and some is lost. It does not pretend to recover missing formulas or proposals.

If a fuller export becomes available, request an evidence reconciliation: compare explicit author decisions with version 1.0, identify missing or conflicting rules, and propose a revision. Do not treat every historical assistant suggestion as confirmed.

## Keep the Project reusable

- **Generate first, adopt explicitly.** New mechanics remain proposals; new names and setting details remain drafts until accepted.
- **Save accepted continuity.** At a useful boundary, ask for a continuity record using prompt 15. Review it before adding it as a source. Do not rely on an assumption that every future chat will recover every earlier detail.
- **Revise one authoritative reference.** After a decision, use prompt 14, review the patch, and replace the source with the revised file. Avoid keeping conflicting versions active as authorities.
- **Separate local experiments.** Label a hypothetical as a sandbox. Its overrides do not change the main world unless explicitly adopted.
- **Leave unfinished mechanics visible.** Generation can proceed qualitatively, but quantitative outcomes dependent on unknown costs, reserve relationships, or inheritance rules must stay conditional.

## Suggested first working prompt

> Read the rules reference and confirm its version. Generate a qualitative profile of an Ice Dragon at its form's cap that chooses to delay evolution. Show its experiences, current options, skills, and energy enhancements separately. Preserve stable delay and a biologically bounded reserve. Do not invent numeric thresholds or treat candidate forms as canon. End with the applicable C-rules and unresolved dependencies.

## Acceptance checklist

- [ ] The rules reference and Project instructions are available in the Project.
- [ ] The generator distinguishes confirmed rules, provisional proposals, and unresolved mechanics.
- [ ] Chosen evolution resets form-specific levels and consumes the entire evolution reserve without duplicating energy.
- [ ] Delayed evolution is stable, while current compatible options may change or disappear.
- [ ] Inherited evolved forms and compatible hybrids do not automatically inherit parental levels or every advantage.
- [ ] Reproduction debits next-level energy for both its reproductive allocation and its usable-pool loss; exact formation mechanics remain open.
- [ ] Skills and energy enhancement remain distinct.
- [ ] Generated examples do not silently become canon, and source updates are actually saved and replaced.
