import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../components/Navigation";
import HeroCarousel from "../components/HeroCarousel";
import RequestProposalPage from "../views/RequestProposalPage";

const slides = [
  { bg: "/a.webp", label: "Featured", title: "Alpha", subtitle: "One" },
  { bg: "/b.webp", label: "Featured", title: "Beta", subtitle: "Two" },
];

describe("Navigation dropdowns", () => {
  it("exposes the submenu to keyboard users through a real button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );

    const trigger = screen.getByRole("button", { name: /services/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    // The section landing page stays reachable from inside the submenu.
    expect(screen.getByRole("link", { name: "All Services" })).toHaveAttribute(
      "href",
      "/services.html",
    );

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the current page", () => {
    render(
      <MemoryRouter initialEntries={["/team.html"]}>
        <Navigation />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

describe("HeroCarousel", () => {
  function renderCarousel() {
    return render(
      <MemoryRouter>
        <HeroCarousel slides={slides} />
      </MemoryRouter>,
    );
  }

  it("hides inactive slides from assistive technology", () => {
    const { container } = renderCarousel();
    const items = container.querySelectorAll(".slide");
    expect(items[0]).toHaveAttribute("aria-hidden", "false");
    expect(items[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("uses a single h1 across the whole carousel", () => {
    renderCarousel();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("offers a pause control for the auto-rotation", async () => {
    const user = userEvent.setup();
    renderCarousel();
    const pause = screen.getByRole("button", {
      name: /pause automatic rotation/i,
    });
    await user.click(pause);
    expect(
      screen.getByRole("button", { name: /resume automatic rotation/i }),
    ).toBeInTheDocument();
  });

  it("advances when the next control is used", async () => {
    const user = userEvent.setup();
    const { container } = renderCarousel();
    await user.click(screen.getByRole("button", { name: /next engagement/i }));
    const items = container.querySelectorAll(".slide");
    expect(items[1]).toHaveAttribute("aria-hidden", "false");
  });
});

describe("Request proposal form", () => {
  it("labels every control", () => {
    render(
      <MemoryRouter>
        <RequestProposalPage />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/organization name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact person/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/background or challenge/i),
    ).toBeInTheDocument();
  });

  it("reports errors inline instead of failing silently", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RequestProposalPage />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: /prepare proposal request/i }),
    );

    const org = screen.getByLabelText(/organization name/i);
    expect(org).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByText(/enter the name of your organization/i),
    ).toBeInTheDocument();
    expect(org).toHaveFocus();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RequestProposalPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/organization name/i), "BAZNAS RI");
    await user.type(screen.getByLabelText(/contact person/i), "Dasril");
    await user.type(screen.getByLabelText(/work email/i), "dasril@");
    await user.type(
      screen.getByLabelText(/background or challenge/i),
      "SROI study for four programs.",
    );
    await user.click(
      screen.getByRole("button", { name: /prepare proposal request/i }),
    );

    expect(screen.getByText(/does not look complete/i)).toBeInTheDocument();
  });
});

describe("Project records filter", () => {
  it("shows a recoverable empty state when nothing matches", async () => {
    const user = userEvent.setup();
    const { default: ProjectRecordsPage } = await import(
      "../views/ProjectRecordsPage"
    );
    render(
      <MemoryRouter>
        <ProjectRecordsPage />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByLabelText(/search client or project/i),
      "zzzzz-no-such-client",
    );

    const empty = screen.getByRole("heading", {
      name: /no records match these filters/i,
    });
    expect(empty).toBeInTheDocument();

    await user.click(
      within(empty.closest(".emptystate")).getByRole("button", {
        name: /clear all filters/i,
      }),
    );
    expect(
      screen.queryByRole("heading", { name: /no records match/i }),
    ).not.toBeInTheDocument();
  });
});
