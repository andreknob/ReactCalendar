import { createSlice } from "@reduxjs/toolkit";

import { getCalendarDates } from "../../utils/date";

const initialCurrentDate = new Date();

const initialDisplayDates = getCalendarDates(initialCurrentDate);

const initialState = {
  count: 0,
  currentDate: initialCurrentDate,
  displayDates: initialDisplayDates,
  numRows: initialDisplayDates.length / 7,
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
