import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renders the company logo", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Immersia");
    expect(logo).toHaveAttribute("src", "/assets/brand/logo-white.webp");
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("info@immersia.id")).toBeInTheDocument();
    expect(screen.getByText("+62 816-4603-5257")).toBeInTheDocument();
  });
});
