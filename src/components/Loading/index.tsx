import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { Container, Content } from './styles';

interface ILoadingProps {
  isActive: boolean;
}

export const Loading: React.FC<ILoadingProps> = ({ isActive }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(isActive ? 100 : 0);
  }, [isActive, translateY]);

  const loadingStyles = useAnimatedStyle(() => {
    return {
      top: translateY.value,

      opacity: interpolate(
        translateY.value,
        [0, 100],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const theme = useTheme();

  return (
    <Container style={[loadingStyles]}>
      <Content>
        <ActivityIndicator color={theme.colors.shape} size="large" />
      </Content>
    </Container>
  );
};
