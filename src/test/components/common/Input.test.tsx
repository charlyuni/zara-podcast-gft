import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/common/Input";

const onChangeMock = jest.fn();

describe("Input component", () => {
  test("renders input with the correct label", () => {
    render(
      <Input id="username" label="Username" value="" onChange={onChangeMock} />
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("renders input with placeholder", () => {
    render(
      <Input
        id="username" // Usa 'id' aquí también
        placeholder="Enter your username"
        value=""
        onChange={onChangeMock}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    render(
      <Input
        id="username"
        value=""
        onChange={onChangeMock}
        placeholder="Type here"
      />
    );
    const inputElement = screen.getByPlaceholderText("Type here");

    fireEvent.change(inputElement, { target: { value: "Hello" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });

  test("displays error message when provided", () => {
    render(
      <Input
        id="username"
        value=""
        onChange={onChangeMock}
        errorMessage="This field is required"
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("renders with the correct type", () => {
    render(
      <Input id="username" type="email" value="" onChange={onChangeMock} />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "email");
  });
});
