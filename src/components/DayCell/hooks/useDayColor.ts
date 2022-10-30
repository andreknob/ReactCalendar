import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCalendar } from "../../../store/slices/calendarSlice";

const useDayColor = (date: Date) => {
  const [dayColor, setDayColor] = useState("white");
  const { selectedMonthDate } = useSelector(selectCalendar);

  useEffect(() => {
    if (date.getMonth() !== selectedMonthDate.getMonth()) {
      return setDayColor("gray");
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      return setDayColor("blue");
    }

    setDayColor("black");
  }, [date, selectedMonthDate, setDayColor]);

  return dayColor;
};

export default useDayColor;
