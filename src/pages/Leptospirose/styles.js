import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors, fonts } from "../../theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 5px;
`;

export const Container2 = styled.SafeAreaView`
  flex: 1;
  padding: 0 5px;
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
  line-height: 34px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
  text-shadow: 1px 1px 1px #000;
  margin: 0 auto;
  padding: 8px 14px;
  border-radius: 8px;
`;

export const Title2 = styled.Text`
  font-size: 28px;
  font-family: ${fonts.heading};
  line-height: 36px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
  text-shadow: 1px 1px 1px #000;
  margin: 0 auto;
  padding: 8px;
  width: 350px;
  border-radius: 8px;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  text-align: center;
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #000;
`;

export const SubTitleShadow = styled.Text`
  font-size: 25px;
  font-family: ${fonts.heading};
  text-align: center;
  color: ${colors.black};
  text-shadow: 1px 1px 1px #000;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 10px;
  border-radius: 15px;
  background-color: #FFF ;
`;

export const PView1 = styled.View`
  position: absolute;
  top: 80px;
  left: ${Dimensions.get("window").width * 0.07}px;
  width: 80px;
  height: 260px;
  z-index: 999;
`;

export const PView2 = styled.View`
  position: absolute;
  top: 350px;
  left: ${Dimensions.get("window").width * 0.08}px;
  width: 200px;
  height: 50px;
  z-index: 998;
`;

export const PView3 = styled.View`
  position: absolute;
  top: 120px;
  left: ${Dimensions.get("window").width * 0.42}px;
  width: 100px;
  height: 200px;
  z-index: 999;
`;

export const PView4 = styled.View`
  position: absolute;
  top: 170px;
  left: ${Dimensions.get("window").width * 0.71}px;
  width: 80px;
  height: 320px;
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
    margin-top: 8px;
    text-shadow: 1px 1px 1px #000;
`;