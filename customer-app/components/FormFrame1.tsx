import * as React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const FormFrame1 = () => {
  return (
    <View style={styles.frame}>
      <View style={styles.weightinputbox}>
        <View style={[styles.box, styles.boxPosition]} />
        <TextInput style={styles.weight} keyboardType="decimal-pad" />
        <Text style={[styles.kg, styles.kgFlexBox]}>kg</Text>
      </View>
      <Text style={[styles.weightOfItemsContainer, styles.kgFlexBox]}>
        <Text style={styles.kgTypo}>{`Weight of Items
`}</Text>
        <Text style={styles.enterTheWeight}>
          Enter the weight of the items you'd like to have picked up. This will
          help us prepare for an efficient pickup service.
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxPosition: {
    top: 0,
    left: 0,
    width: 370,
  },
  kgFlexBox: {
    textAlign: "left",
    color: Color.color1,
    position: "absolute",
  },
  box: {
    borderRadius: Border.br_6xl,
    borderStyle: "solid",
    borderColor: Color.color1,
    borderWidth: 2,
    height: 70,
    position: "absolute",
  },
  weight: {
    top: 15,
    left: 31,
    width: 270,
    height: 40,
    position: "absolute",
    overflow: "hidden",
  },
  kg: {
    top: 18,
    left: 309,
    width: 37,
    height: 37,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
  },
  weightinputbox: {
    top: 123,
    width: 376,
    height: 102,
    left: 0,
    position: "absolute",
  },
  kgTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
  },
  enterTheWeight: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratRegular,
  },
  weightOfItemsContainer: {
    top: 0,
    left: 0,
    width: 370,
  },
  frame: {
    height: 193,
    overflow: "hidden",
    width: 370,
  },
});

export default FormFrame1;
