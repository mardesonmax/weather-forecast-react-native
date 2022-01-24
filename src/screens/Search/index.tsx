import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Search } from '../../components/Search';
import { WeatherItem } from '../../components/WeatherItem';
import { IWeatherProps, useWeather } from '../../hooks/weather';
import { Container, Content, NotHistorySearch } from './styles';

export const SearchPage: React.FC = () => {
  const [weather, setWeather] = useState({} as IWeatherProps);

  const navigation = useNavigation();
  const { addWeather } = useWeather();

  const handleActiveSearch = (): void => {
    navigation.goBack();
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

      <Content>
        {weather.name ? (
          <WeatherItem data={{ city: weather.name, country: weather.country }}>
            <Button title="ADICIONAR" onPress={() => handleAddWeather()} />
          </WeatherItem>
        ) : (
          <NotHistorySearch>Nenhuma pesquisa recente</NotHistorySearch>
        )}
      </Content>
    </Container>
  );
};
