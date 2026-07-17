import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../components/Navigation";

function renderNav() {
  return render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );
}

describe("Navigation", () => {
  it("renders the logo", () => {
    renderNav();
    const logo = screen.getByAltText("Immersia");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/assets/brand/logo.webp");
  });

  it("renders all navigation links", () => {
    renderNav();
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("About").closest("a")).toHaveAttribute(
      "href",
      "/about.html",
    );
    expect(screen.getByText("Publications").closest("a")).toHaveAttribute(
      "href",
      "/publications.html",
    );
    expect(screen.getByText("Team").closest("a")).toHaveAttribute(
      "href",
      "/team.html",
    );
    expect(screen.getByText("FAQ").closest("a")).toHaveAttribute(
      "href",
      "/faq.html",
    );
    expect(screen.getByText("Request Proposal").closest("a")).toHaveAttribute(
      "href",
      "/request-proposal.html",
    );
  });

  it("renders the menu button", () => {
    renderNav();
    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
  });
});
