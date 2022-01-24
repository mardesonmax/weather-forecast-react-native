import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Temperature } from '../../components/Temperature';
import { FindForecastDTO } from '../../dtos/FindForecastDTO';
import { IAppStackParamsList } from '../../routes/app.routes';
import { weatherApi } from '../../services/api';
import {
  Container,
  ShowWeather,
  DayWeek,
  FullDate,
  WeatherImage,
  Description,
  WeatherItems,
  WeatherItem,
  WeatherTitle,
  WeatherItemImage,
  WeatherItemTemperatures,
  TitleContainer,
  Title,
  GoBack,
} from './styles';

interface IForecastProps {
  id: number;
  date_time: number;
  icon: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

dayjs.locale('pt-br');

export const ListWeather: React.FC = () => {
  const [forecasts, setForecasts] = useState<IForecastProps[]>([]);
  const [selectedForecast, setSelectedForecast] = useState(0);
  const [loadingForecast, setLoadingForecast] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  const handleGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const { params } = useRoute();
  const { location, name } = params as IAppStackParamsList['ListWeather'];

  useEffect(() => {
    let isMounted = true;
    const getStatistic = async (): Promise<void> => {
      try {
        const results = await weatherApi.get<FindForecastDTO>('/onecall', {
          params: {
            lon: location.lng,
            lat: location.lat,
            exclude: 'minutely,hourly',
          },
        });

        const newForecasts = results.data.daily.map((forecast) => ({
          id: forecast.dt,
          date_time: forecast.dt,
          temp: Math.ceil(forecast.temp.day),
          temp_min: Math.ceil(forecast.temp.min),
          temp_max: Math.ceil(forecast.temp.max),
          icon: forecast.weather[0].icon,
          description: forecast.weather[0].description,
        }));

        if (isMounted) {
          setForecasts(newForecasts);
        }
      } catch {
        Alert.alert('Error ao solicitar dados da api', '', [
          { text: 'Voltar para cidades', onPress: handleGoBack },
        ]);
      } finally {
        if (isMounted) {
          setLoadingForecast(false);
        }
      }
    };

    getStatistic();

    return () => {
      isMounted = false;
    };
  }, [location, handleGoBack]);

  return (
    <Container>
      <Header>
        <TitleContainer>
          <GoBack onPress={() => handleGoBack()}>
            <Feather name="arrow-left" size={20} color={theme.colors.shape} />
          </GoBack>
          <Title>{name}</Title>
        </TitleContainer>
      </Header>

      <Loading isActive={loadingForecast} />

      {forecasts.length > 0 && forecasts[selectedForecast].id && (
        <ShowWeather>
          <DayWeek>
            {dayjs(
              new Date(forecasts[selectedForecast].date_time * 1000),
            ).format('dddd')}
          </DayWeek>
          <FullDate>
            {dayjs(
              new Date(forecasts[selectedForecast].date_time * 1000),
            ).format('DD, MMM YYYY')}
          </FullDate>

          <WeatherImage
            source={{
              uri: `https://openweathermap.org/img/wn/${forecasts[selectedForecast].icon}@2x.png`,
            }}
          />

          <Temperature temp={forecasts[selectedForecast].temp} />

          <Description>{forecasts[selectedForecast].description}</Description>
        </ShowWeather>
      )}

      <WeatherItems>
        {forecasts.map((forecast, index) => (
          <WeatherItem
            onPress={() => setSelectedForecast(index)}
            isActive={selectedForecast === index}
            key={forecast.id}
          >
            <WeatherTitle isActive={selectedForecast === index}>
              {dayjs(new Date(forecast.date_time * 1000)).format('ddd')}
            </WeatherTitle>

            <WeatherItemImage
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`,
              }}
            />

            <WeatherItemTemperatures isActive={selectedForecast === index}>
              {`${forecast.temp_min}° - ${forecast.temp_max}°`}
            </WeatherItemTemperatures>
          </WeatherItem>
        ))}
      </WeatherItems>
    </Container>
  );
};
