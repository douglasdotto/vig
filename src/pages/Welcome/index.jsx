import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Shadow } from "react-native-shadow-2";
import React from "react";
import { ImageBackground, View } from "react-native";
import { navigationRoute } from "../../utils/navigation";

import {
  DENGUE_DATA,
  LEPTOSPIROSE_DATA,
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
import { colors } from "../../theme";

function Welcome() {
  const navigation = navigationRoute();

  function handleStart() {
    navigation.replace("DengueInfo");
  }

  function handleStartL() {
    navigation.replace("LeptoInfo");
  }

  function handleStartT() {
    navigation.replace("ToxoInfo");
  }

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
            <ImageContent
              source={dengue}
              style={{ width: 150, height: 120 }}
              resizeMode="contain"
            />
            <Subtitle3>Jogo da Dengue</Subtitle3>
          </View>

          <View onTouchStart={handleStartL}>
            <ImageContent
              source={leptospirose}
              style={{ width: 130, height: 110, marginLeft: 45 }}
              resizeMode="contain"
            />
            <Subtitle3>Jogo da Leptospirose</Subtitle3>
          </View>

          <View onTouchStart={handleStartT}>
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
