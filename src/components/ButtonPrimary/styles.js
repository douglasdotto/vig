import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.TouchableOpacity`
  background-color: ${colors.yellow};
  height: 56px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding-left: 10px;
  padding-right: 10px;
  width: 85%;
`;

export const TextButton = styled.Text`
  font-size: 22px;
  font-family: ${fonts.heading};
  color: ${colors.white};
  text-shadow: 1px 1px 1px #000
`;
