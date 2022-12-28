import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.TouchableOpacity`
  background-color: ${colors.yellow};
  height: 56px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 75%;
`;

export const TextButton = styled.Text`
  font-size: 24px;
  font-family: ${fonts.heading};
  color: ${colors.white};
  text-shadow: 0.15px 0.5px 0.5px #e37100;
`;
