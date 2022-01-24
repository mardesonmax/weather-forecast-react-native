import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';

import { RawRecord } from '@nozbe/watermelondb/RawRecord';

import { getWeathersTemperatures } from '../constants/getWeathersTemperatures';
import { database } from '../database';
import { Weather as ModelWeather } from '../database/models/Weather';
import { WeatherDTO } from '../dtos/WeatherDTO';
import { WeatherTemperatureDTO } from '../dtos/WeatherTemperatureDTO';

interface IWeatherContextData {
  weathers: WeatherTemperatureDTO[];
  addWeather(weather: WeatherDTO): Promise<void>;
  handleWeatherFavorite(weatherId: string, favorite: boolean): Promise<void>;
  removeWeather(weatherId: string): Promise<void>;
  loading: boolean;
}

const WeatherContext = createContext({} as IWeatherContextData);

const WeatherProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<WeatherTemperatureDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllWeather = async (): Promise<void> => {
      const weatherCollection = database.get<ModelWeather>('weathers');

      const results = await weatherCollection.query().fetch();

      const resultsMap = results.map((result) => {
        const { name, lng, lat, id, favorite, country, formatted_address } =
          result._raw as WeatherDTO & RawRecord;

        return { name, lng, lat, id, favorite, country, formatted_address };
      });

      setData(await getWeathersTemperatures(resultsMap));
      setLoading(false);
    };

    getAllWeather();
  }, []);

  const addWeather = useCallback(
    async (weatherData: WeatherDTO): Promise<void> => {
      try {
        setLoading(true);
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
      } catch {
        Alert.alert('Error ao tentar adicionar cidade');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const removeWeather = useCallback(
    async (weatherId: string): Promise<void> => {
      try {
        const newWeather = data.filter((weather) => weather.id !== weatherId);

        setData(newWeather);

        await database.write(async () => {
          const weather = await database
            .get<ModelWeather>('weathers')
            .find(weatherId);
          await weather.destroyPermanently();
        });
      } catch {
        Alert.alert('Error ao tentar excluir cidade');
      } finally {
        setLoading(false);
      }
    },
    [data],
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
      removeWeather,
      loading,
    }),
    [data, addWeather, handleWeatherFavorite, removeWeather, loading],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

const useWeather = (): IWeatherContextData => {
  return useContext(WeatherContext);
};

export { WeatherProvider, useWeather };
