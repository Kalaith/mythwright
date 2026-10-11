import canonicalRules from "../../../docs/01_CANONICAL_RULES.md?raw";
import projectInstructions from "../../../docs/02_PROJECT_INSTRUCTIONS.md?raw";
import samplePrompts from "../../../docs/03_SAMPLE_PROMPTS.md?raw";

export interface ReferenceEntry {
  id: string;
  title: string;
  body: string;
  status: "Confirmed" | "Provisional" | "Unresolved";
}
export interface PromptTemplate {
  id: string;
  title: string;
  body: string;
}

function parseRows(
  source: string,
  status: ReferenceEntry["status"],
): ReferenceEntry[] {
  return source
    .split("\n")
    .filter((line) =>
      (status === "Provisional" ? /^\| P\d{2} \|/ : /^\| U\d{2} \|/).test(line),
    )
    .map((line) => {
      const [, id, title, body] = line.split("|").map((cell) => cell.trim());
      return { id, title, body, status };
    });
}

export const rules: ReferenceEntry[] = [
  ...canonicalRules.matchAll(
    /### (C\d{2}) — (.+)\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## |$)/g,
  ),
].map((match) => ({
  id: match[1],
  title: match[2],
  body: match[3].trim(),
  status: "Confirmed",
}));
export const proposals = parseRows(canonicalRules, "Provisional");
export const unknowns = parseRows(canonicalRules, "Unresolved");
export const promptTemplates: PromptTemplate[] = [
  ...samplePrompts.matchAll(/## (\d+)\. (.+)\r?\n([\s\S]*?)(?=\r?\n## |$)/g),
].map((match) => ({
  id: match[1],
  title: match[2],
  body: match[3].trim().replace(/^> /gm, ""),
}));
export { canonicalRules, projectInstructions };

export function buildPrompt(request: string): string {
  return `# Mythwright — generation brief\n\nThe complete author reference and operating instructions are included below. Read them before responding. This request does not adopt new mechanics or setting facts.\n\n## Canonical reference\n\n${canonicalRules}\n\n## Operating instructions\n\n${projectInstructions}\n\n## Author request\n\n${request.trim()}`;
}
