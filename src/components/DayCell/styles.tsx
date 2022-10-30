import styled from "styled-components";

import { TCellProps } from "./interfaces";

export const Cell = styled.div<TCellProps>((props) => ({
  backgroundColor: props.backgroundColor,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0.5rem",
  fontWeight: "bold",
}));
