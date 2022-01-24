import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { ListWeather } from '../screens/ListWeather';
import { SearchPage } from '../screens/Search';

export type IAppStackParamsList = {
  Home: undefined;
  SearchPage: undefined;
  ListWeather: {
    name: string;
    location: {
      lng: number;
      lat: number;
    };
  };
};

const { Navigator, Screen } = createStackNavigator<IAppStackParamsList>();

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />
      <Screen name="SearchPage" component={SearchPage} />
      <Screen name="ListWeather" component={ListWeather} />
    </Navigator>
  );
};

export { AppRoutes };
