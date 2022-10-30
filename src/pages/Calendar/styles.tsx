import styled from "styled-components";

import { IContainerProps } from "./interfaces";

export const Container = styled.section<IContainerProps>((props) => ({
  height: "100vh",
  backgroundColor: "#cacaca",

  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridTemplateRows: `1fr repeat(${props.numRows}, 6fr)`,

  gridGap: "1px",
}));
