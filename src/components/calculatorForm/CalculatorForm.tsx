import React, { useState } from "react";
import { CalculateDeliveryFee } from "../../utils/CalculateDeliveryFee";
import Input from "../input/Input";
import "./CalculatorForm.css";

interface FormState {
  cartValue: number | 0;
  deliveryDistance: number | 0;
  numberOfItems: number | 0;
  orderTime: string;
}

const CalculatorForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: getLocalDateTimeForInput(),
  });
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const validateForm = (): boolean => {
    return formState.cartValue === 0 || formState.numberOfItems === 0;
  };

  function getLocalDateTimeForInput(): string {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - timezoneOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Cart value and number of items cannot be zero.");
      return;
    }

    const { cartValue, deliveryDistance, numberOfItems, orderTime } = formState;

    const fee = CalculateDeliveryFee({
      cartValue,
      deliveryDistance,
      numberOfItems,
      orderTime: orderTime,
    });

    setDeliveryFee(fee);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            placeholder="Please enter your cart value"
            error={error}
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
            placeholder="Please enter the distance"
            error={error}
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
            placeholder="Enter number of items"
            error={error}
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
            placeholder="Enter order time in UTC"
            error={error}
            onChange={handleChange}
            dataTestId="orderTime"
          />
        </div>
        <button type="submit" data-test-id="submitButton">
          Calculate Delivery Fee
        </button>
        {deliveryFee !== null && (
          <div data-test-id="fee" className="feeDisplay">
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
