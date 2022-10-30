import styled from "styled-components";

import { IContainerProps } from "./interfaces";

export const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export const CalendarGrid = styled.section<IContainerProps>((props) => ({
  height: "90vh",
  backgroundColor: "#cacaca",

  flex: "1",

  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridTemplateRows: `1fr repeat(${props.numRows}, 6fr)`,

  gridGap: "1px",
}));
