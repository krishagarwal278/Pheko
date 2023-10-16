import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  ImageBackground,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CustomerStartingPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.customerstartingpage}>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <Text style={[styles.yourPickupOrder, styles.makeNewRequestTypo]}>
          Your Pickup Order has been Requested!
        </Text>
        <Pressable
          style={[styles.frame1, styles.frameFlexBox]}
          onPress={() => navigation.navigate("CustomerItemSelection")}
        >
          <Text style={[styles.makeNewRequest, styles.makeNewRequestTypo]}>
            Make New Request
          </Text>
        </Pressable>
      </View>
      <ImageBackground
        style={styles.signUp1}
        resizeMode="cover"
        source={require("../assets/signup1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  makeNewRequestTypo: {
    textAlign: "center",
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
  },
  yourPickupOrder: {
    fontSize: 40,
    height: 161,
    alignSelf: "stretch",
  },
  makeNewRequest: {
    fontSize: FontSize.size_5xl,
    width: 268,
    height: 30,
  },
  frame1: {
    borderRadius: Border.br_6xl,
    backgroundColor: "#e3d7fc",
    height: 86,
    justifyContent: "center",
    marginTop: 55,
    alignSelf: "stretch",
  },
  frame: {
    top: 562,
    left: 30,
    width: 370,
    position: "absolute",
  },
  signUp1: {
    marginLeft: -228,
    top: 33,
    left: "50%",
    width: 456,
    height: 461,
    position: "absolute",
  },
  customerstartingpage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default CustomerStartingPage;
