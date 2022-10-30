import { useSelector, useDispatch } from "react-redux";

import DayCell from "../../components/DayCell";
import WeekDaysHeader from "../../components/WeekDays/WeekDays";
import {
  increment,
  decrement,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { Container } from "./styles";

function Calendar() {
  const { selectedMonthDate, displayDates, numRows } =
    useSelector(selectCalendar);
  const dispatch = useDispatch();

  console.log("selectedMonthDate");
  console.log(selectedMonthDate);
  console.log("displayDates");
  console.log(displayDates);

  return (
    <Container numRows={numRows}>
      <WeekDaysHeader />
      {displayDates.map((date) => (
        <DayCell key={date.toDateString()} date={date} />
      ))}
    </Container>
  );
}

export default Calendar;
