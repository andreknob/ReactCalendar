import styled from "styled-components";

import Button from "../../../components/Button";

export const Footer = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

export const ErrorMessage = styled.span({
  color: "red",
  alignSelf: "end",
});

export const StyledButton = styled(Button)({
  marginTop: "16px",
  width: "100px",
});
