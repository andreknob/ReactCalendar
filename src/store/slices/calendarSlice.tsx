import { createSlice } from "@reduxjs/toolkit";

const today = new Date();

const initialState = {
  selectedMonthDate: new Date(today.getFullYear(), today.getMonth()).toJSON(),
  today: today.toJSON(),
  isModalOpen: false,
};

type TCalendarState = typeof initialState;

const setStateForNextDate = (
  state: TCalendarState,
  nextYear: number,
  nextMonth: number
) => {
  const nextSelected = new Date(nextYear, nextMonth);

  state.selectedMonthDate = nextSelected.toJSON();
};

export const calendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {
    setToToday: (state) => {
      const today = new Date(state.today);

      setStateForNextDate(state, today.getFullYear(), today.getMonth());
    },
    decreaseMonth: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      setStateForNextDate(
        state,
        currentSelected.getFullYear(),
        currentSelected.getMonth() - 1
      );
    },
    increaseMonth: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      setStateForNextDate(
        state,
        currentSelected.getFullYear(),
        currentSelected.getMonth() + 1
      );
    },
    decreaseYear: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      setStateForNextDate(
        state,
        currentSelected.getFullYear() - 1,
        currentSelected.getMonth()
      );
    },
    increaseYear: (state) => {
      const currentSelected = new Date(state.selectedMonthDate);

      setStateForNextDate(
        state,
        currentSelected.getFullYear() + 1,
        currentSelected.getMonth()
      );
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  setToToday,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  openModal,
  closeModal,
} = calendarSlice.actions;

export const selectCalendar = (state: { calendar: TCalendarState }) => {
  const { selectedMonthDate, today } = state.calendar;

  return {
    ...state.calendar,
    selectedMonthDate: new Date(selectedMonthDate),
    today: new Date(today),
  };
};

export default calendarSlice.reducer;
