import styled from "styled-components";

import { IStyledInputProps } from "./interfaces";

export const Label = styled.label`
  display: flex;
  position: relative;
`;

export const Input = styled.input<IStyledInputProps>`
  border: 1px solid #25242c;
  flex: ${(props) => (props.width ? "0" : "1")};
  width: ${(props) => props.width};
  border-radius: 4px;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  padding-left: ${(props) => (props.icon ? "40px" : "16px")};
  font-size: 16px;
  transition: 180ms ease-in-out;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  ~ svg {
    fill: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 12px;
    top: 14px;
    width: 24px;
    height: 24px;
    transition: 180ms ease-in-out;
  }
  &:focus {
    outline: none !important;
    border: 1px solid ${(props) => props.color};
    ~ svg {
      fill: ${(props) => props.color};
    }
  }
`;
