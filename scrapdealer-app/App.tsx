import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import ScrapDealerOTPVerification from "./screens/ScrapDealerOTPVerification";
import ScrapDealerSignUp from "./screens/ScrapDealerSignUp";
import ScrapDealerWelcome from "./screens/ScrapDealerWelcome";
import ScrapDealerNumberVerification from "./screens/ScrapDealerNumberVerification";
import ScrapdealerDashboard from "./screens/ScrapdealerDashboard";
import ScrapDealerAvailableOrders from "./screens/ScrapDealerAvailableOrders";
import {ScrapDealerProvider} from "./ScrapDealerContext";
import {OrderProvider} from "./OrderContext";
import ScrapDealerProfile from "./screens/ScrapDealerProfile"
import ScrapDealerAcceptOrder from "./screens/ScrapDealerAcceptOrder";
import ScrapDealerOngoingOrders from "./screens/ScrapDealerOngoingOrders";
import ScrapDealerPastOrders from "./screens/ScrapDealerPastOrders";
import ScrapDealerCommunity from "./screens/ScrapDealerCommunity";
import ScrapDealerGetSupport from "./screens/ScrapDealerGetSupport";
import ScrapDealerOngoingOrderDetails from "./screens/ScrapDealerOngoingOrderDetails";
import ScrapDealerPastOrderDetails from "./screens/ScrapDealerPastOrderDetails";
import ScrapDealerManageAccount from "./screens/ScrapDealerManageAccount";
import ScrapDealerPrivacy from "./screens/ScrapDealerPrivacy";

type RootStackParamList = {
  ScrapDealerWelcome: undefined;
  ScrapDealerNumberVerification: undefined;
  ScrapDealerOTPVerification: undefined;
  ScrapDealerSignUp: undefined;
  ScrapdealerDashboard: undefined;
  ScrapDealerAvailableOrders: undefined;
  ScrapDealerProfile: undefined;
  ScrapDealerAcceptOrder: undefined;
  ScrapDealerOngoingOrders: undefined;
  ScrapDealerPastOrders: undefined;
  ScrapDealerCommunity: undefined;
  ScrapDealerSupport: undefined;
  ScrapDealerOngoingOrderDetails: undefined;
  ScrapDealerPastOrderDetails: undefined;
  ScrapDealerManageAccount: undefined;
  ScrapDealerPrivacy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => (
<ScrapDealerProvider>
  <OrderProvider>
    <Stack.Navigator
        initialRouteName="ScrapDealerWelcome"
        screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ScrapDealerWelcome" component={ScrapDealerWelcome} />
      <Stack.Screen
          name="ScrapDealerNumberVerification"
          component={ScrapDealerNumberVerification}
      />
      <Stack.Screen
          name="ScrapDealerOTPVerification"
          component={ScrapDealerOTPVerification}
      />
      <Stack.Screen
          name="ScrapDealerSignUp"
          component={ScrapDealerSignUp}
      />
      <Stack.Screen
          name="ScrapdealerDashboard"
          component={ScrapdealerDashboard}
      />
      <Stack.Screen
          name="ScrapDealerAvailableOrders"
          component={ScrapDealerAvailableOrders}
      />
      <Stack.Screen
          name="ScrapDealerProfile"
          component={ScrapDealerProfile}
      />
      <Stack.Screen
          name="ScrapDealerCommunity"
          component={ScrapDealerCommunity}
      />
      <Stack.Screen
          name="ScrapDealerAcceptOrder"
          component={ScrapDealerAcceptOrder}
      />
      <Stack.Screen
          name="ScrapDealerPastOrders"
          component={ScrapDealerPastOrders}
      />
      <Stack.Screen
          name="ScrapDealerSupport"
          component={ScrapDealerGetSupport}
      />
      <Stack.Screen
          name="ScrapDealerOngoingOrders"
          component={ScrapDealerOngoingOrders}
      />
      <Stack.Screen
          name="ScrapDealerOngoingOrderDetails"
          component={ScrapDealerOngoingOrderDetails}
      />
      <Stack.Screen
          name="ScrapDealerPastOrderDetails"
          component={ScrapDealerPastOrderDetails}
      />
      <Stack.Screen
          name="ScrapDealerManageAccount"
          component={ScrapDealerManageAccount}
      />
      <Stack.Screen
          name="ScrapDealerPrivacy"
          component={ScrapDealerPrivacy}
      />
    </Stack.Navigator>
  </OrderProvider>
</ScrapDealerProvider>
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