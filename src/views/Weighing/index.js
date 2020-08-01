import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Text, Picker } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Form } from '@unform/mobile';

import {
  Container,
  Title,
  Row,
  InputForm,
  TextForm,
  Content,
  ButtonForm,
  Column,
  InputFormSelect,
  TextOs,
  ContentContainer,
  TextValue,
} from './styles';

import Input from '../../components/Input';
import Header from '../../components/Header';

const Weighing = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [weightSize, setWeightSize] = useState(0);
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState('gram');
  const [weightContinue, setWeightContinue] = useState('');
  const [referenceValue, setReferenceValue] = useState(
    navigation.state.params.data.reference_value
  );
  const [lastValue, setLestValue] = useState(0);

  useEffect(() => {
    navigation.state.params.data.farmac === 'americ'
      ? setWeightSize(10)
      : setWeightSize(20);
  }, [navigation.state.params.data.farmac]);

  const handleNext = useCallback(() => {
    const parsedValue = parseInt(weightContinue);
    if (navigation.state.params.data.farmac === 'americ' && total <= 9) {
      if (parsedValue > 0 && parsedValue >= lastValue) {
        if (weights.length) {
          setWeights([...weights, parsedValue - lastValue]);
          setLestValue(parsedValue);
        } else {
          setWeights([...weights, parsedValue]);
          setLestValue(parsedValue);
        }
      } else {
        alert('Insira um valor válido');
      }
      setWeightContinue('');
      setTotal(total + 1);
    } else if (
      navigation.state.params.data.farmac === 'brasilian' &&
      total <= 19
    ) {
      if (parsedValue > 0 && parsedValue >= lastValue) {
        if (weights.length) {
          setWeights([...weights, parsedValue - lastValue]);
          setLestValue(parsedValue);
        } else {
          setWeights([...weights, parsedValue]);
          setLestValue(parsedValue);
        }
      } else {
        alert('Insira um valor válido');
      }
      setWeightContinue('');
      setTotal(total + 1);
    }
  }, [weightContinue, weights]);

  console.log(weights);

  const handlePrev = useCallback(() => {
    if (total > 0) {
      setTotal(total - 1);
      const oldArray = weights;
      oldArray.splice(oldArray.length - 1, 1);
      setWeights(oldArray);
      setWeightContinue('');
    }
  }, [weights, total]);

  return (
    <Container>
      <Header />
      <Content>
        <Title>Pesagem</Title>
        <ContentContainer>
          <TextOs>Ordem de Serviço n 001;</TextOs>
          <TextOs>Referência 0,057 mg;</TextOs>
          <TextOs>
            {navigation.state.params.data.farmac === 'americ' ? '10' : '20'}
            cápsulas; 21.07.2020; 13h09
          </TextOs>
        </ContentContainer>
        <Column>
          <TextForm>Pesagem Contínua</TextForm>
          <InputForm
            value={weightContinue}
            name="weight_continue"
            placeholder="Pesagem Contínua"
            onChangeText={(text) => setWeightContinue(text)}
            keyboardType="numeric"
          />
        </Column>
        <Column>
          <TextForm>Peso em:</TextForm>
          <InputFormSelect>
            <Picker
              selectedValue={weight}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setWeight(itemValue)}
            >
              <Picker.Item label="Grama" value="gram" />
            </Picker>
          </InputFormSelect>
        </Column>
        <Row>
          <ButtonForm style={{ marginLeft: 20 }} onPress={handlePrev}>
            <AntDesign name="caretleft" size={24} color="white" />
          </ButtonForm>
          <Text style={{ marginLeft: 10, fontSize: 20 }}>Logo</Text>
          <TextValue>{total}</TextValue>
          <ButtonForm style={{ marginLeft: 20 }} onPress={handleNext}>
            <AntDesign name="caretright" size={24} color="white" />
          </ButtonForm>
        </Row>
        <ButtonForm
          disabled={disabled}
          onPress={() => {
            setDisabled(true);
            navigation.navigate('GetWeight', {
              valueReference: referenceValue,
              weights,
              farmac: navigation.state.params.data.farmac,
            });
          }}
        >
          <Text style={{ color: 'white' }}>Gerar Relatório</Text>
        </ButtonForm>
        <ButtonForm>
          <Text style={{ color: 'white' }}>Editar Ordem de Serviço</Text>
        </ButtonForm>
      </Content>
    </Container>
  );
};

export default Weighing;
