import React, { useEffect, useState } from 'react';

import {
  Container,
  TemperatureButton,
  TemperatureButtons,
  TemperatureButtonText,
  TemperatureSeparator,
  TemperatureText,
} from './styles';

type TempType = {
  temp: number;
};

type TemperatureType = 'fahrenheit' | 'celsius';

export const Temperature: React.FC<TempType> = ({ temp }) => {
  const [temperature, setTemperature] = useState(0);
  const [temperatureType, setTemperatureType] =
    useState<TemperatureType>('celsius');

  const handleTemperature = (type: TemperatureType): void => {
    const modifyTemperature =
      type === 'celsius' ? temp : Math.ceil((temp * 9) / 5 + 32);

    setTemperatureType(type);
    setTemperature(modifyTemperature);
  };

  useEffect(() => {
    const modifyTemperature =
      temperatureType === 'celsius' ? temp : Math.ceil((temp * 9) / 5 + 32);
    setTemperature(modifyTemperature);
  }, [temperatureType, temp]);

  return (
    <Container>
      <TemperatureText>{temperature}</TemperatureText>

      <TemperatureButtons>
        <TemperatureButton onPress={() => handleTemperature('celsius')}>
          <TemperatureButtonText isActive={temperatureType === 'celsius'}>
            °C
          </TemperatureButtonText>
        </TemperatureButton>

        <TemperatureSeparator />

        <TemperatureButton onPress={() => handleTemperature('fahrenheit')}>
          <TemperatureButtonText isActive={temperatureType === 'fahrenheit'}>
            °F
          </TemperatureButtonText>
        </TemperatureButton>
      </TemperatureButtons>
    </Container>
  );
};
