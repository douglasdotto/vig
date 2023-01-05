import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { Dengue } from "../pages/Dengue";
import { D1 } from "../pages/Dengue/d1.jsx";
import { D2 } from "../pages/Dengue/d2.jsx";
import { D3 } from "../pages/Dengue/d3.jsx";
import { D4 } from "../pages/Dengue/d4.jsx";
import { D5 } from "../pages/Dengue/d5.jsx";

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
    <Screen name="DengueF3" component={D3} />
    <Screen name="DengueF4" component={D4} />
    <Screen name="DengueF5" component={D5} />
  </Navigator>
);

export { Routes };
