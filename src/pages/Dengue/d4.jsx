import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av';
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import congrats from "../../assets/sounds/congrats.mp3";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Medal } from "../../components/Load";

import doratrasdosolhos from "../../assets/d5/doratrasdosolhos.png";
import dordecabeca from "../../assets/d5/dordecabeca.png";
import dormuscular from "../../assets/d5/doresmusculares.png";
import nauseas from "../../assets/d5/nausea.png";
import background2 from "../../assets/d7/teste2.png";
import background from "../../assets/d7/teste5.png";
import dorisatencao from "../../assets/doris/atencao.png";
import { DENGUE_DATA, dengueData } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, ImageContent2, LineConnection, SubTitle3, SubTitleShadow, Title, ImageContent } from "./styles";

function D4() {
  const navigation = navigationRoute();
  const [sound, setSound] = React.useState();
  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [errosLocal, setErrosLocal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [textSelected, setTextSelected] = useState(null);

  const [selectDorAtrasDosOlhos, setselectDorAtrasDosOlhos] = useState(false);
  const [selectDorDeCabeca, setSelectDorDeCabeca] = useState(false);
  const [selectDorMuscular, setSelectDorMuscular] = useState(false);
  const [selectNauseas, setSelectNauseas] = useState(false);

  const [audio, setAudio] = useState(true);

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/DENGUE/associeossintomas.wav")
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
    if (selectDorAtrasDosOlhos && selectDorDeCabeca && selectDorMuscular && selectNauseas) {
      setTimeout(() => {
        next();
      }, 1000);
    }
  }, [selectDorAtrasDosOlhos, selectDorDeCabeca, selectDorMuscular, selectNauseas])

  useEffect(() => {
    if (errosLocal >= 5)
      erro();
  }, [errosLocal])

  async function erro() {
    var d = await dengueData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
    }
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(congrats);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function selectedImage(name) {
    if (name != null) {
      if (textSelected != null) {
        if (textSelected == name) {
          setImageSelected(name);

          if (name == "doratrasdosolhos") {
            setselectDorAtrasDosOlhos(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "dordecabeca") {
            setSelectDorDeCabeca(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "dormuscular") {
            setSelectDorMuscular(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "nauseas") {
            setSelectNauseas(true);
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
          if (name == "doratrasdosolhos") {
            setselectDorAtrasDosOlhos(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "dordecabeca") {
            setSelectDorDeCabeca(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "dormuscular") {
            setSelectDorMuscular(true);
            setImageSelected(null);
            setTextSelected(null);
          }
          else if (name == "nauseas") {
            setSelectNauseas(true);
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
    navigation.replace("DengueF4-2");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
      <Container2>
        {nivelConcluido && <>
          <SubTitleShadow><Title>Parabéns, você acertou o nível 4!</Title></SubTitleShadow>
          {playSound()}
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <SubTitleShadow><Title style={{ fontSize: 24 }}>Associe os sintomas: toque na imagem e depois no sintoma.</Title></SubTitleShadow>
          {audio ? <ImageContent
            source={dorisatencao}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          /> : <>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "60%", marginTop: 30 }}>
                <ImageContent2 onTouchStart={() => selectedImage('doratrasdosolhos')} name={doratrasdosolhos} source={doratrasdosolhos} style={{ width: (imageSelected == "doratrasdosolhos" ? 85 : 75), height: (imageSelected == "doratrasdosolhos" ? 120 : 110), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => selectedImage('dormuscular')} name={dormuscular} source={dormuscular} style={{ width: (imageSelected == "dormuscular" ? 90 : 80), height: (imageSelected == "dormuscular" ? 120 : 110), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => selectedImage('dordecabeca')} name={dordecabeca} source={dordecabeca} style={{ width: (imageSelected == "dordecabeca" ? 90 : 80), height: (imageSelected == "dordecabeca" ? 120 : 110), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
                <ImageContent2 onTouchStart={() => selectedImage('nauseas')} name={nauseas} source={nauseas} style={{ width: (imageSelected == "nauseas" ? 90 : 80), height: (imageSelected == "nauseas" ? 120 : 110), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              </View>
              <View>
                {selectDorAtrasDosOlhos == true && <LineConnection style={{ top: '30%', right: -30, width: 190, transform: [{ rotate: '38deg' }] }} />}
                {selectDorMuscular == true && <LineConnection style={{ top: '30%', right: -35, width: 190, transform: [{ rotate: '145deg' }] }} />}
                {selectDorDeCabeca == true && <LineConnection style={{ top: '78%', right: -65, width: 210, transform: [{ rotate: '35deg' }] }} />}
                {selectNauseas == true && <LineConnection style={{ top: '80%', right: -45, width: 190, transform: [{ rotate: '150deg' }] }} />}
              </View>
              <View style={{ width: "40%", marginRight: 10 }}>
                <SubTitle3 onTouchStart={() => selectedSymptom('dormuscular')} name={dormuscular} style={{ width: "95%", fontSize: (textSelected == "dormuscular" ? 27 : 25), textDecorationLine: (textSelected == "dormuscular" ? 'underline' : 'none'), height: 90, marginTop: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor muscular</SubTitle3>
                <SubTitle3 onTouchStart={() => selectedSymptom('doratrasdosolhos')} name={doratrasdosolhos} style={{ width: "95%", fontSize: (textSelected == "doratrasdosolhos" ? 27 : 25), textDecorationLine: (textSelected == "doratrasdosolhos" ? 'underline' : 'none'), height: 100, marginTop: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor atrás dos olhos</SubTitle3>
                <SubTitle3 onTouchStart={() => selectedSymptom('nauseas')} name={nauseas} style={{ width: "95%", fontSize: (textSelected == "nauseas" ? 27 : 25), textDecorationLine: (textSelected == "nauseas" ? 'underline' : 'none'), height: 50, marginTop: 40, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Náuseas</SubTitle3>
                <SubTitle3 onTouchStart={() => selectedSymptom('dordecabeca')} name={dordecabeca} style={{ width: "95%", fontSize: (textSelected == "dordecabeca" ? 27 : 25), textDecorationLine: (textSelected == "dordecabeca" ? 'underline' : 'none'), height: 80, marginTop: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor de cabeça</SubTitle3>
              </View>
            </View>
          </>}

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View onTouchStart={() => errosLocal >= 5 ? navigation.replace("Dengue") : setVisible(false)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => navigation.replace("Dengue")}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              {errosLocal >= 5 && <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => navigation.replace("Dengue")}>
                <Text style={{ color: '#FFFFFF' }}>Voltar a tela inicial</Text>
              </TouchableOpacity>}
            </View>
          </FancyAlert>
        </>}
      </Container2>
    </ImageBackground >
  );
}

export { D4 };

