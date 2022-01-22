import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { WeatherContent as WeatherItem } from '../../components/WeatherItem';
import { Container, Content } from './styles';

export const SearchPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  const handleActiveSearch = (): void => {
    navigation.goBack();
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Search
          onClose={() => handleActiveSearch()}
          onChangeText={setSearch}
          value={search}
        />
      </Header>

      <Content>
        <WeatherItem data={{ city: 'Bahia', country: 'Brasil' }}>
          <Button title="ADICIONAR" />
        </WeatherItem>
      </Content>
    </Container>
  );
};
