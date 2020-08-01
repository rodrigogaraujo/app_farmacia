import React, { useCallback, useRef, useState } from 'react';
import { Text, Picker } from 'react-native';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
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
} from './styles';

import Header from '../../components/Header';

const ServiceOrder = ({ navigation }) => {
  const formRef = useRef(null);
  const [farmac, setFarmac] = useState('americ');

  const handleSubmit = useCallback(
    (data) => {
      if (farmac) {
        let newData;
        if (data) {
          newData = { ...data };
          newData.farmac = farmac;
          navigation.navigate('Weighing', { data: newData });
        }
      } else {
        alert('Complete os dados');
      }
    },
    [farmac]
  );

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Title>Ordem de Serviço</Title>
          <Column>
            <TextForm>Ordem de Serviço</TextForm>
            <InputForm placeholder="Ordem de Serviço" keyboardType="numeric" />
          </Column>
          <Column>
            <TextForm>Operador</TextForm>
            <InputForm placeholder="Operador" />
          </Column>
          <Column>
            <TextForm>Capsula</TextForm>
            <InputForm placeholder="Capsula" />
          </Column>
          <Column>
            <TextForm>Valor de Referência</TextForm>
            <Input
              name="reference_value"
              placeholder="Valor de Referência"
              keyboardType="numeric"
            />
          </Column>
          <Column>
            <TextForm>Farmacopeia</TextForm>
            <InputFormSelect>
              <Picker
                selectedValue={farmac}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setFarmac(itemValue)}
              >
                <Picker.Item label="Americana" value="americ" />
                <Picker.Item label="Brasileira" value="brasilian" />
              </Picker>
            </InputFormSelect>
          </Column>
          <Row>
            <ButtonForm>
              <Text style={{ color: 'white' }}>Salvar</Text>
            </ButtonForm>
            <ButtonForm
              style={{ marginLeft: 20 }}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <Text style={{ color: 'white' }}>Iniciar</Text>
            </ButtonForm>
          </Row>
        </Form>
      </Content>
    </Container>
  );
};

export default ServiceOrder;
