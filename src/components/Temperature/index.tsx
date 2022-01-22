import React from 'react';

import {
  Container,
  TemperatureButton,
  TemperatureButtonText,
  TemperatureSeparator,
  TemperatureText,
} from './styles';

export const Temperature: React.FC = () => {
  return (
    <Container>
      <TemperatureText>32</TemperatureText>
      <TemperatureButton>
        <TemperatureButtonText isActive>°C</TemperatureButtonText>
      </TemperatureButton>

      <TemperatureSeparator />

      <TemperatureButton>
        <TemperatureButtonText isActive={false}>°F</TemperatureButtonText>
      </TemperatureButton>
    </Container>
  );
};
