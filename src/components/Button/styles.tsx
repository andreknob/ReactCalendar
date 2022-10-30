import { darken } from "polished";
import styled from "styled-components";

import { IButtonProps } from "./interfaces";

export const Container = styled.button<IButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-weight: bold;
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => (props.showBorder ? "1px solid lightgray" : "none")};
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: ${(props) =>
      darken(0.03, props.backgroundColor as string)};
  }
`;
