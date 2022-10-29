import styled from "styled-components";

import { IContainerProps } from "./interfaces";

export const Container = styled.section<IContainerProps>((props) => ({
  height: "100vh",
  backgroundColor: "black",

  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  gridTemplateRows:
    "1fr " +
    new Array(props.numRows)
      .fill(null)
      .map(() => "6fr")
      .join(" "),

  gridGap: "1px",
}));
