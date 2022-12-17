import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Button";
import { Load } from "../../components/Load";
import { Header } from "../../components/Header";

import { navigationRoute } from "../../utils/navigation";
import { dengueData, DENGUE_DATA } from "../../libs/storage";

import background from "../../assets/d7/céu.png";
import m1 from "../../assets/d2/m1.png";
import m2 from "../../assets/d2/m2.png";
import m3 from "../../assets/d2/m3.png";

import { Container, HeaderContent, ImageContent, Title } from "./styles";

function D1() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);

  async function concluirNivel() {
    setNivelConcluido(true);
  }

  async function back() {
    navigation.replace("Dengue");
  }

  async function next() {
    navigation.replace("DengueF2");
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou!</Title>
          <Load />
          <View>
            <Button title="Voltar" onPress={back} />
            <Button title="Próximo Nível" onPress={next} />
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Clique no Vetor da Dengue</Title>

          <View style={{ height: 200 }} onTouchStart={() => concluirNivel()}>
            <ImageContent source={m1} style={{ height: 150 }} resizeMode="contain" />
          </View>
          <View style={{ height: 200 }}>
            <ImageContent source={m2} style={{ height: 150 }} resizeMode="contain" />
          </View>
          <View style={{ height: 200 }}>
            <ImageContent source={m3} style={{ height: 125 }} resizeMode="contain" />
          </View>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { D1 };
