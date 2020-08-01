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
  margin-bottom: 20px;
  align-self: center;
`;

export const Content = styled.ScrollView``;

export const TableContent = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 40px;
  border-bottom-color: rgb(41, 178, 178);
  border-bottom-width: 2px;
`;

export const RowFlex = styled.View`
  flex-direction: row;
`;

export const DescriptionContent = styled.View`
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 40px;
  border-bottom-color: rgb(41, 178, 178);
  border-bottom-width: 2px;
`;

export const TextValue = styled.Text`
  font-size: 22px;
  margin-left: 8px;
`;

export const TextBold = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

export const ButtonForm = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  margin-top: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 5px;
  margin-bottom: 24px;
  background: rgb(41, 178, 178);
`;
