import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { navigationRoute } from "../../utils/navigation";

import { Container, Content, Title, ImageContent } from "./styles";

import background from "../../assets/d7/céu.png";
import dengue from "../../assets/dengue.png";
import { getData } from "../../libs/storage";

function Welcome() {
  const navigation = navigationRoute();

  function handleStart() {
    navigation.replace("Dengue");
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <Container>
        <Content>
          <Title>
            Qual jogo você quer jogar?
          </Title>

          <View onTouchStart={handleStart}>
            <ImageContent source={dengue} resizeMode="contain" />
          </View>

          <View>
            <ImageContent source={dengue} resizeMode="contain" />
          </View>
        </Content>
      </Container>
    </ImageBackground>
  );
}

export { Welcome };
