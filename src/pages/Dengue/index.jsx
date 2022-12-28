import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import jogador from "../../assets/d1/Jogador.png";
import pneu from "../../assets/d1/pneu.png";
import pneu1 from "../../assets/d1/pneu1.png";
import pneu2 from "../../assets/d1/pneu2.png";
import pneu3 from "../../assets/d1/pneu3.png";
import pneu4 from "../../assets/d1/pneu4.png";
import pneu5 from "../../assets/d1/pneu5.png";
import pneu6 from "../../assets/d1/pneu6.png";
import background from "../../assets/d7/teste.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, PView5, PView6, SubTitle, Title } from "./styles";

function Dengue() {
  const navigation = navigationRoute();

  const [nivel, setNivel] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      var d = await dengueData();
      if (d == null) {
        var newDataDengue = {
          nivel: 0,
          erros: 0,
          nivel1: 0,
          nivel2: 0,
          nivel3: 0,
          nivel4: 0,
          nivel5: 0,
          nivel6: 0,
        }
        await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(newDataDengue));
        setNivel(0);
      } else {
        setNivel(d.nivel);
        setErros(d.erros);
      }
      setLoading(false);
    }

    call();
  }, [])

  async function nivel1() {
    navigation.replace("DengueF1");
  }

  async function nivel2() {
    navigation.replace("DengueF2");
  }

  async function nivel3() {
    navigation.replace("DengueF3");
  }

  async function nivel4() {
    navigation.replace("DengueF4");
  }

  async function nivel5() {
    navigation.replace("DengueF5");
  }

  async function nivel6() {
    navigation.replace("DengueF6");
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        {erros < 7 ? <>
          {nivel == 7 ? <View style={{ height: 200 }}>
            <Load />
            <Title>Parabéns você completou o desafio da dengue!</Title>
          </View> : nivel == 0 ? <><Title>Desafio da dengue!</Title></> : <View style={{ height: 100 }}><Title>Você está no nível {nivel}</Title></View>}
          <View style={{ position: "relative", height: 300, marginTop: 20 }}>
            <PView1 onTouchStart={() => nivel >= 0 ? nivel1() : null}>{nivel == 1 && <ImageContent source={jogador} style={{ bottom: 35, right: 15 }} resizeMode="contain" />}</PView1>
            <PView2 onTouchStart={() => nivel >= 1 ? nivel2() : null}>{nivel == 2 && <ImageContent source={jogador} style={{ bottom: 30, right: -5 }} resizeMode="contain" />}</PView2>
            <PView3 onTouchStart={() => nivel >= 2 ? nivel3() : null}>{nivel == 3 && <ImageContent source={jogador} style={{ top: 35, right: -15 }} resizeMode="contain" />}</PView3>
            <PView4 onTouchStart={() => nivel >= 3 ? nivel4() : null}>{nivel == 4 && <ImageContent source={jogador} style={{ top: 45, right: 15 }} resizeMode="contain" />}</PView4>
            <PView5 onTouchStart={() => nivel >= 4 ? nivel5() : null}>{nivel == 5 && <ImageContent source={jogador} style={{ top: 35, right: 55 }} resizeMode="contain" />}</PView5>
            <PView6 onTouchStart={() => nivel >= 5 ? nivel6() : null}>{nivel == 6 && <ImageContent source={jogador} style={{ bottom: 30, right: 45 }} resizeMode="contain" />}</PView6>
            <ImageContent source={erros == 1 ? pneu1 : erros == 2 ? pneu2 : erros == 3 ? pneu3 : erros == 4 ? pneu4 : erros == 5 ? pneu5 : erros == 6 ? pneu6 : pneu} resizeMode="contain" />
          </View>
          <View style={{ marginTop: 15, marginBottom: 15, margin: "auto" }}>
            <SubTitle>Erros: {erros}</SubTitle>
          </View>
          <View style={{ marginTop: 15, marginBottom: 15, margin: "auto" }}>
            <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar nível {nivel + 1}</>} onPress={() => { nivel == 0 ? nivel1() : nivel == 1 ? nivel2() : nivel == 2 ? nivel3() : nivel == 3 ? nivel4() : nivel == 4 ? nivel5() : nivel6(); }} />
          </View>
          {nivel > 1 && <><SubTitle>Dica! O jogo te permite voltar e refazer as fases.</SubTitle></>}
        </> : <><Title>Você perdeu!</Title></>}
      </Container>
    </ImageBackground >
  );
}

export { Dengue };

