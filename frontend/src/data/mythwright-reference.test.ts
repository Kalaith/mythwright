import { describe, expect, it } from "vitest";
import {
  buildPrompt,
  canonicalRules,
  projectInstructions,
  promptTemplates,
  proposals,
  rules,
  unknowns,
} from "./mythwright-reference";
import {
  exportDraft,
  newDraft,
  useMythwrightStore,
} from "../stores/mythwrightStore";

describe("author reference integration", () => {
  it("preserves every C, P, and U ID in separate status groups", () => {
    for (const [entries, prefix, count, status] of [
      [rules, "C", 14, "Confirmed"],
      [proposals, "P", 5, "Provisional"],
      [unknowns, "U", 11, "Unresolved"],
    ] as const) {
      expect(entries.map((entry) => entry.id)).toEqual(
        Array.from(
          { length: count },
          (_, index) => `${prefix}${String(index + 1).padStart(2, "0")}`,
        ),
      );
      expect(
        entries.every(
          (entry) => entry.status === status && entry.body.length > 0,
        ),
      ).toBe(true);
    }
  });
  it("keeps safeguards attached to the complete evolution and reproduction rules", () => {
    expect(rules.find((entry) => entry.id === "C08")?.body).toContain(
      "not automatically every energy store",
    );
    expect(rules.find((entry) => entry.id === "C13")?.body).toContain(
      "relationship between this energy and the evolution reserve is not yet settled",
    );
    expect(rules.find((entry) => entry.id === "C14")?.body).toContain(
      "unresolved",
    );
  });
  it("loads all 15 editable prompts without Markdown blockquote syntax", () => {
    expect(promptTemplates).toHaveLength(15);
    expect(promptTemplates[1].body).toContain("[creature concept]");
    expect(promptTemplates[14].body).toContain(
      "only explicitly accepted material",
    );
    expect(promptTemplates.every((item) => !item.body.startsWith(">"))).toBe(
      true,
    );
  });
  it("exports exact complete sources, including evidence limits, before the request", () => {
    const brief = buildPrompt("Generate an Ice Dragon profile.");
    expect(brief).toContain(canonicalRules);
    expect(brief).toContain(projectInstructions);
    expect(brief).toContain(
      "This request does not adopt new mechanics or setting facts.",
    );
    expect(brief.endsWith("Generate an Ice Dragon profile.")).toBe(true);
  });
});

describe("continuity draft boundaries", () => {
  it("rehydrates a saved record from the isolated Mythwright storage", async () => {
    const draft = { ...newDraft(), title: "Stored lineage" };
    useMythwrightStore.getState().saveDraft(draft);
    const storage = useMythwrightStore.persist.getOptions().storage!;
    const snapshot = await storage.getItem("mythwright-continuity-v1");
    expect(snapshot?.state.drafts.some((item) => item.id === draft.id)).toBe(
      true,
    );
    useMythwrightStore.setState({ drafts: [] });
    await storage.setItem("mythwright-continuity-v1", snapshot!);
    await useMythwrightStore.persist.rehydrate();
    expect(
      useMythwrightStore.getState().drafts.find((item) => item.id === draft.id)
        ?.title,
    ).toBe("Stored lineage");
    useMythwrightStore.setState({ drafts: [] });
  });
  it("exports draft status and unknown fields without inferring level or energy values", () => {
    const draft = newDraft();
    draft.title = "Mountain lineage";
    draft.fields.form = "Ice Dragon; at its unspecified cap";
    const text = exportDraft(draft);
    expect(text).toContain("Status: Draft — not adopted canon");
    expect(text).toContain("## Skills\n\nUnspecified");
    expect(text).toContain("## Energy enhancements\n\nUnspecified");
    expect(text).toContain(
      "## Reproduction allocations and losses\n\nUnspecified",
    );
    expect(text).toContain(draft.fields.form);
  });
  it("replaces the same draft rather than duplicating its history entry", () => {
    useMythwrightStore.setState({ drafts: [] });
    const draft = newDraft();
    useMythwrightStore.getState().saveDraft({ ...draft, title: "First title" });
    useMythwrightStore
      .getState()
      .saveDraft({ ...draft, title: "Revised title" });
    expect(useMythwrightStore.getState().drafts).toHaveLength(1);
    expect(useMythwrightStore.getState().drafts[0].title).toBe("Revised title");
    useMythwrightStore.setState({ drafts: [] });
  });
});
