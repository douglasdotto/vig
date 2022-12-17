import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 15px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  padding: 50px 20px;
`;

export const ImageContent = styled.Image`
  margin-top: 38px;
  height: ${Dimensions.get("window").width * 0.3}px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  font-family: ${fonts.heading};
  line-height: 34px;
  text-align: center;
  color: ${colors.shape};
  margin-top: 38px;
  text-shadow: 1px 1px 1px #e37100;
`;