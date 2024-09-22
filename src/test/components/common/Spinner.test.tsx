import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Spinner from "../../../components/common/Spinner";

describe("Spinner Component", () => {
  test("renders the spinner element with default aria-live", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveAttribute("aria-live", "polite");
  });

  test("sets aria-live attribute based on props", () => {
    render(<Spinner aria-live="assertive" />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toHaveAttribute("aria-live", "assertive");
  });

  test("renders the correct structure", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner");
    const pingElement = spinnerElement.querySelector(".animate-ping");
    const innerCircleElement = spinnerElement.querySelector(".relative");

    expect(pingElement).toBeInTheDocument();
    expect(innerCircleElement).toBeInTheDocument();
  });
});
