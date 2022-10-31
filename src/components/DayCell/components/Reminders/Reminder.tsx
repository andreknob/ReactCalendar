import { IReminder } from "../../../../services/storageApi";
import { Date, Name, ReminderContainer } from "./styles";

export const Reminder = ({ reminder }: { reminder: IReminder }) => {
  return (
    <ReminderContainer>
      <>
        <Date>{reminder.startTime}</Date>
        <span> </span>
        <Name>{reminder.reminderName}</Name>
      </>
    </ReminderContainer>
  );
};
