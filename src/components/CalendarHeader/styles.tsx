import styled from "styled-components";

import Button from "../Button";
import { IButtonProps } from "../Button/interfaces";

export const Container = styled.div({
  flex: "0 0 60px",
  padding: "1rem",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const RoundedButton = (props: IButtonProps) => {
  return (
    <Button {...props} borderRadius="50%" padding="4px 16px" showBorder={false}>
      {props.children}
    </Button>
  );
};
