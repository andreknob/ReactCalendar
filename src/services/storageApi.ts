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

const getParsedReminders = () => {
  const stringified = localStorage.getItem(REMINDERS);
  return stringified ? JSON.parse(stringified) : [];
};

export const saveReminderToStorage = (reminder: IReminder) => {
  const reminders = getParsedReminders();

  const nextReminders = [
    ...reminders.filter((item: IReminder) => item.id !== reminder.id),
    reminder,
  ];

  localStorage.setItem(REMINDERS, JSON.stringify(nextReminders));
};

export const deleteReminderFromStorage = (id: string) => {
  const reminders = getParsedReminders();

  const nextReminders = [
    ...reminders.filter((item: IReminder) => item.id !== id),
  ];

  localStorage.setItem(REMINDERS, JSON.stringify(nextReminders));
};

export const getRemindersFromStorage = (date: string) => {
  const reminders = getParsedReminders();

  return reminders.filter((item: IReminder) => item.date === date);
};

export const getReminderFromStorage: (id: string) => IReminder | null = (
  id: string
) => {
  const reminders = getParsedReminders();

  return reminders.filter((item: IReminder) => item.id === id)[0];
};

export const getCitiesKeysFromStorage = () => {
  const reminders = getParsedReminders();

  const keysCount = {};
  return reminders
    .map((item: IReminder) => item.location.cityKey)
    .filter((cityKey: string) => {
      const currentValue = keysCount[cityKey];
      keysCount[cityKey] = currentValue ? currentValue + 1 : 1;

      return keysCount[cityKey] === 1;
    });
};
