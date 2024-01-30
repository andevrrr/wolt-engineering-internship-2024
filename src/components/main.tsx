import React, { useState } from "react";
import Input from "./input";

const DeliveryFeeCalculator: React.FC = () => {
  const [formState, setFormState] = useState({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: "",
  });
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  React.useEffect(() => {
    if (!formState.orderTime) {
      setFormState((prevState) => ({
        ...prevState,
        time: new Date().toISOString(),
      }));
    }
  }, [formState.orderTime]);

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
        <div>
          <Input
            type="number"
            name="numberOfItems"
            label="Number of Items"
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
            label="Order Time"
            value={formState.orderTime.slice(0, 16)}
            placeholder="Enter order time in UTC"
            error={error}
            onChange={handleChange}
            dataTestId="orderTime"
          />
        </div>
      </form>
    </div>
  );
};

export default DeliveryFeeCalculator;
