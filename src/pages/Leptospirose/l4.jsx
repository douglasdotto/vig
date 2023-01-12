import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load, Medal } from "../../components/Load";

import { leptospiroseData, LEPTOSPIROSE_DATA} from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import background1 from "../../assets/l5/cena1.png";
import background2 from "../../assets/l5/cena2.png";
import background3 from "../../assets/l5/cena3.png";
import background4 from "../../assets/l5/cena4.png";
import m1 from "../../assets/l5/rato1.png";
import m2 from "../../assets/l5/rato2.png";
import m3 from "../../assets/l5/rato3.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, Title } from "./styles";

function L4() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [items, setItems] = useState([]);
  const [erros, setErros] = useState(0);

  async function check(item) {
    var exist = items.find(x => x == item);
    var oldItems = [...items];
    if (exist == null)
      oldItems.push(item);
    else
      oldItems = oldItems.filter(x => x != item);
    setItems(oldItems);
  }

  useEffect(() => {
    if (items.length == 3) {
      setNivelConcluido(true);
      async function fetchData() {
        var d = await leptospiroseData();
        if (d != null) {
          if (d.erros > 0 && d.nivel4 == 0)
            d.erros -= 1;
          if (d.nivel < 4 && d.nivel4 == 0)
            d.nivel = 4;
          if (d.nivel4 == 0)
            d.nivel4 = 1;
          await AsyncStorage.setItem(LEPTOSPIROSE_DATA, JSON.stringify(d));
        }
      }
      fetchData();
    }
  }, [items])

  useEffect(() => {    
      var d = leptospiroseData();
        if (d != null) {
          setErros(d.erros)
        }
  }, [])

  async function next() {
    navigation.replace("Leptospirose");
  }

  return (
    <ImageBackground source={erros <= 1 ? background1 : erros == 2 ? background2 : erros == 3 ? background3 : erros >= 4 ? background4 : background1} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Leptospirose"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou o nível 4!</Title>
          <Medal />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Encontre o rato!</Title>
          <View style={{ position: "absolute", left: 0, bottom: 0, height: 100, width: 100 }} onTouchStart={() => check(1)}>
            <ImageContent source={m1} style={{ width: (items.find(x => x == 1) != null ? "100%" : "75%"), height: (items.find(x => x == 1) != null ? "100%" : "75%") }} resizeMode="contain" />
          </View>
          <View style={{ position: "absolute", left: 100, bottom: 50, height: 100, width: 100 }} onTouchStart={() => check(2)}>
            <ImageContent source={m2} style={{ width: (items.find(x => x == 2) != null ? "100%" : "75%"), height: (items.find(x => x == 2) != null ? "100%" : "75%") }} resizeMode="contain" />
          </View>
          <View style={{ position: "absolute", right: 10, bottom: 40, height: 100, width: 100 }} onTouchStart={() => check(3)}>
            <ImageContent source={m3} style={{ width: (items.find(x => x == 2) != null ? "100%" : "75%"), height: (items.find(x => x == 3) != null ? "100%" : "75%") }} resizeMode="contain" />
          </View>
        </>}
      </Container>
    </ImageBackground >
  );
}

export { L4 };

