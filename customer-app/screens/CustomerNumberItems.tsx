import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import ContainerFrame from "../components/ContainerFrame";
import FormFrame1 from "../components/FormFrame1";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { Order } from "../Types";
import {OrderContext, useOrder} from '../OrderContext';

const windowWidth = Dimensions.get('window').width;

const CustomerNumberItems = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { order, setOrder } = useOrder();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ContainerFrame />
        <View style={styles.content}>
          <FormFrame1 />
          <Pressable
            style={styles.continueButton}
            onPress={() => navigation.navigate("CustomerPickupDateTime")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    paddingHorizontal: windowWidth * 0.05,  // 5% of window width
    paddingTop: "8%",  // 8% of container height
    paddingBottom: "7%",  // 7% of container height
  },
  content: {
    flex: 1,
    width: "90%",  // 90% of container width
    justifyContent: "flex-end",
    alignItems: "center",
  },
  continueText: {
    fontSize: windowWidth < 350 ? FontSize.size_base : FontSize.size_5xl,  // Adjusting font size based on screen width
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.color1,
    textAlign: "center",
  },
  continueButton: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
    paddingVertical: "3%",  // 3% of button height
    paddingHorizontal: "10%",  // 10% of button width
    marginTop: "5%",  // 5% of container height
    alignItems: "center",
  },
});

export default CustomerNumberItems;