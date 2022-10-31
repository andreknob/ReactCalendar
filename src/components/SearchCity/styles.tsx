import styled from "styled-components";

import { COLORS } from "../../constants";

export const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const Results = styled.div({
  position: "absolute",
  top: "52px",
  backgroundColor: "white",
});

export const Result = styled.div`
  width: 400px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`;
