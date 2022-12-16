import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthRoutes } from "./tab.routes";
import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { TestMain } from "../pages/TestMain";

import { colors } from "../theme";

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <Screen name="Welcome" component={Welcome} />

    <Screen name="UserIdentification" component={UserIdentification} />

    <Screen name="TestSelect" component={AuthRoutes} />

    <Screen name="TestMain" component={TestMain} />
  </Navigator>
);

export { Routes };
