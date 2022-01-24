import React, { useCallback, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Search } from '../../components/Search';
import { WeatherItem } from '../../components/WeatherItem';
import { WeatherDTO } from '../../dtos/WeatherDTO';
import { useWeather } from '../../hooks/weather';
import { Container, Content, SearchMessage, TextExists } from './styles';

export const SearchPage: React.FC = () => {
  const [weather, setWeather] = useState({} as WeatherDTO);
  const [weatherExitId, setWeatherExitId] = useState('');

  const navigation = useNavigation();
  const { addWeather, weathers, loading } = useWeather();

  const handleActiveSearch = (): void => {
    navigation.goBack();
  };

  const existWeatherInList = (name: string): void => {
    const findWeatherExits = weathers.find(
      (currentWeather) => currentWeather.name === name,
    );

    setWeatherExitId(findWeatherExits ? findWeatherExits.id : '');
  };

  const handleSearchSelect = (value: GooglePlaceDetail): void => {
    setWeather({
      id: String(uuid.v4()),
      name: value.name,
      country: value.formatted_address.split(',').pop()?.trim() as string,
      formatted_address: value.formatted_address,
      lng: value.geometry.location.lng,
      lat: value.geometry.location.lat,
      favorite: false,
    });

    existWeatherInList(value.name);
  };

  const handleAddWeather = useCallback(async () => {
    await addWeather(weather);

    navigation.navigate('Home');
  }, [addWeather, weather, navigation]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Search
        onClose={() => handleActiveSearch()}
        onSelected={handleSearchSelect}
      />

      <Loading isActive={loading} />

      <Content>
        {weather.name ? (
          <WeatherItem data={{ city: weather.name, country: weather.country }}>
            {weatherExitId ? (
              <TextExists>Em sua lista</TextExists>
            ) : (
              <Button title="ADICIONAR" onPress={() => handleAddWeather()} />
            )}
          </WeatherItem>
        ) : (
          <SearchMessage>
            Pesquise e adicione as cidade que você deseja ter informações
          </SearchMessage>
        )}
      </Content>
    </Container>
  );
};
