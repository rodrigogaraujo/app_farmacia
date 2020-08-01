import React from 'react';

import { Text } from 'react-native';

import {
  Container,
  HeaderProfile,
  Content,
  ButtonOption,
  TextButton,
} from './styles';

import Header from '../../components/Header';

const Home = ({ navigation }) => {
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
        <ButtonOption>
          <TextButton>Perfil</TextButton>
        </ButtonOption>
        <ButtonOption>
          <TextButton>Configurações</TextButton>
        </ButtonOption>
        <ButtonOption onPress={() => navigation.navigate('SignIn')}>
          <TextButton>Logout</TextButton>
        </ButtonOption>
      </Content>
    </Container>
  );
};

export default Home;
