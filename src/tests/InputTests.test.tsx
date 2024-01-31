import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/input/Input";

describe("Input Component", () => {
  test("renders input element with correct label and initial value", () => {
    const { getByLabelText } = render(
      <Input
        type="text"
        name="testInput"
        label="Test Input"
        value="Initial"
        onChange={() => {}}
        dataTestId="testInput"
      />
    );
    const inputElement = getByLabelText(/test input/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Initial");
  });

  test("renders with appropriate attributes for accessibility", () => {
    render(
      <Input
        type="number"
        name="deliveryDistance"
        label="Delivery Distance"
        value=""
        onChange={() => {}}
        dataTestId="deliveryDistance"
      />
    );

    const inputElement = screen.getByTestId("deliveryDistance");

    expect(inputElement.getAttribute("name")).toBe("deliveryDistance");
    expect(inputElement).toHaveAttribute("type", "number");

    // Ensure the input is associated with its label for accessibility
    const label = screen.getByLabelText(/delivery distance/i);
    expect(label).toBe(inputElement);
  });
});
