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
  padding: 20px 20px;
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

export const ImageContent = styled.Image`
  margin-top: 28px;
  height: ${Dimensions.get("window").width * 0.3}px;
`;

export const VIG = styled.Text`
  font-size: 36px;
  font-family: ${fonts.heading};
  line-height: 34px;
  text-align: center;
  color: ${colors.shape};
  margin-top: 18px;
  margin-bottom: 15px;
  text-shadow: 1px 1px 1px #000;
`;

export const View2 = styled.View`
  font-size: 36px;
  font-family: ${fonts.heading};
  line-height: 34px;
  text-align: center;
  color: ${colors.shape};
`;

export const Title2 = styled.Text`
  font-size: 24px;
  font-family: ${fonts.heading};
  line-height: 34px;
  text-align: center;
  color: ${colors.shape};
  margin-top: 28px;
  margin-bottom: 0px;
  text-shadow: 1px 1px 1px #000;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${fonts.heading};
  line-height: 34px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
  text-shadow: 1px 1px 1px #000;
  padding: 12px 12px;
  border-radius: 8px;
  border: 2px solid #000;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  text-align: center;
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #000;
`;

export const Subtitle3 = styled.Text`
    font-size: 18px;
    font-family: ${fonts.heading};
    text-align: center;
    font-weight: 600;
    color: ${colors.shape};
    text-shadow: 1px 1px 1px #000;
    padding-top: 10px;
`;