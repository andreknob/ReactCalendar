import React from "react";

import { IButtonProps } from "./interfaces";
import { Container } from "./styles";

const Button: React.FC<IButtonProps> = ({
  children,
  backgroundColor = "white",
  color = "black",
  padding = "12px 24px",
  showBorder = true,
  borderRadius = "4px",
  ...props
}) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      color={color}
      padding={padding}
      showBorder={showBorder}
      borderRadius={borderRadius}
      {...props}
    >
      {children}
    </Container>
  );
};

export default Button;
