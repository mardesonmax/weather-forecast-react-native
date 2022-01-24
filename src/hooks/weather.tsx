import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { RawRecord } from '@nozbe/watermelondb/RawRecord';

import { database } from '../database';
import { Weather as ModelWeather } from '../database/models/Weather';
import { findWeatherDTO } from '../dtos/findWeatherDTO';
import { weatherApi } from '../services/api';

export interface IWeatherProps {
  id: string;
  lng: number;
  lat: number;
  name: string;
  country: string;
  formatted_address: string;
  favorite: boolean;
}

export interface IWeatherTemperatureProps extends IWeatherProps {
  description: string;
  temp: number;
  temp_min: number;
  temp_max: number;
}

interface IWeatherContextData {
  weathers: IWeatherTemperatureProps[];
  addWeather(weather: IWeatherProps): Promise<void>;
  handleWeatherFavorite(weatherId: string, favorite: boolean): Promise<void>;
}

const WeatherContext = createContext({} as IWeatherContextData);

const WeatherProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IWeatherTemperatureProps[]>([]);

  const getTemperatureByLocation = async (
    lon: number,
    lat: number,
  ): Promise<findWeatherDTO> => {
    const result = await weatherApi.get<findWeatherDTO>('/', {
      params: {
        lon,
        lat,
      },
    });

    return result.data;
  };

  const getWeathersTemperatures = useCallback(
    async (weathers: IWeatherProps[]): Promise<IWeatherTemperatureProps[]> => {
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
    },
    [],
  );

  useEffect(() => {
    const getAllWeather = async (): Promise<void> => {
      const weatherCollection = database.get<ModelWeather>('weathers');

      const results = await weatherCollection.query().fetch();

      const resultsMap = results.map((result) => {
        const { name, lng, lat, id, favorite, country, formatted_address } =
          result._raw as IWeatherProps & RawRecord;

        return { name, lng, lat, id, favorite, country, formatted_address };
      });

      setData(await getWeathersTemperatures(resultsMap));
    };

    getAllWeather();
  }, [getWeathersTemperatures]);

  const addWeather = useCallback(
    async (weatherData: IWeatherProps): Promise<void> => {
      const weatherTemperature = await getWeathersTemperatures([weatherData]);

      setData((state) => [weatherTemperature[0], ...state]);

      await database.write(async () => {
        const weatherCollection = database.get<ModelWeather>('weathers');
        await weatherCollection.create((weather) => {
          weather._raw.id = weatherData.id;
          weather.name = weatherData.name;
          weather.lat = weatherData.lat;
          weather.lng = weatherData.lng;
          weather.country = weatherData.country;
          weather.favorite = false;
          weather.formatted_address = weatherData.formatted_address;
        });
      });
    },
    [getWeathersTemperatures],
  );

  const handleWeatherFavorite = useCallback(
    async (weatherId: string, favorite: boolean): Promise<void> => {
      setData((state) =>
        state.map((weather) => {
          if (weather.id === weatherId) {
            return {
              ...weather,
              favorite,
            };
          }

          return weather;
        }),
      );

      await database.write(async () => {
        const weatherCollection = await database
          .get<ModelWeather>('weathers')
          .find(weatherId);
        await weatherCollection.update((weather) => {
          weather.favorite = favorite;
        });
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      weathers: data,
      addWeather,
      handleWeatherFavorite,
    }),
    [data, addWeather, handleWeatherFavorite],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

const useWeather = (): IWeatherContextData => {
  return useContext(WeatherContext);
};

export { WeatherProvider, useWeather };
