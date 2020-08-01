import styled from 'styled-components';

export const Container = styled.View`
  background: rgb(41, 178, 178);
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.View`
  background: rgb(221, 225, 224);
  width: 90%;
  padding-top: 15px;
  margin-bottom: 24px;
  padding-bottom: 40px;
  padding-left: 40px;
  padding-right: 40px;
  border-width: 4px;
  border: solid;
  border-color: rgb(143, 203, 202);
`;
export const Title = styled.Text`
  color: rgb(41, 178, 178);
  font-size: 24px;
  width: 100%;
  text-align: center;
  margin-bottom: 24px;
`;
export const Close = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
export const InputText = styled.TextInput`
  background: white;
  color: black;
  width: 100%;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;
export const ButtonNext = styled.TouchableOpacity`
  background: rgb(41, 178, 178);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  align-self: center;
  margin-top: 24px;
`;
