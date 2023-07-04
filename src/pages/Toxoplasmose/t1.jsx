import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { toxoplasmoseData, TOXOPLASMOSE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";
import Draggable from 'react-native-draggable';

import m1 from "../../assets/t2/Gato02.png";
import m2 from "../../assets/t2/Contaminacao02.png";
import m3 from "../../assets/t2/Colher02.png";
import m4 from "../../assets/t2/Comer02.png";
import background from "../../assets/t2/fundovazio.png";

import background2 from "../../assets/d7/teste2.png";
import dorisatencao from "../../assets/doris/atencao.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent2, Title, SubTitleShadow, ImageContent } from "./styles";
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { Audio } from 'expo-av';

function T1() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [visible, setVisible] = useState(false);
  const [gatoVisible, setGatoVisible] = useState(false);
  const [cocoVisible, setCocoVisible] = useState(false);
  const [colherVisible, setColherVisible] = useState(false);
  const [comerVisible, setComerVisible] = useState(false);
  const [pageXGato, setPageXGato] = useState(0);
  const [pageYGato, setPageYGato] = useState(0);
  const [pageXCoco, setPageXCoco] = useState(0);
  const [pageYCoco, setPageYCoco] = useState(0);
  const [pageXColher, setPageXColher] = useState(0);
  const [pageYColher, setPageYColher] = useState(0);
  const [pageXComer, setPageXComer] = useState(0);
  const [pageYComer, setPageYComer] = useState(0);
  const [errosLocal, setErrosLocal] = useState(0);

  const [audio, setAudio] = useState(true);

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/TOXOPLASMOSE/arraste.wav")
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
    if (comerVisible && colherVisible && cocoVisible && gatoVisible) {
      setTimeout(() => {
        setNivelConcluido(true);
        playSound();
        async function fetchData() {
          var d = await toxoplasmoseData();
          if (d != null) {
            if (d.erros > 0 && d.nivel1 == 0)
              d.erros -= 1;
            if (d.nivel < 1 && d.nivel1 == 0)
              d.nivel = 1;
            if (d.nivel1 == 0)
              d.nivel1 = 1;
            await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
          }
        }
        fetchData();
      }, 1000);
    }
  }, [comerVisible, colherVisible, cocoVisible, gatoVisible])

  async function erro() {
    var d = await toxoplasmoseData();
    if (d != null) {
      d.erros += 1;
      await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(d));
      setErrosLocal(errosLocal + 1)
    }
    setVisible(true);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/congrats.mp3")
    );
    await sound.playAsync();
  }

  async function next() {
    navigation.replace("ToxoplasmoseF2");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Toxoplasmose"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <SubTitleShadow><Title>Parabéns, você acertou o nível 1!</Title></SubTitleShadow>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <SubTitleShadow><Title style={{ fontSize: 20 }}>Ciclo de transmissão</Title></SubTitleShadow>
          {audio ? <ImageContent
            source={dorisatencao}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          /> : <>
            <View style={{ width: "100%", zIndex: 995 }}>
              <View style={{ width: "100%", height: 130, flexDirection: "row", zIndex: 999 }}>
                {gatoVisible == false && <View style={{ width: "25%", height: 100, margin: "auto" }}>
                  <Draggable x={10} y={0} imageSource={m1} renderSize={75} shouldReverse={true} onDragRelease={(a) => {
                    var xCalc = a.nativeEvent.pageX - a.nativeEvent.locationX;
                    var yCalc = a.nativeEvent.pageY - a.nativeEvent.locationY;
                    if ((xCalc + 50 > pageXGato && pageXGato > xCalc - 50) && (yCalc + 50 > pageYGato && pageYGato > yCalc - 50)) {
                      setGatoVisible(true);
                    }
                    else {
                      erro();
                    }
                  }} />
                </View>
                }
                {cocoVisible == false &&
                  <View style={{ width: "25%", height: 100, margin: "auto" }}>
                    <Draggable x={10} y={0} imageSource={m2} renderSize={75} shouldReverse={true} onDragRelease={(a) => {
                      var xCalc = a.nativeEvent.pageX - a.nativeEvent.locationX;
                      var yCalc = a.nativeEvent.pageY - a.nativeEvent.locationY;
                      if ((xCalc + 50 > pageXCoco && pageXCoco > xCalc - 50) && (yCalc + 50 > pageYCoco && pageYCoco > yCalc - 50)) {
                        setCocoVisible(true);
                      }
                      else {
                        erro();
                      }
                    }} />
                  </View>
                }
                {colherVisible == false &&
                  <View style={{ width: "25%", height: 180, margin: "auto" }}>
                    <Draggable x={10} y={0} imageSource={m3} renderSize={75} shouldReverse={true} onDragRelease={(a) => {
                      var xCalc = a.nativeEvent.pageX - a.nativeEvent.locationX;
                      var yCalc = a.nativeEvent.pageY - a.nativeEvent.locationY;
                      if ((xCalc + 50 > pageXColher && pageXColher > xCalc - 50) && (yCalc + 50 > pageYColher && pageYColher > yCalc - 50)) {
                        setColherVisible(true);
                      }
                      else {
                        erro();
                      }
                    }} />
                  </View>
                }
                {comerVisible == false &&
                  <View style={{ width: "25%", height: 100, margin: "auto" }}>
                    <Draggable x={10} y={0} imageSource={m4} renderSize={75} shouldReverse={true} onDragRelease={(a) => {
                      var xCalc = a.nativeEvent.pageX - a.nativeEvent.locationX;
                      var yCalc = a.nativeEvent.pageY - a.nativeEvent.locationY;
                      if ((xCalc + 50 > pageXComer && pageXComer > xCalc - 50) && (yCalc + 50 > pageYComer && pageYComer > yCalc - 50)) {
                        setComerVisible(true);
                      }
                      else {
                        erro();
                      }
                    }} />
                  </View>
                }
              </View>
              <View style={{ width: 100, height: "100%", margin: "auto", position: "absolute", top: 120, left: 30 }} onLayout={event => {
                event.target.measure((x, y, a, b, pageX, pageY) => {
                  setPageXGato(pageX); setPageYGato(pageY);
                })
              }}>
              </View>
              <View style={{ width: 100, height: "100%", margin: "auto", position: "absolute", top: 285, left: 250 }} onLayout={event => {
                event.target.measure((x, y, a, b, pageX, pageY) => {
                  setPageXCoco(pageX); setPageYCoco(pageY);
                })
              }}>
              </View>
              <View style={{ width: 100, height: "100%", margin: "auto", position: "absolute", top: 400, left: 30 }} onLayout={event => {
                event.target.measure((x, y, a, b, pageX, pageY) => {
                  setPageXColher(pageX); setPageYColher(pageY);
                })
              }}>
              </View>
              <View style={{ width: 100, height: "100%", margin: "auto", position: "absolute", top: 540, left: 250 }} onLayout={event => {
                event.target.measure((x, y, a, b, pageX, pageY) => {
                  setPageXComer(pageX); setPageYComer(pageY);
                })
              }}>
              </View>

              {
                gatoVisible == true && <ImageContent2 source={m1} style={{ width: "100%", height: 140, position: "absolute", top: 130, left: -107, margin: "auto" }} resizeMode="contain" />
              }
              {
                cocoVisible == true && <ImageContent2 source={m2} style={{ width: "100%", height: 190, position: "absolute", top: 235, left: 105, margin: "auto" }} resizeMode="contain" />
              }
              {
                colherVisible == true && <ImageContent2 source={m3} style={{ width: "100%", height: 200, position: "absolute", top: 350, left: -107, margin: "auto" }} resizeMode="contain" />
              }
              {
                comerVisible == true && <ImageContent2 source={m4} style={{ width: "100%", height: 140, position: "absolute", top: 550, left: 110, margin: "auto" }} resizeMode="contain" />
              }
            </View>
          </>}

          <FancyAlert
            style={{ backgroundColor: '#EEEEEE', borderRadius: 15 }}
            icon={<View onTouchStart={() => errosLocal >= 5 ? navigation.replace("Toxoplasmose") : setVisible(false)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C3272B', width: '100%', borderRadius: 32 }}><Ionicons name={'md-close'} size={36} color="#FFFFFF" /></View>}
            onRequestClose={() => setVisible(false)}
            visible={visible}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -16, marginBottom: 16, }}>
              <Text>Você marcou as opções incorretas, tente novamente</Text>
              <TouchableOpacity style={{ borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, alignSelf: 'stretch', backgroundColor: '#C3272B', marginTop: 16, minWidth: '50%', paddingHorizontal: 16, }} onPress={() => errosLocal >= 5 ? navigation.replace("Toxoplasmose") : setVisible(false)}>
                <Text style={{ color: '#FFFFFF' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { T1 };

