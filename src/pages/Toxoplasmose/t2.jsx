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
import dordecabeca from "../../assets/t3/dordecabeca.png";
import linfonodos from "../../assets/t3/Linfonodos.png";
import confusao from "../../assets/t3/confusaomental.png";
import febre from "../../assets/t3/Febre.png";
import nauseas from "../../assets/d5/nausea.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection } from "./styles";
import { Audio } from 'expo-av';

function T2() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [errosLocal, setErrosLocal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [textSelected, setTextSelected] = useState(null);


  const [selectDorDeCabeca, setSelectDorDeCabeca] = useState(false);
  const [selectLinfonodos, setSelectLinfonodos] = useState(false);
  const [selectConfusao, setSelectConfusao] = useState(false);
  const [selectFebre, setSelectFebre] = useState(false);

  useEffect(() => {
    if (selectDorDeCabeca && selectLinfonodos && selectConfusao && selectFebre) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
        async function fetchData() {
          var d = await toxoplasmoseData();
          if (d != null) {
            if (d.erros > 0 && d.nivel2 == 0)
              d.erros -= 1;
            if (d.nivel < 2 && d.nivel2 == 0)
              d.nivel = 2;
            if (d.nivel2 == 0)
              d.nivel2 = 1;
            await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1500)
    }
  }, [selectDorDeCabeca, selectLinfonodos, selectConfusao, selectFebre])

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
      setImageSelected(name);
    }
  }

  async function selectedSymptom(name) {
    if (name != null) {
      if (imageSelected == name) {
        setTextSelected(name);
        if (name == "dordecabeca") {
          setSelectDorDeCabeca(true);
        }
        else if (name == "linfonodos") {
          setSelectLinfonodos(true);
        }
        else if (name == "confusao") {
          setSelectConfusao(true);
        }
        else if (name == "febre") {
          setSelectFebre(true);
        }
      }
      else {
        setErrosLocal(errosLocal + 1)
        setVisible(true);
      }
    }
  }

  async function next() {
    navigation.replace("ToxoplasmoseF3");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Toxoplasmose"} />
      </HeaderContent>
      <Container2>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou o nível 2!</Title>
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
            <View style={{ width: "60%" }}>
              <ImageContent2 onTouchStart={() => selectedImage('dordecabeca')} name={dordecabeca} source={dordecabeca} style={{ width: (imageSelected != null && imageSelected == "dordecabeca" ? 100 : 90), height: (imageSelected != null && imageSelected == "dordecabeca" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('linfonodos')} name={linfonodos} source={linfonodos} style={{ width: (imageSelected != null && imageSelected == "linfonodos" ? 100 : 90), height: (imageSelected != null && imageSelected == "linfonodos" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('confusao')} name={confusao} source={confusao} style={{ width: (imageSelected != null && imageSelected == "confusao" ? 100 : 90), height: (imageSelected != null && imageSelected == "confusao" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('febre')} name={febre} source={febre} style={{ width: (imageSelected != null && imageSelected == "febre" ? 100 : 90), height: (imageSelected != null && imageSelected == "febre" ? 100 : 90), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
            </View>
            <View>
              {textSelected != null && selectDorDeCabeca == true && <LineConnection style={{ top: '30%', right: -60, width: 190, transform: [{ rotate: '30deg' }] }} />}
              {textSelected != null && selectLinfonodos == true && <LineConnection style={{ top: '30%', right: -35, width: 170, transform: [{ rotate: '145deg' }] }} />}
              {textSelected != null && selectConfusao == true && <LineConnection style={{ top: '78%', right: -45, width: 180, transform: [{ rotate: '35deg' }] }} />}
              {textSelected != null && selectFebre == true && <LineConnection style={{ top: '75%', right: -65, width: 200, transform: [{ rotate: '150deg' }] }} />}
            </View>
            <View style={{ width: "40%", marginRight: 10 }}>
              <SubTitle2 onTouchStart={() => selectedSymptom('linfonodos')} name={linfonodos} style={{ width: "95%", fontSize: 25, height: 90, marginTop: 40, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Linfonodos no pescoço</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('dordecabeca')} name={dordecabeca} style={{ width: "95%", fontSize: 25, height: 90, marginTop: 40, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor de cabeça</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('febre')} name={febre} style={{ width: "95%", fontSize: 25, height: 90, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Febre</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('confusao')} name={confusao} style={{ width: "95%", fontSize: 25, height: 90, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Confusão mental</SubTitle2>
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

export { T2 };

