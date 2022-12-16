import React, { useState } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Button";
import { Load } from "../../components/Load";

import { navigationRoute } from "../../utils/navigation";
import { api, endpoints } from "../../services/api";

import { Container, KeyboardAvoidingView, Content, Form, Header, Title, Input, Footer, LottieViewAnimation } from "./styles";

import loadAnimation from "../../assets/load.json";
import { AUTH_DATA_KEY } from "../../libs/storage";

function UserIdentification() {
  const navigation = navigationRoute();

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [name, setName] = useState("admin");
  const [pass, setPass] = useState("sidd123");

  function handleInputBlurUser() {
    setIsFocused("user");
  }

  function handleInputFocusUser() {
    setIsFocused("");
  }

  function handleInputBlurPass() {
    setIsFocused("pass");
  }

  function handleInputFocusPass() {
    setIsFocused("");
  }

  function handleInputChangeUser(value) {
    setName(value);
  }

  function handleInputChangePass(value) {
    setPass(value);
  }

  async function handleSubmit() {
    if (!name || !pass) {
      return Alert.alert("Me diz com você se chama 😢");
    }
    try {
      setLoading(true);

      await api.post(endpoints.user.login, {
        username: name,
        password: pass
      }).then(async function (result) {
        if (result.data.statusCode === 200) {
          await AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(result.data.response));

          navigation.replace("TestSelect");
        } else {
          return Alert.alert("Usuário ou senha incorreto. 😢");
        }
      }).catch(function (result) {
        return Alert.alert("Usuário ou senha incorreto. 😢");
      });
    } catch (e) {
      return Alert.alert("Não foi possível salvar o seu nome. 😢");
    }
    setLoading(false);
  }

  return loading ? (
    <Load />
  ) : (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content>
            <Form>
              <Header>
                <LottieViewAnimation source={loadAnimation} autoPlay />
              </Header>

              <Title>Insira seu usário</Title>

              <Input
                placeholder="Digite seu usuário"
                onBlur={handleInputBlurUser}
                onFocus={handleInputFocusUser}
                onChangeText={handleInputChangeUser}
                defaultValue={"admin"}
                inputIsFocused={isFocused == "user"}
              />

              <Input
                placeholder="Digite sua senha"
                onBlur={handleInputBlurPass}
                onFocus={handleInputFocusPass}
                onChangeText={handleInputChangePass}
                defaultValue={"sidd123"}
                inputIsFocused={isFocused == "pass"}
              />

              <Footer>
                <Button title="Confirmar" onPress={handleSubmit} />
              </Footer>
            </Form>
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}

export { UserIdentification };
