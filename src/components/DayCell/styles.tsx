import styled from "styled-components";

import { TCellProps } from "./interfaces";

export const Cell = styled.div<TCellProps>((props) => ({
  color: props.dayColor,
  backgroundColor: props.backgroundColor,
  /*display: "flex",
  justifyContent: "center",*/
  padding: "0.5rem",
  fontWeight: "bold",
}));
