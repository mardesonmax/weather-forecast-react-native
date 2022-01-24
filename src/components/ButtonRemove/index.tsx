import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

import { Container } from './styles';

interface IButtonProps extends TouchableOpacityProps {}

export const ButtonRemove: React.FC<IButtonProps> = ({ ...rest }) => {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <AntDesign name="delete" size={24} color={theme.colors.error} />
    </Container>
  );
};
