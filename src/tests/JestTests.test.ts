import { CalculateDeliveryFee } from "../utils/CalculateDeliveryFee";

describe("CalculateDeliveryFee", () => {
  it("calculates delivery fee correctly for cart value less than 10", () => {
    // Test case: Cart value less than 10, should add extra fee
    expect(
      CalculateDeliveryFee({
        cartValue: 5,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(7);
  });

  it("calculates delivery fee correctly for cart value greater than or equal to 200", () => {
    // Test case: Cart value greater than or equal to 200, should be 0
    expect(
      CalculateDeliveryFee({
        cartValue: 200,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(0);
  });

  it("calculates delivery fee correctly for distance greater than 1000 meters", () => {
    // Test case: Distance greater than 1000 meters, should be 3
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1001, // first 1000 meters + 2€ and +1€ for additional 500 meters
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(3);
  });

  it("calculates delivery fee correctly for distance much greater than 1000 meters", () => {
    // Test case: Distance much greater than 1000 meters, should be 6
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 2645, // first 1000 meters + 2€ and +1€ for additional 500 meters
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(6);
  });

  it("calculates delivery fee correctly for more than 4 items", () => {
    // Test case: Number of items is more than 4, should be 3.5
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 7, // +0.50€ for each item, if there are more than 4 items
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(3.5);
  });

  it("calculates delivery fee correctly for more than 12 items", () => {
    // Test case: Number of items is more than 12, should be 8.7
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 15, // +0.50€ for each item, if there are more than 4 items, + extra 1.20€ bulk fee applies for more than 12 items
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(8.7);
  });

  it("calculates delivery fee correctly for Friday rush hour", () => {
    // Test case: Friday rush 3-7 PM, should be 2.4
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 4,
        orderTime: "2024-02-02T15:00:01Z",
      })
    ).toEqual(2.4);
  });

  it("handles invalid orderTime gracefully", () => {
    // Test case: Invalid orderTime, should throw an error
    expect(() =>
      CalculateDeliveryFee({
        cartValue: 50,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "invalid-date",
      })
    ).toThrow("Invalid order time");
  });

  it("handles zero deliveryDistance", () => {
    // Test case: Zero deliveryDistance
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 0,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(2); // Adjust this value based on your logic for zero distance
  });

  it("handles valid rush hour", () => {
    // Test case: Friday rush hour 3-7 PM
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 4,
        orderTime: "2024-02-02T15:00:01Z",
      })
    ).toEqual(2.4);
  });

  it("handles maximum fee", () => {
    // Test case: Maximum fee
    expect(
      CalculateDeliveryFee({
        cartValue: 5,
        deliveryDistance: 3000,
        numberOfItems: 15,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(15);
  });

  it("handles decimal cartValue", () => {
    // Test case: Decimal cartValue
    expect(
      CalculateDeliveryFee({
        cartValue: 5.75,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(6.25);
  });

  it("handles decimal deliveryDistance", () => {
    // Test case: Decimal deliveryDistance
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1500.5,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(4);
  });

  it("handles edge cases gracefully", () => {
    // Test case: Invalid orderTime, should throw an error
    expect(() =>
      CalculateDeliveryFee({
        cartValue: 50,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "invalid-date",
      })
    ).toThrow("Invalid order time");
  });
});
