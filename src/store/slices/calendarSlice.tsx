import { createSlice } from "@reduxjs/toolkit";

const today = new Date();

const initialState = {
  selectedMonthDate: new Date(today.getFullYear(), today.getMonth()).toJSON(),
  today: today.toJSON(),
};

type TCalendarState = typeof initialState;

export const calendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {
    decreaseMonth: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);
      const nextSelected = new Date(
        currentSelected.getFullYear(),
        currentSelected.getMonth() - 1
      );

      return {
        today: state.today,
        selectedMonthDate: nextSelected.toJSON(),
      };
    },
    increaseMonth: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);
      const nextSelected = new Date(
        currentSelected.getFullYear(),
        currentSelected.getMonth() + 1
      );

      return {
        today: state.today,
        selectedMonthDate: nextSelected.toJSON(),
      };
    },
    decreaseYear: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);
      const nextSelected = new Date(
        currentSelected.getFullYear() - 1,
        currentSelected.getMonth()
      );

      return {
        today: state.today,
        selectedMonthDate: nextSelected.toJSON(),
      };
    },
    increaseYear: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);
      const nextSelected = new Date(
        currentSelected.getFullYear() + 1,
        currentSelected.getMonth()
      );

      return {
        today: state.today,
        selectedMonthDate: nextSelected.toJSON(),
      };
    },
  },
});

export const { decreaseMonth, increaseMonth, decreaseYear, increaseYear } =
  calendarSlice.actions;

export const selectCalendar = (state: { calendar: TCalendarState }) => {
  const { selectedMonthDate, today } = state.calendar;

  return {
    selectedMonthDate: new Date(selectedMonthDate),
    today: new Date(today),
  };
};

export default calendarSlice.reducer;
