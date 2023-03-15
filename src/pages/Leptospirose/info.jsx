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
import leptospirose from "../../assets/leptospirose.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, PView5, PView6, SubTitleShadow, Title2, Content} from "./styles";

function LeptoInfo() {
  const navigation = navigationRoute();

  async function jogar() {    
      navigation.replace("Leptospirose");    
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
                <Title2>Desafio da Leptospirose!</Title2>
              </Shadow>
              <ImageContent
              source={leptospirose}
              style={{ width: 150, height: 120, marginTop: 30, marginBottom: 20, marginLeft: 110}}
              resizeMode="contain"
            />
              <SubTitleShadow>Leptospirose é uma doença que se pega em contato com xixi ou o cocô do rato ou água de esgoto.</SubTitleShadow>            
            </Content>        
        <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar </>} onPress={() => jogar()} />
        </View>
      </Container>
    </ImageBackground >
  );
}

export { LeptoInfo };

