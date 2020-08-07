import React, { useCallback, useRef, useState } from 'react';
import { Text, Picker } from 'react-native';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import {
  Container,
  Title,
  Row,
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
  const [unit, setUnit] = useState('g');

  const handleSubmit = useCallback(
    (data) => {
      if (farmac) {
        let newData;
        if (data) {
          newData = { ...data };
          newData.farmac = farmac;
          newData.unit = unit;
          navigation.navigate('Weighing', { data: newData });
        }
      } else {
        alert('Complete os dados');
      }
    },
    [farmac, unit]
  );

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Title>Ordem de Serviço</Title>
          <Column>
            <TextForm>Ordem de Serviço</TextForm>
            <Input
              name="service_order"
              placeholder="Ordem de Serviço"
              keyboardType="numeric"
            />
          </Column>
          <Column>
            <TextForm>Operador</TextForm>
            <Input placeholder="Operador" name="operator" />
          </Column>
          <Column>
            <TextForm>Cápsula</TextForm>
            <Input placeholder="Cápsula" name="capsule" />
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
