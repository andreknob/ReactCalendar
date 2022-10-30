import React from "react";

import { COLORS } from "../../constants";
import { IInputProps } from "./interfaces";
import { Label, Input as StyledInput } from "./styles";

const Input: React.FC<IInputProps> = ({
  name,
  type = "text",
  width = "400px",
  padding = "16px",
  color = COLORS.PURPLE,
  value,
  setValue,
  placeholder,
  icon,
}) => {
  return (
    <Label htmlFor={name}>
      <>
        <StyledInput
          name={name}
          type={type}
          width={width}
          padding={padding}
          icon={icon}
          color={color}
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
