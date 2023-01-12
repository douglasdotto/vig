import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ImageBackground, View } from "react-native";
import { navigationRoute } from "../../utils/navigation";

import { DENGUE_DATA } from "../../libs/storage";
import { Container, Content, ImageContent, ProEdu, Title, Subtitle } from "./styles";

// import background from "../../assets/d7/teste.png";
// import dengue from "../../assets/dengue.png";
// import rato from "../../assets/rato.png";

import background from "../../assets/d7/teste.png";
import dengue from "../../assets/dengue.png";
import leptospirose from "../../assets/leptospirose.png";
import { colors } from "../../theme";

function Welcome() {
  const navigation = navigationRoute();

  function handleStart() {
    navigation.replace("Dengue");
  }

  function handleStartL() {
    navigation.replace("Leptospirose");
  }

  function handleResetApp() {
    AsyncStorage.removeItem(DENGUE_DATA);
    // AsyncStorage.removeItem(LEPTOSPIROSE_DATA);
  }
  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <Container>
        <Content>
          <ProEdu>
            ProEDU
          </ProEdu>
          <Title>
            Qual jogo você quer jogar?
          </Title>

          <View onTouchStart={handleStart}>
            <ImageContent source={dengue} style={{ width: 150, height: 120 }} resizeMode="contain" />
          </View>
         
          <View onTouchStart={handleStartL}>
            <ImageContent source={leptospirose} style={{ width: 150, height: 120, marginLeft: 40}} resizeMode="contain" />
          </View>

          <Title style={{ position: 'absolute', bottom: 20, color: colors.yellow }} onTouchStart={() => handleResetApp()}>
            <Ionicons name="refresh-circle-outline" size={32} color={colors.yellow} /> Reiniciar
          </Title>
        </Content>
      </Container>
    </ImageBackground>
  );
}

export { Welcome };

