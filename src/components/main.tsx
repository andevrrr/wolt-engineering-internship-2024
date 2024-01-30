import React, { useState } from "react";
import Input from "./input";

const DeliveryFeeCalculator: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>();

  return (
    <div>
      <h1>Delivery Fee Calculator</h1>
    </div>
  );
};

export default DeliveryFeeCalculator;
