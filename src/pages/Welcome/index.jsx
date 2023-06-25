import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ImageBackground, View } from "react-native";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { navigationRoute } from "../../utils/navigation";
import { Audio } from 'expo-av';

import {
  PRONTO,
  DENGUE_DATA,
  LEPTOSPIROSE_DATA,
  TOXOPLASMOSE_DATA,
  prontoData,
  dengueData,
  leptospiroseData,
  toxoplasmoseData,
} from "../../libs/storage";
import {
  Container,
  Content,
  ImageContent,
  VIG,
  Subtitle3,
  Title2
} from "./styles";

// import background from "../../assets/d7/teste.png";
// import dengue from "../../assets/dengue.png";
// import rato from "../../assets/rato.png";

import { useEffect, useState } from "react";
import toxoplasmose from "../../assets/Gato-1.png";
import checkicon from "../../assets/check.png";
import background from "../../assets/d7/teste.png";
import dengue from "../../assets/dengue.png";
import dorispadrao from "../../assets/doris/padrao.png";
import leptospirose from "../../assets/leptospirose.png";
import { colors } from "../../theme";

function Welcome() {
  const navigation = navigationRoute();
  const [pronto, setPronto] = useState(false);
  const [dengueCompleted, setDengueCompleted] = useState(false);
  const [leptospiroseCompleted, setLeptospiroseCompleted] = useState(false);
  const [toxoplasmoseCompleted, setToxoplasmoseCompleted] = useState(false);

  function handleStart() {
    navigation.replace("DengueInfo");
  }

  function handleStartL() {
    navigation.replace("LeptoInfo");
  }

  function handleStartT() {
    navigation.replace("ToxoInfo");
  }

  useEffect(() => {
    async function call() {
      var p = await prontoData();
      var d = await dengueData();
      var l = await leptospiroseData();
      var t = await toxoplasmoseData();

      if (p == null) {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/falas/EXTRAS/bemvindo.wav")
        );
        await sound.playAsync();
      } else {
        setPronto(true);
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/falas/EXTRAS/toquenojogo.wav")
        );
        await sound.playAsync();
      }

      if (d != null) {
        if (d.nivel1 && d.nivel2 && d.nivel3 && d.nivel4 && d.nivel5 && d.nivel6) {
          setDengueCompleted(true);
        }
      }
      if (l != null) {
        if (l.nivel1 && l.nivel2 && l.nivel3 && l.nivel4) {
          setLeptospiroseCompleted(true);
        }
      }
      if (t != null) {
        if (t.nivel1 && t.nivel2 && t.nivel3 && t.nivel4) {
          setToxoplasmoseCompleted(true);
        }
      }
    }

    setDengueCompleted(true);
          setLeptospiroseCompleted(true);
          setToxoplasmoseCompleted(true);

    call();
  }, [])

  useEffect(() => {
    if (dengueCompleted && leptospiroseCompleted && leptospiroseCompleted) {
      navigation.replace("Bottom");
    }
  }, [dengueCompleted, leptospiroseCompleted, leptospiroseCompleted])

  async function handleResetApp() {
    AsyncStorage.removeItem(DENGUE_DATA);
    AsyncStorage.removeItem(LEPTOSPIROSE_DATA);
    AsyncStorage.removeItem(TOXOPLASMOSE_DATA);
    AsyncStorage.removeItem(PRONTO);
    setDengueCompleted(false);
    setLeptospiroseCompleted(false);
    setToxoplasmoseCompleted(false);
    setPronto(false);
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/falas/EXTRAS/bemvindo.wav")
    );
    await sound.playAsync();
  }

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <Container>
        {!pronto && <>
          <Content style={{ marginTop: 50 }}>
            <VIG>VIG</VIG>
            <VIG>Vigilante sanitário amigo da Dóris</VIG>
            <ImageContent
              source={dorispadrao}
              style={{ width: 350, height: 350 }}
              resizeMode="contain"
            />
            <View style={{ marginTop: 15, marginBottom: 15, margin: "auto" }}>
              <ButtonPrimary style={{ width: 150 }} title={<><Ionicons name="enter" size={24} color={colors.white} />Jogar</>} onPress={async () => {
                setPronto(true); AsyncStorage.setItem(PRONTO, "true"); const { sound } = await Audio.Sound.createAsync(
                  require("../../assets/falas/EXTRAS/toquenojogo.wav")
                );
                await sound.playAsync();
              }} />
            </View>
          </Content>
        </>}
        {pronto && <>
          <Content style={{ marginTop: 50 }}>
            <VIG>Vigilante sanitário amigo da Dóris</VIG>
            <View onTouchStart={handleStart}>
              {dengueCompleted &&
                <ImageContent source={checkicon} style={{ width: 30, height: 30, zIndex: 999, bottom: 35, right: 15, position: "absolute" }} resizeMode="contain" />
              }
              <ImageContent
                source={dengue}
                style={{ width: 150, height: 120 }}
                resizeMode="contain"
              />
              <Subtitle3>Jogo da Dengue</Subtitle3>
            </View>

            <View onTouchStart={handleStartL}>
              {leptospiroseCompleted &&
                <ImageContent source={checkicon} style={{ width: 30, height: 30, zIndex: 999, bottom: 35, right: 30, position: "absolute" }} resizeMode="contain" />
              }
              <ImageContent
                source={leptospirose}
                style={{ width: 130, height: 110, marginLeft: 45 }}
                resizeMode="contain"
              />
              <Subtitle3>Jogo da Leptospirose</Subtitle3>
            </View>

            <View onTouchStart={handleStartT}>
              {toxoplasmoseCompleted &&
                <ImageContent source={checkicon} style={{ width: 30, height: 30, zIndex: 999, bottom: 30, right: 30, position: "absolute" }} resizeMode="contain" />
              }
              <ImageContent
                source={toxoplasmose}
                style={{ width: 130, height: 100, marginLeft: 30 }}
                resizeMode="contain"
              />

              <Subtitle3>Jogo da Toxoplasmose</Subtitle3>
            </View>

            <View>
              <Title2
                style={{ color: colors.yellow }}
                onTouchStart={() => handleResetApp()}
              >
                <Ionicons
                  name="refresh-circle-outline"
                  size={32}
                  color={colors.yellow}
                />{" "}
                Reiniciar
              </Title2>
            </View>
          </Content>
        </>}
      </Container>
    </ImageBackground>
  );
}

export { Welcome };

