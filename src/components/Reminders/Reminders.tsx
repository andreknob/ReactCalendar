import { useEffect, useState } from "react";

import { IReminder } from "../../services/storageApi";
import { compareStartTimes } from "../../utils/date";
import { Reminder } from "./Reminder";
import { RemindersContainer } from "./styles";

export const Reminders = ({
  reminders,
  showAll = false,
  onReminderClick,
}: {
  reminders: IReminder[];
  showAll?: boolean;
  onReminderClick?: () => void;
}) => {
  const [sortedReminders, setSortedReminders] = useState<IReminder[]>([]);

  useEffect(() => {
    const sorted = reminders.sort((a, b) => {
      return compareStartTimes(a.startTime, b.startTime);
    });

    setSortedReminders(sorted);
  }, [reminders]);

  if (sortedReminders.length === 0) {
    return null;
  }

  return (
    <RemindersContainer>
      {reminders.slice(0, showAll ? reminders.length : 4).map((reminder) => (
        <Reminder
          key={reminder.id}
          reminder={reminder}
          onReminderClick={onReminderClick}
        />
      ))}
    </RemindersContainer>
  );
};
