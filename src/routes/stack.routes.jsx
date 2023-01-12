import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { Dengue } from "../pages/Dengue";
import { D1 } from "../pages/Dengue/d1.jsx";
import { D2 } from "../pages/Dengue/d2.jsx";
import { D3 } from "../pages/Dengue/d3.jsx";
import { D4 } from "../pages/Dengue/d4.jsx";
import { D5 } from "../pages/Dengue/d5.jsx";
import { D6 } from "../pages/Dengue/d6.jsx";

import { colors } from "../theme";

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      headerTransparent: true,
      headerStyle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
      }
    }}
  >
    <Screen name="Welcome" component={Welcome} />

    <Screen name="Dengue" component={Dengue} />
    <Screen name="DengueF1" component={D1} />
    <Screen name="DengueF2" component={D2} />
    <Screen name="DengueF3" component={D3} />
    <Screen name="DengueF4" component={D4} />
    <Screen name="DengueF5" component={D5} />
    <Screen name="DengueF6" component={D6} />
  </Navigator>
);

export { Routes };
