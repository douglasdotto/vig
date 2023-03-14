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
export const Content = styled.View`
  display: flex;
  align-items: center;
  padding: 20px 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${fonts.heading};
  line-height: 36px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
  text-shadow: 1px 1px 1px #000;
  background: rgba(242,242,242,0.9);
  margin: 0 auto;
  padding: 8px 14px;
  border-radius: 8px;
  border: 2px solid #000;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  text-align: center;
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #000;
`;

export const PView1 = styled.View`
  position: absolute;
  top: 00px;
  left: ${Dimensions.get("window").width * 0.31}px;
  width: 200px;
  height: 90px;
  z-index: 999;
`;

export const PView2 = styled.View`
  position: absolute;
  top: 130px;
  left: ${Dimensions.get("window").width * 0.05}px;
  width: 200px;
  height: 120px;
  z-index: 999;
`;

export const PView3 = styled.View`
  position: absolute;
  top: 300px;
  left: ${Dimensions.get("window").width * 0.18}px;
  width: 300px;
  height: 90px;
  z-index: 999;
`;

export const PView4 = styled.View`
  position: absolute;
  top: 450px;
  left: ${Dimensions.get("window").width * 0.18}px;
  width: 300px;
  height: 90px;
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

export const LineConnection = styled.View`
  height: 2px;
  z-index: 999;
  position: absolute;
  background-color: #fff;
  border: 0.5px solid #000;
`;

export const SubTitle2 = styled.Text`
    font-size: 18px;
    font-family: ${fonts.heading};
    text-align: center;
    font-weight: 600;
    color: ${colors.shape};
    text-shadow: 1px 1px 1px #000;  
    margin-top: 8px;  
`;