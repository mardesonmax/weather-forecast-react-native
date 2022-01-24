import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: 800;
  width: 100%;
  align-items: center;
`;

export const Content = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 500px;
  padding: 2px;
`;
