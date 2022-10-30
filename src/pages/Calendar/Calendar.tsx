import { useSelector /*, useDispatch*/ } from "react-redux";

import CalendarHeader from "../../components/CalendarHeader";
import DayCell from "../../components/DayCell";
import WeekDaysHeader from "../../components/WeekDays/WeekDays";
import {
  // increment,
  // decrement,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { Container, CalendarGrid } from "./styles";

function Calendar() {
  const { displayDates, numRows } = useSelector(selectCalendar);
  // const dispatch = useDispatch();

  return (
    <Container>
      <CalendarHeader />
      <CalendarGrid numRows={numRows}>
        <WeekDaysHeader />
        {displayDates.map((date) => (
          <DayCell key={date.toDateString()} date={date} />
        ))}
      </CalendarGrid>
    </Container>
  );
}

export default Calendar;
