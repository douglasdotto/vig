import styled from "styled-components/native";
import LottieView from "lottie-react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LottieViewAnimation = styled(LottieView)`
  background: transparent;
  width: 100%;
  height: 100%;
`;

export const LottieViewAnimation2 = styled(LottieView)`
  background: transparent;
  width: 75%;
  margin: auto;
`;