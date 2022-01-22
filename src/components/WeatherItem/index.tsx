import React from 'react';
import { useTheme } from 'styled-components';

import { AntDesign } from '@expo/vector-icons';

import { Button } from '../Button';
import {
  Container,
  WeatherBody,
  WeatherDescription,
  WeatherForecast,
  WeatherHeader,
  WeatherTitle,
  WeatherTitleDescription,
  WeatherForecastTemperature,
  WeatherForecastButton,
  WeatherForecastButtonText,
  WeatherForecastSeparator,
} from './styles';

interface IWeatherContentProps {
  data: {
    city: string;
    country: string;
    temperature?: string;
  };
}

export const WeatherContent: React.FC<IWeatherContentProps> = ({
  data,
  children,
}) => {
  return (
    <Container>
      <WeatherHeader>
        <WeatherTitleDescription>
          <WeatherTitle>{data.city}</WeatherTitle>
          <WeatherDescription>{data.country}</WeatherDescription>
        </WeatherTitleDescription>

        {data.temperature && (
          <WeatherForecast>
            <WeatherForecastTemperature>32</WeatherForecastTemperature>
            <WeatherForecastButton>
              <WeatherForecastButtonText isActive>°C</WeatherForecastButtonText>
            </WeatherForecastButton>

            <WeatherForecastSeparator />

            <WeatherForecastButton>
              <WeatherForecastButtonText isActive={false}>
                °F
              </WeatherForecastButtonText>
            </WeatherForecastButton>
          </WeatherForecast>
        )}
      </WeatherHeader>
      <WeatherBody>{children}</WeatherBody>
    </Container>
  );
};
