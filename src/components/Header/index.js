import React from 'react';

import { Text } from 'react-native';

import { Container, HeaderProfile } from './styles';

const Header = () => {
  return (
    <Container>
      <Text style={{ color: 'white', fontSize: 28 }}>Logo</Text>
      <HeaderProfile>
        <Text style={{ color: 'white', fontSize: 13 }}>Operador 1</Text>
        <Text style={{ color: 'white', fontSize: 13 }}>Local</Text>
      </HeaderProfile>
    </Container>
  );
};

export default Header;
