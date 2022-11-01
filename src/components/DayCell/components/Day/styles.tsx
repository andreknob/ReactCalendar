import styled from "styled-components";

import { COLORS } from "../../../../constants";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const NewReminder = styled.span({
  color: COLORS.PURPLE,
  fontFize: "10px",
  marginRight: "8px",
  position: "absolute",
  left: "12px",
  cursor: "pointer",
  opacity: "0",
  transition: "opacity 0.2s ease-in-out",
});

export const CurrentDayMarker = styled.div<{
  isToday: boolean;
  dayColor: string;
}>((props) => ({
  color: props.isToday ? "white" : props.dayColor,
  backgroundColor: props.isToday ? COLORS.PURPLE : "transparent",
  borderRadius: "50%",
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
}));

export const SeeMoreReminders = styled.span({
  color: COLORS.PURPLE,
  fontFize: "10px",
  marginRight: "8px",
  position: "absolute",
  right: "32px",
  cursor: "pointer",
  opacity: "0",
  transition: "opacity 0.2s ease-in-out",
});
