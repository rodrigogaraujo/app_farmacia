import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  color: rgb(41, 178, 178);
  font-size: 25px;
  padding-bottom: 15px;
  border-bottom-color: rgb(41, 178, 178);
  border-bottom-width: 2px;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  align-self: center;
`;

export const Content = styled.ScrollView``;

export const Column = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextForm = styled.Text`
  color: rgb(41, 178, 178);
  flex-basis: 100%;
  font-size: 20px;
  margin-left: 20px;
`;
export const InputFormSelect = styled.View`
  flex-basis: 100%;
  margin-left: 20px;
  margin-right: 20px;
`;

export const InputForm = styled.TextInput`
  background: white;
  color: black;
  flex-basis: 100%;
  margin-left: 20px;
  margin-right: 20px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;

export const ButtonForm = styled.TouchableOpacity`
  max-width: 150px;
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  margin-top: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 5px;
  margin-bottom: 24px;
  background: rgb(41, 178, 178);
`;
