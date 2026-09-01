import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContentPage from "../pages/ContentPage";
import { getPageComponent } from "../pages/index";
import { resolveMeta } from "../lib/meta";

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ContentPage />
    </MemoryRouter>,
  );
}

describe("routing", () => {
  it("resolves known pages", () => {
    expect(getPageComponent("about.html").found).toBe(true);
    expect(
      getPageComponent("article-theory-of-change-program-design.html").found,
    ).toBe(true);
    expect(getPageComponent("publication-1.html").found).toBe(true);
  });

  it("returns a 404 instead of silently falling back to the homepage", () => {
    expect(getPageComponent("does-not-exist.html").found).toBe(false);
    renderAt("/does-not-exist.html");
    expect(
      screen.getByRole("heading", { name: /this page is not here/i }),
    ).toBeInTheDocument();
  });

  it("gives the 404 a noindex directive", () => {
    expect(resolveMeta("does-not-exist.html").noindex).toBe(true);
    expect(resolveMeta("about.html").noindex).toBeUndefined();
  });
});

describe("document metadata", () => {
  it("gives every static route its own title and description", () => {
    const keys = [
      "index.html",
      "about.html",
      "services.html",
      "news.html",
      "publications.html",
      "team.html",
      "faq.html",
      "request-proposal.html",
    ];
    const titles = keys.map((k) => resolveMeta(k).title);
    const descriptions = keys.map((k) => resolveMeta(k).description);

    expect(new Set(titles).size).toBe(keys.length);
    expect(new Set(descriptions).size).toBe(keys.length);
  });

  it("writes the title and canonical into the document head", () => {
    renderAt("/about.html");
    expect(document.title).toBe("About Immersia — Immersia");
    expect(
      document.head.querySelector('link[rel="canonical"]').getAttribute("href"),
    ).toBe("https://immersia.id/about.html");
  });

  it("derives article metadata from the article record", () => {
    const meta = resolveMeta(
      "article-baseline-feasibility-study-program-design.html",
    );
    expect(meta.type).toBe("article");
    expect(meta.title).toMatch(/Baseline and Feasibility/);
    expect(meta.description.length).toBeLessThanOrEqual(176);
  });
});
