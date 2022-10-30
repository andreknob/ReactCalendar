import { darken, lighten } from "polished";
import styled from "styled-components";

import { COLORS } from "../../constants";
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
    color: ${(props) => lighten(0.2, props.color as string)};
    border: ${(props) =>
      props.showBorder ? `1px solid ${COLORS.PURPLE}` : "none"};
  }
`;
