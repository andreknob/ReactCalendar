import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCitiesKeysFromStorage } from "../../services/storageApi";
import { getForecast, ICityForecast } from "../../services/weatherApi";

const today = new Date();

const initialState = {
  selectedMonthDate: new Date(today.getFullYear(), today.getMonth()).toJSON(),
  today: today.toJSON(),
  reminderModal: {
    date: "",
    editingId: "",
  },
  citiesForecasts: [] as ICityForecast[],
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

export const fetchForecasts = createAsyncThunk(
  "Calendar/fetchForecasts",
  async () => {
    const citiesKeys = getCitiesKeysFromStorage();

    const promises = citiesKeys.map((cityKey: string) => getForecast(cityKey));

    const result = await Promise.all(promises);

    return result as ICityForecast[];
  }
);

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
    openModal: (state, action) => {
      state.reminderModal.date = action.payload.date as string;
      state.reminderModal.editingId = action.payload.editingId ?? "";
    },
    updateModalDate: (state, action) => {
      state.reminderModal.date = action.payload as string;
    },
    closeModal: (state) => {
      state.reminderModal.date = "";
      state.reminderModal.editingId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecasts.fulfilled, (state, action) => {
      state.citiesForecasts = action.payload;
    });
  },
});

export const {
  setToToday,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  openModal,
  updateModalDate,
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
