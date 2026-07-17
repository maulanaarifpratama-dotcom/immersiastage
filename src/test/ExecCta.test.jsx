import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ExecCta from "../components/sections/ExecCta";

describe("ExecCta", () => {
  function renderCta() {
    return render(
      <MemoryRouter>
        <ExecCta />
      </MemoryRouter>,
    );
  }

  it("renders the CTA buttons", () => {
    renderCta();
    expect(screen.getByText("Request Proposal")).toBeInTheDocument();
    expect(
      screen.getByText("Schedule Strategic Discussion"),
    ).toBeInTheDocument();
  });

  it("renders discussion points", () => {
    renderCta();
    expect(
      screen.getByText("Mandate and operating context"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Strategic decisions requiring support"),
    ).toBeInTheDocument();
  });
});
