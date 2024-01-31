import { CalculateDeliveryFee } from "../../utils/CalculateDeliveryFee";

describe("CalculateDeliveryFee", () => {
  it("calculates delivery fee correctly for different scenarios", () => {
    // Test case 1: Cart value less than 10, should add extra fee
    expect(
      CalculateDeliveryFee({
        cartValue: 5,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(7); // Adjust this value based on your logic

    // Test case 2: Cart value greater than or equal to 200, should be 0
    expect(
      CalculateDeliveryFee({
        cartValue: 200,
        deliveryDistance: 1000,
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(0);

    // Test case 3: Distance greater than 1000 meters, should be 3
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1001, // first 1000 meters + 2€ and +1€ for additional 500 meters
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(3);

    // Test case 4: Distance greater than 1000 meters, should be 6
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 2645, // first 1000 meters + 2€ and +1€ for additional 500 meters
        numberOfItems: 3,
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(6);

    // Test case 5: Number of items is more than 4, shound be 3.5
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 7, // +0.50€ for each item, if there are more than 4 items
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(3.5);

    // Test case 6: Number of items is more than 12, shound be 8.7
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 15, // +0.50€ for each item, if there are more than 4 items, + extra 1.20€ bulk fee applies for more than 12 items
        orderTime: "2024-01-31T12:00:00Z",
      })
    ).toEqual(8.7);
    // Test case 7: Friday rush 3-7 PM, should be 2.4
    expect(
      CalculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 1000,
        numberOfItems: 4,
        orderTime: "2024-02-02T15:00:01Z",
      })
    ).toEqual(2.4);
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
