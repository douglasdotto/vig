import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { leptospiroseData, LEPTOSPIROSE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";
import background from "../../assets/d7/teste5.png";
import background2 from "../../assets/d7/teste2.png";
import dordecabeca from "../../assets/d5/dordecabeca.png";
import dormuscular from "../../assets/d5/doresmusculares.png";
import faltaapetite from "../../assets/d5/faltaapetite.png";
import febre from "../../assets/d5/febre.png";
import nauseas from "../../assets/d5/nausea.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection } from "./styles";

function L3() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [errosLocal, setErrosLocal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [textSelected, setTextSelected] = useState(null);

 
  const [selectDorDeCabeca, setSelectDorDeCabeca] = useState(false);
  const [selectDorMuscular, setSelectDorMuscular] = useState(false);
  const [selectFaltaApetite, setSelectFaltaApetite] = useState(false);
  const [selectFebre, setSelectFebre] = useState(false);
  const [selectNauseas, setSelectNauseas] = useState(false);

  useEffect(() => {
    if (selectDorDeCabeca && selectDorMuscular && selectFaltaApetite && selectFebre && selectNauseas) {
      setNivelConcluido(true);
      async function fetchData() {
        var d = await leptospiroseData();
        if (d != null) {
          if (d.erros > 0 && d.nivel3 == 0)
            d.erros -= 1;
          if (d.nivel < 3 && d.nivel3 == 0)
            d.nivel = 3;
          if (d.nivel3 == 0)
            d.nivel3 = 1;
          await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(d));
        }
      }
      fetchData();
    }
  }, [selectDorDeCabeca, selectDorMuscular, selectFaltaApetite, selectFebre, selectNauseas])

  useEffect(() => {
    if (errosLocal >= 9)
      erro();
  }, [errosLocal])

  async function erro() {
    var d = await leptospiroseData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(d));
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
        if (name == "dordecabeca") {
          setSelectDorDeCabeca(true);
        }
        else if (name == "dormuscular") {
          setSelectDorMuscular(true);
        }
        else if (name == "faltaapetite") {
          setSelectFaltaApetite(true);
        }
        else if (name == "febre") {
          setSelectFebre(true);
        }        
        else if (name == "nauseas") {
          setSelectNauseas(true);
        }
      }
      else {
        setErrosLocal(errosLocal + 1)
        setVisible(true);
      }
    }
  }

  async function next() {
    navigation.replace("LeptospiroseL4");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Leptospirose"} />
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
          <SubTitle2>Erros: {errosLocal} (máximo: 9)</SubTitle2>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "70%" }}>
              <ImageContent2 onTouchStart={() => selectedImage('dordecabeca')} name={dordecabeca} source={dordecabeca} style={{ width: (imageSelected != null && imageSelected == "dordecabeca" ? 70 : 60), height: (imageSelected != null && imageSelected == "dordecabeca" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('dormuscular')} name={dormuscular} source={dormuscular} style={{ width: (imageSelected != null && imageSelected == "dormuscular" ? 70 : 60), height: (imageSelected != null && imageSelected == "dormuscular" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('faltaapetite')} name={faltaapetite} source={faltaapetite} style={{ width: (imageSelected != null && imageSelected == "faltaapetite" ? 70 : 60), height: (imageSelected != null && imageSelected == "faltaapetite" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('febre')} name={febre} source={febre} style={{ width: (imageSelected != null && imageSelected == "febre" ? 70 : 60), height: (imageSelected != null && imageSelected == "febre" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('nauseas')} name={nauseas} source={nauseas} style={{ width: (imageSelected != null && imageSelected == "nauseas" ? 70 : 60), height: (imageSelected != null && imageSelected == "nauseas" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />              
            </View>
            <View>
              {textSelected != null && selectDorDeCabeca == true && <LineConnection style={{ top: '34%', right: -53, width: 280, transform: [{ rotate: '45deg' }] }} />}
              {textSelected != null && selectDorMuscular == true && <LineConnection style={{ top: '25%', right: -18, width: 220, transform: [{ rotate: '155deg' }] }} />}
              {textSelected != null && selectFaltaApetite == true && <LineConnection style={{ top: '45%', right: -25, width: 220, transform: [{ rotate: '160deg' }] }} />}
              {textSelected != null && selectFebre == true && <LineConnection style={{ top: '82%', right: -28, width: 225, transform: [{ rotate: '18deg' }] }} />}
              {textSelected != null && selectNauseas == true && <LineConnection style={{ top: '91%', right: -15, width: 220, transform: [{ rotate: '165deg' }] }} />}              
            </View>
            <View style={{ width: "30%", marginRight: 10 }}>
              <SubTitle2 onTouchStart={() => selectedSymptom('dormuscular')} name={dormuscular} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor muscular</SubTitle2>              
              <SubTitle2 onTouchStart={() => selectedSymptom('faltaapetite')} name={faltaapetite} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Falta de apetite</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('dordecabeca')} name={dordecabeca} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Dor de cabeça</SubTitle2>  
              <SubTitle2 onTouchStart={() => selectedSymptom('nauseas')} name={nauseas} style={{ width: "95%", height: 40, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Náuseas</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('febre')} name={febre} style={{ width: "95%", height: 40, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Febre</SubTitle2>
            </View>
          </View>

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View onTouchStart={() => errosLocal >= 9 ? navigation.replace("Leptospirose") : setVisible(false)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => navigation.replace("Leptospirose")}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Incorreto, tente outra opção</Text>
              {errosLocal >= 9 && <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => navigation.replace("Leptospirose")}>
                <Text style={{ color: '#FFFFFF' }}>Voltar a tela inicial</Text>
              </TouchableOpacity>}
            </View>
          </FancyAlert>
        </>}
      </Container2>
    </ImageBackground >
  );
}

export { L3 };
