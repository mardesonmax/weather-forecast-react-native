import { transparentize } from 'polished';
import React, { useEffect, useRef } from 'react';
import { PLACE_API_KEY } from 'react-native-dotenv';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import { Container, ButtonClose } from './styles';

interface SearchProps {
  onClose(): void;
  onSelected(value: GooglePlaceDetail): void;
}

export const Search: React.FC<SearchProps> = ({ onClose, onSelected }) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const theme = useTheme();

  return (
    <Container>
      <ButtonClose onPress={onClose}>
        <Feather name="arrow-left" size={20} color={theme.colors.shape} />
      </ButtonClose>

      <GooglePlacesAutocomplete
        ref={ref}
        styles={{
          description: {
            color: theme.colors.title,
          },
          textInput: {
            backgroundColor: 'transparent',
            color: theme.colors.shape,
            fontSize: RFValue(16),
            fontFamily: theme.fonts.primary_500,
            paddingLeft: 48,
          },
          predefinedPlacesDescription: {
            color: theme.colors.shape,
          },
        }}
        fetchDetails
        enablePoweredByContainer={false}
        placeholder="Pesquisar cidade"
        onPress={(_, details = null) => {
          if (details) {
            onSelected(details);
          }
        }}
        textInputProps={{
          placeholderTextColor: transparentize(0.4, theme.colors.shape),
        }}
        query={{
          key: PLACE_API_KEY,
          language: 'pt-BR',
          type: '(regions)',
          components: 'country:br',
        }}
        timeout={3000}
      />
    </Container>
  );
};
