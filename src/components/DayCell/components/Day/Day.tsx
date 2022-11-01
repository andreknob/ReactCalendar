import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  openRemindersListModal,
  selectCalendar,
} from "../../../../store/slices/calendarSlice";
import { compareCalendarDates } from "../../../../utils/date";
import useDayColor from "../../hooks/useDayColor";
import {
  Container,
  CurrentDayMarker,
  NewReminder,
  SeeMoreReminders,
} from "./styles";

const Day: React.FC<{ date: Date; remindersLength: number }> = ({
  date,
  remindersLength,
}) => {
  const { today } = useSelector(selectCalendar);
  const dayColor = useDayColor(date);

  const dispatch = useDispatch();

  const isToday = compareCalendarDates(date, new Date(today));

  const handleSeeMore = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    dispatch(openRemindersListModal(date.toJSON()));
  };

  return (
    <Container>
      <NewReminder>new reminder</NewReminder>
      <CurrentDayMarker isToday={isToday} dayColor={dayColor}>
        {date.getDate()}
      </CurrentDayMarker>
      {remindersLength > 4 ? (
        <SeeMoreReminders onClick={handleSeeMore}>see more</SeeMoreReminders>
      ) : null}
    </Container>
  );
};

export default Day;
