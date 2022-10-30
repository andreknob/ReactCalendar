import { useSelector } from "react-redux";

import { MONTHS } from "../../constants";
import { selectCalendar } from "../../store/slices/calendarSlice";
import { Container } from "./styles";

const CalendarHeader = () => {
  const { selectedMonthDate } = useSelector(selectCalendar);

  return (
    <Container>
      <button>Today</button>
      <button>{"<"}</button>
      <button>{">"}</button>
      <h1>
        {MONTHS[selectedMonthDate.getMonth()]},{" "}
        {selectedMonthDate.getFullYear()}
      </h1>
      <button>{"<"}</button>
      <button>{">"}</button>
    </Container>
  );
};

export default CalendarHeader;
