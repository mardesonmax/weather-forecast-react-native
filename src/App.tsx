import AppLoading from 'expo-app-loading';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';

import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

import { AppProvider } from './hooks';
import { Routes } from './routes';
import theme from './styles/theme';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    (async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT,
      );
    })();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
};

export { App };
