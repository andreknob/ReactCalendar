import styled from "styled-components";

import { COLORS } from "../../constants";

export const WeekDayCell = styled.div<{ index: number }>((props) => ({
  color: COLORS.PURPLE,
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  padding: "0.5rem",
  fontWeight: "bold",
  marginRight: props.index < 6 ? "-1px" : 0,
}));
