import React, { useEffect, useState } from "react";
import { IoMdRainy, IoMdSunny, IoMdCloudy } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { IReminder } from "../../services/storageApi";
import {
  openReminderModal,
  selectCalendar,
} from "../../store/slices/calendarSlice";
import { sliceYearMonthDay } from "../../utils/date";
import { getForecastForReminder } from "../../utils/weather";
import { IDisplayForecast } from "./interfaces";
import { Date, Forecast, Name, ReminderContainer, Title } from "./styles";

const WEATHER_ICONS = {
  cloud: <IoMdCloudy />,
  sun: <IoMdSunny />,
  rain: <IoMdRainy />,
};

export const Reminder = ({
  reminder,
  onReminderClick,
}: {
  reminder: IReminder;
  onReminderClick?: () => void;
}) => {
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

    onReminderClick?.();

    dispatch(
      openReminderModal({
        date: reminder.date,
        editingId: reminder.id,
      })
    );
  };

  return (
    <ReminderContainer onClick={handleContainerClick}>
      <Title>
        <Date>{reminder.startTime}</Date>
        <span> </span>
        <Name>{reminder.reminderName}</Name>
      </Title>
      {forecast && (
        <Forecast>
          {WEATHER_ICONS[forecast.icon]}
          <span> </span>
          {forecast.phrase}
        </Forecast>
      )}
    </ReminderContainer>
  );
};
