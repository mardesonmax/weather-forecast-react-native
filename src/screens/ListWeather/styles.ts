import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IWeatherItemProps {
  isActive?: boolean;
}

export const Container = styled.View``;

export const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
  flex: 1;
  margin-left: 8px;
`;

export const GoBack = styled.TouchableOpacity`
  padding: 8px;
  margin-left: -8px;
`;

export const ShowWeather = styled.View`
  margin: 16px;
  background: ${({ theme }) => theme.colors.background_secondary};
  padding: 24px 16px;
  border-radius: 8px;
  align-items: center;
`;

export const DayWeek = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;

export const FullDate = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  margin-top: 4px;
`;

export const WeatherImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 16px 0;
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  margin-top: 4px;
`;

export const WeatherItems = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 16,
  },
})``;

export const WeatherItem = styled.TouchableOpacity<IWeatherItemProps>`
  min-width: ${RFValue(80)}px;
  flex: 1;
  padding: 8px;
  background: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 16px;
  align-items: center;
  border-radius: 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.colors.primary};
    `}
`;

export const WeatherTitle = styled.Text<IWeatherItemProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const WeatherItemImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-top: 4px;
`;

export const WeatherItemTemperatures = styled.Text<IWeatherItemProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  margin-top: 4px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;
