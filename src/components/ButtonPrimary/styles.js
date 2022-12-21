import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.TouchableOpacity`
  background-color: ${colors.yellow};
  height: 56px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

export const TextButton = styled.Text`
  font-size: 24px;
  font-family: ${fonts.heading};
  color: ${colors.heading};
`;
