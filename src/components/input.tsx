import React from "react";

type InputProps = {
  type: string
  label: string
  value: number
  placeholder: string
  error: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dataTestId: string
};

const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  placeholder,
  error,
  onChange,
  dataTestId,
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        data-test-id={dataTestId}
      />
      {error && <p>The input fields must be filled!</p>}
    </div>
  );
};

export default Input;
