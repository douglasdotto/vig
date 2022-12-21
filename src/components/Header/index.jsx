import React from "react";
import { navigationRoute } from "../../utils/navigation";
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { colors } from "../../theme";

import { Container, ContainerTop, Greeting, UserName, ImageProfile, Logout, Back } from "./styles";

function Header({ backRoute = null }) {
  const navigation = navigationRoute();
  const route = useRoute();

  async function logout() {
    navigation.replace("Welcome");
  }

  async function back() {
    navigation.replace(backRoute);
  }

  return (
    <>
      <ContainerTop>
        {backRoute != null && <Back onTouchStart={back}><Ionicons name="arrow-back" size={16} color={colors.white} /> voltar</Back>}
        <Logout onTouchStart={logout}>tela inicial <Ionicons name="exit" size={16} color={colors.white} /></Logout>
      </ContainerTop>
    </>
  );
}

export { Header };
