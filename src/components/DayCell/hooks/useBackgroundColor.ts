import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCalendar } from "../../../store/slices/calendarSlice";

const useBackgroundColor = (date: Date) => {
  const [backgroundColor, setBackgroundColor] = useState("#a199e1");
  const { currentDate } = useSelector(selectCalendar);

  useEffect(() => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return setBackgroundColor("#e2e2e2");
    }

    setBackgroundColor("white");
  }, [date, currentDate, setBackgroundColor]);

  return backgroundColor;
};

export default useBackgroundColor;
