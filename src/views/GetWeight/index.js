import React, { useEffect, useState } from 'react';
// import { Text } from 'react-native';
import {
  Container,
  Title,
  // Close,
  InputText,
  ButtonNext,
  Content,
} from './styles';
import { AntDesign } from '@expo/vector-icons';
export const GetWeight = ({ navigation }) => {
  const [valueTotal, setValueTotal] = useState('0');
  useEffect(() => {
    if (navigation.state.params.weights) {
      let value = 0;
      navigation.state.params.weights.map(
        (weight) => (value += parseInt(weight))
      );
      setValueTotal(`${value}`);
    }
  }, [navigation.state.params.weights]);
  return (
    <Container>
      <Content>
        {/* <Close>
          <AntDesign
            name="closecircle"
            size={24}
            style={{ color: 'rgb(41, 178, 178)' }}
          />
        </Close> */}
        <Title>Peso Total</Title>
        <InputText value={`${valueTotal}g`} />
        <ButtonNext
          onPress={() =>
            navigation.navigate('Report', {
              values: navigation.state.params,
              valueTotal,
            })
          }
        >
          <AntDesign name="caretright" size={24} color="white" />
        </ButtonNext>
      </Content>
    </Container>
  );
};

export default GetWeight;
