import { useSelector, useDispatch } from "react-redux";

import DayCell from "../../components/DayCell";
import {
  increment,
  decrement,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { Container } from "./styles";

function Calendar() {
  const { currentDate, displayDates, numRows } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  console.log("currentDate");
  console.log(currentDate);
  console.log("displayDates");
  console.log(displayDates);

  return (
    <Container numRows={numRows}>
      {displayDates.map((date) => (
        <DayCell key={date.toDateString()} date={date} />
      ))}
    </Container>
  );
}

export default Calendar;
