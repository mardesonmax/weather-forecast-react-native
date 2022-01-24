import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ButtonRemove } from '../../components/ButtonRemove';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { WeatherItem } from '../../components/WeatherItem';
import { WeatherTemperatureDTO } from '../../dtos/WeatherTemperatureDTO';
import { useWeather } from '../../hooks/weather';
import {
  Container,
  Title,
  ButtonSearch,
  TitleContainer,
  Content,
  ContentDescription,
  TitleTemperature,
  Temperature,
  ButtonFavorite,
  FavoriteContent,
  Empty,
  EmptyTitle,
  EmptyDescription,
  Buttons,
} from './styles';

export const Home: React.FC = () => {
  const theme = useTheme();
  const favoriteRed = useRef<ScrollView>(null);

  const [weathersTemperatures, setWeathersTemperatures] = useState<
    WeatherTemperatureDTO[]
  >([]);
  const [weathersTemperaturesFavorites, setWeathersTemperaturesFavorites] =
    useState<WeatherTemperatureDTO[]>([]);

  const { weathers, handleWeatherFavorite, removeWeather, loading } =
    useWeather();

  const navigation = useNavigation();

  const handleSearch = (): void => {
    navigation.navigate('SearchPage');
  };

  const handleShowItem = (
    location: { lng: number; lat: number },
    name: string,
  ): void => {
    navigation.navigate('ListWeather', {
      location,
      name,
    });
  };

  useEffect(() => {
    const getTemperature = async (): Promise<void> => {
      const listsWeathers: WeatherTemperatureDTO[] = [];
      const favoriteWeathers: WeatherTemperatureDTO[] = [];

      weathers.forEach((weather) => {
        if (weather.favorite) {
          favoriteWeathers.push(weather);
        } else {
          listsWeathers.push(weather);
        }
      });

      setWeathersTemperatures(listsWeathers);
      setWeathersTemperaturesFavorites(favoriteWeathers);
    };

    getTemperature();
  }, [weathers]);

  const handleRemoveFavorite = useCallback(
    (weatherId: string, index: number): void => {
      handleWeatherFavorite(weatherId, false);

      const canScrollToEnd = index === weathersTemperaturesFavorites.length - 1;
      if (favoriteRed.current && canScrollToEnd) {
        favoriteRed.current.scrollToEnd({ animated: true });
      }
    },
    [weathersTemperaturesFavorites, handleWeatherFavorite],
  );

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <TitleContainer>
          <Title>Cidades</Title>

          <ButtonSearch onPress={() => handleSearch()}>
            <Feather name="search" size={20} color={theme.colors.shape} />
          </ButtonSearch>
        </TitleContainer>
      </Header>

      <Loading isActive={loading} />

      {weathersTemperaturesFavorites.length > 0 && (
        <FavoriteContent ref={favoriteRed}>
          {weathersTemperaturesFavorites.map((weather, index) => (
            <WeatherItem
              favorite
              key={weather.id}
              onPress={() =>
                handleShowItem(
                  { lng: weather.lng, lat: weather.lat },
                  weather.name,
                )
              }
              data={{
                city: weather.name,
                country: weather.country,
                temperature: weather.temp,
              }}
            >
              <ContentDescription>
                <TitleTemperature>{weather.description}</TitleTemperature>

                <Temperature>{`${weather.temp_min}° - ${weather.temp_max}°`}</Temperature>
              </ContentDescription>

              <Buttons>
                <ButtonFavorite
                  onPress={() => handleRemoveFavorite(weather.id, index)}
                >
                  <AntDesign
                    name="heart"
                    size={24}
                    color={theme.colors.primary}
                  />
                </ButtonFavorite>

                <ButtonRemove
                  onPress={() => {
                    removeWeather(weather.id);
                  }}
                />
              </Buttons>
            </WeatherItem>
          ))}
        </FavoriteContent>
      )}

      <Content
        style={{
          marginTop: weathersTemperaturesFavorites.length > 0 ? 0 : 16,
        }}
      >
        {weathersTemperatures.map(
          (weather) =>
            !weather.favorite && (
              <WeatherItem
                key={weather.id}
                onPress={() =>
                  handleShowItem(
                    { lng: weather.lng, lat: weather.lat },
                    weather.name,
                  )
                }
                data={{
                  city: weather.name,
                  country: weather.country,
                  temperature: weather.temp,
                }}
              >
                <ContentDescription>
                  <TitleTemperature>{weather.description}</TitleTemperature>

                  <Temperature>{`${weather.temp_min}° - ${weather.temp_max}°`}</Temperature>
                </ContentDescription>

                <Buttons>
                  <ButtonFavorite
                    onPress={() => handleWeatherFavorite(weather.id, true)}
                  >
                    <AntDesign
                      name="hearto"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </ButtonFavorite>

                  <ButtonRemove
                    onPress={() => {
                      removeWeather(weather.id);
                    }}
                  />
                </Buttons>
              </WeatherItem>
            ),
        )}

        {weathersTemperaturesFavorites.length === 0 &&
          weathersTemperatures.length === 0 &&
          !loading && (
            <Empty>
              <EmptyTitle>
                Parece que você ainda não adicionou uma cidade
              </EmptyTitle>

              <EmptyDescription>
                Tente adicionar uma cidade usando o botão de busca
              </EmptyDescription>
            </Empty>
          )}
      </Content>
    </Container>
  );
};
