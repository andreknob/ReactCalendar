import { IDailyForecast } from "../services/weatherApi";

export const getForecastForReminder = (
  startTime: string,
  forecast: IDailyForecast
) => {
  let periodForecast = forecast.Day;
  if (startTime.includes("PM") && Number(startTime.split(":")[0]) >= 6) {
    periodForecast = forecast.Night;
  }

  if (periodForecast.HasPrecipitation) {
    return {
      icon: "rain",
      phrase: `${periodForecast.PrecipitationIntensity} rain`,
    };
  }

  return {
    icon: periodForecast.IconPhrase.includes("cloud") ? "cloud" : "sun",
    phrase: periodForecast.IconPhrase,
  };
};
