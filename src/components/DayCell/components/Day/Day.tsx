import React from "react";
import { useSelector } from "react-redux";

import { selectCalendar } from "../../../../store/slices/calendarSlice";
import { compareCalendarDates } from "../../../../utils/date";
import useDayColor from "../../hooks/useDayColor";
import { CurrentDayMarker } from "./styles";

const Day: React.FC<{ date: Date }> = ({ date }) => {
  const { today } = useSelector(selectCalendar);
  const dayColor = useDayColor(date);

  const isToday = compareCalendarDates(date, today);

  return (
    <CurrentDayMarker isToday={isToday} dayColor={dayColor}>
      {date.getDate()}
    </CurrentDayMarker>
  );
};

export default Day;
