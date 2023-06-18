import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { leptospiroseData, LEPTOSPIROSE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import jogador from "../../assets/l1/Jogador.png";

import background1 from "../../assets/l1/fundo1.png";
import background2 from "../../assets/l1/fundo2.png";
import background3 from "../../assets/l1/fundo3.png";
import background4 from "../../assets/l1/fundo4.png";
import background5 from "../../assets/l1/fundo5.png";
import background from "../../assets/d7/teste.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, PView5, PView6, SubTitle, Title, Content} from "./styles";
import { Shadow } from 'react-native-shadow-2';

function Leptospirose() {
  const navigation = navigationRoute();

  const [nivel, setNivel] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      var d = await leptospiroseData();
      if (d == null) {
        var newDataDengue = {
          nivel: 0,
          erros: 0,
          nivel1: 0,
          nivel2: 0,
          nivel3: 0,
          nivel4: 0,
        }
        await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(newDataDengue));
        setNivel(0);
      } else {
        if (d.nivel1 && d.nivel2 && d.nivel3 && d.nivel4) {
          setNivel(5);
          setErros(0);
        } else {
          setNivel(d.nivel);
          setErros(d.erros);
        }
      }
      setLoading(false);
    }

    call();
  }, [])

  async function nivel1() {
    navigation.replace("LeptospiroseF1");
  }

  async function nivel2() {
    navigation.replace("LeptospiroseF2");
  }

  async function nivel3() {
    navigation.replace("LeptospiroseF3");
  }

  async function nivel4() {
    navigation.replace("LeptospiroseF4");
  }

  function handleResetApp() {
    AsyncStorage.removeItem(LEPTOSPIROSE_DATA);
  }

  async function novoJogo() {
    navigation.replace("Welcome");
  }

  return (
    <ImageBackground source={nivel != 5 && erros <= 1 ? background1 : nivel != 5 && erros == 2 ? background2 : nivel != 5 && erros == 3 ? background3 : nivel != 5 && erros == 4 ? background4 : nivel != 5 && erros >= 5 ? background5 : nivel != 5 && erros > 6 ? background : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        {erros < 7 ? <>
          {nivel == 5 ?<View style={{ height: 500 }}>
            <Load />
            <Content><Title>Parabéns você completou o desafio da leptospirose!</Title></Content>
            <ButtonPrimary  style={{marginTop: 20}} title={<><Ionicons name="enter" size={24} color={colors.white} /> Novo Jogo </>} onPress={() => { novoJogo() }} />
          </View> : nivel == 0 ? <><Title>Desafio da leptospirose!</Title></> : <View style={{ height: 100 }}><Title>Você está no nível {nivel}</Title></View>}
          {nivel < 4 && <>
            <View style={{ position: "relative", height: 400, marginTop: 20,}}>
              <PView1 onTouchStart={() => nivel >= 0 ? nivel1() : null}>{nivel == 1 && <ImageContent source={jogador} style={{ bottom: 160, right: 5 }} resizeMode="contain" />}</PView1>
              <PView2 onTouchStart={() => nivel >= 1 ? nivel2() : null}>{nivel == 2 && <ImageContent source={jogador} style={{ bottom: -60, right: 60, width: 70 }} resizeMode="contain" />}</PView2>
              <PView3 onTouchStart={() => nivel >= 2 ? nivel3() : null}>{nivel == 3 && <ImageContent source={jogador} style={{ top: -95, right: 30 }} resizeMode="contain" />}</PView3>
              <PView4  onTouchStart={() => nivel >= 3 ? nivel4() : null}>{nivel == 4 && <ImageContent source={jogador} style={{ bottom: 70, right: 0 }} resizeMode="contain" />}</PView4>
              {/* <ImageContent style={{width: '110%', top: -90, left: -10}} source={erros <= 1 ? cano1 : erros == 2 ? cano2 : erros == 3 ? cano3 : erros == 4 ? cano4 : erros >= 5 ? cano5 : cano1} resizeMode="contain" /> */}
            </View>
            <View style={{ marginTop: 45, marginBottom: 15, margin: "auto" }}>
              <SubTitle>Erros: {erros}</SubTitle>
            </View>
            <View style={{ marginTop: 15, marginBottom: 15, margin: "auto" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar nível {nivel + 1}</>} onPress={() => { nivel == 0 ? nivel1() : nivel == 1 ? nivel2() : nivel == 2 ? nivel3() : nivel == 3 ? nivel4() : nivel == 4 ? nivel5() : nivel6(); }} />
            </View>
            {nivel > 1 && <><SubTitle>Dica! O jogo te permite voltar e refazer as fases.</SubTitle></>}
            </>}
          </> : <View>
            <Title style={{ paddingTop: 200, paddingBottom: 30 }}>Vamos tentar novamente?</Title>
            <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Novo Jogo </>} onPress={() => { novoJogo() }} />
          </View>}
        </Container> 
    </ImageBackground >
  );
}

export { Leptospirose };

