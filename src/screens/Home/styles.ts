import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background_primary};
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  align-items: center;
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
  contentContainerStyle: {},
})`
  height: 100%;
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

export const FavoriteContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 16,
    paddingBottom: 16,
  },
})`
  margin-top: 32px;
  margin-bottom: 16px;
  height: ${RFValue(280)}px;
`;

export const Empty = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 80px;
  padding: 0 16px;
`;

export const EmptyTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const EmptyDescription = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 16px;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;
