import styled from "styled-components";

import Button from "../../../components/Button";

export const Footer = styled.div({
  display: "flex",
  justifyContent: "end",
});

export const ErrorMessage = styled.span({
  color: "red",
  alignSelf: "end",
});

export const StyledButton = styled(Button)({
  margin: "16px 0 0 8px",
  width: "100px",
});
