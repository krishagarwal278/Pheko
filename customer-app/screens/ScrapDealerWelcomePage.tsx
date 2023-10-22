import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const ScrapDealerWelcomePage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.icon}
        resizeMode="contain"
        source={require("../assets/iconlogo10.png")}
      />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("NoVerification")}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  icon: {
    width: "50%", // 50% of the container width
    justifyContent: "center",
    height: "30%", // 30% of the container height
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.color,
    borderRadius: Border.br_6xl,
    width: "100%",
    padding: "5%",
  },
  buttonText: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.color1,
    textAlign: "center",
  },
});

export default ScrapDealerWelcomePage;