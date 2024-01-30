import React, { useState } from "react";
import Input from "./input";

const DeliveryFeeCalculator: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Delivery Fee Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="number"
            label="cartValue"
            value={cartValue}
            placeholder="Please enter your cart value"
            error={error}
            onChange={(e) => setCartValue(e.target.value)}
            dataTestId="cartValue"
          />
        </div>
      </form>
    </div>
  );
};

export default DeliveryFeeCalculator;
