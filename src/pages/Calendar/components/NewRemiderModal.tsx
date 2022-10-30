import { useState } from "react";
import { useSelector } from "react-redux";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { selectCalendar } from "../../../store/slices/calendarSlice";

export const NewRemiderModal = () => {
  const [reminderName, setReminderName] = useState("");
  const { isModalOpen } = useSelector(selectCalendar);

  return (
    <Modal title="Add new reminder" open={isModalOpen}>
      <Input
        name="reminder_name"
        placeholder="Add a title to new reminder"
        value={reminderName}
        setValue={setReminderName}
      />
    </Modal>
  );
};
