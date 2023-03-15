import styled from "styled-components/native";
import { colors, fonts } from "../../theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const ContainerTop = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 33px;
`;

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px 20px 0;
`;

export const Greeting = styled.Text`
  font-size: 32px;
  font-family: ${fonts.text};
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #000;
`;

export const Back = styled.Text`
  font-size: 18px;
  font-family: ${fonts.text};
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #000;
`;

export const Logout = styled.Text`
  margin-left: auto;
  font-size: 18px;
  width: 40%;
  text-align: right;
  font-family: ${fonts.text};
  color: ${colors.shape};
  text-shadow: 1px 1px 1px #000;
`;

export const UserName = styled.Text`
  font-size: 32px;
  font-family: ${fonts.heading};
  color: ${colors.heading};
  line-height: 40px;
`;

export const ImageProfile = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;
