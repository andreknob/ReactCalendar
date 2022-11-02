import { useEffect } from "react";
import { MdSchedule } from "react-icons/md";
import { useSelector } from "react-redux";

import { selectCalendar } from "../../store/slices/calendarSlice";
import { hourFormatConversor24hTo12h } from "../../utils/date";
import Input from "../Input";
import { ITimeInputProps } from "./interfaces";
import { Container, Separator } from "./styles";

const TimeInput = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: ITimeInputProps) => {
  const { reminderModal } = useSelector(selectCalendar);

  useEffect(() => {
    if (!reminderModal.date || reminderModal.editingId) {
      return;
    }
    console.log(reminderModal.date);

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
  }, [onStartTimeChange, onEndTimeChange, reminderModal]);

  return (
    <>
      <Container>
        <Input
          name="start_time"
          placeholder="Start time"
          icon={<MdSchedule />}
          width="125px"
          value={startTime}
          setValue={onStartTimeChange}
        />
        <Separator>-</Separator>
        <Input
          name="end_time"
          placeholder="End time"
          icon={<MdSchedule />}
          width="125px"
          value={endTime}
          setValue={onEndTimeChange}
        />
      </Container>
    </>
  );
};

export default TimeInput;
