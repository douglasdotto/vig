import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 15px;
`;

export const Container2 = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderContent = styled.View`
  padding: 0 30px;
`;

export const ImageContent = styled.Image`
  margin: auto;
  width: 75%;
`;

export const ImageContent2 = styled.Image`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${fonts.heading};
  line-height: 34px;
  text-align: center;
  color: ${colors.shape};
  margin-top: 16px;
  margin-bottom: 16px;
  text-shadow: 0.15px 0.5px 0.5px #e37100;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  text-align: center;
  color: ${colors.shape};
  text-shadow: 0.15px 0.5px 0.5px #e37100;
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