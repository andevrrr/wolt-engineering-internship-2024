import React, { useState } from "react";
import Input from "./input";

const DeliveryFeeCalculator: React.FC = () => {
  const [formState, setFormState] = useState({
    cartValue: 0,
    deliveryDistance: 0,
  });
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: Number(value) || 0,
    }));
  };

  return (
    <div>
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
            label="Delivery Distance"
            value={formState.deliveryDistance}
            placeholder="Please enter the distance"
            error={error}
            onChange={handleChange}
            dataTestId="deliveryDistance"
          />
        </div>
      </form>
    </div>
  );
};

export default DeliveryFeeCalculator;
