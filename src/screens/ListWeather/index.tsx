import React from 'react';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { Temperature } from '../../components/Temperature';
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

export const ListWeather: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header>
        <TitleContainer>
          <GoBack onPress={() => handleGoBack()}>
            <Feather name="arrow-left" size={20} color={theme.colors.shape} />
          </GoBack>
          <Title>Cidades</Title>
        </TitleContainer>
      </Header>

      <ShowWeather>
        <DayWeek>Sabado</DayWeek>
        <FullDate>22 de Janeiro</FullDate>

        <WeatherImage
          source={{
            uri: 'https://openweathermap.org/img/wn/04d@2x.png',
          }}
        />

        <Temperature />

        <Description>Chuva fraca</Description>
      </ShowWeather>

      <WeatherItems>
        <WeatherItem isActive>
          <WeatherTitle isActive>Sabado</WeatherTitle>

          <WeatherItemImage
            source={{
              uri: 'https://openweathermap.org/img/wn/04d@2x.png',
            }}
          />

          <WeatherItemTemperatures isActive>20 - 32</WeatherItemTemperatures>
        </WeatherItem>

        <WeatherItem>
          <WeatherTitle>Domingo</WeatherTitle>

          <WeatherItemImage
            source={{
              uri: 'https://openweathermap.org/img/wn/04d@2x.png',
            }}
          />

          <WeatherItemTemperatures>20 - 32</WeatherItemTemperatures>
        </WeatherItem>

        <WeatherItem>
          <WeatherTitle>Segunda</WeatherTitle>

          <WeatherItemImage
            source={{
              uri: 'https://openweathermap.org/img/wn/04d@2x.png',
            }}
          />

          <WeatherItemTemperatures>20 - 32</WeatherItemTemperatures>
        </WeatherItem>
        <WeatherItem>
          <WeatherTitle>Terça</WeatherTitle>

          <WeatherItemImage
            source={{
              uri: 'https://openweathermap.org/img/wn/04d@2x.png',
            }}
          />

          <WeatherItemTemperatures>20 - 32</WeatherItemTemperatures>
        </WeatherItem>
        <WeatherItem>
          <WeatherTitle>Quarta</WeatherTitle>

          <WeatherItemImage
            source={{
              uri: 'https://openweathermap.org/img/wn/04d@2x.png',
            }}
          />

          <WeatherItemTemperatures>20 - 32</WeatherItemTemperatures>
        </WeatherItem>
      </WeatherItems>
    </Container>
  );
};
