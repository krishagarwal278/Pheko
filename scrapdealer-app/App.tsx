import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import ScrapDealerOTPVerification from "./screens/ScrapDealerOTPVerification";
import ScrapDealerSignUp from "./screens/ScrapDealerSignUp";
import ScrapDealerWelcome from "./screens/ScrapDealerWelcome";
import ScrapDealerNumberVerification from "./screens/ScrapDealerNumberVerification";


type RootStackParamList = {
  ScrapDealerWelcome: undefined;
  ScrapDealerNumberVerification: undefined;
  ScrapDealerOTPVerification: undefined;
  ScrapDealerSignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => (

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

  </Stack.Navigator>

  
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
