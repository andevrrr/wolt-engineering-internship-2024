import React from "react";

type InputParams = {
  type: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
};

const Input: React.FC<InputParams> = ({
  type,
  id,
  value,
  onChange,
  dataTestId,
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      data-test-id={dataTestId}
    />
  );
};

export default Input;
