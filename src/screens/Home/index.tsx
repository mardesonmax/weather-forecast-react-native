import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { WeatherContent as WeatherItem } from '../../components/WeatherItem';
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
} from './styles';

export const Home: React.FC = () => {
  const theme = useTheme();

  const navigation = useNavigation();

  const handleSearch = (): void => {
    navigation.navigate('SearchPage');
  };

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

      <Content>
        <WeatherItem
          data={{ city: 'Bahia', country: 'Brasil', temperature: '32' }}
        >
          <ContentDescription>
            <TitleTemperature>Ensolarado</TitleTemperature>

            <Temperature>18° - 38°</Temperature>
          </ContentDescription>

          <ButtonFavorite>
            <AntDesign name="heart" size={24} color={theme.colors.favorite} />
          </ButtonFavorite>
        </WeatherItem>
      </Content>
    </Container>
  );
};
