import { useState } from "react";
import { BookOpen, Feather, GitBranch, ScrollText } from "lucide-react";
import { RulesReference } from "./components/mythwright/RulesReference";
import { PromptStudio } from "./components/mythwright/PromptStudio";
import { ContinuityNotebook } from "./components/mythwright/ContinuityNotebook";
import { Overview } from "./components/mythwright/Overview";
import "./App.css";
import "./styles/mythwright.css";

const views = [
  { id: "overview", title: "World desk", icon: Feather },
  { id: "rules", title: "Rules reference", icon: BookOpen },
  { id: "prompts", title: "Prompt studio", icon: ScrollText },
  { id: "continuity", title: "Continuity notebook", icon: GitBranch },
] as const;
type View = (typeof views)[number]["id"];

export default function App() {
  const [view, setView] = useState<View>("overview");
  return (
    <div className="mythwright">
      <aside className="mw-sidebar">
        <a className="mw-brand" href="#" onClick={() => setView("overview")}>
          <Feather size={28} />
          <span>
            Mythwright<small>A progression world workshop</small>
          </span>
        </a>
        <p className="mw-nav-label">YOUR WORKSPACE</p>
        <nav aria-label="Workspace">
          {views.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              className={view === id ? "active" : ""}
              aria-current={view === id ? "page" : undefined}
              onClick={() => setView(id)}
            >
              <Icon size={19} />
              {title}
            </button>
          ))}
        </nav>
        <div className="mw-sidebar-note">
          <span className="mw-dot" /> Canon v1.0
          <p>
            Build on confirmed rules.
            <br />
            Leave room for the unknown.
          </p>
        </div>
      </aside>
      <div className="mw-workspace">
        <header className="mw-topbar">
          <span>
            WORKSHOP /{" "}
            {views.find((item) => item.id === view)?.title.toUpperCase()}
          </span>
          <span>Fantasy progression worlds</span>
        </header>
        <main id="main-content">
          <div hidden={view !== "overview"}>
            <Overview onNavigate={setView} />
          </div>
          <div hidden={view !== "rules"}>
            <RulesReference />
          </div>
          <div hidden={view !== "prompts"}>
            <PromptStudio />
          </div>
          <div hidden={view !== "continuity"}>
            <ContinuityNotebook />
          </div>
        </main>
        <footer className="mw-footer">
          Mythwright · Rules from the author's reference · New material begins
          as a draft
        </footer>
      </div>
    </div>
  );
}
