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
import plantar from "../../assets/t5/Plantar.png";
import colher from "../../assets/t5/Colher.png";
import lavaralimentos from "../../assets/t5/Lavar.png";
import lavarmaos from "../../assets/t5/lavarmaos.png";
import comer from "../../assets/t5/Comer.png";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { colors } from "../../theme";
import { Container2, HeaderContent, Title, ImageContent2, SubTitle, SubTitle2, LineConnection } from "./styles";

function T4() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [errosLocal, setErrosLocal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [textSelected, setTextSelected] = useState(null);


  const [selectPlantar, setSelectPlantar] = useState(false);
  const [selectColher, setSelectColher] = useState(false);
  const [selectLavarAlimentos, setSelectLavarAlimentos] = useState(false);
  const [selectLavarMaos, setSelectLavarMaos] = useState(false);
  const [selectComer, setSelectComer] = useState(false);

  useEffect(() => {
    if (selectComer && selectLavarMaos && selectLavarAlimentos && selectColher && selectPlantar) {
      setTimeout(() => {
        setNivelConcluido(true);
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
  }, [selectComer, selectLavarMaos, selectLavarAlimentos, selectColher, selectPlantar])

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
        if (name == "plantar") {
          setSelectPlantar(true);
        }
        else if (name == "colher") {
          setSelectColher(true);
        }
        else if (name == "lavaralimentos") {
          setSelectLavarAlimentos(true);
        }
        else if (name == "lavarmaos") {
          setSelectLavarMaos(true);
        }
        else if (name == "comer") {
          setSelectComer(true);
        }
      }
      else {
        setErrosLocal(errosLocal + 1)
        setVisible(true);
      }
    }
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
          <Title>Parabéns, você acertou o nível 4!</Title>
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
              <ImageContent2 onTouchStart={() => selectedImage('plantar')} name={plantar} source={plantar} style={{ width: (imageSelected != null && imageSelected == "plantar" ? 70 : 60), height: (imageSelected != null && imageSelected == "plantar" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('lavaralimentos')} name={lavaralimentos} source={lavaralimentos} style={{ width: (imageSelected != null && imageSelected == "lavaralimentos" ? 70 : 60), height: (imageSelected != null && imageSelected == "lavaralimentos" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('colher')} name={colher} source={colher} style={{ width: (imageSelected != null && imageSelected == "colher" ? 70 : 60), height: (imageSelected != null && imageSelected == "colher" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('comer')} name={comer} source={comer} style={{ width: (imageSelected != null && imageSelected == "comer" ? 70 : 60), height: (imageSelected != null && imageSelected == "comer" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
              <ImageContent2 onTouchStart={() => selectedImage('lavarmaos')} name={lavarmaos} source={lavarmaos} style={{ width: (imageSelected != null && imageSelected == "lavarmaos" ? 70 : 60), height: (imageSelected != null && imageSelected == "lavarmaos" ? 70 : 60), marginLeft: 15, marginTop: 30 }} resizeMode="contain" />
            </View>
            <View>
              {textSelected != null && selectPlantar == true && <LineConnection style={{ top: '32%', right: -45, width: 255, transform: [{ rotate: '38deg' }] }} />}
              {textSelected != null && selectLavarAlimentos == true && <LineConnection style={{ top: '25%', right: -18, width: 220, transform: [{ rotate: '155deg' }] }} />}
              {textSelected != null && selectColher == true && <LineConnection style={{ top: '42%', right: -25, width: 220, transform: [{ rotate: '160deg' }] }} />}
              {textSelected != null && selectComer == true && <LineConnection style={{ top: '82%', right: -28, width: 225, transform: [{ rotate: '18deg' }] }} />}
              {textSelected != null && selectLavarMaos == true && <LineConnection style={{ top: '85%', right: -25, width: 230, transform: [{ rotate: '160deg' }] }} />}
            </View>
            <View style={{ width: "30%", marginRight: 10 }}>
              <SubTitle2 onTouchStart={() => selectedSymptom('lavaralimentos')} name={lavaralimentos} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Lavar os alimentos</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('colher')} name={colher} style={{ width: "95%", height: 60, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Colher</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('plantar')} name={plantar} style={{ width: "95%", height: 60, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Plantar</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('lavarmaos')} name={lavarmaos} style={{ width: "95%", height: 70, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Lavar as mãos</SubTitle2>
              <SubTitle2 onTouchStart={() => selectedSymptom('comer')} name={comer} style={{ width: "95%", height: 40, marginTop: 30, paddingTop: 5, paddingBottom: 5, paddingRight: 10, textAlign: "right" }}>Comer</SubTitle2>
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

export { T4 };

