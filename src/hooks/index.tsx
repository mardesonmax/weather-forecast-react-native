import React from 'react';

import { WeatherProvider } from './weather';

const AppProvider: React.FC = ({ children }) => {
  return <WeatherProvider>{children}</WeatherProvider>;
};

export { AppProvider };
