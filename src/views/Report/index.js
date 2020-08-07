import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import { Table, Row, Rows, Share } from 'react-native-table-component';
import moment from 'moment';
import * as Print from 'expo-print';

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
  const [arrWeights, setArrWeights] = useState(
    navigation.state.params.values.weights
  );
  const [mediaDpr, setMediaDpr] = useState(0);
  const [mediaDrg, setMediaDrg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [qtMin, setQtMin] = useState(0);
  const [qtMax, setQtMax] = useState(0);
  const [conform, setConform] = useState(true);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Compartilhar ordem de serviço n.: ${navigation.state.params.values.data.service_order}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const createPDF = async () => {
    try {
      let position = 0;
      let arrTable = [];
      var html = '';
      navigation.state.params.values.weights.map((weight) => {
        const wei = weight;
        const calcNew = 1 - wei / referenceData;
        position += 1;
        arrTable.push({
          position,
          wei,
          dpr: `${Number(calcNew).toFixed(3) * 100}%`,
        });
      });
      html += `<h1>ORDEM DE SERVIÇO</h1><br/>
        <h2>Ordem de Serviço n.: ${
          navigation.state.params.values.data.service_order
        }</h2>
        <br/><h2>Manipulador: ${
          navigation.state.params.values.data.operator
        }</h2><br/>
        ${moment(new Date()).format('DD/MM/YYYY')};
        ${moment(new Date()).format('hh:mm')}<br/>`;
      arrTable.map((arr) => {
        console.log(arr);
        html += `<p>
            <span>Cápsula: ${arr.position} - </span>
            <span>Peso: ${arr.wei ? Math.abs(arr.wei) : '0'} - </span>
            <span>DPR: ${arr.dpr}</span>
          </p>`;
      });
      html += `<br />
        <p>Referencia: ${referenceData}</p><br />
        <p>Média: ${Number(media).toFixed(3)}g</p><br />
        <p>Média DPR: ${Number(
          mediaDpr / navigation.state.params.values.weights.length
        ).toFixed(3)}</p><br />
        <p>Valor máximo: ${Number(bigger).toFixed(3)}</p><br />
        <p>Valor mínimo: ${Number(small).toFixed(3)}</p><br />
        <p>C.V.: ${Number((mediaDrg * 100) / media).toFixed(3)}%</p>
        <p>Qtmin: ${qtMin}%</p>
        <p>Qtmin: ${qtMax}%</p>
        <p>Valor total: ${valueTotal}g</p>
        <p>Conforme: ${
          conform && Number((mediaDrg * 100) / media).toFixed(3) < 4
            ? 'SIM'
            : 'NÃO'
        }</p>`;
      // console.log(file.filePath);
      const pdf = await Print.printToFileAsync({ html });

      return Print.printAsync({ uri: pdf.uri }).catch((error) =>
        alert(error.message)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    let lineData;
    let mediaDprData;
    let mediaDrgData;
    let reference = referenceData;
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
        const wei = weight;
        const calcNew = 1 - wei / reference;
        const calcNewPgr = (wei - reference) * (wei - reference);
        setConform(
          (wei < 300 && calcNew > 10 ? false : true) &&
            (wei > 300 && calcNew > 7.5 ? false : true)
        );
        mediaDrgData.push(calcNewPgr);
        mediaDprData += calcNew;
        position += 1;
        const newLine = [
          position,
          Number(wei).toFixed(3),
          `${Math.abs(Number(calcNew * 100)).toFixed(3)}%`,
        ];
        lineData.push(newLine);
      });

      let value;
      value = 0;
      mediaDrgData.map((med) => (value += med));
      value = value / navigation.state.params.values.weights.length;
      setMediaDrg(Math.sqrt(value));
      setMediaDpr(mediaDprData);
      const min = Math.min(...navigation.state.params.values.weights);
      const max = Math.max(...navigation.state.params.values.weights);
      setBigger(`${max}`);
      setSmall(`${min}`);
    }
    setLine(lineData);
    setQtMax(
      Number((Math.max(...arrWeights) * 100) / referenceData).toFixed(3)
    );
    setQtMin(
      Number((Math.min(...arrWeights) * 100) / referenceData).toFixed(3)
    );
    setLoading(false);
  }, [navigation.state.params.values.weights]);

  const dataTable = {
    tableHead: ['Cápsulas', 'Peso', 'DPR'],
    tableData: line,
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <Container>
      <Header />
      <Content>
        <Title>Ordem de Serviço</Title>
        <TableContent>
          <TextValue>
            Ordem de Serviço n:{' '}
            {navigation.state.params.values.data.service_order}
          </TextValue>
          <TextValue>
            Manipulador: {navigation.state.params.values.data.operator}
          </TextValue>
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
            <TextValue>{referenceData}g</TextValue>
          </RowFlex>

          <RowFlex>
            <TextBold>Média: </TextBold>
            <TextValue>{Number(media).toFixed(3)}g</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Média DPR: </TextBold>
            <TextValue>
              {Math.abs(
                Number(
                  (mediaDpr / navigation.state.params.values.weights.length) *
                    100
                ).toFixed(3)
              )}
              %
            </TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>{farmac === 'americ' ? 10 : 20} cápsulas: </TextBold>
            <TextValue></TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Valor Máximo: </TextBold>
            <TextValue>{Number(bigger).toFixed(3)}g</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Valor Mínimo: </TextBold>
            <TextValue>{Number(small).toFixed(3)}g</TextValue>
          </RowFlex>
          {/* <RowFlex>
            <TextBold>D.G.R: </TextBold>
            <TextValue>{Number(mediaDrg).toFixed(3)}%</TextValue>
          </RowFlex> */}
          <RowFlex>
            <TextBold>C.V: </TextBold>
            <TextValue>
              {Math.abs(Number((mediaDrg * 100) / media).toFixed(3))}%
            </TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Qtmin: </TextBold>
            <TextValue>{Math.abs(qtMin)}%</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Qtmax: </TextBold>
            <TextValue>{Math.abs(qtMax)}%</TextValue>
          </RowFlex>
          <RowFlex>
            <TextBold>Total de cápsulas: </TextBold>
            <TextValue>{navigation.state.params.values.data.capsule}</TextValue>
          </RowFlex>
          <RowFlex style={{ marginTop: 24 }}>
            <TextBold>TOTAL: </TextBold>
            <TextValue>{valueTotal}g</TextValue>
          </RowFlex>
        </DescriptionContent>
        <TextBold style={{ marginTop: 24, marginLeft: 20 }}>
          CONFORME:{' '}
          {conform && Number((mediaDrg * 100) / media).toFixed(3) < 4
            ? 'SIM'
            : 'NÃO'}
        </TextBold>

        <ButtonForm style={{ marginTop: 24 }} onPress={() => createPDF()}>
          <Text style={{ color: 'white' }}>Imprimir Relatório</Text>
        </ButtonForm>
        <ButtonForm onPress={onShare}>
          <Text style={{ color: 'white' }}>Enviar</Text>
        </ButtonForm>
      </Content>
    </Container>
  );
};

export default Report;
