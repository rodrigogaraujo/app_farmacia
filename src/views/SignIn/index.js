import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import {
  ContainerSignIn,
  Row,
  ForgotOrCreateAccount,
  InputForm,
  TextForm,
  ButtonForm,
} from './styles';
const SignIn = ({ navigation }) => {
  return (
    <ContainerSignIn>
      <Text>Fazer Log-In</Text>
      <Row>
        <TextForm>Login</TextForm>
        <InputForm placeholder="E-mail" />
      </Row>
      <Row>
        <TextForm>Senha</TextForm>
        <InputForm placeholder="Senha" secureTextEntry={true} />
      </Row>
      <ButtonForm onPress={() => navigation.navigate('Home')}>
        <Text style={{ color: 'white' }}>Entrar</Text>
      </ButtonForm>
      <TouchableOpacity>
        <ForgotOrCreateAccount>Esqueceu sua senha?</ForgotOrCreateAccount>
      </TouchableOpacity>
      <TouchableOpacity>
        <ForgotOrCreateAccount>Cadastre-se</ForgotOrCreateAccount>
      </TouchableOpacity>
    </ContainerSignIn>
  );
};

export default SignIn;
