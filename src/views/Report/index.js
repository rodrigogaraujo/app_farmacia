import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import moment from 'moment';

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
  const [referenceData, setReferenceData] = useState(
    navigation.state.params.values.valueReference
  );
  const [farmac, setFamrac] = useState(navigation.state.params.values.farmac);
  const [unit, setUnit] = useState(navigation.state.params.values.unit);
  const [valueTotal, setValueTotal] = useState(
    navigation.state.params.valueTotal
  );
  const [bigger, setBigger] = useState('');
  const [small, setSmall] = useState('');
  const [media, setMedia] = useState(() => {
    return valueTotal / navigation.state.params.values.weights.length;
  });
  const [mediaDpr, setMediaDpr] = useState(0);
  const [mediaDrg, setMediaDrg] = useState(0);

  useEffect(() => {
    let lineData;
    let mediaDprData;
    let mediaDrgData;
    let reference = parseInt(referenceData);
    if (navigation.state.params.values.weights) {
      lineData = [];
      let valueSup = 0;
      let valueInf = 0;
      if (reference < 300) {
        valueSup = reference / 10;
        valueInf = reference - reference / 10;
      } else {
        valueSup = reference / 7.5;
        valueInf = reference - reference / 7.5;
      }
      let position = 0;
      mediaDprData = 0;
      mediaDrgData = [];
      navigation.state.params.values.weights.map((weight) => {
        const calcNew = 1 - weight / reference;
        const calcNewPgr = (weight - reference) * 2;
        mediaDrgData.push(calcNewPgr);
        mediaDprData += calcNew;
        position += 1;
        const newLine = [position, weight, calcNew];
        lineData.push(newLine);
      });

      let value;
      value = 0;
      mediaDprData.map((med) => (value += med));

      setMediaDrg(mediaDrgData);
      setMediaDpr(Math.sqrt(value));
      const min = Math.min(...navigation.state.params.values.weights);
      const max = Math.max(...navigation.state.params.values.weights);
      setBigger(`${max}`);
      setSmall(`${min}`);
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
          <TextValue style={{ marginBottom: 24 }}>
            {moment(new Date()).format('DD/MM/YYYY')};{' '}
            {moment(new Date()).format('hh:mm')}
          </TextValue>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={dataTable.tableHead} />
            <Rows data={dataTable.tableData} />
          </Table>
        </TableContent>
        <DescriptionContent>
          <RowFlex>
            <TextBold>Referência: </TextBold>
            <TextValue>
              {referenceData}
              {unit}
            </TextValue>
          </RowFlex>

          <RowFlex>
            <TextBold>Média: </TextBold>
            <TextValue>
              {media}
              {unit}
            </TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Média DPR: </TextBold>
            <TextValue>
              {mediaDpr / navigation.state.params.values.weights.length}%
            </TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>{farmac === 'americ' ? 10 : 20} cápsulas: </TextBold>
            <TextValue></TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Valor Máximo: </TextBold>
            <TextValue>
              {bigger}
              {unit}
            </TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Valor Mínimo: </TextBold>
            <TextValue>
              {small}
              {unit}
            </TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>P.G.R: </TextBold>
            <TextValue>{mediaDrg}%</TextValue>
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
            <TextValue>
              {valueTotal}
              {unit}
            </TextValue>
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
