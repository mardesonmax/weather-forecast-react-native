import AppLoading from 'expo-app-loading';
import React from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

import { Routes } from './routes';
import theme from './styles/theme';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system",
]);

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export { App };
