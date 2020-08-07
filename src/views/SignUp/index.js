import React, { useState } from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import firabase from '../../config/firabase';

import {
  ContainerSignIn,
  Row,
  InputForm,
  TextForm,
  ButtonForm,
} from './styles';
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    firabase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        navigation.navigate('SignUp');
      })
      .catch(function (error) {
        alert(error);
        setLoading(false);
      });
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <ContainerSignIn>
      <Text>Cadastrar-se</Text>
      <Row>
        <TextForm>E-mail</TextForm>
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
      <ButtonForm onPress={() => handleSignUp()}>
        <Text style={{ color: 'white' }}>Cadastrar</Text>
      </ButtonForm>
    </ContainerSignIn>
  );
};

export default SignUp;
