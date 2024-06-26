import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { leptospiroseData, LEPTOSPIROSE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import m1 from "../../assets/l3/lixo2.png";
import m2 from "../../assets/l3/mesa2.png";
import m3 from "../../assets/l3/lixeira2.png";
import m4 from "../../assets/l3/esgoto2.png";
import background from "../../assets/d7/teste.png";
import background2 from "../../assets/d7/teste2.png";
import checkicon from "../../assets/check.png";
import crossicon from "../../assets/cross.png";

import dorisatencao from "../../assets/doris/atencao.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, Title, SubTitleShadow } from "./styles";
import { Audio } from 'expo-av';

function L2() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);

  const [audio, setAudio] = useState(true);

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
        require("../../assets/falas/LEPTOSPIROSE/toque.wav")
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

  useEffect(() => {
    if (items.length == 2 && !items.some(x => x == 2 || x == 3)) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
        async function fetchData() {
          var d = await leptospiroseData();
          if (d != null) {
            if (d.erros > 0 && d.nivel2 == 0)
              d.erros -= 1;
            if (d.nivel < 2 && d.nivel2 == 0)
              d.nivel = 2;
            if (d.nivel2 == 0)
              d.nivel2 = 1;
            await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1000);
    } else if ((items.length == 2 && items.some(x => x == 2 || x == 3)) || items.length == 4) {
      setVisible(true);
    }
  }, [items])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }

  async function next() {
    navigation.replace("LeptospiroseF3");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      {!audio && <HeaderContent>
        <Header backRoute={"Leptospirose"} />
      </HeaderContent>}
      <Container>
        {nivelConcluido && <>
          <SubTitleShadow><Title>Parabéns, você acertou o nível 2!</Title></SubTitleShadow>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <SubTitleShadow><Title>Toque nos dois locais que podem estar contaminados pela urina do rato.</Title></SubTitleShadow>

          {audio ? <ImageContent
            source={dorisatencao}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          /> : <>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(1)}>
                <ImageContent source={m1} style={{ width: (items.find(x => x == 1) != null ? "100%" : "75%"), height: (items.find(x => x == 1) != null ? "100%" : "75%") }} resizeMode="contain" />
                {items.find(x => x == 1) &&
                  <ImageContent source={checkicon} style={{ width: 40, height: 40, zIndex: 999 }} resizeMode="contain" />
                }
              </View>
              <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(2)}>
                <ImageContent source={m2} style={{ width: (items.find(x => x == 2) != null ? "100%" : "75%"), height: (items.find(x => x == 2) != null ? "100%" : "75%") }} resizeMode="contain" />
                {items.find(x => x == 2) &&
                  <ImageContent source={crossicon} style={{ width: 40, height: 40, zIndex: 999 }} resizeMode="contain" />
                }
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(3)}>
                <ImageContent source={m3} style={{ width: (items.find(x => x == 3) != null ? "100%" : "75%"), height: (items.find(x => x == 3) != null ? "100%" : "75%") }} resizeMode="contain" />
                {items.find(x => x == 3) &&
                  <ImageContent source={crossicon} style={{ width: 40, height: 40, zIndex: 999 }} resizeMode="contain" />
                }
              </View>
              <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(4)}>
                <ImageContent source={m4} style={{ width: (items.find(x => x == 4) != null ? "100%" : "75%"), height: (items.find(x => x == 4) != null ? "100%" : "75%") }} resizeMode="contain" />
                {items.find(x => x == 4) &&
                  <ImageContent source={checkicon} style={{ width: 40, height: 40, zIndex: 999 }} resizeMode="contain" />
                }
              </View>
            </View>
          </>}

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => setVisible(false)}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Você marcou as opções incorretas, tente novamente</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => setVisible(false)}>
                <Text style={{ color: '#FFFFFF' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container>
    </ImageBackground>
  );
}

export { L2 };

