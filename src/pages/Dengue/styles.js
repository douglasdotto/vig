import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { StyleSheetProperties } from "react-native";
import { colors, fonts } from "../../theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 15px;
`;

export const HeaderContent = styled.View`
  padding: 0 30px;
`;

export const ImageContent = styled.Image`
  margin: auto;
  width: 75%;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  font-family: ${fonts.heading};
  line-height: 34px;
  text-align: center;
  color: ${colors.shape};
  margin-top: 38px;
  margin-bottom: 16px;
  text-shadow: 1px 1px 1px #e37100;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  text-align: center;
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #e37100;
`;

export const PView1 = styled.View`
  position: absolute;
  top: 20px;
  left: ${Dimensions.get("window").width * 0.41}px;
  width: 80px;
  height: 50px;
  z-index: 999;
`;

export const PView2 = styled.View`
  position: absolute;
  top: 50px;
  left: ${Dimensions.get("window").width * 0.68}px;
  width: 80px;
  height: 50px;
  z-index: 999;
`;

export const PView3 = styled.View`
  position: absolute;
  top: 120px;
  left: ${Dimensions.get("window").width * 0.68}px;
  width: 80px;
  height: 50px;
  z-index: 999;
`;

export const PView4 = styled.View`
  position: absolute;
  top: 170px;
  left: ${Dimensions.get("window").width * 0.41}px;
  width: 80px;
  height: 50px;
  z-index: 999;
`;

export const PView5 = styled.View`
  position: absolute;
  left: ${Dimensions.get("window").width * 0.13}px;
  top: 120px;
  width: 80px;
  height: 50px;
  z-index: 999;
`;

export const PView6 = styled.View`
  position: absolute;
  top: 50px;
  left: ${Dimensions.get("window").width * 0.13}px;
  width: 80px;
  height: 50px;
  z-index: 999;
`;