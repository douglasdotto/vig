import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";

import { DENGUE_DATA, dengueData } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import background from "../../assets/d7/teste.png";

import dengue from "../../assets/dengue.png";

import { Audio } from 'expo-av';
import { colors } from "../../theme";
import { Container, Content, HeaderContent, ImageContent, SubTitleShadow, Title } from "./styles";

function DengueInfo() {
  const navigation = navigationRoute();

  const [nivel, setNivel] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState(null);

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/DENGUE/dengue.wav")
      );
      await sound.playAsync();
    }
    call();
  }, [])

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
        if (d.nivel1 && d.nivel2 && d.nivel3 && d.nivel4 && d.nivel5 && d.nivel6) {
          setNivel(7);
          setErros(0);
        } else {
          setNivel(d.nivel);
          setErros(d.erros);
        }
      }
      setLoading(false);
    }

    call();
  }, [newGame])

  async function jogar() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/foleys/FOLEYS/MOSQUITO.wav")
    );
    await sound.playAsync();
    navigation.replace("Dengue");
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
              <Title>Desafio da Dengue!</Title>
            </SubTitleShadow>
            <ImageContent
              source={dengue}
              style={{ width: 150, height: 120, marginTop: 20, marginBottom: 20 }}
              resizeMode="contain"
            />
            <SubTitleShadow>Dengue é uma doença transmitida por um mosquito preto com listras brancas. Ele nasce em lugares com água parada.</SubTitleShadow>
          </Content>
          <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar </>} onPress={() => jogar()} />
        </View>
      </Container>
    </ImageBackground >
  );
}

export { DengueInfo };

