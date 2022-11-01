import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CalendarHeader from "../../components/CalendarHeader";
import DayCell from "../../components/DayCell";
import WeekDaysHeader from "../../components/WeekDays/WeekDays";
import {
  fetchForecasts,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { getCalendarDates } from "../../utils/date";
import { ReminderModal } from "./components/ReminderModal";
import { RemindersListModal } from "./components/RemindersListModal";
import { Container, CalendarGrid } from "./styles";

function Calendar() {
  const [numRows, setNumRows] = useState<number>(0);
  const [displayDates, setDisplayDates] = useState<Date[]>([]);
  const { selectedMonthDate } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  useEffect(() => {
    const result = getCalendarDates(new Date(selectedMonthDate));

    setDisplayDates(result);
    setNumRows(result.length / 7);
  }, [selectedMonthDate]);

  useEffect(() => {
    dispatch(fetchForecasts());
  }, [dispatch]);

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
      <ReminderModal />
      <RemindersListModal />
    </Container>
  );
}

export default Calendar;
