import React from "react";

import loadAnimation from "../../assets/load.json";
import medalAnimation from "../../assets/medal.json";

import { Container, LottieViewAnimation } from "./styles";

function Load() {
  return (
    <Container>
      <LottieViewAnimation source={loadAnimation} autoPlay loop />
    </Container>
  );
}

function Medal() {
  return (
    <Container>
      <LottieViewAnimation source={medalAnimation} autoPlay loop />
    </Container>
  );
}

export { Load, Medal };
