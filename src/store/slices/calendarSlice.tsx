import { createSlice } from "@reduxjs/toolkit";

const today = new Date();

const initialState = {
  selectedMonthDate: new Date(today.getFullYear(), today.getMonth()).toJSON(),
  today: today.toJSON(),
};

type TCalendarState = typeof initialState;

const getStateForNextDate = (
  state: TCalendarState,
  nextYear: number,
  nextMonth: number
) => {
  const nextSelected = new Date(nextYear, nextMonth);

  return {
    today: state.today,
    selectedMonthDate: nextSelected.toJSON(),
  };
};

export const calendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {
    setToToday: (state) => {
      const today = new Date(state.today);

      return getStateForNextDate(state, today.getFullYear(), today.getMonth());
    },
    decreaseMonth: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      return getStateForNextDate(
        state,
        currentSelected.getFullYear(),
        currentSelected.getMonth() - 1
      );
    },
    increaseMonth: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      return getStateForNextDate(
        state,
        currentSelected.getFullYear(),
        currentSelected.getMonth() + 1
      );
    },
    decreaseYear: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      return getStateForNextDate(
        state,
        currentSelected.getFullYear() - 1,
        currentSelected.getMonth()
      );
    },
    increaseYear: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      return getStateForNextDate(
        state,
        currentSelected.getFullYear() + 1,
        currentSelected.getMonth()
      );
    },
  },
});

export const {
  setToToday,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
} = calendarSlice.actions;

export const selectCalendar = (state: { calendar: TCalendarState }) => {
  const { selectedMonthDate, today } = state.calendar;

  return {
    selectedMonthDate: new Date(selectedMonthDate),
    today: new Date(today),
  };
};

export default calendarSlice.reducer;
