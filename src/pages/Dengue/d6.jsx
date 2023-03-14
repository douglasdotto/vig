import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import m1 from "../../assets/d7/bola.png";
import casa from "../../assets/d7/casa.png";
import background from "../../assets/d7/ceu.png";
import m2 from "../../assets/d7/martelo.png";
import m3 from "../../assets/d7/mata.png";
import mosquito from "../../assets/d7/mosquito.png";
import m4 from "../../assets/d7/repelente.png";
import background2 from "../../assets/d7/teste2.png";
import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent2, Title } from "./styles";

import Draggable from 'react-native-draggable';
import { Audio } from 'expo-av';

function D6() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageXMosquito, setPageXMosquito] = useState(0);
  const [pageYMosquito, setPageYMosquito] = useState(0);

  async function next() {
    navigation.replace("Dengue");
  }

  async function finish() {
    setNivelConcluido(true);
    playSound();
    var d = await dengueData();
    if (d != null) {
      if (d.erros > 0 && d.nivel6 == 0)
        d.erros -= 1;
      if (d.nivel < 6 && d.nivel6 == 0)
        d.nivel = 6;
      if (d.nivel6 == 0)
        d.nivel6 = 1;
      await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
    }
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou o nível 6!</Title>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Receber recompensa</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Elimine o mosquito com a ferramenta escolhida (arraste)</Title>
          <View style={{ width: "100%", zIndex: 995 }}>
            <View style={{ width: "100%", flexDirection: "row", zIndex: 999, marginTop: 10}}>
              <View style={{ width: "25%", height: 75, margin: "auto" }}>
                <Draggable x={10} y={0} imageSource={m1} renderSize={75} shouldReverse={true} />
              </View>
              <View style={{ width: "25%", height: 75, margin: "auto" }}>
                <Draggable x={10} y={0} imageSource={m2} renderSize={75} shouldReverse={true} />
              </View>
              <View style={{ width: "25%", height: 75, margin: "auto" }}>
                <Draggable x={10} y={0} imageSource={m3} renderSize={75} shouldReverse={true} />
              </View>
              <View style={{ width: "25%", height: 75, margin: "auto" }}>
                <Draggable x={10} y={0} imageSource={m4} renderSize={75} shouldReverse={true} onDragRelease={(a) => {
                  var xCalc = a.nativeEvent.pageX - a.nativeEvent.locationX;
                  var yCalc = a.nativeEvent.pageY - a.nativeEvent.locationY;
                  if ((xCalc + 50 > pageXMosquito && pageXMosquito > xCalc - 50) && (yCalc + 50 > pageYMosquito && pageYMosquito > yCalc - 50)) {
                    finish();
                  }
                }} />
              </View>
            </View>
            <ImageContent2 source={casa} style={{ width: "100%", height: "75%", margin: "auto" }} resizeMode="contain" />
            <View style={{ width: 100, height: "100%", margin: "auto", position: "absolute", top: 240, left: 245 }} onLayout={event => {
              event.target.measure((x, y, a, b, pageX, pageY) => {
                setPageXMosquito(pageX); setPageYMosquito(pageY);
              })
            }}>
              <ImageContent2 source={mosquito} style={{ width: "100%", height: 50, margin: "auto" }} resizeMode="contain" />
            </View>
          </View>

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => setVisible(false)}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Você marcou as opções incorretas, tente novamente</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => setVisible(false)}>
                <Text style={{ color: '#FFFFFF' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { D6 };

