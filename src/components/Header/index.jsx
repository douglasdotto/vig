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

  async function logout() {
    navigation.replace("Welcome");
  }

  return (
    <>
      <ContainerTop>
        <Logout onPress={logout}>sair</Logout>
      </ContainerTop>
    </>
  );
}

export { Header };
