import styled from "styled-components";

export const Container = styled.section({
  height: "100vh",
  backgroundColor: "black",

  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",

  gridGap: "4px",
});

export const Cell = styled.div({
  backgroundColor: "#7159c1",
});
