import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Audio } from 'expo-av';
import congrats from "../../assets/sounds/congrats.mp3"

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

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
import arrow from "../../assets/d5/arrow.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle3, SubTitle2, LineConnection } from "./styles";

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
      setImageSelected(name);
    }
  }

  async function selectedSymptom(name) {
    if (name != null) {
      if (imageSelected == name) {
        setTextSelected(name);
        if (name == "doratrasdosolhos") {
          setselectDorAtrasDosOlhos(true);
        }
        else if (name == "dordecabeca") {
          setSelectDorDeCabeca(true);
        }
        else if (name == "dormuscular") {
          setSelectDorMuscular(true);
        }        
        else if (name == "nauseas") {
          setSelectNauseas(true);
        }
      }
      else {
        setErrosLocal(errosLocal + 1);
        setVisible(true);
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
          <Title>Parabéns, você acertou o nível 4!</Title>
          {playSound()}
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title style={{fontSize: 24}}>Associe os sintomas: toque na imagem e depois no sintoma.</Title>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "60%", marginTop: 30 }}>
              <ImageContent2 onTouchStart={() => selectedImage('doratrasdosolhos')} name={doratrasdosolhos} source={doratrasdosolhos} style={{ width: (imageSelected != null && imageSelected == "doratrasdosolhos" ? 85 : 75), height: (imageSelected != null && imageSelected == "doratrasdosolhos" ?120 : 110 ), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('dormuscular')} name={dormuscular} source={dormuscular} style={{ width: (imageSelected != null && imageSelected == "dormuscular" ?  90 : 80), height: (imageSelected != null && imageSelected == "dormuscular" ?120 : 110 ), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('dordecabeca')} name={dordecabeca} source={dordecabeca} style={{ width: (imageSelected != null && imageSelected == "dordecabeca" ?  90 : 80), height: (imageSelected != null && imageSelected == "dordecabeca" ?120 : 110 ), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('nauseas')} name={nauseas} source={nauseas} style={{ width: (imageSelected != null && imageSelected == "nauseas" ?  90 : 80), height: (imageSelected != null && imageSelected == "nauseas" ?120 : 110 ), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
            </View>
            <View>
              {textSelected != null && selectDorAtrasDosOlhos == true && <LineConnection style={{ top: '30%', right: -30, width: 190, transform: [{ rotate: '38deg' }] }} />}
              {textSelected != null && selectDorMuscular == true && <LineConnection style={{ top: '30%', right: -35, width: 190, transform: [{ rotate: '145deg' }] }} />}              
              {textSelected != null && selectDorDeCabeca == true && <LineConnection style={{ top: '78%', right: -65, width: 210, transform: [{ rotate: '35deg' }] }} />}
              {textSelected != null && selectNauseas == true && <LineConnection style={{ top: '80%', right: -45, width: 190, transform: [{ rotate: '150deg' }] }} />}
            </View>
            <View style={{ width: "40%", marginRight: 10 }}>
              <SubTitle3 onTouchStart={() => selectedSymptom('dormuscular')} name={dormuscular} style={{ width: "95%", fontSize: 25, height: 90, marginTop: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor muscular</SubTitle3>
              <SubTitle3 onTouchStart={() => selectedSymptom('doratrasdosolhos')} name={doratrasdosolhos} style={{ width: "95%", fontSize: 25, height: 100, marginTop: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor atrás dos olhos</SubTitle3>
              <SubTitle3 onTouchStart={() => selectedSymptom('nauseas')} name={nauseas} style={{ width: "95%", fontSize: 25, height: 50, marginTop: 40, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Náuseas</SubTitle3>
              <SubTitle3 onTouchStart={() => selectedSymptom('dordecabeca')} name={dordecabeca} style={{ width: "95%", fontSize: 25, height: 80, marginTop: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor de cabeça</SubTitle3>
            </View>
          </View>

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

