import React from 'react';

import { Container, Content } from './styles';

export const Header: React.FC = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};
