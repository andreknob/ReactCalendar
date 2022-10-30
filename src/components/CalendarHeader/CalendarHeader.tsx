import { useDispatch, useSelector } from "react-redux";

import { MONTHS } from "../../constants";
import {
  selectCalendar,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
} from "../../store/slices/calendarSlice";
import Button from "../Button";
import { Container, RoundedButton } from "./styles";

const CalendarHeader = () => {
  const { selectedMonthDate } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  return (
    <Container>
      <Button color="black">Today</Button>
      <RoundedButton
        margin="0 0 0 64px"
        onClick={() => dispatch(decreaseMonth())}
      >
        {"<"}
      </RoundedButton>
      <RoundedButton
        margin="0 8px 0 0"
        onClick={() => dispatch(increaseMonth())}
      >
        {">"}
      </RoundedButton>
      <h1>
        {MONTHS[selectedMonthDate.getMonth()]},{" "}
        {selectedMonthDate.getFullYear()}
      </h1>
      <RoundedButton
        margin="0 0 0 8px"
        onClick={() => dispatch(decreaseYear())}
      >
        {"<"}
      </RoundedButton>
      <RoundedButton onClick={() => dispatch(increaseYear())}>
        {">"}
      </RoundedButton>
    </Container>
  );
};

export default CalendarHeader;
