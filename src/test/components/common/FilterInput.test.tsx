import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterInput from "@/components/common/FilterInput";

describe("FilterInput Component", () => {
  const onChangeMock = jest.fn();

  const renderComponent = (filter: string, results: number) => {
    render(
      <FilterInput filter={filter} onChangeFilter={onChangeMock} results={results} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with correct initial value", () => {
    renderComponent("React", 10);

    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter podcasts...")).toBeInTheDocument();
  });

  test("renders the correct number of results", () => {
    renderComponent("", 20);

    const resultElement = screen.getByTestId("result-value");
    expect(resultElement).toHaveTextContent("20");
  });

  test("calls onChange when typing in the input", () => {
    renderComponent("", 0);

    const inputElement = screen.getByPlaceholderText("Filter podcasts...");

    fireEvent.change(inputElement, { target: { value: "New Filter" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
