import styled from 'styled-components';

export const ContainerSignIn = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgb(225, 230, 228);
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
`;

export const TextForm = styled.Text`
  color: rgb(41, 178, 178);
  flex-basis: 25%;
  text-align: right;
  font-size: 20px;
`;

export const InputForm = styled.TextInput`
  background: white;
  color: black;
  flex-basis: 70%;
  margin-left: 20px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;

export const ButtonForm = styled.TouchableOpacity`
  max-width: 150px;
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

export const ForgotOrCreateAccount = styled.Text`
  flex-direction: row;
  width: 100%;
  color: grey;
  margin-top: 10px;
`;
