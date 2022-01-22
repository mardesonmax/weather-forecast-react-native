import React, { useEffect, useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import { Container, InputSearch, ButtonClose } from './styles';

interface SearchProps extends TextInputProps {
  onClose(): void;
}

export const Search: React.FC<SearchProps> = ({ onClose, ...rest }) => {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const theme = useTheme();

  return (
    <Container>
      <ButtonClose onPress={onClose}>
        <Feather name="x" size={20} color={theme.colors.shape} />
      </ButtonClose>

      <InputSearch
        ref={ref}
        placeholder="Pesquisar cidade"
        placeholderTextColor={theme.colors.placeholder}
        selectionColor={theme.colors.shape}
        {...rest}
      />
    </Container>
  );
};
