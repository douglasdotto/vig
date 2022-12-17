import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { Dengue } from "../pages/Dengue";
import { D1 } from "../pages/Dengue/d1.jsx";
import { D2 } from "../pages/Dengue/d2.jsx";

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

    <Screen name="Dengue" component={Dengue} />
    <Screen name="DengueF1" component={D1} />
    <Screen name="DengueF2" component={D2} />
  </Navigator>
);

export { Routes };
