import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TestSelect } from "../pages/TestSelect";

import { colors } from "../theme";

const { Navigator, Screen } = createBottomTabNavigator();

const AuthRoutes = () => (
  <Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.green,
      tabBarInactiveTintColor: colors.heading,
      tabBarLabelPosition: "beside-icon",
      tabBarStyle: {
        paddingVertical: Platform.OS === "ios" ? 10 : 4,
        height: 80,
      },
      headerShown: false,
    }}
  >
    <Screen
      name="Novo Paciente"
      component={TestSelect}
      options={{
        tabBarIcon: ({ size, color }) => {
          return (
            <MaterialIcons
              name="add"
              size={size}
              color={color}
            />
          );
        },
      }}
    />
  </Navigator>
);

export { AuthRoutes };
