import { createSlice } from "@reduxjs/toolkit";

import { getNumOfDaysInMonth } from "../../utils/date";

const currentDate = new Date();

const initialState = {
  count: 0,
  currentDate,
  numOfDaysInMonth: getNumOfDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  ),
};

type TCalendarState = typeof initialState;

export const calendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = calendarSlice.actions;

export const selectCalendar = (state: { calendar: TCalendarState }) =>
  state.calendar;

export default calendarSlice.reducer;
