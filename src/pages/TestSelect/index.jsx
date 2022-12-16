import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

import { Load } from "../../components/Load";
import { Header } from "../../components/Header";
import { TestCardPrimary } from "../../components/TestCardPrimary";

import { navigationRoute } from "../../utils/navigation";
import { api, endpoints } from "../../services/api";

import { Container, HeaderContent, Title, SubTitle, Tests } from "./styles";

function TestSelect() {
  const navigation = navigationRoute();

  const [TestsList, setTestsList] = useState([]);
  const [patient, setPatient] = useState([]);
  const [patientSelected, setPatientSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let Test = [{
      key: '1',
      title: 'Teste de Sintomas',
      subtitle: 'Informar sintomas que o profissional percebeu ou relatados pelo familiar, na aba de tutoriais tem informações que podem ser úteis para o preenchimento correto deste formulário'
    },
    {
      key: '2',
      title: 'Pfeffer',
      subtitle: 'Questionário de atividades funcionais de Pfeffer'
    },
    {
      key: '3',
      title: 'CDR',
      subtitle: 'Escala de avaliação clínica da demência'
    },
    {
      key: '4',
      title: 'GDS',
      subtitle: 'Escala de depressão geriátrica'
    },
    {
      key: '5',
      title: 'MEEM',
      subtitle: 'Mini Exame do Estado Mental'
    },
    {
      key: '6',
      title: 'MoCA',
      subtitle: 'Montreal Cognitive Assessment'
    }];
    setTestsList(Test);

    async function loadPatients() {
      var result = await api.post(`${endpoints.user.getPatients}`, null);
      if (result.data.statusCode === 200) {
        setPatient(result.data.response.data);
      }
    }

    loadPatients();

    setLoading(false);
  }, [])

  async function testSelected(key) {
    if (key == 1)
      navigation.navigate("TestMain");
  }

  return (
    <Container>
      <HeaderContent>
        <Header />

        <Title>A maior riqueza é a saúde. :D</Title>
        <SubTitle>Selecione qual teste deseja aplicar</SubTitle>
      </HeaderContent>

      {loading ?
        <Load />
        :
        <ScrollView style={{ marginTop: 10 }}>
          {patientSelected == null ?
            <Tests>
              <Title>Selecione um paciente</Title>
              <Picker onValueChange={(itemValue) => { if (itemValue != "null") { setPatientSelected(itemValue) } }}>
                <Picker.Item label="Nenhum selecionado" value="null" />
                {patient && patient.map((e) => {
                  return <Picker.Item label={e.firstName + " " + e.lastName} value={e.id} key={e.id} />;
                })}
              </Picker>
            </Tests>
            :
            <Tests>
              {TestsList.map((item) => <TestCardPrimary onPress={() => testSelected(item.key)} key={item.key} data={item} />)}
            </Tests>
          }
        </ScrollView>
      }
    </Container>
  );
}

export { TestSelect };
