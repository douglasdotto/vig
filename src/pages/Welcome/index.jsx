import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Shadow } from "react-native-shadow-2";
import React from "react";
import { ImageBackground, View } from "react-native";
import { navigationRoute } from "../../utils/navigation";

import {
  dengueData,
  DENGUE_DATA,
  leptospiroseData,
  LEPTOSPIROSE_DATA,
  toxoplasmoseData,
  TOXOPLASMOSE_DATA,
} from "../../libs/storage";
import {
  Container,
  Content,
  ImageContent,
  ProEdu,
  Title,
  Subtitle,
  Subtitle3,
  Title2,
  View2,
} from "./styles";

// import background from "../../assets/d7/teste.png";
// import dengue from "../../assets/dengue.png";
// import rato from "../../assets/rato.png";

import background from "../../assets/d7/teste.png";
import dengue from "../../assets/dengue.png";
import leptospirose from "../../assets/leptospirose.png";
import toxoplasmose from "../../assets/Gato-1.png";
import checkicon from "../../assets/check.png";
import crossicon from "../../assets/cross.png";
import { colors } from "../../theme";
import { useState, useEffect } from "react";

function Welcome() {
  const navigation = navigationRoute();
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
      var d = await dengueData();
      var l = await leptospiroseData();
      var t = await toxoplasmoseData();

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

    call();
  }, [])

  function handleResetApp() {
    AsyncStorage.removeItem(DENGUE_DATA);
    AsyncStorage.removeItem(LEPTOSPIROSE_DATA);
    AsyncStorage.removeItem(TOXOPLASMOSE_DATA);
  }
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <Container>
        <Content>
          <ProEdu>ProEDU</ProEdu>
          <Shadow distance={15}>
            <Title>Toque no jogo que você quer jogar</Title>
          </Shadow>
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
              Novo Jogo
            </Title2>
          </View>
        </Content>
      </Container>
    </ImageBackground>
  );
}

export { Welcome };
