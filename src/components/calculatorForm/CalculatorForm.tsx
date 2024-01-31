import React, { useState } from "react";
import { CalculateDeliveryFee } from "../../utils/CalculateDeliveryFee";
import Input from "../input/Input";
import "./CalculatorForm.css";

interface FormState {
  cartValue: number | 0;
  deliveryDistance: number | 0;
  numberOfItems: number | 0;
  orderTime: string; // setting the initial order time (browser time)
}

const CalculatorForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: getLocalDateTimeForInput(),
  });
  // Initialising the delivery fee state as null
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  const validateForm = (): boolean => {
    return formState.cartValue === 0 || formState.numberOfItems === 0;
  };

  // function to get the browser time for input
  function getLocalDateTimeForInput(): string {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - timezoneOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  }

  // Handling the submission form
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // firstly, checking if input numbers for cardValue and deliveryDistance are not 0,
    // because if they are 0, then what is the point of delivery?
    if (validateForm()) {
      alert("Cart value and number of items cannot be zero.");
      return;
    }

    const { cartValue, deliveryDistance, numberOfItems, orderTime } = formState;

    try {
      // Calculating the delivery fee using the CalculateDeliveryFee function
      const fee: number = CalculateDeliveryFee({
        cartValue,
        deliveryDistance,
        numberOfItems,
        orderTime: orderTime,
      });

      setDeliveryFee(fee);
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("Invalid order time. Please enter a valid date and time.");
    }
  };

  // Handling the input fields inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <div className="CalculatorForm">
      <h1>Delivery Fee Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="number"
            name="cartValue"
            label="Cart Value"
            value={formState.cartValue}
            onChange={handleChange}
            dataTestId="cartValue"
          />
        </div>
        <div>
          <Input
            type="number"
            name="deliveryDistance"
            label="Delivery distance"
            value={formState.deliveryDistance}
            onChange={handleChange}
            dataTestId="deliveryDistance"
          />
        </div>
        <div>
          <Input
            type="number"
            name="numberOfItems"
            label="Amount of items"
            value={formState.numberOfItems}
            onChange={handleChange}
            dataTestId="numberOfItems"
          />
        </div>
        <div>
          <Input
            type="datetime-local"
            name="orderTime"
            label="Time"
            value={formState.orderTime}
            onChange={handleChange}
            dataTestId="orderTime"
          />
        </div>
        <button type="submit" data-testid="submitButton">
          Calculate Delivery Fee
        </button>
        {deliveryFee !== null && (
          <div data-testid="fee" className="feeDisplay">
            Delivery Fee: {deliveryFee}€
          </div>
        )}
      </form>
      <img
        src="https://imageproxy.wolt.com/static-assets/frontpage-assets/wolt-plus/banner_wolt_plus.png"
        alt="Wolt Plus Banner"
        className="wolt-plus-banner"
      />
    </div>
  );
};

export default CalculatorForm;
