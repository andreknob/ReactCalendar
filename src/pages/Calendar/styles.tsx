import styled from "styled-components";

import { IContainerProps } from "./interfaces";

export const Container = styled.section<IContainerProps>((props) => ({
  height: "100vh",
  backgroundColor: "black",

  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  gridTemplateRows: new Array(props.numRows)
    .fill(null)
    .map(() => "1fr")
    .join(" "),

  gridGap: "4px",
}));

export const Cell = styled.div({
  backgroundColor: "#7159c1",
});
