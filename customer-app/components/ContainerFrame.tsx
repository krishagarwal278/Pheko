import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color } from "../GlobalStyles";

const ContainerFrame = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.frame}>
      <Pressable style={styles.vector} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
      </Pressable>
      <View style={styles.frame1}>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={[styles.frameChild, styles.frameLayout]} />
          <View style={[styles.frameItem, styles.frameLayout]} />
        </View>
        <View style={[styles.frame3, styles.frameFlexBox]}>
          <View style={styles.frameInnerFlexBox} />
          <View style={[styles.rectangleView, styles.frameInnerFlexBox]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    width: 183,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  frameLayout: {
    width: 89,
    height: 5,
  },
  frameInnerFlexBox: {
    flex: 1,
    backgroundColor: Color.color,
    height: 5,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  vector: {
    width: 14,
    height: 24,
  },
  frameChild: {
    backgroundColor: Color.color,
    width: 89,
  },
  frameItem: {
    backgroundColor: Color.color1,
    marginLeft: 5,
  },
  frame2: {
    height: 5,
    width: 183,
  },
  rectangleView: {
    marginLeft: 5,
  },
  frame3: {
    marginLeft: 4,
  },
  frame1: {
    marginTop: 28,
    alignItems: "center",
    flexDirection: "row",
    height: 5,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  frame: {
    overflow: "hidden",
    alignSelf: "stretch",
  },
});

export default ContainerFrame;
