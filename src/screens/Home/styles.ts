import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_primary};
`;

export const TitleContainer = styled(Animated.View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  padding: 8px;
  margin-right: -8px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 16px;
`;

export const ContentDescription = styled.View``;

export const TitleTemperature = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Temperature = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
  margin-top: 2px;
`;

export const ButtonFavorite = styled.TouchableOpacity`
  padding: 8px;
`;
