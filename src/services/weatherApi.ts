import axios from "axios";

const API_KEY = "oXB3MEV0WoaKj4XfIpMKLkfoXFScQO0d";

const locationsInstance = axios.create({
  baseURL: "http://dataservice.accuweather.com/locations/v1",
  timeout: 2000,
});

const forecastsInstance = axios.create({
  baseURL: "http://dataservice.accuweather.com/forecasts/v1",
  timeout: 2000,
});

export interface ILocation {
  cityKey: string;
  cityName: string;
  stateName: string;
  countryName: string;
}

export const searchCity = async (searchTerm: string): Promise<ILocation[]> => {
  try {
    const result = await locationsInstance.get(
      `/search?q=${searchTerm}&apikey=${API_KEY}`
    );

    return result.data.map((item: any) => ({
      cityKey: item.Key,
      cityName: item.LocalizedName,
      stateName: item.AdministrativeArea.ID,
      countryName: item.Country.LocalizedName,
    }));
  } catch (error) {
    throw error;
  }
};

interface TPeriodForecast {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}

export interface IDailyForecast {
  Date: string;
  Day: TPeriodForecast;
  Night: TPeriodForecast;
}

export interface ICityForecast {
  cityKey: string;
  forecasts: IDailyForecast[];
}

export const getForecast = async (cityKey: string): Promise<ICityForecast> => {
  try {
    const result = await forecastsInstance.get(
      `/daily/5day/${cityKey}?apikey=${API_KEY}`
    );

    return {
      cityKey,
      forecasts: result.data.DailyForecasts,
    };
  } catch (error) {
    throw error;
  }
};
