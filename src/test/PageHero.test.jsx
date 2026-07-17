import { render, screen } from "@testing-library/react";
import PageHero from "../components/sections/PageHero";

describe("PageHero", () => {
  it("renders label and title", () => {
    render(<PageHero label="SERVICES" title="Our Services" />);
    expect(screen.getByText("SERVICES")).toBeInTheDocument();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });
});
