import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IReminder } from "../../../../services/storageApi";
import { selectCalendar } from "../../../../store/slices/calendarSlice";
import { sliceYearMonthDay } from "../../../../utils/date";
import { getForecastForReminder } from "../../../../utils/weather";
import { IDisplayForecast } from "./interfaces";
import { Date, Forecast, Name, ReminderContainer } from "./styles";

export const Reminder = ({ reminder }: { reminder: IReminder }) => {
  const [forecast, setForecast] = useState<IDisplayForecast | null>(null);
  const { citiesForecasts } = useSelector(selectCalendar);

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

  return (
    <ReminderContainer>
      <div>
        <Date>{reminder.startTime}</Date>
        <span> </span>
        <Name>{reminder.reminderName}</Name>
      </div>
      {forecast ? <Forecast>{forecast.phrase}</Forecast> : null}
    </ReminderContainer>
  );
};
