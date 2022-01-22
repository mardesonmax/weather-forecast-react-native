import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Temperature } from '../Temperature';
import {
  Container,
  WeatherBody,
  WeatherDescription,
  WeatherHeader,
  WeatherTitle,
  WeatherTitleDescription,
} from './styles';

interface IWeatherContentProps extends TouchableOpacityProps {
  data: {
    city: string;
    country: string;
    temperature?: string;
  };
}

export const WeatherContent: React.FC<IWeatherContentProps> = ({
  data,
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <WeatherHeader>
        <WeatherTitleDescription>
          <WeatherTitle>{data.city}</WeatherTitle>
          <WeatherDescription>{data.country}</WeatherDescription>
        </WeatherTitleDescription>

        {data.temperature && <Temperature />}
      </WeatherHeader>
      <WeatherBody>{children}</WeatherBody>
    </Container>
  );
};
