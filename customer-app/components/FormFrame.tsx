import * as React from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const FormFrame = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.frameFlexBox}>
      <Pressable style={styles.vector} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
      </Pressable>
      <View style={styles.frameParent}>
        <View style={[styles.frame1, styles.frameFlexBox]}>
          <Text style={styles.whatsYourNumberContainer}>
            <Text style={styles.whatsYourNumber}>{`What’s your number?
`}</Text>
            <Text style={styles.wellTextA}>
              We’ll text a code to verify your phone
            </Text>
          </Text>
        </View>
        <TextInput
          style={styles.frameChild}
          keyboardType="number-pad"
          multiline={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    alignItems: "flex-end",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  vector: {
    width: 24,
    height: 24,
  },
  whatsYourNumber: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
  },
  wellTextA: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratRegular,
  },
  whatsYourNumberContainer: {
    color: Color.color1,
    textAlign: "left",
    alignSelf: "stretch",
  },
  frame1: {
    justifyContent: "center",
  },
  frameChild: {
    borderRadius: Border.br_6xl,
    borderStyle: "solid",
    borderColor: Color.color1,
    borderWidth: 2,
    height: 70,
    marginTop: 16,
    alignSelf: "stretch",
  },
  frameParent: {
    marginTop: 63,
    alignSelf: "stretch",
  },
});

export default FormFrame;
