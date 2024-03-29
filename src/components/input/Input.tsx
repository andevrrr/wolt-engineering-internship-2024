import React from "react";
import "./Input.css";

// Defining the props interface for the Input component
interface InputProps {
  type: string;
  name: string;
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  dataTestId,
}) => {
  return (
    <div className="input-div">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="input-container">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          data-testid={dataTestId}
          className="input-field"
          min="0" // setting the minnimum value to 0, so that users couldn't submit negative values.
        />
        <p className="input-unit">
          {name === "cartValue" ? "€" : name === "deliveryDistance" ? "m" : ""}
        </p>
      </div>
    </div>
  );
};

export default Input;
