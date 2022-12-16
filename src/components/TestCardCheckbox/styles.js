import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  background-color: ${colors.shape};
  border-radius: 15px;
  padding: 10px;
  align-items: center;
  margin: 5px 0px 5px 0px;
`;

export const LabelCard = styled.Text`
  color: ${colors.body_dark};
  font-family: ${fonts.text};
  margin: 16px 40px 16px 10px;
`;

export const Title = styled.Text`
  font-size: 12px;
  font-family: ${fonts.text};
  color: ${colors.body_light};
  line-height: 20px;
  margin-top: 5px;
`;