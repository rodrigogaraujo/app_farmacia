import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Text } from 'react-native';

import { Container, HeaderProfile } from './styles';

const Header = () => {
  const [mail, setMail] = useState('');
  useEffect(() => {
    async function getMail() {
      try {
        const value = await AsyncStorage.getItem('@userMail');
        if (value !== null) {
          setMail(value);
        }
      } catch (error) {}
    }
    getMail();
  }, []);

  return (
    <Container>
      <Text style={{ color: 'white', fontSize: 28 }}>Logo</Text>
      <HeaderProfile>
        <Text style={{ color: 'white', fontSize: 13 }}>Operador: {mail}</Text>
        <Text style={{ color: 'white', fontSize: 13 }}>Local</Text>
      </HeaderProfile>
    </Container>
  );
};

export default Header;
