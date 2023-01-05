import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

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
import arrow from "../../assets/d5/arrow.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection } from "./styles";

function D4() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);  
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [imageSelected, setImageSelected] = useState(null);
  const [textSelected, setTextSelected] = useState(null);
  
  const [selectDorAtrasDosOlhos, setselectDorAtrasDosOlhos] = useState(false);
  const [selectDorDeCabeca, setSelectDorDeCabeca] = useState(false);
  const [selectDorMuscular, setSelectDorMuscular] = useState(false);
  const [selectDoresNasArticulacoes, setSelectDoresNasArticulacoes] = useState(false);
  const [selectFadiga, setSelectFadiga] = useState(false);
  const [selectFaltaApetite, setSelectFaltaApetite] = useState(false);
  const [selectFebre, setSelectFebre] = useState(false);
  const [selectManchas, setSelectManchas] = useState(false);
  const [selectNauseas, setSelectNauseas] = useState(false);
  const [data, setData] = useState([{
    text: `1`,
    key: `key-1`,
    backgroundColor: "red",
  }]);

  useEffect(() => {
    if (selectDorAtrasDosOlhos && selectDorDeCabeca && selectDorMuscular && selectDoresNasArticulacoes && selectFadiga && selectFaltaApetite && selectFebre && selectManchas && selectNauseas) {
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
  }, [selectDorAtrasDosOlhos, selectDorDeCabeca, selectDorMuscular, selectDoresNasArticulacoes, selectFadiga, selectFaltaApetite, selectFebre, selectManchas, selectNauseas])

  async function erro() {
    var d = await dengueData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
      console.log("sasd")
    }
    setVisible(true);
  }


  async function selectedImage(name){
    console.log("das")
    console.log(name)
    if(name != null) {
      setImageSelected(name);
      console.log("dass")
    }
    
  }

  async function selectedSymptom (name) {
    console.log("asd")
    if(name != null) {
      if(imageSelected == name) {
        setTextSelected(name);
        console.log(name)
        if(name == "doratrasdosolhos"){
          setselectDorAtrasDosOlhos(true);
        }
        else if(name == "dordecabeca"){
          setSelectDorDeCabeca(true);
        }
        else if(name == "dormuscular"){
          setSelectDorMuscular(true);
        }
        else if(name == "doresnasarticulacoes"){
          setSelectDoresNasArticulacoes(true);
        }
        else if(name == "fadiga"){
          setSelectFadiga(true);
        }
        else if(name == "faltaapetite"){
          setSelectFaltaApetite(true);
        }
        else if(name == "febre"){
          setSelectFebre(true);
        }
        else if(name == "manchas"){
          setSelectManchas(true);
        }
        else if(name == "nauseas"){
          setSelectNauseas(true);
        }
      }
      else {
        erro();
      }
      
    }
  }

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
          <Title>Parabéns, você acertou o nível 4!</Title>
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
            <View style={{ width: "70%" }}>
              <ImageContent2 onTouchStart={() => selectedImage('doratrasdosolhos')} name={doratrasdosolhos} source={doratrasdosolhos} style={{ width: (imageSelected != null && imageSelected == "doratrasdosolhos" ? 70 : 60), height: (imageSelected != null && imageSelected == "doratrasdosolhos" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('dordecabeca')} name={dordecabeca} source={dordecabeca} style={{ width: (imageSelected != null && imageSelected == "dordecabeca" ? 70 : 60), height: (imageSelected != null && imageSelected == "dordecabeca" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('dormuscular')} name={dormuscular} source={dormuscular} style={{ width: (imageSelected != null && imageSelected == "dormuscular" ? 70 : 60), height: (imageSelected != null && imageSelected == "dormuscular" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('doresnasarticulacoes')} name={doresnasarticulacoes} source={doresnasarticulacoes} style={{ width: (imageSelected != null && imageSelected == "doresnasarticulacoes" ? 70 : 60), height: (imageSelected != null && imageSelected == "doresnasarticulacoes" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('fadiga')} name={fadiga} source={fadiga} style={{ width: (imageSelected != null && imageSelected == "fadiga" ? 70 : 60), height: (imageSelected != null && imageSelected == "fadiga" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('faltaapetite')} name={faltaapetite} source={faltaapetite} style={{ width: (imageSelected != null && imageSelected == "faltaapetite" ? 70 : 60), height: (imageSelected != null && imageSelected == "faltaapetite" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('febre')} name={febre} source={febre} style={{ width: (imageSelected != null && imageSelected == "febre" ? 70 : 60), height: (imageSelected != null && imageSelected == "febre" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('manchas')} name={manchas} source={manchas} style={{ width: (imageSelected != null && imageSelected == "manchas" ? 70 : 60), height: (imageSelected != null && imageSelected == "manchas" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('nauseas')} name={nauseas} source={nauseas} style={{ width: (imageSelected != null && imageSelected == "nauseas" ? 70 : 60), height: (imageSelected != null && imageSelected == "nauseas" ? 70 : 60), marginLeft: 15, marginTop: 10 }} resizeMode="contain" />
            </View>
            <View>
              { textSelected != null && selectDorAtrasDosOlhos == true &&
                // <ImageContent2 source={arrow} style={{ height: 5, zIndex: 9999, position: "absolute", top: '13%', right: 15, width: 150, transform: [{ rotate: '25deg'}]}}></ImageContent2>
                <LineConnection style={{ top: '13%', right: -10, width: 220, transform: [{ rotate: '25deg'}]}}/>              
              }
              {
                textSelected != null && selectDorDeCabeca == true &&
                <LineConnection style={{top: '34%', right: -43, width: 290, transform: [{ rotate: '45deg'}]}}/>
              }
              {
                textSelected != null && selectDorMuscular == true &&
                <LineConnection style={{top: '19%', right: -17, width: 238, transform: [{ rotate: '150deg'}]}}/>
              }
              {
                textSelected != null && selectDoresNasArticulacoes == true &&
                <LineConnection style={{top: '50%', right: -24, width: 250, transform: [{ rotate: '35deg'}]}}/>
              }
              {
                textSelected != null && selectFadiga == true &&
                <LineConnection style={{top: '40%', right: -20, width: 245, transform: [{ rotate: '147deg'}]}}/>
              }
              {
                textSelected != null && selectFaltaApetite == true &&
                <LineConnection style={{top: '50%', right: -24, width: 250, transform: [{ rotate: '145deg'}]}}/>
              }
              {
                textSelected != null && selectFebre == true &&
                <LineConnection style={{top: '84%', right: -22, width: 240, transform: [{ rotate: '35deg'}]}}/>
              }
              {
                textSelected != null && selectManchas == true &&
                <LineConnection style={{top: '82%', right: -2, width: 195, transform: [{ rotate: '172deg'}]}}/>
              }
              {
                textSelected != null && selectNauseas == true &&
                <LineConnection style={{top: '90%', right: -5, width: 200, transform: [{ rotate: '165deg'}]}}/>
              }
              
            </View> 
            <View style={{ width: "30%", marginRight: 10}}>
              <SubTitle2 onTouchStart={() => selectedSymptom('dormuscular')} name={dormuscular} style={{ width: "95%", height: 70, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Dor muscular</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('doratrasdosolhos')} name={doratrasdosolhos} style={{ width: "95%", height: 70, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Dor atrás dos olhos</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('fadiga')} name={fadiga} style={{ width: "95%", height: 40, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Fadiga</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('faltaapetite')} name={faltaapetite} style={{ width: "95%", height: 70, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Falta de apetite</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('dordecabeca')} name={dordecabeca} style={{ width: "95%", height: 70, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Dor de cabeça</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('doresnasarticulacoes')} name={doresnasarticulacoes} style={{ width: "95%", height: 70, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Dor nas articulações</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('manchas')} name={manchas} style={{ width: "95%", height: 70, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Manchas na pele</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('nauseas')} name={nauseas} style={{ width: "95%", height: 40, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2 }}>Náuseas</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('febre')} name={febre} style={{ width: "95%", height: 40, marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right", borderColor: "#cc0000", borderWidth: 2}}>Febre</SubTitle2>
            </View>
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
      </Container2>
    </ImageBackground >
  );
}

export { D4 };

