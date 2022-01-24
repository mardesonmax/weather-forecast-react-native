import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  min-height: ${getStatusBarHeight() + 56}px;
  background: ${({ theme }) => theme.colors.primary};
  padding: 0 16px;
  z-index: 999;
`;

export const Content = styled.View`
  margin-top: ${getStatusBarHeight()}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;
