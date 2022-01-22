import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonTitle, Container } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button: React.FC<IButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonTitle>{title}</ButtonTitle>
    </Container>
  );
};
