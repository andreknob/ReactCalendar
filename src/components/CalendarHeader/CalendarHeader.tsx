import { useDispatch, useSelector } from "react-redux";

import { MONTHS } from "../../constants";
import {
  selectCalendar,
  setToToday,
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
      <RoundedButton
        title="Previous month"
        onClick={() => dispatch(decreaseMonth())}
      >
        {"<"}
      </RoundedButton>
      <RoundedButton
        title="Next month"
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
        title="Previous year"
        margin="0 0 0 8px"
        onClick={() => dispatch(decreaseYear())}
      >
        {"<"}
      </RoundedButton>
      <RoundedButton title="Next year" onClick={() => dispatch(increaseYear())}>
        {">"}
      </RoundedButton>
      <Button color="black" onClick={() => dispatch(setToToday())}>
        Today
      </Button>
    </Container>
  );
};

export default CalendarHeader;
