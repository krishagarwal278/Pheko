 import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import FormFrame from "../components/FormFrame";
import { Color, Padding } from "../GlobalStyles";

const NumberVerificationPage = () => {
  return (
    <View style={styles.numberVerificationPage}>
      <FormFrame />
      <Image
        style={styles.frameIcon}
        contentFit="cover"
        source={require("../assets/frame.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameIcon: {
    width: 65,
    height: 65,
    marginTop: 244,
    overflow: "hidden",
  },
  numberVerificationPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: Padding.p_11xl,
    paddingTop: 77,
    paddingBottom: 327,
    overflow: "hidden",
  },
});

export default NumberVerificationPage;
