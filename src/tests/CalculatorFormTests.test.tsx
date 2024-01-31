import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalculatorForm from "../components/calculatorForm/CalculatorForm";
import * as CalculateDeliveryFeeModule from "../utils/CalculateDeliveryFee";

jest.mock("../utils/CalculateDeliveryFee");

// this is needed to make CalculateDeliveryFee be treated as a jest.Mock
const mockedCalculateDeliveryFee =
  CalculateDeliveryFeeModule.CalculateDeliveryFee as jest.Mock;

describe("CalculatorForm Component", () => {
  beforeEach(() => {
    mockedCalculateDeliveryFee.mockReset(); // Resets the mock before each tests
  });

  test("renders calculator form with initial state", () => {
    render(<CalculatorForm />);
    expect(screen.getByTestId("cartValue")).toHaveValue(0);
    expect(screen.getByTestId("deliveryDistance")).toHaveValue(0);
    expect(screen.getByTestId("numberOfItems")).toHaveValue(0);
    expect(screen.getByTestId("orderTime")).toBeInTheDocument();
  });

  test("checks the state is updated on input change", () => {
    render(<CalculatorForm />);
    fireEvent.change(screen.getByTestId("cartValue"), {
      target: { value: "10" },
    });
    expect(screen.getByTestId("cartValue")).toHaveValue(10);
  });

  test("validates inputs and prevents submission with initial values", () => {
    render(<CalculatorForm />);
    window.alert = jest.fn();
    fireEvent.click(screen.getByTestId("submitButton"));
    expect(window.alert).toHaveBeenCalledWith(
      "Cart value and number of items cannot be zero."
    );
  });

  test("validates order time input has a value in the correct format", () => {
    render(<CalculatorForm />);
    const orderTimeInput = screen.getByTestId("orderTime") as HTMLInputElement;
    const orderTimeValue = orderTimeInput.value;
    expect(orderTimeValue).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  test("calculates delivery fee on form submission", () => {
    mockedCalculateDeliveryFee.mockImplementation(() => 7.2); // Mock implementation to return a fixed fee
    render(<CalculatorForm />);
    // Filling in with some test data
    fireEvent.change(screen.getByTestId("cartValue"), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByTestId("deliveryDistance"), {
      target: { value: "2056" },
    });
    fireEvent.change(screen.getByTestId("numberOfItems"), {
      target: { value: "6" },
    });
    const datetime = "2024-02-02T16:00";
    fireEvent.change(screen.getByTestId("orderTime"), {
      target: { value: datetime },
    });

    // Submitting the form
    fireEvent.click(screen.getByTestId("submitButton"));

    // Checking if the mocked CalculateDeliveryFee was called correctly
    expect(mockedCalculateDeliveryFee).toHaveBeenCalledWith({
      cartValue: 12,
      deliveryDistance: 2056,
      numberOfItems: 6,
      orderTime: datetime,
    });
    // Checking if the delivery fee is displayed correctly
    expect(screen.getByTestId("fee")).toHaveTextContent("Delivery Fee: 7.2€");
  });
});
