import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import Modal from "../../../components/Modal";
import { Reminders } from "../../../components/Reminders/Reminders";
import useReminders from "../../../hooks/useReminders";
import {
  closeRemindersListModal,
  selectCalendar,
} from "../../../store/slices/calendarSlice";

export const RemindersListModal = () => {
  const { remindersListModal } = useSelector(selectCalendar);
  const reminders = useReminders(remindersListModal.date);

  const dispatch = useDispatch();

  if (!remindersListModal.date) {
    return null;
  }

  const handleReminderClick = () => {
    dispatch(closeRemindersListModal());
  };

  return (
    <Modal
      title={`Reminders at ${format(
        new Date(remindersListModal.date),
        "PPPP"
      )}`}
      open={!!remindersListModal.date}
    >
      <Reminders
        reminders={reminders}
        showAll={true}
        onReminderClick={handleReminderClick}
      />
    </Modal>
  );
};
