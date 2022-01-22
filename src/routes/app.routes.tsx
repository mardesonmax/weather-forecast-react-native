import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SearchPage } from '../screens/Search';

export type IAppStackParamsList = {
  Home: undefined;
  SearchPage: undefined;
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
    </Navigator>
  );
};

export { AppRoutes };
