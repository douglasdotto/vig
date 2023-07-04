import { Audio } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import background from "../../assets/d7/teste5.png";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { navigationRoute } from "../../utils/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import toxoplasmose from "../../assets/Gato-1.png";
import dengue from "../../assets/dengue.png";
import leptospirose from "../../assets/leptospirose.png";

function Bottom() {
  const navigation = navigationRoute();

  useEffect(() => {
    async function call() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/falas/EXTRAS/parabens.wav")
      );
      await sound.playAsync();
    }
    call();
  }, [])

  async function call2() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/falas/EXTRAS/parodia.wav")
    );
    await sound.playAsync();
  }

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos de permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePhoto() {
    if (!camera) return
    var pho = await camera.takePictureAsync();
    setImage(pho.uri);
    call2();
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
        <Content style={{ marginTop: 50 }}>
          <View>
            {!image && <View style={styles.cameraC}>
              <Camera style={styles.camera} type={CameraType.front} ref={ref => setCamera(ref)}>
                <View style={styles.buttonContainer}>
                </View>
              </Camera>
            </View>}
            {!image && <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={'Tirar Foto'} onPress={() => takePhoto()} />}
          </View>

          {image && <>
            <View>
              <View style={styles.cameraC}>
                <Image source={{ uri: image }} style={{ flex: 1 }} />
              </View>
            </View>
            <View>
              <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={'Tirar outra'} onPress={() => setImage(null)} />
              <SubTitleShadow>
                <Title style={{ paddingHorizontal: 40 }}>
                  Parabéns pela conquista, você completou todos os desafios e agora é um vigilante sanitário!
                </Title>
              </SubTitleShadow>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <ImageContent
                style={{ flex: 2, width: 170, height: 140 }}
                source={dengue}
                resizeMode="contain"
              />
              <ImageContent
                style={{ flex: 2, width: 120, height: 100 }}
                source={leptospirose}
                resizeMode="contain"
              />
              <ImageContent
                style={{ flex: 2, width: 120, height: 90 }}
                source={toxoplasmose}
                resizeMode="contain"
              />
            </View>
            <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={'Voltar para o início'} onPress={() => handleReset()} />
          </>}
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
