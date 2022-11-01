import styled from "styled-components";

import { IContainerProps } from "./interfaces";

export const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export const CalendarGrid = styled.section<IContainerProps>((props) => {
  return {
    height: `90vh`,
    backgroundColor: "#cacaca",
    margin: "0 auto",

    flex: "1",

    display: "grid",
    gridTemplateColumns: "repeat(7, 14vw)",
    gridTemplateRows: `50px repeat(${props.numRows}, 1fr)`,

    gridGap: "1px",
  };
});
