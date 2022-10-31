import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getRemindersFromStorage, IReminder } from "../../services/storageApi";
import { openModal } from "../../store/slices/calendarSlice";
import Day from "./components/Day/Day";
import { Reminders } from "./components/Reminders/Reminders";
import useBackgroundColor from "./hooks/useBackgroundColor";
import { IDayCellProps } from "./interfaces";
import { Cell } from "./styles";

const DayCell = ({ date }: IDayCellProps) => {
  const [reminders, setReminders] = useState<IReminder[]>([]);
  const backgroundColor = useBackgroundColor(date);
  const dispatch = useDispatch();

  useEffect(() => {
    setReminders(getRemindersFromStorage(date.toJSON()));
  }, [date]);

  return (
    <Cell
      backgroundColor={backgroundColor}
      onClick={() => dispatch(openModal(date.toJSON()))}
    >
      <Day date={date} />
      <Reminders reminders={reminders} />
    </Cell>
  );
};

export default DayCell;
