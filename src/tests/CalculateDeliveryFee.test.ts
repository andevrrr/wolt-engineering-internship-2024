import { CalculateDeliveryFee } from "../utils/CalculateDeliveryFee";

describe("CalculateDeliveryFee", () => {
  it("calculates delivery fee correctly for different scenarios", () => {
    // Test case 1: Cart value less than 10, should add extra fee
    expect(
      CalculateDeliveryFee({
        cartValue: 5,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2022-01-31T12:00:00Z",
      })
    ).toEqual(7); // Adjust this value based on your logic

    // Test case 2: Cart value greater than or equal to 200, should be 0
    expect(
      CalculateDeliveryFee({
        cartValue: 250,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2022-01-31T12:00:00Z",
      })
    ).toEqual(0);

    // Add more test cases for other scenarios
  });

  it("handles edge cases gracefully", () => {
    // Test case: Invalid orderTime, should throw an error
    expect(() =>
      CalculateDeliveryFee({
        cartValue: 50,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "invalid-date", // Invalid date format
      })
    ).toThrow("Invalid order time");

    // Add more edge cases to test error handling
  });
});
