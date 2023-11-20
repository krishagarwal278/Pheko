import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React from "react";
import { OrderProvider } from './OrderContext';
import { UserProvider } from "./UserContext";
import CustomerAddressScreen from "./screens/CustomerAddressScreen";
import CustomerDashboard from "./screens/CustomerDashboard";
import CustomerItemSelection from "./screens/CustomerItemSelection";
import CustomerNumberVerification from "./screens/CustomerNumberVerification";
import CustomerOTPVerification from "./screens/CustomerOTPVerification";
import CustomerOngoingOrders from "./screens/CustomerOngoingOrders";
import CustomerPastOrders from "./screens/CustomerPastOrders";
import CustomerPickupConfirmed from "./screens/CustomerPickupConfirmed";
import CustomerPickupDateTime from "./screens/CustomerPickupDateTime";
import CustomerProfile from "./screens/CustomerProfile";
import CustomerSignUp from "./screens/CustomerSignUp";
import CustomerWelcome from "./screens/CustomerWelcome";
import CustomerOngoingOrderDetails from "./screens/CustomerOngoingOrderDetails";
import CustomerOrderReschedule from "./screens/CustomerOrderReschedule";


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
  CustomerProfile: undefined;
  CustomerPastOrders: undefined;
  CustomerOngoingOrders: undefined;
  CustomerOngoingOrderDetails: undefined;
  CustomerOrderReschedule: undefined;
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
          <Stack.Screen
              name="CustomerOngoingOrderDetails"
              component={CustomerOngoingOrderDetails}
          />
          <Stack.Screen
              name="CustomerOrderReschedule"
              component={CustomerOrderReschedule}
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
