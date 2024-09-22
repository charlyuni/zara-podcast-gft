import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GenericList from "@/components/common/GenericList";
import { LoadingContext } from "@/context/LoadingContext";

const setLoadingState = jest.fn();

const renderComponent = (items: any[], isFetching: boolean) => {
  let loading = true;

  render(
    <LoadingContext.Provider value={{ setLoadingState, loading }}>
      <GenericList
        items={items}
        isFetching={isFetching}
        columns={["Title", "Date", "Duration"]}
        renderRow={(item, index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.date}</td>
            <td>{item.duration}</td>
          </tr>
        )}
      />
    </LoadingContext.Provider>
  );
};

describe("GenericList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with items", () => {
    const mockItems = [
      { title: "Episode 1", date: "2023-01-01", duration: "30:00" },
      { title: "Episode 2", date: "2023-01-02", duration: "45:00" },
    ];

    renderComponent(mockItems, false);

    expect(screen.getByText("Items: 2")).toBeInTheDocument();
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 2")).toBeInTheDocument();
    expect(setLoadingState).toHaveBeenCalledWith(false);
  });

  test("renders null when no items are provided", () => {
    renderComponent([], false);
    expect(screen.queryByTestId("generic-list")).not.toBeInTheDocument();
  });

  test("sets loading state when fetching", () => {
    renderComponent([], true);
    expect(setLoadingState).toHaveBeenCalledWith(true);
  });
});
