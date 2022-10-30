import { useState } from "react";
import { useSelector } from "react-redux";

import HourPicker from "../../../components/HourPicker";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { selectCalendar } from "../../../store/slices/calendarSlice";

export const NewRemiderModal = () => {
  const [reminderName, setReminderName] = useState("");
  const { dateInReminderModal } = useSelector(selectCalendar);

  return (
    <Modal title="Add new reminder" open={!!dateInReminderModal}>
      <Input
        name="reminder_name"
        placeholder="Add a title to new reminder"
        value={reminderName}
        setValue={setReminderName}
      />
      <HourPicker />
    </Modal>
  );
};
