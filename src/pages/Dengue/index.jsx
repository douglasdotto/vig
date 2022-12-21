import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Load } from "../../components/Load";
import { Header } from "../../components/Header";

import { navigationRoute } from "../../utils/navigation";
import { dengueData, DENGUE_DATA } from "../../libs/storage";

import background from "../../assets/d7/teste.png";
import pneu6 from "../../assets/d1/pneu6.png";
import pneu5 from "../../assets/d1/pneu5.png";
import pneu4 from "../../assets/d1/pneu4.png";
import pneu3 from "../../assets/d1/pneu3.png";
import pneu2 from "../../assets/d1/pneu2.png";
import pneu1 from "../../assets/d1/pneu1.png";
import pneu from "../../assets/d1/pneu.png";

import { Container, HeaderContent, ImageContent, Title, PView1, PView2, PView3, PView4, PView5, PView6 } from "./styles";

function Dengue() {
  const navigation = navigationRoute();

  const [nivel, setNivel] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      var d = await dengueData();
      if (d == null) {
        var newDataDengue = {
          nivel: 1,
          nivel1: 0,
          nivel2: 0,
          nivel3: 0,
          nivel4: 0,
          nivel5: 0,
          nivel6: 0,
        }
        await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(newDataDengue));
        setNivel(1);
      } else {
        setNivel(d.nivel);
      }
      setLoading(false);
    }

    call();
  }, [])

  async function nivel1() {
    navigation.replace("DengueF1");
  }

  async function nivel2() {
    navigation.replace("DengueF2");
  }

  async function nivel3() {
    navigation.replace("DengueF3");
  }

  async function nivel4() {
    var newDataDengue = {
      nivel: 4,
      nivel1: 1,
      nivel2: 1,
      nivel3: 1,
      nivel4: 1,
      nivel5: 0,
      nivel6: 0,
    }
    await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(newDataDengue));
    setNivel(newDataDengue.nivel);
  }

  async function nivel5() {
    var newDataDengue = {
      nivel: 5,
      nivel1: 1,
      nivel2: 1,
      nivel3: 1,
      nivel4: 1,
      nivel5: 1,
      nivel6: 0,
    }
    await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(newDataDengue));
    setNivel(newDataDengue.nivel);
  }

  async function nivel6() {
    var newDataDengue = {
      nivel: 6,
      nivel1: 1,
      nivel2: 1,
      nivel3: 1,
      nivel4: 1,
      nivel5: 1,
      nivel6: 1,
    }
    await AsyncStorage.setItem(DENGUE_DATA, JSON.stringify(newDataDengue));
    setNivel(newDataDengue.nivel);
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        {nivel == 7 ? <View style={{ height: 200 }}>
          <Load />
          <Title>Parabéns você completou o desafio da dengue!</Title>
        </View> : <Title>Você está no nível {nivel}</Title>}
        <View style={{ position: "relative", height: 300 }}>
          <PView1 onTouchStart={() => nivel >= 0 ? nivel1() : null}></PView1>
          <PView2 onTouchStart={() => nivel >= 1 ? nivel2() : null}></PView2>
          <PView3 onTouchStart={() => nivel >= 2 ? nivel3() : null}></PView3>
          <PView4 onTouchStart={() => nivel >= 3 ? nivel4() : null}></PView4>
          <PView5 onTouchStart={() => nivel >= 4 ? nivel5() : null}></PView5>
          <PView6 onTouchStart={() => nivel >= 5 ? nivel6() : null}></PView6>
          <ImageContent source={nivel == 1 ? pneu6 : nivel == 2 ? pneu5 : nivel == 3 ? pneu4 : nivel == 4 ? pneu3 : nivel == 5 ? pneu2 : nivel == 6 ? pneu1 : pneu} resizeMode="contain" />
        </View>
      </Container>
    </ImageBackground >
  );
}

export { Dengue };
