import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import m1 from "../../assets/d3/m1.png";
import m2 from "../../assets/d3/m2.png";
import m3 from "../../assets/d3/m3.png";
import m4 from "../../assets/d3/m4.png";
import checkicon from "../../assets/check.png";
import crossicon from "../../assets/cross.png";
import background from "../../assets/d7/teste.png";
import background2 from "../../assets/d7/teste2.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, Title, SubTitleShadow } from "./styles";
import { Audio } from 'expo-av';

function D2() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);
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
        require("../../assets/falas/DENGUE/toqueemdoislocais.wav")
      );
      await sound.playAsync();
    }
    call();
  }, [])

  useEffect(() => {
    if (items.length == 2 && !items.some(x => x == 2) && !items.some(x => x == 4)) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
        async function fetchData() {
          var d = await dengueData();
          if (d != null) {
            if (d.erros > 0 && d.nivel2 == 0)
              d.erros -= 1;
            if (d.nivel < 2 && d.nivel2 == 0)
              d.nivel = 2;
            if (d.nivel2 == 0)
              d.nivel2 = 1;
            await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1000);
    } else if ((items.length == 2 && (items.some(x => x == 2) || items.some(x => x == 4))) || items.length == 4) {
      erro();
    }
  }, [items])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }
  
  async function erro() {
    var d = await dengueData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
    }
    setVisible(true);
  }

  async function next() {
    navigation.replace("DengueF3");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
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
          <SubTitleShadow><Title>Toque em dois locais onde o mosquito pôe os ovos!</Title></SubTitleShadow>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(1)}>
              <ImageContent source={m1} style={{ width: (items.find(x => x == 1) != null ? "100%" : "75%"), height: (items.find(x => x == 1) != null ? "100%" : "75%") }} resizeMode="contain" />
              {items.find(x => x == 1) &&
                <ImageContent source={checkicon} style={{ width: 40, height: 40, zIndex: 999}} resizeMode="contain" />
              }
            </View>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(2)}>
              <ImageContent source={m2} style={{ width: (items.find(x => x == 2) != null ? "100%" : "75%"), height: (items.find(x => x == 2) != null ? "100%" : "75%") }} resizeMode="contain" />
              {items.find(x => x == 2) &&
                <ImageContent source={crossicon} style={{ width: 40, height: 40, zIndex: 999}} resizeMode="contain" />
              }
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(3)}>
              <ImageContent source={m3} style={{ width: (items.find(x => x == 3) != null ? "100%" : "75%"), height: (items.find(x => x == 3) != null ? "100%" : "75%") }} resizeMode="contain" />
              {items.find(x => x == 3) &&
                <ImageContent source={checkicon} style={{ width: 40, height: 40, zIndex: 999}} resizeMode="contain" />
              }
            </View>
            <View style={{ width: "50%", height: 200 }} onTouchStart={() => check(4)}>
              <ImageContent source={m4} style={{ width: (items.find(x => x == 4) != null ? "100%" : "75%"), height: (items.find(x => x == 4) != null ? "100%" : "75%") }} resizeMode="contain" />
              {items.find(x => x == 4) &&
                <ImageContent source={crossicon} style={{ width: 40, height: 40, zIndex: 999}} resizeMode="contain" />
              }
            </View>
          </View>

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

export { D2 };

