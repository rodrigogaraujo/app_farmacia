import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import {
  Container,
  Content,
  Title,
  TableContent,
  DescriptionContent,
  RowFlex,
  TextBold,
  TextValue,
  ButtonForm,
} from './styles';
import Header from '../../components/Header';

const Report = ({ navigation }) => {
  const [line, setLine] = useState([]);

  useEffect(() => {
    let lineData;
    if (navigation.state.params.values.weights) {
      lineData = [];
      const reference = parseInt(navigation.state.params.values.valueReference);
      const valueSup = reference / 10;
      const valueInf = reference - reference / 10;
      let position = 0;
      navigation.state.params.values.weights.map((weight) => {
        position += 1;
        const newLine = [
          position,
          weight,
          weight >= valueInf && weight <= valueSup ? 'Aprovado' : 'Reprovado',
        ];
        lineData.push(newLine);
      });
    }
    setLine(lineData);
  }, [navigation.state.params.values.weights]);

  const dataTable = {
    tableHead: ['Cápsulas', 'Peso', 'DPR'],
    tableData: line,
  };

  return (
    <Container>
      <Header />
      <Content>
        <Title>Ordem de Serviço</Title>
        <TableContent>
          <TextValue>Ordem de Serviço n: 001</TextValue>
          <TextValue>Manipulador: Farmacêutico</TextValue>
          <TextValue style={{ marginBottom: 24 }}>21.02.2020; 13h09</TextValue>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={dataTable.tableHead} />
            <Rows data={dataTable.tableData} />
          </Table>
        </TableContent>
        <DescriptionContent>
          <RowFlex>
            <TextBold>Referência: </TextBold>
            <TextValue>0,057g</TextValue>
          </RowFlex>

          <RowFlex>
            <TextBold>Média: </TextBold>
            <TextValue>0,061g</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Média DPR: </TextBold>
            <TextValue>4,59%</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>10 cápsulas: </TextBold>
            <TextValue></TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Valor Máximo: </TextBold>
            <TextValue>0,062g [03]</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Valor Mínimo: </TextBold>
            <TextValue>0,051g; [09]</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>C.V: </TextBold>
            <TextValue>+1,2%</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Qtmin: </TextBold>
            <TextValue>+91,2%</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Qtmax: </TextBold>
            <TextValue>+103%</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Total de cápsulas: </TextBold>
            <TextValue>+100</TextValue>
          </RowFlex>
          <RowFlex style={{ marginTop: 24 }}>
            <TextBold>TOTAL: </TextBold>
            <TextValue>0.890g</TextValue>
          </RowFlex>
        </DescriptionContent>
        <TextBold style={{ marginTop: 24, marginLeft: 20 }}>
          CONFORME: SIM
        </TextBold>

        <ButtonForm style={{ marginTop: 24 }}>
          <Text style={{ color: 'white' }}>Imprimir Relatório</Text>
        </ButtonForm>
        <ButtonForm>
          <Text style={{ color: 'white' }}>Enviar</Text>
        </ButtonForm>
        <ButtonForm>
          <Text style={{ color: 'white' }}>Arquivar</Text>
        </ButtonForm>
      </Content>
    </Container>
  );
};

export default Report;
