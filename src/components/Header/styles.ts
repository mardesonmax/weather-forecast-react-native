import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${getStatusBarHeight() + 56}px;
  background: ${({ theme }) => theme.colors.primary};
  padding: 0 16px;
`;

export const SearchCity = styled.View`
  margin-top: ${getStatusBarHeight()}px;
  justify-content: center;
  height: 56px;
  flex: 1;
`;

export const InputSearch = styled.TextInput`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
`;

export const Content = styled.View`
  margin-top: ${getStatusBarHeight()}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
`;

export const ButtonSearch = styled.TouchableOpacity``;
