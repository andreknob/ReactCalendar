import { IReminder } from "../../../../services/storageApi";
import { Reminder } from "./Reminder";
import { RemindersContainer } from "./styles";

export const Reminders = ({ reminders }: { reminders: IReminder[] }) => {
  return (
    <RemindersContainer>
      {reminders.map((reminder) => (
        <Reminder key={reminder.id} reminder={reminder} />
      ))}
    </RemindersContainer>
  );
};
