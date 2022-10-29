import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCalendar } from "../../../store/slices/calendarSlice";

const useDayColor = (date: Date) => {
  const [dayColor, setDayColor] = useState("white");
  const { currentDate } = useSelector(selectCalendar);

  useEffect(() => {
    if (date.getMonth() !== currentDate.getMonth()) {
      return setDayColor("gray");
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      return setDayColor("blue");
    }

    setDayColor("black");
  }, [date, currentDate, setDayColor]);

  return dayColor;
};

export default useDayColor;
