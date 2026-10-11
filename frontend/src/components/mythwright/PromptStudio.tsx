import { useState } from "react";
import {
  buildPrompt,
  promptTemplates,
  rules,
  proposals,
  unknowns,
} from "../../data/mythwright-reference";
import { CopyButton } from "./CopyButton";

export function PromptStudio() {
  const [templateId, setTemplateId] = useState("2");
  const [request, setRequest] = useState(
    promptTemplates.find((item) => item.id === "2")!.body,
  );
  const brief = buildPrompt(request);
  return (
    <>
      <p className="mw-eyebrow">CREATIVE WORK, GROUNDED IN CANON</p>
      <h1>Prepare your next brief.</h1>
      <p className="mw-lead">
        Choose a starting point, replace its placeholders, and copy the complete
        brief into your preferred AI chat.
      </p>
      <div className="mw-editor-grid">
        <section className="mw-panel">
          <label className="mw-field">
            Starting prompt
            <select
              value={templateId}
              onChange={(event) => {
                setTemplateId(event.target.value);
                setRequest(
                  promptTemplates.find(
                    (item) => item.id === event.target.value,
                  )!.body,
                );
              }}
            >
              {promptTemplates.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}. {item.title}
                </option>
              ))}
            </select>
          </label>
          <label className="mw-field">
            Your request
            <textarea
              rows={14}
              value={request}
              onChange={(event) => setRequest(event.target.value)}
            />
          </label>
          <p className="mw-muted">
            Changing the starting prompt replaces this request. Copy any wording
            you want to keep first.
          </p>
        </section>
        <section className="mw-panel mw-brief-summary">
          <span className="mw-badge confirmed">REFERENCE INCLUDED</span>
          <h2>A portable world brief</h2>
          <p>
            Your export includes the complete canonical rules v1.0, the project
            instructions, and your request.
          </p>
          <ul>
            <li>{rules.length} confirmed rules and their safeguards</li>
            <li>{proposals.length} unadopted proposals</li>
            <li>{unknowns.length} unresolved mechanics</li>
            <li>A required consistency check</li>
          </ul>
          <p>
            Responses remain draft material. Review any proposed mechanics
            before adopting them.
          </p>
          <CopyButton key={brief} text={brief} label="Copy complete brief" />
          <a
            className="mw-text-link"
            download="mythwright-generation-brief.md"
            href={`data:text/markdown;charset=utf-8,${encodeURIComponent(brief)}`}
          >
            Download as Markdown
          </a>
        </section>
      </div>
      <details className="mw-callout">
        <summary>Preview the complete brief</summary>
        <textarea
          className="mw-export"
          aria-label="Complete generation brief"
          rows={18}
          value={brief}
          readOnly
        />
      </details>
    </>
  );
}
