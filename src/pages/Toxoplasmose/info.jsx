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

import background from "../../assets/d7/teste.png";
import toxoplasmose from "../../assets/Gato-1.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, PView5, PView6, SubTitleShadow, Title2, Content} from "./styles";

function ToxoInfo() {
  const navigation = navigationRoute();

  async function jogar() {    
      navigation.replace("Toxoplasmose");    
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        <View style={{ height: 500 }}>            
            <Content style={{ textAlign: "center" }}>
              <SubTitleShadow>
                <Title2>Desafio da Toxoplasmose!</Title2>
              </SubTitleShadow>
              <ImageContent
              source={toxoplasmose}
              style={{ width: 150, height: 120, marginTop: 30, marginBottom: 20, marginLeft: 95}}
              resizeMode="contain"
            />
              <SubTitleShadow>Toxoplasmose é um parasita encontrado no cocô do gato e em alimentos contaminados. Causa dor e febre.</SubTitleShadow>            
            </Content>        
        <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar </>} onPress={() => jogar()} />
        </View>
      </Container>
    </ImageBackground >
  );
}

export { ToxoInfo };

