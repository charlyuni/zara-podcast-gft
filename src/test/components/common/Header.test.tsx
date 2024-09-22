import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoadingContext } from "@/context/LoadingContext";
import { Header } from "@/components/common";


const setLoadingState = jest.fn();

describe("Header Component", () => {
  test("should render the header component with the Podcaster link", () => {
    const loading = false;
    render(
      <LoadingContext.Provider value={{ setLoadingState, loading }}>
        <Header />
      </LoadingContext.Provider>
    );
    expect(screen.getByRole("link", { name: /podcaster/i })).toHaveTextContent(
      "Podcaster"
    );
  });

  test("should render the spinner when loading is true", () => {
    const loading = true;
    render(
      <LoadingContext.Provider value={{ setLoadingState, loading }}>
        <Header />
      </LoadingContext.Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should not render the spinner when loading is false", () => {
    const loading = false;
    render(
      <LoadingContext.Provider value={{ setLoadingState, loading }}>
        <Header />
      </LoadingContext.Provider>
    );
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("spinner should have aria-live attribute set to polite", () => {
    const loading = true;
    render(
      <LoadingContext.Provider value={{ setLoadingState, loading }}>
        <Header />
      </LoadingContext.Provider>
    );
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveAttribute("aria-live", "polite");
  });
});
