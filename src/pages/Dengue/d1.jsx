import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import m1 from "../../assets/d2/m1.png";
import m2 from "../../assets/d2/m2.png";
import m3 from "../../assets/d2/m3.png";
import background from "../../assets/d7/teste.png";
import background2 from "../../assets/d7/teste2.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, Title, Content } from "./styles";
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { Audio } from 'expo-av';

function D1() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  async function concluirNivel() {
    setTimeout(() => {
      setNivelConcluido(true);
      playSound();
      async function fetchData() {
        var d = await dengueData();
        if (d != null) {
          if (d.erros > 0 && d.nivel1 == 0)
            d.erros -= 1;
          if (d.nivel < 1 && d.nivel1 == 0)
            d.nivel = 1;
          if (d.nivel1 == 0)
            d.nivel1 = 1;
          await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
        }
      }
      fetchData()
    }, 1000);
  }

  useEffect(() => {
    if(selected == true) {
      concluirNivel();
    }
  },[selected])

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
    navigation.replace("DengueF2");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <Content><Shadow distance={15}><Title style={{paddingHorizontal: 40 }}>Parabéns, você acertou o nível 1!</Title></Shadow></Content>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Content><Shadow distance={15}><Title>Toque no Vetor da Dengue</Title></Shadow></Content>

          <View style={{ height: 200 }} onTouchStart={() => setSelected(true)}>
            <ImageContent source={m1} style={{ height: selected == false ? 150 : 180}} resizeMode="contain" />
          </View>
          <View style={{ height: 200 }} onTouchStart={() => erro()}>
            <ImageContent source={m2} style={{ height: 150 }} resizeMode="contain" />
          </View>
          <View style={{ height: 200 }} onTouchStart={() => erro()}>
            <ImageContent source={m3} style={{ height: 125 }} resizeMode="contain" />
          </View>

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => navigation.replace("Dengue")}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => navigation.replace("Dengue")}>
                <Text style={{ color: '#FFFFFF' }}>Voltar a tela inicial</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { D1 };

