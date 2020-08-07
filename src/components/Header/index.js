import React, { useEffect, useState } from 'react';
import { AsyncStorage, Image } from 'react-native';
import { Text } from 'react-native';

import logo from '../../assets/logo.png';

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
      <Image style={{ width: 40, height: 40 }} source={logo} />
      <HeaderProfile>
        <Text style={{ color: 'white', fontSize: 13 }}>Operador: {mail}</Text>
      </HeaderProfile>
    </Container>
  );
};

export default Header;
