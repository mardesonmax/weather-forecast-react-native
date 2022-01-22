import { transparentize } from 'polished';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background_secondary};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const WeatherHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const WeatherTitleDescription = styled.View``;

export const WeatherTitle = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const WeatherDescription = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  margin-top: 2px;
`;

export const WeatherForecast = styled.View`
  flex-direction: row;
`;

export const WeatherForecastTemperature = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const WeatherForecastButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const WeatherForecastSeparator = styled.TouchableOpacity`
  width: 2px;
  height: 18px;
  background: ${({ theme }) => theme.colors.secondary};
  margin-top: 8px;
`;

export const WeatherForecastButtonText = styled.Text<IButtonProps>`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => transparentize(0.6, theme.colors.secondary)};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.secondary};
    `}
`;

export const WeatherBody = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
