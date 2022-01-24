import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  flex-direction: row;
  padding-top: ${getStatusBarHeight() + 4}px;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 999;
  min-height: ${getStatusBarHeight() + 56}px;
`;

export const ButtonClose = styled.TouchableOpacity`
  padding: 8px;
  left: 8px;
  z-index: 1000;
  position: absolute;
  top: ${getStatusBarHeight() + 8}px;
`;
