import { ArrowRight, BookOpen, GitBranch, ScrollText } from "lucide-react";
import { rules, proposals, unknowns } from "../../data/mythwright-reference";

interface OverviewProps {
  onNavigate: (view: "rules" | "prompts" | "continuity") => void;
}

export function Overview({ onNavigate }: OverviewProps) {
  return (
    <>
      <section className="mw-hero">
        <div>
          <p className="mw-eyebrow">A WORLD WITH CONSEQUENCES</p>
          <h1>
            Every transformation
            <br />
            has a history.
          </h1>
          <p className="mw-lead">
            Shape creatures, lineages, and stories around a consistent
            progression system. Keep your imagination open and your world’s
            rules close.
          </p>
          <button className="mw-primary" onClick={() => onNavigate("prompts")}>
            Prepare a generation brief <ArrowRight size={17} />
          </button>
        </div>
        <div
          className="mw-lineage"
          aria-label="Illustrative canon lineage: Dragon to Ice Dragon to Arctic Dragon"
        >
          <span className="mw-eyebrow">THE ILLUSTRATIVE LINEAGE · C12</span>
          {["Dragon", "Ice Dragon", "Arctic Dragon"].map((form, index) => (
            <div className="mw-lineage-step" key={form}>
              <span className="mw-lineage-number">0{index + 1}</span>
              <div>
                <h3>{form}</h3>
                <p>
                  {index === 0
                    ? "Progression within the current form"
                    : "Chosen evolution · form level resets"}
                </p>
              </div>
            </div>
          ))}
          <p className="mw-lineage-caption">
            One possible history. Inherited evolved forms can begin their own
            progression.
          </p>
        </div>
      </section>
      <section className="mw-counts" aria-label="Reference overview">
        <button onClick={() => onNavigate("rules")}>
          <strong>{rules.length}</strong>
          <span>
            Confirmed rules<small>The foundation of this world</small>
          </span>
        </button>
        <button onClick={() => onNavigate("rules")}>
          <strong>{proposals.length}</strong>
          <span>
            Provisional proposals<small>Ideas awaiting adoption</small>
          </span>
        </button>
        <button onClick={() => onNavigate("rules")}>
          <strong>{unknowns.length}</strong>
          <span>
            Open mechanics<small>Unknown values stay unknown</small>
          </span>
        </button>
      </section>
      <div className="mw-section-heading">
        <div>
          <p className="mw-eyebrow">FROM IDEA TO CONTINUITY</p>
          <h2>Make space for your next world.</h2>
        </div>
        <span className="mw-muted">A deliberate creative workflow</span>
      </div>
      <section className="mw-feature-grid">
        {[
          {
            view: "rules" as const,
            icon: BookOpen,
            title: "Know the boundaries",
            text: "Explore energy, evolution, inheritance, and skills. Search the full rules and their unresolved dependencies.",
            action: "Explore the reference",
          },
          {
            view: "prompts" as const,
            icon: ScrollText,
            title: "Ask a better question",
            text: "Choose an author-provided prompt, refine the request, and take a brief with the complete rules into your AI chat.",
            action: "Open prompt studio",
          },
          {
            view: "continuity" as const,
            icon: GitBranch,
            title: "Keep the thread",
            text: "Record form, experiences, energy, skills, and open questions in a draft notebook saved in this browser.",
            action: "Start a continuity draft",
          },
        ].map(({ view, icon: Icon, title, text, action }) => (
          <button
            className="mw-feature"
            key={view}
            onClick={() => onNavigate(view)}
          >
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
            <span>
              {action} <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </section>
      <div className="mw-callout">
        <strong>Draft freely. Adopt deliberately.</strong>
        <p>
          Generating a creature does not make it canon. A compelling explanation
          does not settle an unfinished mechanic. This first workshop prepares
          briefs and keeps drafts; it does not run AI generation or change the
          author’s reference.
        </p>
      </div>
    </>
  );
}
