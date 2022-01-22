import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
  position: absolute;
`;

export const InputSearch = styled.TextInput`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
  margin-left: 8px;
  flex: 1;
`;

export const ButtonClose = styled.TouchableOpacity`
  padding: 8px;
  margin-left: -8px;
`;
