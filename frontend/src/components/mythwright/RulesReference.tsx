import { useState } from "react";
import { Search } from "lucide-react";
import {
  rules,
  proposals,
  unknowns,
  canonicalRules,
} from "../../data/mythwright-reference";
import type { ReferenceEntry } from "../../data/mythwright-reference";

const statuses: ReferenceEntry["status"][] = [
  "Confirmed",
  "Provisional",
  "Unresolved",
];
export function RulesReference() {
  const [status, setStatus] = useState<ReferenceEntry["status"]>("Confirmed");
  const [search, setSearch] = useState("");
  const entries = [...rules, ...proposals, ...unknowns].filter(
    (entry) =>
      entry.status === status &&
      `${entry.id} ${entry.title} ${entry.body}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <p className="mw-eyebrow">THE AUTHOR’S REFERENCE · VERSION 1.0</p>
      <h1>Rules, with room to grow.</h1>
      <p className="mw-lead">
        Confirmed constraints guide generation. Proposals need adoption.
        Unresolved mechanics stay visible.
      </p>
      <div className="mw-toolbar">
        <div className="mw-tabs" aria-label="Rule status">
          {statuses.map((item) => (
            <button
              key={item}
              aria-pressed={status === item}
              className={status === item ? "active" : ""}
              onClick={() => setStatus(item)}
            >
              {item}{" "}
              <span>
                {item === "Confirmed"
                  ? rules.length
                  : item === "Provisional"
                    ? proposals.length
                    : unknowns.length}
              </span>
            </button>
          ))}
        </div>
        <label className="mw-search">
          <Search size={17} />
          <span className="mw-sr-only">Search reference</span>
          <input
            placeholder="Search rules or IDs…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>
      <div className="mw-rule-list">
        {entries.map((entry) => (
          <article className="mw-rule" key={entry.id}>
            <div>
              <span className={`mw-badge ${status.toLowerCase()}`}>
                {entry.id} · {entry.status}
              </span>
              <h2>{entry.title}</h2>
            </div>
            {entry.body.split(/\r?\n\r?\n/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        ))}
        {entries.length === 0 && (
          <p className="mw-empty">
            No matches in {status.toLowerCase()} entries. Try another term or
            status.
          </p>
        )}
      </div>
      <details className="mw-callout">
        <summary>
          Read the complete source, safeguards, and evidence limits
        </summary>
        <pre className="mw-source">{canonicalRules}</pre>
      </details>
    </>
  );
}
