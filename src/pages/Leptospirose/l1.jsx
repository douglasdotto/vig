import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Medal } from "../../components/Load";

import { LEPTOSPIROSE_DATA, leptospiroseData } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import background from "../../assets/d7/teste.png";
import background2 from "../../assets/d7/teste2.png";
import m1 from "../../assets/l2/barata1.png";
import m2 from "../../assets/l2/cachorro1.png";
import m3 from "../../assets/l2/rato1.png";
import dorisatencao from "../../assets/doris/atencao.png";
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, SubTitleShadow, Title } from "./styles";

function L1() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  const [audio, setAudio] = useState(true);

  async function concluirNivel() {
    setTimeout(async () => {
      setNivelConcluido(true);
      playSound();
      async function fetchData() {
        var d = await leptospiroseData();
        if (d != null) {
          if (d.erros > 0 && d.nivel1 == 0)
            d.erros -= 1;
          if (d.nivel < 1 && d.nivel1 == 0)
            d.nivel = 1;
          if (d.nivel1 == 0)
            d.nivel1 = 1;
          await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(d));
        }
      }
      fetchData();
    }, 1000)
  }

  useEffect(() => {
    if (selected == true) {
      concluirNivel();
    }
  }, [selected])

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/LEPTOSPIROSE/clique.wav")
      );
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          setAudio(false);
          await sound.unloadAsync();
        }
      });
    }
    call();
  }, [])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }

  async function erro() {
    var d = await leptospiroseData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(d));
      console.log("sad")
    }
    setVisible(true);
  }

  async function next() {
    navigation.replace("LeptospiroseF2");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Leptospirose"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <SubTitleShadow><Title>Parabéns, você acertou o nível 1!</Title></SubTitleShadow>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <SubTitleShadow><Title>Clique no Vetor da Leptospirose</Title></SubTitleShadow>

          {audio ? <ImageContent
            source={dorisatencao}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          /> : <>
            <View style={{ height: 150 }} onTouchStart={() => erro()}>
              <ImageContent source={m1} style={{ height: 125, marginLeft: 25 }} resizeMode="contain" />
            </View>
            <View style={{ height: 150 }} onTouchStart={() => erro()}>
              <ImageContent source={m2} style={{ height: 125, marginLeft: 60 }} resizeMode="contain" />
            </View>
            <View style={{ height: 150 }} onTouchStart={() => setSelected(true)}>
              <ImageContent source={m3} style={{ marginRight: 20, height: selected == false ? 125 : 150 }} resizeMode="contain" />
            </View>
          </>}

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => navigation.replace("Dengue")}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => navigation.replace("Leptospirose")}>
                <Text style={{ color: '#FFFFFF' }}>Voltar a tela inicial</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { L1 };

