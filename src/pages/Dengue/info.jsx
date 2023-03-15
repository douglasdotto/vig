import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { dengueData, DENGUE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";
import {Shadow} from 'react-native-shadow-2';

import jogador from "../../assets/d1/Jogador.png";
import pneu from "../../assets/d1/pneu.png";
import pneu1 from "../../assets/d1/pneu1.png";
import pneu2 from "../../assets/d1/pneu2.png";
import pneu3 from "../../assets/d1/pneu3.png";
import pneu4 from "../../assets/d1/pneu4.png";
import pneu5 from "../../assets/d1/pneu5.png";
import pneu6 from "../../assets/d1/pneu6.png";
import background from "../../assets/d7/teste.png";

import dengue from "../../assets/dengue.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, PView5, PView6, SubTitleShadow, Title, Content} from "./styles";

function DengueInfo() {
  const navigation = navigationRoute();

  const [nivel, setNivel] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState(null);

  useEffect(() => {
    async function call() {
      setLoading(true);
      var d = await dengueData();
      if (d == null) {
        var newDataDengue = {
          nivel: 0,
          erros: 0,
          nivel1: 0,
          nivel2: 0,
          nivel3: 0,
          nivel4: 0,
          nivel5: 0,
          nivel6: 0,
        }
        await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(newDataDengue));
        setNivel(0);
      } else {
        if (d.nivel1 && d.nivel2 && d.nivel3 && d.nivel4 && d.nivel5 && d.nivel6) {
          setNivel(7);
          setErros(0);
        } else {
          setNivel(d.nivel);
          setErros(d.erros);
        }
      }
      setLoading(false);
    }

    call();
  }, [newGame])

  async function jogar() {    
      navigation.replace("Dengue");    
  }

 

  function handleResetApp() {
    AsyncStorage.removeItem(DENGUE_DATA);
    
  }

  async function novoJogo() {
    handleResetApp();
    navigation.replace("Welcome");
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        <View style={{ height: 500 }}>            
            <Content style={{ textAlign: "center" }}>
              <Shadow distance={35}>
                <Title>Desafio da Dengue!</Title>
              </Shadow>
              <ImageContent
              source={dengue}
              style={{ width: 150, height: 120, marginTop: 20, marginBottom: 20 }}
              resizeMode="contain"
            />
              <SubTitleShadow>Dengue é uma doença transmitida por um mosquito preto com listras brancas. Ele nasce em lugares com água parada.</SubTitleShadow>            
            </Content>        
        <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar </>} onPress={() => jogar()} />
        </View>
      </Container>
    </ImageBackground >
  );
}

export { DengueInfo };

