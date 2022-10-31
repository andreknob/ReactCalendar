import axios from "axios";

const API_KEY = "oXB3MEV0WoaKj4XfIpMKLkfoXFScQO0d";

const instance = axios.create({
  baseURL: "http://dataservice.accuweather.com/locations/v1",
  timeout: 2000,
});

export interface ISearchResult {
  cityKey: string;
  cityName: string;
  stateName: string;
  countryName: string;
}

export const searchCity = async (
  searchTerm: string
): Promise<ISearchResult[]> => {
  try {
    const result = await instance.get(
      `/search?q=${searchTerm}&apikey=${API_KEY}`
    );

    return result.data.map((item: any) => ({
      cityKey: item.Key,
      cityName: item.LocalizedName,
      stateName: item.AdministrativeArea.ID,
      countryName: item.Country.LocalizedName,
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
