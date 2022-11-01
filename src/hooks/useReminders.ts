import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getRemindersFromStorage, IReminder } from "../services/storageApi";
import { selectCalendar } from "../store/slices/calendarSlice";

const useReminders = (date: string) => {
  const [reminders, setReminders] = useState<IReminder[]>([]);
  const { remindersReference } = useSelector(selectCalendar);

  useEffect(() => {
    if (date) {
      setReminders(getRemindersFromStorage(date));
    }
  }, [date, remindersReference]);

  return reminders;
};

export default useReminders;
