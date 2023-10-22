import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import CustomerWelcome from "./screens/CustomerWelcome";
import CustomerPickupConfirmed from "./screens/CustomerPickupConfirmed";
import CustomerItemWeight from "./screens/CustomerItemWeight";
import CustomerItemSelection from "./screens/CustomerItemSelection";
import CustomerPickupDateTime from "./screens/CustomerPickupDateTime";
import { OrderProvider } from './OrderContext';


type RootStackParamList = {
  CustomerWelcome: undefined;
  CustomerPickupConfirmed: undefined;
  CustomerItemWeight: undefined;
  CustomerItemSelection: undefined;
  CustomerPickupDateTime: undefined;
  NumberVerificationPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => (
    <OrderProvider>
  <Stack.Navigator
    initialRouteName="CustomerWelcome"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="CustomerWelcome" component={CustomerWelcome} />
    <Stack.Screen
      name="CustomerPickupConfirmed"
      component={CustomerPickupConfirmed}
    />
    <Stack.Screen name="CustomerItemWeight" component={CustomerItemWeight} />
    <Stack.Screen
      name="CustomerItemSelection"
      component={CustomerItemSelection}
    />
    <Stack.Screen
      name="CustomerPickupDateTime"
      component={CustomerPickupDateTime}
    />
  </Stack.Navigator>
    </OrderProvider>
);

const App = () => {
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
