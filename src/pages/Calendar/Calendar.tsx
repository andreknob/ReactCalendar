import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { Container, Cell } from "./styles";

function Calendar() {
  const { currentDate, numOfDaysInMonth } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  return (
    <Container>
      {Array(30)
        .fill(0)
        .map((item, index) => (
          <Cell>{index}</Cell>
        ))}
    </Container>
  );
}

export default Calendar;
