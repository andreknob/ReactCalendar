import { useDispatch } from "react-redux";

import useReminders from "../../hooks/useReminders";
import { openReminderModal } from "../../store/slices/calendarSlice";
import { Reminders } from "../Reminders/Reminders";
import Day from "./components/Day/Day";
import useBackgroundColor from "./hooks/useBackgroundColor";
import { IDayCellProps } from "./interfaces";
import { Cell } from "./styles";

const DayCell = ({ date }: IDayCellProps) => {
  const backgroundColor = useBackgroundColor(date);
  const dispatch = useDispatch();

  const reminders = useReminders(date.toJSON());

  return (
    <Cell
      backgroundColor={backgroundColor}
      onClick={() => dispatch(openReminderModal({ date: date.toJSON() }))}
    >
      <Day date={date} remindersLength={reminders.length} />
      <Reminders reminders={reminders} />
    </Cell>
  );
};

export default DayCell;
