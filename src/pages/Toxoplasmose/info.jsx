import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";

import { navigationRoute } from "../../utils/navigation";

import background from "../../assets/d7/teste.png";
import toxoplasmose from "../../assets/Gato-1.png";

import { Audio } from 'expo-av';
import { colors } from "../../theme";
import { Container, Content, HeaderContent, ImageContent, SubTitleShadow, Title2 } from "./styles";

function ToxoInfo() {
  const navigation = navigationRoute();

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/TOXOPLASMOSE/toxo.wav")
      );
      await sound.playAsync();
    }
    call();
  }, [])

  async function jogar() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/foleys/FOLEYS/GATO.wav")
    );
    await sound.playAsync();
    navigation.replace("Toxoplasmose");
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        <View style={{ height: 500 }}>
          <Content style={{ textAlign: "center" }}>
            <SubTitleShadow>
              <Title2>Desafio da Toxoplasmose!</Title2>
            </SubTitleShadow>
            <ImageContent
              source={toxoplasmose}
              style={{ width: 150, height: 120, marginTop: 30, marginBottom: 20, marginLeft: 95 }}
              resizeMode="contain"
            />
            <SubTitleShadow>Toxoplasmose é um parasita encontrado no cocô do gato e em alimentos contaminados. Causa dor e febre.</SubTitleShadow>
          </Content>
          <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar </>} onPress={() => jogar()} />
        </View>
      </Container>
    </ImageBackground >
  );
}

export { ToxoInfo };

