import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av';
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import background from "../../assets/d7/teste5.png";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { navigationRoute } from "../../utils/navigation";
import {
  Container,
  Content,
  ImageContent,
  SubTitleShadow,
  Title
} from "./styles";

import {
  DENGUE_DATA,
  LEPTOSPIROSE_DATA,
  TOXOPLASMOSE_DATA
} from "../../libs/storage";

import dengue from "../../assets/bottom-dengue.png";
import toxoplasmose from "../../assets/bottom-gato.png";
import leptospirose from "../../assets/bottom-lepto.png";

function Bottom() {
  const navigation = navigationRoute();
  const [audio, setAudio] = useState(true);

  useEffect(() => {
    setAudio(true);
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/EXTRAS/parabens.wav")
      );
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
          call2();
        }
      });
    }

    call();
  }, [])

  async function call2() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/falas/EXTRAS/parodia.wav")
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        await sound.unloadAsync();
        setAudio(false);
      }
    });
  }

  async function handleReset() {
    AsyncStorage.removeItem(DENGUE_DATA);
    AsyncStorage.removeItem(LEPTOSPIROSE_DATA);
    AsyncStorage.removeItem(TOXOPLASMOSE_DATA);
    navigation.replace("Welcome");
  }

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <Container>
        <Content style={{ marginTop: 20 }}>
          <View>
            <SubTitleShadow>
              <Title style={{ paddingHorizontal: 40 }}>
                Parabéns pela conquista, você completou todos os desafios e agora é um vigilante sanitário!
              </Title>
            </SubTitleShadow>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <ImageContent
              style={{ flex: 2, width: 120, height: 140 }}
              source={dengue}
              resizeMode="contain"
            />
            <ImageContent
              style={{ flex: 2, width: 120, height: 140 }}
              source={leptospirose}
              resizeMode="contain"
            />
            <ImageContent
              style={{ flex: 2, width: 120, height: 140 }}
              source={toxoplasmose}
              resizeMode="contain"
            />
          </View>
          {!audio && <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={'Créditos'} onPress={() => navigation.replace("Creditos")} />}
          {!audio && <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={'Voltar para o início'} onPress={() => handleReset()} />}
        </Content>
      </Container>
    </ImageBackground >
  );
}

export { Bottom };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraC: {
    width: 250,
    height: 250,

    borderRadius: 120,
    overflow: 'hidden'
  },
  camera: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
