import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IReminder } from "../../../../services/storageApi";
import {
  openModal,
  selectCalendar,
} from "../../../../store/slices/calendarSlice";
import { sliceYearMonthDay } from "../../../../utils/date";
import { getForecastForReminder } from "../../../../utils/weather";
import { IDisplayForecast } from "./interfaces";
import { Date, Forecast, Name, ReminderContainer } from "./styles";

export const Reminder = ({ reminder }: { reminder: IReminder }) => {
  const [forecast, setForecast] = useState<IDisplayForecast | null>(null);
  const { citiesForecasts } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  useEffect(() => {
    const cityForecasts = citiesForecasts.find(
      (cityForecast) => cityForecast.cityKey === reminder.location.cityKey
    );

    const reminderDate = sliceYearMonthDay(reminder.date);
    const dailyForecast = cityForecasts?.forecasts.find(
      (forecast) => sliceYearMonthDay(forecast.Date) === reminderDate
    );

    if (dailyForecast) {
      setForecast(getForecastForReminder(reminder.startTime, dailyForecast));
    }
  }, [citiesForecasts, reminder]);

  const handleContainerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    dispatch(
      openModal({
        date: reminder.date,
        editingId: reminder.id,
      })
    );
  };

  return (
    <ReminderContainer onClick={handleContainerClick}>
      <div>
        <Date>{reminder.startTime}</Date>
        <span> </span>
        <Name>{reminder.reminderName}</Name>
      </div>
      {forecast ? <Forecast>{forecast.phrase}</Forecast> : null}
    </ReminderContainer>
  );
};
