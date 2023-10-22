import {useState} from "react";

const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import ScrapDealerWelcomePage from "./screens/ScrapDealerWelcomePage";
import CustomerStartingPage from "./screens/CustomerStartingPage";
import CustomerNumberItems from "./screens/CustomerNumberItems";
import CustomerItemSelection from "./screens/CustomerItemSelection";
import CustomerPickupDateTime from "./screens/CustomerPickupDateTime";
import NumberVerificationPage from "./screens/NumberVerificationPage";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { OrderProvider } from './OrderContext';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <OrderProvider>
              <Stack.Navigator
                  initialRouteName="ScrapDealerWelcomePage"
                  screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                    name="ScrapDealerWelcomePage"
                    component={ScrapDealerWelcomePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CustomerStartingPage"
                    component={CustomerStartingPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CustomerNumberItems"
                    component={CustomerNumberItems}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CustomerItemSelection"
                    component={CustomerItemSelection}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CustomerPickupDateTime"
                    component={CustomerPickupDateTime}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NumberVerificationPage"
                    component={NumberVerificationPage}
                    options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </OrderProvider>
          ) : null}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
export default App;
