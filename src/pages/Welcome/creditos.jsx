import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef, useEffect } from "react";
import { ImageBackground, ScrollView } from "react-native";
import { navigationRoute } from "../../utils/navigation";

import background from "../../assets/d7/teste.png";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Container, Content, Title2, VIG } from "./styles";

import {
  DENGUE_DATA,
  LEPTOSPIROSE_DATA,
  TOXOPLASMOSE_DATA
} from "../../libs/storage";

function Creditos() {
  const navigation = navigationRoute();

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
          <ScrollView>
            <VIG style={{ marginTop: 5, textAlign: "left" }}>Créditos - Projeto:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Profa. Dra. Daniela Duarte da Silva Bagatini</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Profa. Dra. Janine Koepp</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Profa. Dra. Liane Mahlmann Kipper</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Profa. Dra. Rejane Frozza</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Bolsistas de iniciação científica:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Alexia Garibaldi</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Ezequiel Servegnini Nunes</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Gislaine Zandonoto</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>João Medeiros</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Marcos Vinicius Stahler Pires</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Rayane Severo Puntel</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Universidade de Santa Cruz do Sul - UNISC</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Departamento de Engenharias, Arquitetura e Computação</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Programa de Pós-Graduação em Sistemas e Processos Industriais</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Programa de Pós-Graduação em Promoção da Saúde</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Desenvolvimento do aplicativo:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Douglas Dotto</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Designer: </VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Maicon Cássio Riediger</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Apoio: Edital FAPERGS SEBRAE/RS 03/2021 – Programa de apoio a projetos de pesquisa e de inovação na área de Educação Básica - PROEdu</VIG>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Dublagem:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Menina: Monique Tiecher</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Gravação e Edição: Ismael Dias e Lucas Marques</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Música:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Vozes ou vocais: Pablo Melo, Cássio Fruet</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Violão: Pablo Melo</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Gravação e mixagem: Ismael Dias</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Foleys:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Ismael Dias</Title2>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Luís Alexandre</Title2>

            <VIG style={{ marginTop: 45, textAlign: "left" }}>Apoio técnico e criativo:</VIG>
            <Title2 style={{ marginTop: 5, textAlign: "left" }}>Laboratórios dos cursos das Comunicação Social da Universidade de Santa Cruz do Sul</Title2>

            <ButtonPrimary style={{ marginTop: 20, marginBottom: 20 }} title={'Voltar para o início'} onPress={() => handleReset()} />
          </ScrollView>
        </Content>
      </Container>
    </ImageBackground>
  );
}

export { Creditos };

