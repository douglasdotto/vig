import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Load } from "../../components/Load";
import { Header } from "../../components/Header";

import { navigationRoute } from "../../utils/navigation";
import { dengueData, DENGUE_DATA } from "../../libs/storage";

import background from "../../assets/d7/teste.png";
import background2 from "../../assets/d7/teste2.png";

import { Container, HeaderContent, ImageContent, Title } from "./styles";
import { colors } from "../../theme";

function D4() {
  const navigation = navigationRoute();

  const [nivelConcluido, setNivelConcluido] = useState(false);
  const [items, setItems] = useState([]);

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
    if (items.length == 2) {
      setNivelConcluido(true);
      async function fetchData() {
        var d = await dengueData();
        if (d != null) {
          if (d.nivel < 4 && d.nivel4 == 0)
            d.nivel = 4;
          if (d.nivel4 == 0)
            d.nivel4 = 1;
          await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(d));
        }
      }
      fetchData();
    }
  }, [items])

  async function next() {
    navigation.replace("DengueF5");
  }

  return (
    <ImageBackground source={nivelConcluido ? background2 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header backRoute={"Dengue"} />
      </HeaderContent>
      <Container>
        {nivelConcluido && <>
          <Title>Parabéns, você acertou o nível 3!</Title>
          <Load />
          <View style={{ marginBottom: 25, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.heading} /> Próximo Nível</>} onPress={next} />
            </View>
          </View>
        </>}
        {!nivelConcluido && <>
          <Title>Associe os sintomas:</Title>

        </>}
      </Container>
    </ImageBackground >
  );
}

export { D4 };
