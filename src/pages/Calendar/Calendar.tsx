import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { Container, Cell } from "./styles";

function Calendar() {
  const { currentDate, displayDates } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  console.log("currentDate");
  console.log(currentDate);
  console.log("displayDates");
  console.log(displayDates);

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
