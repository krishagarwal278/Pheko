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
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const ScrapDealerWelcomePage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.scrapDealerWelcomePage, styles.frameFlexBox]}>
      <View style={styles.iconLayout}>
        <ImageBackground
          style={[styles.iconLogo10, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/iconlogo10.png")}
        />
      </View>
      <Pressable
        style={[styles.frame, styles.frameFlexBox]}
        onPress={() => navigation.navigate("CustomerItemSelection")}
      >
        <Text style={styles.getStarted}>Get started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  iconLayout: {
    height: 126,
    width: 126,
  },
  iconLogo10: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  getStarted: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.color1,
    textAlign: "center",
    width: 268,
    height: 30,
  },
  frame: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
    width: 370,
    height: 86,
    justifyContent: "center",
    marginTop: 308,
  },
  scrapDealerWelcomePage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 932,
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: 61,
  },
});

export default ScrapDealerWelcomePage;
