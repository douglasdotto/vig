import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors, fonts } from "../../theme";
import LottieView from "lottie-react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const ImageContent = styled.Image`
  height: ${Dimensions.get("window").width * 0.1};
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const Form = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 54px;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Emoji = styled.Text`
  font-size: 44px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${fonts.heading};
  line-height: 32px;
  text-align: center;
  color: ${colors.heading};
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-size: 18px;
  text-align: center;
  color: ${colors.heading};
  padding: 10px;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.inputIsFocused ? colors.green : colors.gray};
`;

export const Footer = styled.View`
  width: 100%;
  margin-top: 40px;
  padding: 0 20px;
`;

export const LottieViewAnimation = styled(LottieView)`
  background: transparent;
  width: 200px;
  height: 200px;
`;
