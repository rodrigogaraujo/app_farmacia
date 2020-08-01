import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  width: 100%;
  background: rgb(41, 178, 178);
  height: 80px;
  padding: 20px;
  align-items: center;
  flex-direction: row;
`;

export const HeaderProfile = styled.View`
  margin-left: 10px;
`;

export const Content = styled.ScrollView``;

export const ButtonOption = styled.TouchableOpacity`
  width: 90%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  align-self: center;
`;

export const TextButton = styled.Text`
  color: rgb(41, 178, 178);
  font-size: 25px;
  padding-bottom: 15px;
  border-bottom-color: rgb(41, 178, 178);
  border-bottom-width: 2px;
`;
