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
import dorisatencao from "../../assets/doris/atencao.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection, SubTitleShadow, ImageContent } from "./styles";
import { Audio } from 'expo-av';

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

  const [audio, setAudio] = useState(true);

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/TOXOPLASMOSE/associe.wav")
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
    if (selectCarneCrua && selectFerverAgua && selectLavarAlimentos && selectLavarMaos) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
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

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }

  async function selectedImage(name) {
    if (name != null) {
      if (textSelected != null) {
        if (textSelected == name) {
          setImageSelected(name);
          if (name == "carneCrua") {
            setSelectCarneCrua(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "ferverAgua") {
            setSelectFerverAgua(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "lavarAlimentos") {
            setSelectLavarAlimentos(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "lavarMaos") {
            setSelectLavarMaos(true);
            setImageSelected(null);
            setTextSelected(null);
          }

          setImageSelected(null);
        }
        else {
          setErrosLocal(errosLocal + 1)
          setTextSelected(null);
          setVisible(true);
        }
      }
      else {
        setImageSelected(name);
      }
    }
  }

  async function selectedSymptom(name) {
    if (name != null) {
      if (imageSelected != null) {
        if (imageSelected == name) {
          setTextSelected(name);
          if (name == "carneCrua") {
            setSelectCarneCrua(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "ferverAgua") {
            setSelectFerverAgua(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "lavarAlimentos") {
            setSelectLavarAlimentos(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "lavarMaos") {
            setSelectLavarMaos(true);
            setImageSelected(null);
            setTextSelected(null);
          }

        }
        else {
          setErrosLocal(errosLocal + 1)
          setImageSelected(null);
          setVisible(true);
        }
      }
      else {
        setTextSelected(name);
      }
    }
  }

  async function next() {
    navigation.replace("ToxoplasmoseF4");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      {!audio && <HeaderContent>
        <Header backRoute={"Toxoplasmose"} />
      </HeaderContent>}
      <Container2>
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
          <SubTitleShadow><Title>Associe as formas de prevenção da toxoplasmose</Title></SubTitleShadow>

          {audio ? <ImageContent
            source={dorisatencao}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          /> : <>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "60%" }}>
                <ImageContent2 onTouchStart={() => selectedImage('carneCrua')} name={carneCrua} source={carneCrua} style={{ width: (imageSelected == "carneCrua" ? 90 : 80), height: (imageSelected == "carneCrua" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => selectedImage('lavarMaos')} name={lavarMaos} source={lavarMaos} style={{ width: (imageSelected == "lavarMaos" ? 90 : 80), height: (imageSelected == "lavarMaos" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => selectedImage('lavarAlimentos')} name={lavarAlimentos} source={lavarAlimentos} style={{ width: (imageSelected == "lavarAlimentos" ? 90 : 80), height: (imageSelected == "lavarAlimentos" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => selectedImage('ferverAgua')} name={ferverAgua} source={ferverAgua} style={{ width: (imageSelected == "ferverAgua" ? 100 : 90), height: (imageSelected == "ferverAgua" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              </View>
              <View>
                {selectCarneCrua == true && <LineConnection style={{ top: '24%', right: -20, width: 150, transform: [{ rotate: '30deg' }] }} />}
                {selectLavarMaos == true && <LineConnection style={{ top: '28%', right: -30, width: 165, transform: [{ rotate: '140deg' }] }} />}
                {selectLavarAlimentos == true && <LineConnection style={{ top: '65%', right: -40, width: 160, transform: [{ rotate: '0deg' }] }} />}
                {selectFerverAgua == true && <LineConnection style={{ top: '89%', right: -6, width: 140, transform: [{ rotate: '0deg' }] }} />}
              </View>
              <View style={{ width: "40%", marginRight: 10 }}>
                <SubTitle2 onTouchStart={() => selectedSymptom('lavarMaos')} name={lavarMaos} style={{ width: "95%", fontSize: (textSelected == "lavarMaos" ? 22 : 20), height: 90, marginTop: 40, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", textDecorationLine: (textSelected == "lavarMaos" ? 'underline' : 'none') }}>Lavar bem as mãos</SubTitle2>
                <SubTitle2 onTouchStart={() => selectedSymptom('carneCrua')} name={carneCrua} style={{ width: "95%", fontSize: (textSelected == "carneCrua" ? 22 : 20), height: 90, marginTop: 20, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", textDecorationLine: (textSelected == "carneCrua" ? 'underline' : 'none') }}>Evitar carne crua</SubTitle2>
                <SubTitle2 onTouchStart={() => selectedSymptom('lavarAlimentos')} name={lavarAlimentos} style={{ width: "95%", fontSize: (textSelected == "lavarAlimentos" ? 22 : 20), height: 100, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", textDecorationLine: (textSelected == "lavarAlimentos" ? 'underline' : 'none') }}>Lavar bem frutas e verduras</SubTitle2>
                <SubTitle2 onTouchStart={() => selectedSymptom('ferverAgua')} name={ferverAgua} style={{ width: "95%", fontSize: (textSelected == "ferverAgua" ? 22 : 20), height: 100, marginTop: 40, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", textDecorationLine: (textSelected == "ferverAgua" ? 'underline' : 'none') }}>Ferver água antes de beber</SubTitle2>
              </View>
            </View>
          </>}

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View onTouchStart={() => errosLocal >= 9 ? navigation.replace("Toxoplasmose") : setVisible(false)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => navigation.replace("Toxoplasmose")}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => { errosLocal >= 9 ? navigation.replace("Toxoplasmose") : setVisible(false) }}>
                <Text style={{ color: '#FFFFFF' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container2>
    </ImageBackground >
  );
}

export { T3 };

