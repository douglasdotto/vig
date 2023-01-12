import React, { useRef, useEffect } from "react";

import loadAnimation from "../../assets/load.json";
import medalAnimation from "../../assets/medal.json";

import { Container, LottieViewAnimation, LottieViewAnimation2 } from "./styles";

function Load() {
  const lottieRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 1);
  }, []);

  return (
    <Container>
      <LottieViewAnimation
        ref={lottieRef}
        source={loadAnimation}
        autoPlay
        loop
      />
    </Container>
  );
}

function Medal() {
  const lottieRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 1);
  }, []);

  return (
    <Container>
      <LottieViewAnimation2
        ref={lottieRef}
        source={medalAnimation}
        autoPlay
        loop
      />
    </Container>
  );
}

export { Load, Medal };
