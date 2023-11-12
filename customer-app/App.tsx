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
import CustomerOTPVerification from "./screens/CustomerOTPVerification";
import CustomerSignUp from "./screens/CustomerSignUp";
import CustomerNumberVerification from "./screens/CustomerNumberVerification";
import {UserProvider} from "./UserContext";
import CustomerDashboard from "./screens/CustomerDashboard";
import CustomerProfile from "./screens/CustomerProfile";
import CustomerOngoingOrders from "./screens/CustomerOngoingOrders";
import CustomerPastOrders from "./screens/CustomerPastOrders";


type RootStackParamList = {
  CustomerWelcome: undefined;
  CustomerPickupConfirmed: undefined;
  CustomerItemWeight: undefined;
  CustomerItemSelection: undefined;
  CustomerPickupDateTime: undefined;
  CustomerNumberVerification: undefined;
  CustomerOTPVerification: undefined;
  CustomerSignUp: undefined;
  CustomerDashboard: undefined;
  CustomerProfile: undefined;
  CustomerPastOrders: undefined;
  CustomerOngoingOrders: undefined;
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
          <Stack.Screen name="CustomerItemWeight" component={CustomerItemWeight} />
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
              name="CustomerOngoingOrders"
              component={CustomerOngoingOrders}
          />
          <Stack.Screen
              name="CustomerPastOrders"
              component={CustomerPastOrders}
          />
          <Stack.Screen
              name="CustomerProfile"
              component={CustomerProfile}
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
