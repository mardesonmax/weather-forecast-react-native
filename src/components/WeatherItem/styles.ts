import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IWeatherItemProps {
  favorite?: boolean;
}

export const Container = styled.TouchableOpacity<IWeatherItemProps>`
  background: ${({ theme }) => theme.colors.background_secondary};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  width: ${Dimensions.get('window').width - 32}px;
  justify-content: space-between;

  ${({ favorite }) =>
    favorite &&
    css`
      width: ${Dimensions.get('window').width - 48}px;
      margin-left: 16px;
      margin-bottom: 0;
    `}
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

export const WeatherBody = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
