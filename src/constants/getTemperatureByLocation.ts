import { FindWeatherDTO } from '../dtos/FindWeatherDTO';
import { weatherApi } from '../services/api';

export const getTemperatureByLocation = async (
  lon: number,
  lat: number,
): Promise<FindWeatherDTO> => {
  const result = await weatherApi.get<FindWeatherDTO>('/weather', {
    params: {
      lon,
      lat,
    },
  });

  return result.data;
};
