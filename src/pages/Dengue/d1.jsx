import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Load } from "../../components/Load";
import { Header } from "../../components/Header";

import { navigationRoute } from "../../utils/navigation";
import { dengueData, DENGUE_DATA } from "../../libs/storage";

import background from "../../assets/d7/teste.png";
import background2 from "../../assets/d7/teste2.png";
import m1 from "../../assets/d2/m1.png";
import m2 from "../../assets/d2/m2.png";
import m3 from "../../assets/d2/m3.png";

import { Container, HeaderContent, ImageContent, Title } from "./styles";
import { colors } from "../../theme";

function D1() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);

  async function concluirNivel() {
    setNivelConcluido(true);
    var d = await dengueData();
    if (d != null) {
      if (d.nivel < 1 && d.nivel1 == 0)
        d.nivel = 1;
      if (d.nivel1 == 0)
        d.nivel1 = 1;
      await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
    }
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
          <Title>Parabéns, você acertou o nível 1!</Title>
          <Load />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.heading} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Clique no Vetor da Dengue</Title>

          <View style={{ height: 200 }} onTouchStart={() => concluirNivel()}>
            <ImageContent source={m1} style={{ height: 150 }} resizeMode="contain" />
          </View>
          <View style={{ height: 200 }} onTouchStart={() => setVisible(true)}>
            <ImageContent source={m2} style={{ height: 150 }} resizeMode="contain" />
          </View>
          <View style={{ height: 200 }} onTouchStart={() => setVisible(true)}>
            <ImageContent source={m3} style={{ height: 125 }} resizeMode="contain" />
          </View>

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => setVisible(false)}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => setVisible(false)}>
                <Text style={{ color: '#FFFFFF' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { D1 };
