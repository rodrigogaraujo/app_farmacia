import React from 'react';

import { Container, Content, ButtonOption, TextButton } from './styles';

import Header from '../../components/Header';

const Home = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@userMail');
      navigation.navigate('SignIn');
    } catch (error) {
      // Error retrieving data
    }
  };
  return (
    <Container>
      <Header />
      <Content>
        <ButtonOption onPress={() => navigation.navigate('ServiceOrder')}>
          <TextButton>Nova Ordem de Serviço</TextButton>
        </ButtonOption>
        <ButtonOption>
          <TextButton>Banco de dados</TextButton>
        </ButtonOption>
        <ButtonOption onPress={() => handleLogout()}>
          <TextButton>Logout</TextButton>
        </ButtonOption>
      </Content>
    </Container>
  );
};

export default Home;
