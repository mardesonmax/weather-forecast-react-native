import { transparentize } from 'polished';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const TemperatureText = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const TemperatureButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TemperatureButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const TemperatureSeparator = styled.TouchableOpacity`
  width: 2px;
  height: 18px;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const TemperatureButtonText = styled.Text<IButtonProps>`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => transparentize(0.6, theme.colors.secondary)};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.secondary};
    `}
`;
