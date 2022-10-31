import { ILocation } from "./weatherApi";

const REMINDERS = "reminders";

export interface IReminder {
  id: string;
  reminderName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: ILocation;
}

export const saveReminderToStorage = (reminder: IReminder) => {
  const stringified = localStorage.getItem(REMINDERS);
  const reminders = stringified ? JSON.parse(stringified) : [];

  const nextReminders = [
    ...reminders.filter((item: IReminder) => item.id !== reminder.id),
    reminder,
  ];

  localStorage.setItem(REMINDERS, JSON.stringify(nextReminders));
};

export const getRemindersFromStorage = (date: string) => {
  const stringified = localStorage.getItem(REMINDERS);
  const reminders = stringified ? JSON.parse(stringified) : [];

  return reminders.filter((item: IReminder) => item.date === date);
};

export const getReminderFromStorage: (id: string) => IReminder | null = (
  id: string
) => {
  const stringified = localStorage.getItem(REMINDERS);
  const reminders = stringified ? JSON.parse(stringified) : [];

  return reminders.filter((item: IReminder) => item.id === id)[0];
};

export const getCitiesKeysFromStorage = () => {
  const stringified = localStorage.getItem(REMINDERS);
  const reminders = stringified ? JSON.parse(stringified) : [];

  const keysCount = {};
  return reminders
    .map((item: IReminder) => item.location.cityKey)
    .filter((cityKey: string) => {
      const currentValue = keysCount[cityKey];
      keysCount[cityKey] = currentValue ? currentValue + 1 : 1;

      return keysCount[cityKey] === 1;
    });
};
