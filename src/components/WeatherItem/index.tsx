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
    temperature?: number;
  };
  favorite?: boolean;
}

export const WeatherItem: React.FC<IWeatherContentProps> = ({
  data,
  children,
  favorite,
  ...rest
}) => {
  return (
    <Container {...rest} favorite={favorite}>
      <WeatherHeader>
        <WeatherTitleDescription>
          <WeatherTitle>{data.city}</WeatherTitle>
          <WeatherDescription>{data.country}</WeatherDescription>
        </WeatherTitleDescription>

        {data.temperature && <Temperature temp={data.temperature} />}
      </WeatherHeader>

      <WeatherBody>{children}</WeatherBody>
    </Container>
  );
};
