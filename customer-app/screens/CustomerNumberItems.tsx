import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ContainerFrame from "../components/ContainerFrame";
import FormFrame1 from "../components/FormFrame1";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { Order } from "../Types";
import {OrderContext, useOrder} from '../OrderContext';

const CustomerNumberItems = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { order, setOrder } = useOrder();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.customernumberitems}>
        <ContainerFrame />
        <View style={[styles.frame, styles.frameFlexBox]}>
          <FormFrame1 />
          <Pressable
            style={[styles.frame1, styles.frameFlexBox]}
            onPress={() => navigation.navigate("CustomerPickupDateTime")}
          >
            <Text style={styles.continue}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  continue: {
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.color1,
    textAlign: "center",
    width: 268,
    height: 30,
  },
  frame1: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
    height: 86,
    justifyContent: "center",
    marginTop: 387,
  },
  frame: {
    marginTop: 51,
  },
  customernumberitems: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_11xl,
    paddingTop: 80,
    paddingBottom: 68,
    overflow: "hidden",
  },
});

export default CustomerNumberItems;
