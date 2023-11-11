import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import CustomerWelcome from "./screens/CustomerWelcome";
import CustomerPickupConfirmed from "./screens/CustomerPickupConfirmed";
import CustomerItemSelection from "./screens/CustomerItemSelection";
import CustomerPickupDateTime from "./screens/CustomerPickupDateTime";
import { OrderProvider } from './OrderContext';
import CustomerOTPVerification from "./screens/CustomerOTPVerification";
import CustomerSignUp from "./screens/CustomerSignUp";
import CustomerNumberVerification from "./screens/CustomerNumberVerification";
import {UserProvider} from "./UserContext";
import CustomerDashboard from "./screens/CustomerDashboard";
import CustomerAddressScreen from "./screens/CustomerAddressScreen";


type RootStackParamList = {
  CustomerWelcome: undefined;
  CustomerPickupConfirmed: undefined;
  CustomerItemSelection: undefined;
  CustomerPickupDateTime: { address: string };
  CustomerNumberVerification: undefined;
  CustomerOTPVerification: undefined;
  CustomerSignUp: undefined;
  CustomerDashboard: undefined;
  CustomerAddressScreen: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => (
    <OrderProvider>
      <UserProvider>
        <Stack.Navigator
            initialRouteName="CustomerWelcome"
            screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="CustomerWelcome" component={CustomerWelcome} />
          <Stack.Screen
              name="CustomerPickupConfirmed"
              component={CustomerPickupConfirmed}
          />
          <Stack.Screen
              name="CustomerItemSelection"
              component={CustomerItemSelection}
          />
          <Stack.Screen
              name="CustomerPickupDateTime"
              component={CustomerPickupDateTime}
          />
          <Stack.Screen
              name="CustomerNumberVerification"
              component={CustomerNumberVerification}
          />
          <Stack.Screen
              name="CustomerOTPVerification"
              component={CustomerOTPVerification}
          />
          <Stack.Screen
              name="CustomerSignUp"
              component={CustomerSignUp}
          />
          <Stack.Screen
              name="CustomerDashboard"
              component={CustomerDashboard}
          />
          <Stack.Screen
              name="CustomerAddressScreen"
              component={CustomerAddressScreen} 
          />
        </Stack.Navigator>
      </UserProvider>
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
