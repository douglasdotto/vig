import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { navigationRoute } from "../../utils/navigation";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, Content, Title, ProEdu, ImageContent } from "./styles";
import { dengueData, DENGUE_DATA } from "../../libs/storage";

import background from "../../assets/d7/teste.png";
import dengue from "../../assets/dengue.png";
import { colors } from "../../theme";

function Welcome() {
  const navigation = navigationRoute();

  function handleStart() {
    navigation.replace("Dengue");
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <Container>
        <Content>
          <ProEdu>
            ProEDU
          </ProEdu>
          <Title>
            Qual jogo você quer jogar?
          </Title>

          <View onTouchStart={handleStart}>
            <ImageContent source={dengue} resizeMode="contain" />
          </View>

          <Title style={{ position: 'absolute', bottom: 20, color: colors.yellow }} onTouchStart={() => AsyncStorage.removeItem(DENGUE_DATA)}>
            <Ionicons name="refresh-circle-outline" size={36} color={colors.yellow} /> Reiniciar
          </Title>
          {/* 
          <View>
            <ImageContent source={dengue} resizeMode="contain" />
          </View> */}
        </Content>
      </Container>
    </ImageBackground>
  );
}

export { Welcome };
