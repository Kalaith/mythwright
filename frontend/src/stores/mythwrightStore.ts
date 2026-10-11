import { create } from "zustand";
import { persist } from "zustand/middleware";

export const continuityFields = [
  { key: "identity", label: "Identity and lineage" },
  { key: "form", label: "Current form and level" },
  { key: "history", label: "Prior evolution events" },
  { key: "experiences", label: "Experiences and environment" },
  { key: "options", label: "Current options and their status" },
  { key: "energy", label: "Energy stores, inputs, and deductions" },
  { key: "reproduction", label: "Reproduction allocations and losses" },
  { key: "skills", label: "Skills" },
  { key: "enhancements", label: "Energy enhancements" },
  { key: "questions", label: "Unresolved dependencies" },
] as const;
export type ContinuityField = (typeof continuityFields)[number]["key"];
export interface ContinuityDraft {
  id: string;
  title: string;
  updatedAt: string;
  fields: Record<ContinuityField, string>;
}

export function newDraft(): ContinuityDraft {
  return {
    id: crypto.randomUUID(),
    title: "",
    updatedAt: new Date().toISOString(),
    fields: {
      identity: "",
      form: "",
      history: "",
      experiences: "",
      options: "",
      energy: "",
      reproduction: "",
      skills: "",
      enhancements: "",
      questions: "",
    },
  };
}

export function exportDraft(draft: ContinuityDraft): string {
  return `# ${draft.title || "Untitled continuity draft"}\n\nStatus: Draft — not adopted canon\nReference: Canonical rules v1.0\nUpdated: ${draft.updatedAt}\n\n${continuityFields.map(({ key, label }) => `## ${label}\n\n${draft.fields[key].trim() || "Unspecified"}`).join("\n\n")}\n`;
}

interface MythwrightState {
  drafts: ContinuityDraft[];
  saveDraft: (draft: ContinuityDraft) => void;
}
export const useMythwrightStore = create<MythwrightState>()(
  persist(
    (set) => ({
      drafts: [],
      saveDraft: (draft) =>
        set((state) => ({
          drafts: [
            draft,
            ...state.drafts.filter((item) => item.id !== draft.id),
          ],
        })),
    }),
    { name: "mythwright-continuity-v1", version: 1 },
  ),
);
