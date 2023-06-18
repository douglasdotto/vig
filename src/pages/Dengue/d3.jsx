import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import background from "../../assets/d4/Cena2.png";
import background2 from "../../assets/d4/Cena22.png";
import m1 from "../../assets/d4/pneu2.png";
import m2 from "../../assets/d4/poca2.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, Title, SubTitleShadow } from "./styles";
import { Audio } from 'expo-av';

function D3() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [items, setItems] = useState([]);

  async function check(item) {
    var exist = items.find(x => x == item);
    var oldItems = [...items];
    if (exist == null)
      oldItems.push(item);
    else
      oldItems = oldItems.filter(x => x != item);
    setItems(oldItems);
  }

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/DENGUE/encontreetoquenomosq.wav")
      );
      await sound.playAsync();
    }
    call();
  }, [])

  useEffect(() => {
    if (items.length == 2) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
        async function fetchData() {
          var d = await dengueData();
          if (d != null) {
            if (d.erros > 0 && d.nivel3 == 0)
              d.erros -= 1;
            if (d.nivel < 3 && d.nivel3 == 0)
              d.nivel = 3;
            if (d.nivel3 == 0)
              d.nivel3 = 1;
            await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1000);
    }
  }, [items])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }

  async function next() {
    navigation.replace("DengueF4");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <SubTitleShadow><Title>Parabéns, você acertou o nível 3!</Title></SubTitleShadow>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <SubTitleShadow><Title>Encontre e toque nos dois mosquitos!</Title></SubTitleShadow>
          <View style={{ position: "absolute", right: 0, bottom: 30, height: 100, width: 100 }} onTouchStart={() => check(1)}>
            <ImageContent source={m1} style={{ width: (items.find(x => x == 1) != null ? "100%" : "60%"), height: (items.find(x => x == 1) != null ? "100%" : "75%"), border: '2px solid #FFF' }} resizeMode="contain" />
          </View>
          <View style={{ position: "absolute", left: 80, bottom: 80, height: 100, width: 100, outline: 2 }} onTouchStart={() => check(2)}>
            <ImageContent source={m2} style={{ width: (items.find(x => x == 2) != null ? "100%" : "60%"), height: (items.find(x => x == 2) != null ? "100%" : "75%"), border: '2px solid #FFF' }} resizeMode="contain" />
          </View>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { D3 };

