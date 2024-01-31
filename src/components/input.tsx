import React from "react";

type InputProps = {
  type: string;
  name: string;
  label: string;
  value: number | string;
  placeholder: string;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
};

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
  dataTestId,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        data-test-id={dataTestId}
      />
      <p>
        {name === "cartValue" ? "€" : name === "deliveryDistance" ? "m" : ""}
      </p>
      {error && <p>The input fields must be filled!</p>}
    </div>
  );
};

export default Input;
