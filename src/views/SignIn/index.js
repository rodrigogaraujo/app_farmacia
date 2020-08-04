import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import firabase from '../../config/firabase';
import { AsyncStorage } from 'react-native';

import {
  ContainerSignIn,
  Row,
  ForgotOrCreateAccount,
  InputForm,
  TextForm,
  ButtonForm,
} from './styles';
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSign = async () => {
    setLoading(true);
    firabase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        try {
          await AsyncStorage.setItem('@userMail', email);
          navigation.navigate('Home');
        } catch (error) {
          alert(error);
          setLoading(false);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    async function getMail() {
      try {
        const value = await AsyncStorage.getItem('@userMail');
        if (value !== null) {
          navigation.navigate('Home');
        } else {
          setLoading(false);
        }
      } catch (error) {}
    }
    getMail();
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <ContainerSignIn>
      <Text>Fazer Log-In</Text>
      <Row>
        <TextForm>Login</TextForm>
        <InputForm
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
        />
      </Row>
      <Row>
        <TextForm>Senha</TextForm>
        <InputForm
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </Row>
      <ButtonForm onPress={() => handleSign()}>
        <Text style={{ color: 'white' }}>Entrar</Text>
      </ButtonForm>
      <TouchableOpacity>
        <ForgotOrCreateAccount>Esqueceu sua senha?</ForgotOrCreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <ForgotOrCreateAccount>Cadastre-se</ForgotOrCreateAccount>
      </TouchableOpacity>
    </ContainerSignIn>
  );
};

export default SignIn;
