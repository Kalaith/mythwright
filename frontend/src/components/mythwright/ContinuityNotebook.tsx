import { useState } from "react";
import { Plus, Save } from "lucide-react";
import {
  exportDraft,
  newDraft,
  useMythwrightStore,
} from "../../stores/mythwrightStore";
import { CopyButton } from "./CopyButton";
import { ContinuityFields } from "./ContinuityFields";

export function ContinuityNotebook() {
  const drafts = useMythwrightStore((state) => state.drafts);
  const saveDraft = useMythwrightStore((state) => state.saveDraft);
  const [draft, setDraft] = useState(newDraft);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const text = exportDraft(draft);
  const save = () => {
    if (!draft.title.trim()) {
      setMessage("Give this draft a title before saving.");
      return;
    }
    const updated = {
      ...draft,
      title: draft.title.trim(),
      updatedAt: new Date().toISOString(),
    };
    try {
      saveDraft(updated);
      setDraft(updated);
      setDirty(false);
      setMessage("Draft saved in this browser.");
    } catch {
      setMessage(
        "Browser storage could not save this draft. Export a copy below.",
      );
    }
  };
  return (
    <>
      <p className="mw-eyebrow">KEEP YOUR WORLD’S THREAD</p>
      <h1>Continuity begins with a record.</h1>
      <p className="mw-lead">
        Keep skills separate from enhancements, form separate from level, and
        unknowns explicit. Every record here remains a draft.
      </p>
      <p className="mw-storage-note">
        Saved in this browser only. Export records to keep a portable copy.
      </p>
      <div className="mw-notebook-grid">
        <aside className="mw-panel mw-draft-list">
          <h2>
            Your drafts <span className="mw-muted">({drafts.length})</span>
          </h2>
          <button
            className="mw-secondary"
            disabled={dirty}
            onClick={() => {
              setDraft(newDraft());
              setMessage("");
            }}
          >
            <Plus size={16} />
            New draft
          </button>
          {drafts.length === 0 && (
            <p className="mw-muted">
              A clean page. Create your first continuity record.
            </p>
          )}
          {drafts.map((item) => (
            <button
              key={item.id}
              disabled={dirty}
              className={
                item.id === draft.id
                  ? "mw-saved-draft active"
                  : "mw-saved-draft"
              }
              onClick={() => {
                setDraft(item);
                setMessage("");
              }}
            >
              <strong>{item.title}</strong>
              <small>
                Draft · {new Date(item.updatedAt).toLocaleDateString()}
              </small>
            </button>
          ))}
          {dirty && (
            <p className="mw-muted">
              Save your changes before opening another draft.
            </p>
          )}
        </aside>
        <section className="mw-panel">
          <span className="mw-badge provisional">DRAFT · NOT ADOPTED</span>
          <label className="mw-field">
            Record title
            <input
              value={draft.title}
              placeholder="A creature, family, or progression history"
              onChange={(event) => {
                setDraft({ ...draft, title: event.target.value });
                setDirty(true);
                setMessage("");
              }}
            />
          </label>
          <ContinuityFields
            draft={draft}
            onChange={(updated) => {
              setDraft(updated);
              setDirty(true);
              setMessage("");
            }}
          />
          <div className="mw-actions">
            <button className="mw-primary" onClick={save}>
              <Save size={16} />
              Save draft
            </button>
            <span role="status">{message}</span>
          </div>
          <details className="mw-export-details">
            <summary>Export continuity record</summary>
            <textarea
              className="mw-export"
              aria-label="Continuity Markdown"
              readOnly
              rows={14}
              value={text}
            />
            <CopyButton key={text} text={text} />
            <a
              className="mw-text-link"
              download="mythwright-continuity-draft.md"
              href={`data:text/markdown;charset=utf-8,${encodeURIComponent(text)}`}
            >
              Download as Markdown
            </a>
          </details>
        </section>
      </div>
    </>
  );
}
