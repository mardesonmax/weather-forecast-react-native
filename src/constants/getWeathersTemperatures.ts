import { WeatherDTO } from '../dtos/WeatherDTO';
import { WeatherTemperatureDTO } from '../dtos/WeatherTemperatureDTO';
import { getTemperatureByLocation } from './getTemperatureByLocation';

export const getWeathersTemperatures = async (
  weathers: WeatherDTO[],
): Promise<WeatherTemperatureDTO[]> => {
  const results = await Promise.all(
    weathers.map(async (currentWeather) => {
      const temp = await getTemperatureByLocation(
        currentWeather.lng,
        currentWeather.lat,
      );

      return {
        ...currentWeather,
        description: temp.weather[0].description,
        temp: Math.ceil(temp.main.temp),
        temp_min: Math.ceil(temp.main.temp_min),
        temp_max: Math.ceil(temp.main.temp_max),
      };
    }),
  );

  return results;
};
