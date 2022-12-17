import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Button";
import { Load } from "../../components/Load";
import { Header } from "../../components/Header";

import { navigationRoute } from "../../utils/navigation";
import { dengueData, DENGUE_DATA } from "../../libs/storage";

import background from "../../assets/d7/céu.png";
import m1 from "../../assets/d3/m1.png";
import m2 from "../../assets/d3/m2.png";
import m3 from "../../assets/d3/m3.png";
import m4 from "../../assets/d3/m4.png";

import { Container, HeaderContent, ImageContent, Title } from "./styles";

function D2() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);

  async function concluirNivel() {
    setNivelConcluido(true);
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
        </>}
        {!nivelConcluido && <>
          <Title>Onde o mosquito pôe os ovos?</Title>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => concluirNivel()}>
              <ImageContent source={m1} style={{ height: 150 }} resizeMode="contain" />
            </View>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => concluirNivel()}>
              <ImageContent source={m2} style={{ height: 150 }} resizeMode="contain" />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => concluirNivel()}>
              <ImageContent source={m3} style={{ height: 150 }} resizeMode="contain" />
            </View>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => concluirNivel()}>
              <ImageContent source={m4} style={{ height: 150 }} resizeMode="contain" />
            </View>
          </View>
        </>}
      </Container>
    </ImageBackground>
  );
}

export { D2 };
