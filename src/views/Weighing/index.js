import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import SvgUri from 'react-native-svg-uri';

import {
  Container,
  Title,
  Row,
  InputForm,
  TextForm,
  Content,
  ButtonForm,
  Column,
  TextOs,
  ContentContainer,
  TextValue,
} from './styles';

import logo from '../../assets/logo.png';
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
  const [unit, setUnit] = useState(navigation.state.params.data.unit);
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
          <TextOs>
            Referência {referenceValue} {unit};
          </TextOs>
          <TextOs>
            {navigation.state.params.data.farmac === 'americ' ? '10 ' : '20 '}
            cápsulas; {moment(new Date()).format('DD/MM/YYYY')};{' '}
            {moment(new Date()).format('hh:mm')}
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
        <Row>
          <ButtonForm style={{ marginLeft: 20 }} onPress={handlePrev}>
            <AntDesign name="caretleft" size={24} color="white" />
          </ButtonForm>
          <Image style={{ width: 60, height: 60 }} source={logo} />
          <TextValue>{total <= 9 ? total + 1 : 10}</TextValue>
          <ButtonForm style={{ marginLeft: 20 }} onPress={handleNext}>
            <AntDesign name="caretright" size={24} color="white" />
          </ButtonForm>
        </Row>
        <ButtonForm
          disabled={disabled}
          onPress={() => {
            setDisabled(true);
            navigation.navigate('GetWeight', {
              unit,
              valueReference: referenceValue,
              weights,
              farmac: navigation.state.params.data.farmac,
            });
          }}
        >
          <Text style={{ color: 'white' }}>Gerar Relatório</Text>
        </ButtonForm>
      </Content>
    </Container>
  );
};

export default Weighing;
