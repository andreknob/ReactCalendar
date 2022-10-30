import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { format } from "date-fns";

import { selectCalendar } from "../../store/slices/calendarSlice";
import Input from "../Input";
import { Container, Separator } from "./styles";

const HourPicker = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { dateInReminderModal } = useSelector(selectCalendar);

  useEffect(() => {
    const baseHour = (new Date().getHours() + 1) % 24;

    setStartTime(`${baseHour}:00`);
    setEndTime(`${baseHour + 1}:00`);
  }, []);

  if (!dateInReminderModal) {
    return null;
  }

  return (
    <>
      <h3>{format(new Date(dateInReminderModal), "PPPP")}</h3>
      <Container>
        <Input
          name="start_time"
          width="75px"
          padding="8px"
          value={startTime}
          setValue={setStartTime}
        />
        <Separator>-</Separator>
        <Input
          name="end_time"
          width="75px"
          padding="8px"
          value={endTime}
          setValue={setEndTime}
        />
      </Container>
    </>
  );
};

export default HourPicker;
