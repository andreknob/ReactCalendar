import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
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
        <MdArrowBackIos />
      </RoundedButton>
      <RoundedButton
        title="Next month"
        margin="0 8px 0 0"
        onClick={() => dispatch(increaseMonth())}
      >
        <MdArrowForwardIos />
      </RoundedButton>
      <h1>
        {MONTHS[new Date(selectedMonthDate).getMonth()]},{" "}
        {new Date(selectedMonthDate).getFullYear()}
      </h1>
      <RoundedButton
        title="Previous year"
        margin="0 0 0 8px"
        onClick={() => dispatch(decreaseYear())}
      >
        <MdArrowBackIos />
      </RoundedButton>
      <RoundedButton title="Next year" onClick={() => dispatch(increaseYear())}>
        <MdArrowForwardIos />
      </RoundedButton>
      <Button color="black" onClick={() => dispatch(setToToday())}>
        Today
      </Button>
    </Container>
  );
};

export default CalendarHeader;
