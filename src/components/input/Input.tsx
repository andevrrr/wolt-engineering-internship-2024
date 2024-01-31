import React from "react";
import "./Input.css";

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
          data-test-id={dataTestId}
          className="input-field"
        />
        <p className="input-unit">
          {name === "cartValue" ? "€" : name === "deliveryDistance" ? "m" : ""}
        </p>
      </div>
    </div>
  );
};

export default Input;
