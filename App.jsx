import { Jost_400Regular, Jost_600SemiBold, useFonts } from "@expo-google-fonts/jost";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";

import { Routes } from "./src/routes/stack.routes";
console.disableYellowBox = true;
export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    'Lindsey': require('./src/assets/lindsey.otf'),
  });

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log("data");
      }
    );

    return () => subscription.remove();

    // async function notifications() {
    //   await Notifications.cancelAllScheduledNotificationsAsync();
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log("AAAAAAAAAAAAAAAAAAA", data);
    // }

    // notifications();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
