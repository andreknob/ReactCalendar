import { useEffect } from "react";
import { useSelector } from "react-redux";

import { format } from "date-fns";

import { selectCalendar } from "../../store/slices/calendarSlice";
import { hourFormatConversor24hTo12h } from "../../utils/date";
import Input from "../Input";
import { IHourPickerProps } from "./interfaces";
import { Container, Separator } from "./styles";

const HourPicker = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: IHourPickerProps) => {
  const { dateInReminderModal } = useSelector(selectCalendar);

  useEffect(() => {
    const baseHour = (new Date().getHours() + 1) % 24;
    const convertedStartTimeHour = hourFormatConversor24hTo12h(baseHour);
    const convertedEndTimeHour = hourFormatConversor24hTo12h(
      (baseHour + 1) % 24
    );

    onStartTimeChange(
      `${convertedStartTimeHour.hour}:00${convertedStartTimeHour.format}`
    );
    onEndTimeChange(
      `${convertedEndTimeHour.hour}:00${convertedEndTimeHour.format}`
    );
  }, [onStartTimeChange, onEndTimeChange]);

  if (!dateInReminderModal) {
    return null;
  }

  return (
    <>
      <h3>{format(new Date(dateInReminderModal), "PPPP")}</h3>
      <Container>
        <Input
          name="start_time"
          width="90px"
          padding="8px"
          value={startTime}
          setValue={onStartTimeChange}
        />
        <Separator>-</Separator>
        <Input
          name="end_time"
          width="90px"
          padding="8px"
          value={endTime}
          setValue={onEndTimeChange}
        />
      </Container>
    </>
  );
};

export default HourPicker;
