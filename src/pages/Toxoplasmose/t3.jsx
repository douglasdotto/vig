import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { toxoplasmoseData, TOXOPLASMOSE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";
import background from "../../assets/d7/teste5.png";
import background2 from "../../assets/d7/teste2.png";
import carneCrua from "../../assets/t4/CarneCrua.png";
import lavarMaos from "../../assets/t4/LavarMaos.png";
import lavarAlimentos from "../../assets/t4/LavarAlimentos.png";
import ferverAgua from "../../assets/t4/FerverAgua.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection } from "./styles";

function T3() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [errosLocal, setErrosLocal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [textSelected, setTextSelected] = useState(null);


  const [selectCarneCrua, setSelectCarneCrua] = useState(false);
  const [selectFerverAgua, setSelectFerverAgua] = useState(false);
  const [selectLavarAlimentos, setSelectLavarAlimentos] = useState(false);
  const [selectLavarMaos, setSelectLavarMaos] = useState(false);

  useEffect(() => {
    if (selectCarneCrua && selectFerverAgua && selectLavarAlimentos && selectLavarMaos) {
      setTimeout(() => {
        setNivelConcluido(true);
        async function fetchData() {
          var d = await toxoplasmoseData();
          if (d != null) {
            if (d.erros > 0 && d.nivel3 == 0)
              d.erros -= 1;
            if (d.nivel < 3 && d.nivel3 == 0)
              d.nivel = 3;
            if (d.nivel3 == 0)
              d.nivel3 = 1;
            await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1000);
    }
  }, [selectCarneCrua, selectFerverAgua, selectLavarAlimentos, selectLavarMaos])

  useEffect(() => {
    if (errosLocal >= 9)
      erro();
  }, [errosLocal])

  async function erro() {
    var d = await toxoplasmoseData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
    }
  }

  async function selectedImage(name) {
    if (name != null) {
      setImageSelected(name);
    }
  }

  async function selectedSymptom(name) {
    if (name != null) {
      if (imageSelected == name) {
        setTextSelected(name);
        if (name == "carneCrua") {
          setSelectCarneCrua(true);
        }
        else if (name == "ferverAgua") {
          setSelectFerverAgua(true);
        }
        else if (name == "lavarAlimentos") {
          setSelectLavarAlimentos(true);
        }
        else if (name == "lavarMaos") {
          setSelectLavarMaos(true);
        }
      }
      else {
        setErrosLocal(errosLocal + 1)
        setVisible(true);
      }
    }
  }

  async function next() {
    navigation.replace("ToxoplasmoseF4");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Toxoplasmose"} />
      </HeaderContent>
      <Container2>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou o nível 3!</Title>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Associe os sintomas: toque na imagem e depois no sintoma.</Title>
          <SubTitle2>Erros: {errosLocal} (máximo: 9)</SubTitle2>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "70%" }}>
              <ImageContent2 onTouchStart={() => selectedImage('carneCrua')} name={carneCrua} source={carneCrua} style={{ width: (imageSelected != null && imageSelected == "carneCrua" ? 80 : 70), height: (imageSelected != null && imageSelected == "carneCrua" ? 90 : 80), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('lavarMaos')} name={lavarMaos} source={lavarMaos} style={{ width: (imageSelected != null && imageSelected == "lavarMaos" ? 80 : 70), height: (imageSelected != null && imageSelected == "lavarMaos" ? 90 : 80), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('lavarAlimentos')} name={lavarAlimentos} source={lavarAlimentos} style={{ width: (imageSelected != null && imageSelected == "lavarAlimentos" ? 80 : 70), height: (imageSelected != null && imageSelected == "lavarAlimentos" ? 90 : 80), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('ferverAgua')} name={ferverAgua} source={ferverAgua} style={{ width: (imageSelected != null && imageSelected == "ferverAgua" ? 90 : 80), height: (imageSelected != null && imageSelected == "ferverAgua" ? 90 : 80), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
            </View>
            <View>
              {textSelected != null && selectCarneCrua == true && <LineConnection style={{ top: '24%', right: 10, width: 180, transform: [{ rotate: '20deg' }] }} />}
              {textSelected != null && selectLavarMaos == true && <LineConnection style={{ top: '28%', right: -20, width: 225, transform: [{ rotate: '147deg' }] }} />}
              {textSelected != null && selectLavarAlimentos == true && <LineConnection style={{ top: '75%', right: -2, width: 200, transform: [{ rotate: '20deg' }] }} />}
              {textSelected != null && selectFerverAgua == true && <LineConnection style={{ top: '77%', right: -18, width: 220, transform: [{ rotate: '150deg' }] }} />}
            </View>
            <View style={{ width: "30%", marginRight: 10 }}>
              <SubTitle2 onTouchStart={() => selectedSymptom('lavarMaos')} name={lavarMaos} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Lavar bem as mãos</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('carneCrua')} name={carneCrua} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Evitar carne crua</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('ferverAgua')} name={ferverAgua} style={{ width: "95%", height: 90, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Ferver água antes de beber</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('lavarAlimentos')} name={lavarAlimentos} style={{ width: "95%", height: 90, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Lavar bem frutas e verduras</SubTitle2>
            </View>
          </View>

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View onTouchStart={() => errosLocal >= 9 ? navigation.replace("Toxoplasmose") : setVisible(false)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => navigation.replace("Toxoplasmose")}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              {errosLocal >= 9 && <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => navigation.replace("Toxoplasmose")}>
                <Text style={{ color: '#FFFFFF' }}>Voltar a tela inicial</Text>
              </TouchableOpacity>}
            </View>
          </FancyAlert>
        </>}
      </Container2>
    </ImageBackground >
  );
}

export { T3 };

