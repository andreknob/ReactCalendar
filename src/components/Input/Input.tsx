import React from "react";

import { COLORS } from "../../constants";
import { IInputProps } from "./interfaces";
import { Label } from "./styles";

const Input: React.FC<IInputProps> = ({
  name,
  type = "text",
  color = COLORS.PURPLE,
  value,
  setValue,
  placeholder,
  icon,
}) => {
  return (
    <Label htmlFor={name} color={color} icon={icon}>
      <>
        <input
          name={name}
          type={type}
          aria-label={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
        {icon && icon}
      </>
    </Label>
  );
};

export default Input;
