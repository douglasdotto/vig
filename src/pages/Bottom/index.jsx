import { Audio } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import background from "../../assets/d7/teste.png";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { navigationRoute } from "../../utils/navigation";
import {
  Container,
  Content
} from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../theme";

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
    console.log(pho)
    setImage(pho.uri);
  }

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <Container>
        <Content style={{ marginTop: 50 }}>
          <View style={styles.cameraC}>
            {!image && <><Camera style={styles.camera} type={CameraType.front} ref={ref => setCamera(ref)}>
              <View style={styles.buttonContainer}>
              </View>
            </Camera>
              <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Tirar Foto </>} onPress={() => takePhoto()} />
            </>}
            {image && <>
              <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 50 }} />
              <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={<><Ionicons name="enter" size={24} color={colors.white} /> Tirar outra </>} onPress={() => setImage(null)} />
            </>}
          </View>
        </Content>
      </Container>
    </ImageBackground>
  );
}

export { Bottom };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraC: {
    width: 350,
    height: 350,
  },
  camera: {
    width: 350,
    height: 350,
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
