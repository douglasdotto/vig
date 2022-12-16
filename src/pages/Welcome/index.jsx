import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { navigationRoute } from "../../utils/navigation";

import { Container, Content, Title, ImageContent, SubTitle, Button, } from "./styles";

import wateringImg from "../../assets/siddisc.png";
import { getData } from "../../libs/storage";

function Welcome() {
  const navigation = navigationRoute();
  const [userOk, setUserOk] = useState(false);

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await getData();
      if (user != null)
        setUserOk(true);
    }

    loadStorageUserName();
  }, [])

  function handleStart() {
    if (userOk)
      navigation.replace("TestSelect");
    else
      navigation.replace("UserIdentification");
  }

  return (
    <Container>
      <Content>
        <Title>
          Sistema Inteligente{"\n"}para detecção de{"\n"}Demência
        </Title>

        <ImageContent source={wateringImg} resizeMode="contain" />

        <SubTitle>
          A demência pode ocorrer em qualquer idade, mas afeta principalmente os idosos. Cuidamos para que você tenha o melhor acompanhamento.
        </SubTitle>

        <Button onPress={handleStart}>
          <Feather name="chevron-right" color="#FFF" size={32} />
        </Button>
      </Content>
    </Container>
  );
}

export { Welcome };
