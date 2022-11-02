import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import { getCitiesKeysFromStorage } from "../../services/storageApi";
import { getForecast, ICityForecast } from "../../services/weatherApi";

const today = new Date();

const initialState = {
  selectedMonthDate: new Date(today.getFullYear(), today.getMonth()).toJSON(),
  today: today.toJSON(),
  remindersReference: nanoid(),
  reminderModal: {
    date: "",
    editingId: "",
  },
  remindersListModal: {
    date: "",
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

const EXISTENT_FORECAST_REASON = "cityForecast already in store";

export const fetchForecast = createAsyncThunk<
  ICityForecast,
  string,
  {
    state: {
      calendar: TCalendarState;
    };
    rejectValue: string;
  }
>("Calendar/fetchForecast", async (cityKey, thunkApi) => {
  const state = thunkApi.getState();

  const cityForecast = state.calendar.citiesForecasts.find(
    (item) => item.cityKey === cityKey
  );

  if (cityForecast) {
    return thunkApi.rejectWithValue(EXISTENT_FORECAST_REASON);
  }

  return await getForecast(cityKey);
});

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
    openReminderModal: (state, action) => {
      state.reminderModal.date = action.payload.date as string;
      state.reminderModal.editingId = action.payload.editingId ?? "";
    },
    updateReminderModalDate: (state, action) => {
      state.reminderModal.date = action.payload as string;
    },
    openRemindersListModal: (state, action) => {
      state.remindersListModal.date = action.payload as string;
    },
    closeAllModals: (state) => {
      state.reminderModal.date = "";
      state.reminderModal.editingId = "";
      state.remindersListModal.date = "";
    },
    closeRemindersListModal: (state) => {
      state.remindersListModal.date = "";
    },
    updateRemindersReference: (state) => {
      state.remindersReference = nanoid();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecasts.fulfilled, (state, action) => {
      state.citiesForecasts = action.payload;
    });
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.citiesForecasts.push(action.payload);
    });
    builder.addCase(fetchForecast.rejected, (state, action) => {
      if (action.payload === EXISTENT_FORECAST_REASON) {
        return;
      }

      throw action.payload;
    });
  },
});

export const {
  setToToday,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  openReminderModal,
  updateReminderModalDate,
  openRemindersListModal,
  closeAllModals,
  closeRemindersListModal,
  updateRemindersReference,
} = calendarSlice.actions;

export const selectCalendar = (state: { calendar: TCalendarState }) => {
  const { selectedMonthDate, today } = state.calendar;

  return {
    ...state.calendar,
    selectedMonthDate,
    today,
  };
};

export default calendarSlice.reducer;
