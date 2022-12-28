import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import background from "../../assets/d7/teste5.png";
import background2 from "../../assets/d7/teste2.png";
import doratrasdosolhos from "../../assets/d5/doratrasdosolhos.png";
import dordecabeca from "../../assets/d5/dordecabeca.png";
import dormuscular from "../../assets/d5/doresmusculares.png";
import doresnasarticulacoes from "../../assets/d5/doresnasarticulacoes.png";
import fadiga from "../../assets/d5/fadiga.png";
import faltaapetite from "../../assets/d5/faltaapetite.png";
import febre from "../../assets/d5/febre.png";
import manchas from "../../assets/d5/manchasnapele.png";
import nauseas from "../../assets/d5/nausea.png";

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle } from "./styles";

function D4() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([{
    text: `1`,
    key: `key-1`,
    backgroundColor: "red",
  }]);

  useEffect(() => {
    if (items.length == 2) {
      setNivelConcluido(true);
      async function fetchData() {
        var d = await dengueData();
        if (d != null) {
          if (d.erros > 0 && d.nivel4 == 0)
            d.erros -= 1;
          if (d.nivel < 4 && d.nivel4 == 0)
            d.nivel = 4;
          if (d.nivel4 == 0)
            d.nivel4 = 1;
          await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
        }
      }
      fetchData();
    }
  }, [items])

  async function next() {
    navigation.replace("DengueF5");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
      <Container2>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou o nível 3!</Title>
          <Load />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Associe os sintomas:</Title>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <ImageContent2 source={doratrasdosolhos} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={dordecabeca} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={dormuscular} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={doresnasarticulacoes} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={fadiga} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={faltaapetite} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={febre} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={manchas} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 source={nauseas} style={{ width: 100, height: 60, marginTop: 10 }} resizeMode="contain" />
            </View>
            <View style={{ width: "50%" }}>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Manchas na pele</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Dor muscular</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Fadiga</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Febre</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Dor atrás dos olhos</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Dor de cabeça</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Náuseas</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Falta de apetite</SubTitle>
              <SubTitle style={{ width: "95%", height: 60, marginTop: 10, paddingTop: 15, textAlign: "right" }}>Dor nas articulações</SubTitle>
            </View>
          </View>
        </>}
      </Container2>
    </ImageBackground >
  );
}

export { D4 };

