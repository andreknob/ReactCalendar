import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import CalendarHeader from "../../components/CalendarHeader";
import DayCell from "../../components/DayCell";
import WeekDaysHeader from "../../components/WeekDays/WeekDays";
import { selectCalendar } from "../../store/slices/calendarSlice";
import { getCalendarDates } from "../../utils/date";
import { NewRemiderModal } from "./components/NewRemiderModal";
import { Container, CalendarGrid } from "./styles";

function Calendar() {
  const [numRows, setNumRows] = useState<number>(0);
  const [displayDates, setDisplayDates] = useState<Date[]>([]);
  const { selectedMonthDate } = useSelector(selectCalendar);

  useEffect(() => {
    const result = getCalendarDates(selectedMonthDate);

    setDisplayDates(result);
    setNumRows(result.length / 7);
  }, [selectedMonthDate]);

  const renderedDisplayDates = useMemo(() => {
    return displayDates.map((date) => (
      <DayCell key={date.toDateString()} date={date} />
    ));
  }, [displayDates]);

  return (
    <Container>
      <CalendarHeader />
      <CalendarGrid numRows={numRows}>
        <WeekDaysHeader />
        {renderedDisplayDates}
      </CalendarGrid>
      <NewRemiderModal />
    </Container>
  );
}

export default Calendar;
