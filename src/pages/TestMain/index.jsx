import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { Load } from "../../components/Load";
import { Header } from "../../components/Header";
import { TestCardCheckbox } from "../../components/TestCardCheckbox";
import { Button } from "../../components/Button";

import { api, endpoints } from "../../services/api";
import { getData } from "../../libs/storage";

import { Container, HeaderContent, Title, Title2, SubTitle, Tests } from "./styles";

function TestMain() {
  const [loading, setLoading] = useState(true);
  const [listaSintomas, setListaSintomas] = useState([]);
  const [dataCheck, setDataCheck] = useState([]);

  useEffect(() => {
    async function calltest() {
      setLoading(true);
      var result = await api.post(`${endpoints.app.getSintomas}`, null);
      if (result.data.statusCode === 200) {
        setListaSintomas(result.data.response);
      }
      setLoading(false);
    }

    calltest();
  }, [])

  async function funcCheck(sintoma) {
    var sint = dataCheck.filter(x => x == sintoma);
    if (sint.length == 0)
      setDataCheck([...dataCheck, sintoma])
    else
      setDataCheck(dataCheck.filter((x) => (x !== sintoma)))
  }

  async function sendTestMain() {
    setLoading(true);
    const user = await getData();
    var listaA = [];
    dataCheck.map((a) => {
      var data = {
        userId: "",
        sintomasId: a,
        createdBy: user.id
      };
      listaA.push(data);
    });

    var result = await api.post(`${endpoints.app.insertTesteSintoma}`, listaA);
    if (result.statusCode === 200) {

    }
    setLoading(false);
  }

  return (
    <Container>
      <HeaderContent>
        <Header />

        <Title>Teste de Sintomas - <Title2>{dataCheck.length}</Title2> selecionado(s)</Title>
        <SubTitle>Sintomas que o profissional percebeu ou relatados pelo familiar</SubTitle>
      </HeaderContent>

      {loading ?
        <Load />
        :
        <ScrollView style={{ marginTop: 10 }}>
          <Tests>
            <Title>ATENÇÃO COMPLEXA (Atenção sustentada, dividida, seletiva e velocidade de processamento)</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 11 || x.doenca1 == 12).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Title>FUNÇÃO EXECUTIVA (Planejamento, tomada de decisão, memória de trabalho, resposta a feedback e correção de erros, substituir hábitos/inibição e flexibilidade mental)</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 21 || x.doenca1 == 22).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Title>APRENDIZAGEM E MEMÓRIA (Memória imeadiata, recente (incluindo recordação livre, recordação por pistas e memória de reconhecimento), longo prazo (semântica e autobiográfica) e aprendizagem implícita)</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 31 || x.doenca1 == 32).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Title>LINGUAGEM (Linguagem expressiva (inclui nomeação, encontrar palavras, fluência, gramática e sintaxe) e receptiva)</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 41 || x.doenca1 == 42).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Title>PERCEPTOMOTOR (Percepção visual, visuoconstrutiva, práxis (utilização de uma teoria ou conhecimento de maneira prática) e gnosia(reconhecimento dos objetos por intermédio de um dos sentidos: visual, auditiva, etc))</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 51 || x.doenca1 == 52).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Title>COGNIÇÃO SOCIAL (Reconhecimento de emoções e teoria da mente)</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 61 || x.doenca1 == 62).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Title>Outros sintomas (específicos de determinadas doenças)</Title>
            {listaSintomas != null ? listaSintomas.filter(x => x.doenca1 == 71).map((item) => {
              return <TestCardCheckbox key={item.sintomasId} checked={dataCheck.includes(item.sintomasId)} funcCheck={funcCheck} data={item} />;
            }) : null}

            <Button title="ENVIAR TESTE" onPress={() => sendTestMain()} />
          </Tests>
        </ScrollView>
      }
    </Container>
  );
}

export { TestMain };
