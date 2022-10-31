import { useEffect, useState } from "react";
import { MdCalendarToday } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import {
  selectCalendar,
  updateModalDate,
} from "../../store/slices/calendarSlice";
import Input from "../Input";
import { H3 } from "./styles";

const DateInput = () => {
  const [displayDateInput, setDisplayDateInput] = useState("");
  const { reminderModal } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayDateInput(
      new Date(reminderModal.date).toLocaleDateString("en-UK")
    );
  }, [reminderModal.date]);

  const handleDateInputChange = (value: string) => {
    setDisplayDateInput(value);
  };

  const handleDateInputBlur = () => {
    const [day, month, year] = displayDateInput.split("/");

    dispatch(
      updateModalDate(
        new Date(Number(year), Number(month) - 1, Number(day)).toJSON()
      )
    );
  };

  if (!reminderModal.date) {
    return null;
  }

  return (
    <>
      <H3>{format(new Date(reminderModal.date), "PPPP")}</H3>
      <Input
        name="date_input"
        icon={<MdCalendarToday />}
        value={displayDateInput}
        setValue={handleDateInputChange}
        onBlur={handleDateInputBlur}
      />
    </>
  );
};

export default DateInput;