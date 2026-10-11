// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import { useMythwrightStore } from "../../stores/mythwrightStore";

afterEach(() => {
  cleanup();
  useMythwrightStore.setState({ drafts: [] });
});

describe("workshop user flows", () => {
  it("searches unresolved mechanics without presenting them as adopted proposals", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Rules reference" }));
    fireEvent.click(screen.getByRole("button", { name: "Provisional 5" }));
    expect(
      screen.getByRole("heading", { name: /Use a per-form biological record/ }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Unresolved 11" }));
    fireEvent.change(
      screen.getByRole("textbox", { name: "Search reference" }),
      { target: { value: "U08" } },
    );
    expect(
      screen.getByRole("heading", {
        name: /Relationship of next-level energy to evolution reserve/,
      }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", {
        name: /Use a per-form biological record/,
      }),
    ).toBeNull();
    fireEvent.change(
      screen.getByRole("textbox", { name: "Search reference" }),
      { target: { value: "no-such-rule" } },
    );
    expect(screen.getByText(/No matches in unresolved entries/)).toBeTruthy();
  });
  it("keeps an edited request through navigation and includes it in the full brief", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Prompt studio" }));
    fireEvent.change(
      screen.getByRole("combobox", { name: "Starting prompt" }),
      { target: { value: "7" } },
    );
    const request = screen.getByRole("textbox", {
      name: "Your request",
    }) as HTMLTextAreaElement;
    expect(request.value).toContain("symbolic energy account");
    fireEvent.change(request, {
      target: {
        value: "Audit this family without inventing inheritance probabilities.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "World desk" }));
    fireEvent.click(screen.getByRole("button", { name: "Prompt studio" }));
    expect(
      (
        screen.getByRole("textbox", {
          name: "Your request",
        }) as HTMLTextAreaElement
      ).value,
    ).toContain("Audit this family");
    fireEvent.click(screen.getByText("Preview the complete brief"));
    const brief = (
      screen.getByRole("textbox", {
        name: "Complete generation brief",
      }) as HTMLTextAreaElement
    ).value;
    expect(brief).toContain(
      "C13 — Reproduction uses some next-level energy, with loss",
    );
    expect(brief).toContain(
      "Audit this family without inventing inheritance probabilities.",
    );
  });
  it("requires a title and restores a saved draft after remounting", async () => {
    const view = render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: "Continuity notebook" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
    expect(
      screen.getByText("Give this draft a title before saving."),
    ).toBeTruthy();
    fireEvent.change(screen.getByRole("textbox", { name: "Record title" }), {
      target: { value: "Ice Dragon family" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Skills" }), {
      target: { value: "Ice shaping; acquisition unspecified" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
    expect(screen.getByText("Draft saved in this browser.")).toBeTruthy();
    view.unmount();
    await useMythwrightStore.persist.rehydrate();
    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: "Continuity notebook" }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Ice Dragon family/ }));
    expect(
      (
        screen.getByRole("textbox", {
          name: "Skills",
        }) as HTMLTextAreaElement
      ).value,
    ).toBe("Ice shaping; acquisition unspecified");
    fireEvent.click(screen.getByText("Export continuity record"));
    const markdown = (
      screen.getByRole("textbox", {
        name: "Continuity Markdown",
      }) as HTMLTextAreaElement
    ).value;
    expect(markdown).toContain("Status: Draft — not adopted canon");
    expect(markdown).toContain("## Energy enhancements\n\nUnspecified");
  });
});
