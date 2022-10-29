import styled from "styled-components";

export const WeekDayCell = styled.div<{ index: number }>((props) => ({
  color: "darkblue",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  padding: "0.5rem",
  fontWeight: "bold",
  marginRight: props.index < 6 ? "-1px" : 0,
}));
