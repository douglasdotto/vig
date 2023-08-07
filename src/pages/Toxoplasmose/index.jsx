import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { TOXOPLASMOSE_DATA, toxoplasmoseData } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import jogador from "../../assets/l1/Jogador.png";

import background from "../../assets/d7/teste.png";
import background1 from "../../assets/t1/fundo1.png";
import background2 from "../../assets/t1/fundo2.png";
import background3 from "../../assets/t1/fundo3.png";
import background4 from "../../assets/t1/fundo4.png";

import { Audio } from 'expo-av';
import { colors } from "../../theme";
import { Container, Content, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, SubTitleShadow, Title } from "./styles";

function Toxoplasmose() {
  const navigation = navigationRoute();

  const [audio, setAudio] = useState(false);
  const [nivel, setNivel] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      var d = await toxoplasmoseData();
      if (d == null) {
        var newData = {
          nivel: 0,
          erros: 0,
          nivel1: 0,
          nivel2: 0,
          nivel3: 0,
          nivel4: 0,
        }
        await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(newData));
        setNivel(0);
      } else {
        if (d.nivel1 && d.nivel2 && d.nivel3 && d.nivel4) {
          setNivel(5);
          setErros(0);
          setAudio(true);
          const { sound } = await Audio.Sound.createAsync(
            require("../../assets/falas/TOXOPLASMOSE/parabens.wav")
          );
          await sound.playAsync();
          sound.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish) {
              setAudio(false);
              await sound.unloadAsync();
            }
          });
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
    navigation.replace("ToxoplasmoseF1");
  }

  async function nivel2() {
    navigation.replace("ToxoplasmoseF2");
  }

  async function nivel3() {
    navigation.replace("ToxoplasmoseF3");
  }

  async function nivel4() {
    navigation.replace("ToxoplasmoseF4");
  }

  async function novoJogo() {
    navigation.replace("Welcome");
  }

  return (
    <ImageBackground source={nivel != 5 && erros <= 1 ? background1 : nivel != 5 && erros == 2 ? background2 : nivel != 5 && erros == 3 ? background3 : nivel != 5 && erros >= 4 ? background4 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center", top: 0 }}>
      {!audio && <HeaderContent>
        <Header />
      </HeaderContent>}
      <Container>
        {erros < 4 ? <>
          {nivel == 5 ? <View style={{ height: 500 }}>
            <Load />
            <Content><SubTitleShadow><Title>Parabéns você completou o desafio da toxoplasmose!</Title></SubTitleShadow></Content>
            {!audio && <ButtonPrimary style={{ marginTop: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Novo Jogo </>} onPress={() => { novoJogo() }} />}
          </View> : nivel == 0 ? <SubTitleShadow><Title>Desafio da Toxoplasmose!</Title></SubTitleShadow> : <View style={{ height: 80 }}><SubTitleShadow><Title>Você está no nível {nivel}</Title></SubTitleShadow></View>}
          {nivel < 4 && <>
            <View style={{ marginTop: 0, marginBottom: 15, width: "100%", zIndex: 999 }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar nível {nivel + 1}</>} onPress={() => { nivel == 0 ? nivel1() : nivel == 1 ? nivel2() : nivel == 2 ? nivel3() : nivel4(); }} />
            </View>
          </>
          }

          <View style={{ position: "relative", height: 400, marginTop: 20 }}>
            <PView1 onTouchStart={() => nivel >= 0 ? nivel1() : null}>{nivel == 1 && <ImageContent source={jogador} style={{ bottom: 35, right: 140, width: 70 }} resizeMode="contain" />}</PView1>
            <PView2 onTouchStart={() => nivel >= 1 ? nivel2() : null}>{nivel == 2 && <ImageContent source={jogador} style={{ bottom: 50, right: 0, width: 70 }} resizeMode="contain" />}</PView2>
            <PView3 onTouchStart={() => nivel >= 2 ? nivel3() : null}>{nivel == 3 && <ImageContent source={jogador} style={{ bottom: 80, right: -30, width: 70 }} resizeMode="contain" />}</PView3>
            <PView4 onTouchStart={() => nivel >= 3 ? nivel4() : null}>{nivel == 4 && <ImageContent source={jogador} style={{ bottom: 0, left: 0, width: 70 }} resizeMode="contain" />}</PView4>
          </View>
        </> : <View>
          <Title style={{ paddingTop: 0, paddingBottom: 30 }}>Vamos tentar novamente?</Title>
          <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Novo Jogo </>} onPress={() => { novoJogo() }} />
        </View>}
      </Container>
    </ImageBackground >
  );
}

export { Toxoplasmose };

