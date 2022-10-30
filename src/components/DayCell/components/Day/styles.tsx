import styled from "styled-components";

export const CurrentDayMarker = styled.div<{
  isToday: boolean;
  dayColor: string;
}>((props) => ({
  color: props.isToday ? "white" : props.dayColor,
  backgroundColor: props.isToday ? "darkblue" : "transparent",
  borderRadius: "50%",
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));