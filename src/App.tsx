import AppLoading from 'expo-app-loading';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

import { Routes } from './routes';
import theme from './styles/theme';

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
