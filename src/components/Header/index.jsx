import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRoute } from "../../utils/navigation";
import { useRoute } from "@react-navigation/native";

import userImg from "../../assets/avatar.png";
import { Container, ContainerTop, Greeting, UserName, ImageProfile, Logout, Back } from "./styles";

import { getData, AUTH_DATA_KEY } from "../../libs/storage";

function Header() {
  const navigation = navigationRoute();
  const route = useRoute();
  const [useName, setUserName] = useState("");

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await getData();
      if (user != null)
        setUserName(user.user.firstName || "");
    }

    loadStorageUserName();
  }, []);

  async function logout() {
    await AsyncStorage.removeItem(AUTH_DATA_KEY);
    navigation.replace("Welcome");
  }

  async function back() {
    navigation.replace("TestSelect");
  }

  return (
    <>
      <ContainerTop>
        <Back onPress={back}>voltar</Back>
        <Logout onPress={logout}>sair</Logout>
      </ContainerTop>
      <Container>
        <View>
          <Greeting>Olá,</Greeting>
          <UserName>{useName}</UserName>
        </View>

        <View>
          <ImageProfile source={userImg} />
        </View>
      </Container>
    </>
  );
}

export { Header };
