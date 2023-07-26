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
import op1 from "../../assets/t5/op1.png";
import op2 from "../../assets/t5/op2.png";
import op3 from "../../assets/t5/op3.png";
import op1correta from "../../assets/t5/op1-correta.png";
import comer from "../../assets/t5/Comer.png";
import dorisatencao from "../../assets/doris/atencao.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection, SubTitleShadow, ImageContent } from "./styles";
import { Audio } from 'expo-av';

function T4() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [errosLocal, setErrosLocal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const [audio, setAudio] = useState(true);

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/TOXOPLASMOSE/prevencao.wav")
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
    if (correctAnswer) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
        async function fetchData() {
          var d = await toxoplasmoseData();
          if (d != null) {
            if (d.erros > 0 && d.nivel4 == 0)
              d.erros -= 1;
            if (d.nivel < 4 && d.nivel4 == 0)
              d.nivel = 4;
            if (d.nivel4 == 0)
              d.nivel4 = 1;
            await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1000);
    }
  }, [correctAnswer])

  useEffect(() => {
    if (errosLocal >= 3)
      erro();
  }, [errosLocal])

  async function erro() {
    var d = await toxoplasmoseData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
    }
  }

  async function errolocal() {
    if (errosLocal < 3) {
      setErrosLocal(errosLocal + 1)
      setVisible(true);
    }
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/falas/TOXOPLASMOSE/parabens.wav")
    );
    await sound.playAsync();
  }

  async function selectedCorrect() {
    setCorrectAnswer(true);
  }

  async function next() {
    navigation.replace("Toxoplasmose");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Toxoplasmose"} />
      </HeaderContent>
      <Container2>
        {nivelConcluido && <>
          <SubTitleShadow><Title>Parabéns, você acertou o nível 4!</Title></SubTitleShadow>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Receber Recompensa</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <SubTitleShadow><Title>Como se prevenir da toxoplasmose? Toque na opção correta</Title></SubTitleShadow>

          {audio ? <ImageContent
            source={dorisatencao}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          /> : <>
            <SubTitle2>Erros: {errosLocal} (máximo: 3)</SubTitle2>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "70%" }}>
                <ImageContent2 onTouchStart={() => selectedCorrect()} source={!correctAnswer ? op1 : op1correta} style={{ width: 360, height: 100, marginLeft: 15, marginTop: 20 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => errolocal()} source={op2} style={{ width: 360, height: 100, marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => errolocal()} source={op3} style={{ width: 360, height: 100, marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              </View>
            </View>
          </>}

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View onTouchStart={() => errosLocal >= 3 ? navigation.replace("Toxoplasmose") : setVisible(false)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
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

export { T4 };

