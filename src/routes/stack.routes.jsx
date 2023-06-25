import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { Dengue } from "../pages/Dengue";
import { DengueInfo } from "../pages/Dengue/info.jsx";
import { D1 } from "../pages/Dengue/d1.jsx";
import { D2 } from "../pages/Dengue/d2.jsx";
import { D3 } from "../pages/Dengue/d3.jsx";
import { D4 } from "../pages/Dengue/d4.jsx";
import { D4P2 } from "../pages/Dengue/d4-2.jsx";
import { D5 } from "../pages/Dengue/d5.jsx";
import { D6 } from "../pages/Dengue/d6.jsx";

import { Leptospirose } from "../pages/Leptospirose";
import { LeptoInfo } from "../pages/Leptospirose/info.jsx";
import { L1 } from "../pages/Leptospirose/l1";
import { L2 } from "../pages/Leptospirose/l2";
import { L3 } from "../pages/Leptospirose/l3";
import { L4 } from "../pages/Leptospirose/l4";

import { Toxoplasmose } from "../pages/Toxoplasmose";
import { ToxoInfo } from "../pages/Toxoplasmose/info.jsx";
import { T1 } from "../pages/Toxoplasmose/t1";
import { T2 } from "../pages/Toxoplasmose/t2";
import { T3 } from "../pages/Toxoplasmose/t3";
import { T4 } from "../pages/Toxoplasmose/t4";

import { Bottom } from "../pages/Bottom";

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
    <Screen name="DengueInfo" component={DengueInfo} />
    <Screen name="DengueF1" component={D1} />
    <Screen name="DengueF2" component={D2} />
    <Screen name="DengueF3" component={D3} />
    <Screen name="DengueF4" component={D4} />
    <Screen name="DengueF4-2" component={D4P2} />
    <Screen name="DengueF5" component={D5} />
    <Screen name="DengueF6" component={D6} />

    <Screen name="Leptospirose" component={Leptospirose} />
    <Screen name="LeptoInfo" component={LeptoInfo} />
    <Screen name="LeptospiroseF1" component={L1} />
    <Screen name="LeptospiroseF2" component={L2} />
    <Screen name="LeptospiroseF3" component={L3} />
    <Screen name="LeptospiroseF4" component={L4} />

    <Screen name="Toxoplasmose" component={Toxoplasmose} />
    <Screen name="ToxoInfo" component={ToxoInfo} />
    <Screen name="ToxoplasmoseF1" component={T1} />
    <Screen name="ToxoplasmoseF2" component={T2} />
    <Screen name="ToxoplasmoseF3" component={T3} />
    <Screen name="ToxoplasmoseF4" component={T4} />

    <Screen name="Bottom" component={Bottom} />
    
  </Navigator>
);

export { Routes };
