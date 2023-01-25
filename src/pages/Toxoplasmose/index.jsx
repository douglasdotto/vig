import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import { toxoplasmoseData, TOXOPLASMOSE_DATA } from "../../libs/storage";
import { navigationRoute } from "../../utils/navigation";

import jogador from "../../assets/l1/Jogador.png";

import background1 from "../../assets/t1/fundo1.png";
import background2 from "../../assets/t1/fundo2.png";
import background3 from "../../assets/t1/fundo3.png";
import background4 from "../../assets/t1/fundo4.png";
import background from "../../assets/d7/teste.png";

import { colors } from "../../theme";
import { Container, HeaderContent, ImageContent, PView1, PView2, PView3, PView4, PView5, PView6, SubTitle, Title } from "./styles";

function Toxoplasmose() {
  const navigation = navigationRoute();

  const [nivel, setNivel] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      var d = await toxoplasmoseData();
      if (d == null) {
        var newData = {
          nivel: 0,
          erros: 0,
          nivel1: 0,
          nivel2: 0,
          nivel3: 0,
          nivel4: 0,
          nivel5: 0,
          nivel6: 0,
        }
        await AsyncStorage.setItem(TOXOPLASMOSE_DATA, JSON.stringify(newData));
        setNivel(0);
      } else {
        setNivel(d.nivel);
        setErros(d.erros);
      }
      setLoading(false);
    }

    call();
  }, [])

  async function nivel1() {
    navigation.replace("ToxoplasmoseF1");
  }

  async function nivel2() {
    navigation.replace("ToxoplasmoseF2");
  }

  async function nivel3() {
    navigation.replace("ToxoplasmoseF3");
  }

  async function nivel4() {
    navigation.replace("ToxoplasmoseF4");
  }

  function handleResetApp() {
    AsyncStorage.removeItem(TOXOPLASMOSE_DATA);    
  }

  async function novoJogo() {
    handleResetApp();
    navigation.replace("Welcome");
  }

  return (
    <ImageBackground source={erros <= 1 ? background1 : erros == 2 ? background2 : erros == 3 ? background3 : erros >= 4 ? background4 : background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
      <HeaderContent>
        <Header />
      </HeaderContent>
      <Container>
        {erros < 4 ? <>
          {nivel == 4 ? <View style={{ height: 200 }}>
            <Load />
            <Title>Parabéns, você completou o desafio da Toxoplasmose!</Title>
            <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Novo Jogo </>} onPress={() => {novoJogo() }} />
          </View> : nivel == 0 ? <><Title style={{ height: 75 }}>Desafio da Toxoplasmose!</Title></> : <View style={{ height: 100 }}><Title>Você está no nível {nivel}</Title></View>}
          {nivel < 3 && <>
            <View style={{ marginTop: 0, marginBottom: 5, margin: "auto" }}>
            <SubTitle>Erros: {erros}</SubTitle>
          </View>
          <View style={{ marginTop: 15, marginBottom: 15, margin: "auto" }}>
            <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Jogar nível {nivel + 1}</>} onPress={() => { nivel == 0 ? nivel1() : nivel == 1 ? nivel2() : nivel == 2 ? nivel3() : nivel4(); }} />
          </View>
          </>
          }
          
          <View style={{ position: "relative", height: 400, marginTop: 20 }}>
            <PView1 onTouchStart={() => nivel >= 0 ? nivel1() : null}>{nivel == 1 && <ImageContent source={jogador} style={{ bottom: 35, right: 140 }} resizeMode="contain" />}</PView1>
            <PView2 onTouchStart={() => nivel >= 1 ? nivel2() : null}>{nivel == 2 && <ImageContent source={jogador} style={{ bottom: -70, right: 245 }} resizeMode="contain" />}</PView2>
            <PView3 onTouchStart={() => nivel >= 2 ? nivel3() : null}>{nivel == 3 && <ImageContent source={jogador} style={{ top: 135, right: 30 }} resizeMode="contain" />}</PView3>
            <PView4 onTouchStart={() => nivel >= 3 ? nivel4() : null}>{nivel == 4 && <ImageContent source={jogador} style={{ top: 260, right: 120 }} resizeMode="contain" />}</PView4>            
            {/* <ImageContent style={{width: '110%', top: -90, left: -10}} source={erros <= 1 ? cano1 : erros == 2 ? cano2 : erros == 3 ? cano3 : erros == 4 ? cano4 : erros >= 5 ? cano5 : cano1} resizeMode="contain" /> */}
          </View>
          
          {nivel > 1 && <><SubTitle>Dica! O jogo te permite voltar e refazer as fases.</SubTitle></>}
        </> : <View>
        <Title style={{paddingTop: 200, paddingBottom: 30}}>Vamos tentar novamente?</Title>
        <ButtonPrimary title={<><Ionicons name="enter" size={24} color={colors.white} /> Novo Jogo </>} onPress={() => {novoJogo() }} />
        </View>}
      </Container> 
    </ImageBackground >
  );
}

export { Toxoplasmose };

