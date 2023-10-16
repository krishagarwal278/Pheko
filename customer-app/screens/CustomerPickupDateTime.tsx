import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

const CustomerPickupDateTime = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [frameDatePicker, setFrameDatePicker] = useState(undefined);

  return (
    <View style={styles.customerpickupdatetime}>
      <Text style={[styles.pickupDateAndContainer, styles.textPosition]}>
        <Text style={styles.continueTypo}>{`Pickup Date and Time
`}</Text>
        <Text style={styles.whenWouldYou}>
          When would you like us to pick up your recyclables?
        </Text>
      </Text>
      <Pressable style={styles.vector} onPress={() => navigation.goBack()}>
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
      </Pressable>

      <View
        style={[
          styles.customerpickupdatetimeChild,
          styles.customerpickupdatetimeLayout,
        ]}
      />
      <View
        style={[
          styles.customerpickupdatetimeItem,
          styles.customerpickupdatetimeLayout,
        ]}
      />
      <View
        style={[
          styles.customerpickupdatetimeInner,
          styles.customerpickupdatetimeLayout,
        ]}
      />
      <View
        style={[styles.rectangleView, styles.customerpickupdatetimeLayout]}
      />
      <Pressable
        style={[styles.rectanglePressable, styles.frameParentPosition]}
        onPress={() => navigation.navigate("CustomerStartingPage")}
      />
      <Text style={[styles.schedulePickup, styles.pickupTypo]}>
        Schedule Pickup!
      </Text>
      <View style={[styles.frameView, styles.datePickerPosition]}>
        <RNKDatepicker
          style={styles.frameChild}
          date={frameDatePicker}
          onSelect={setFrameDatePicker}
          status="basic"
          controlStyle={styles.frameDatePickerValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentPosition: {
    width: 370,
    left: 30,
    position: "absolute",
  },
  rectanglePressable: {
    top: 778,
    borderRadius: Border.br_6xl,
    height: 86,
    backgroundColor: Color.color,
  },
  schedulePickup: {
    top: 806,
    left: 81,
    textAlign: "center",
    width: 268,
    height: 30,
    color: Color.color1,
    position: "absolute",
  },
  pickupTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
  },

  frameDatePickerValue: {
    position: "absolute",
    left: "50%",
    top: 22,
    width: 286,
    height: 84,
  },
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  textPosition: {
    width: 370,
    left: 30,
    position: "absolute",
  },
  datePickerPosition: {
    top: 280,
    left: -100,
  },
  customerpickupdatetimeLayout: {
    height: 5,
    width: 89,
    top: 132,
    position: "absolute",
  },
  continueTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
  },
  whenWouldYou: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratRegular,
  },
  pickupDateAndContainer: {
    top: 188,
    textAlign: "left",
    color: Color.color1,
  },
  vectorIcon: {
    height: "2.58%",
    width: "3.26%",
    top: "8.58%",
    left: "6.98%",
    position: "absolute",
    zIndex: 10,
  },
  customerpickupdatetimeChild: {
    backgroundColor: Color.color,
    left: 30,
    width: 89,
    top: 132,
  },
  customerpickupdatetimeItem: {
    left: 124,
    backgroundColor: Color.color,
  },
  customerpickupdatetimeInner: {
    left: 217,
    backgroundColor: Color.color1,
  },
  rectangleView: {
    left: 311,
    backgroundColor: Color.color,
  },
  customerpickupdatetimeChild1: {
    top: 778,
    borderRadius: Border.br_6xl,
    height: 86,
    backgroundColor: Color.color,
  },
  continue: {
    top: 806,
    left: 81,
    textAlign: "center",
    width: 268,
    height: 30,
    color: Color.color1,
    position: "absolute",
  },
  frameChild: {
    width: 286,
    height: 84,
  },
  frameView: {
    height: 100,
    overflow: "visible",
    width: 286,
  },
  customerpickupdatetime: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  vector: {
    left: "6.98%",
    top: "8.58%",
    right: "89.77%",
    bottom: "88.84%",
    width: "3.26%",
    height: "2.58%",
    position: "absolute",
  },
});

export default CustomerPickupDateTime;
