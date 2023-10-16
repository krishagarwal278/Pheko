import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const CustomerItemSelection = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const isSelected = (item: string) => selectedItem === item;

  const selectionStyle = {
    backgroundColor: "rgba(0,0,0,0.1)", // This will provide a light overlay. Adjust as needed.
  };

  return (
    <View style={styles.customeritemselection}>
      <View style={styles.frame}>
        <View style={[styles.frame1, styles.frameLayout1]}>
          <View style={[styles.frameChild, styles.frameLayout]} />
          <View style={[styles.frameItem, styles.frameLayout]} />
        </View>
        <View style={[styles.frame2, styles.frameLayout1]}>
          <View style={[styles.frameItem, styles.frameLayout]} />
          <View style={[styles.rectangleView, styles.frameLayout]} />
        </View>
      </View>
      <View style={styles.frame3}>
        <Pressable
          style={[styles.continueButton, styles.boxLayout]}
          onPress={() => navigation.navigate("CustomerNumberItems")}
        >
          <View style={[styles.box, styles.boxLayout]} />
          <Text style={styles.text}>Continue</Text>
        </Pressable>
        <Pressable
          style={[
            styles.furniture,
            styles.metalLayout,
            isSelected("furniture") ? selectionStyle : {},
          ]}
          onPress={() => setSelectedItem("furniture")}
        >
          <View style={[styles.frame4, styles.framePosition1]}>
            <Text style={[styles.furniture1, styles.plastic1Typo]}>
              Furniture
            </Text>
            <Image
              style={[styles.vectorIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/vector2.png")}
            />
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.electronics,
            styles.metalLayout,
            isSelected("electronics") ? selectionStyle : {},
          ]}
          onPress={() => setSelectedItem("electronics")}
        >
          <View style={[styles.frame5, styles.framePosition1]}>
            <Text style={[styles.electronics1, styles.paper1Typo]}>
              Electronics
            </Text>
            <Image
              style={[styles.vectorIcon1, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/vector3.png")}
            />
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.metal,
            styles.metalLayout,
            isSelected("metal") ? selectionStyle : {},
          ]}
          onPress={() => setSelectedItem("metal")}
        >
          <View style={[styles.frame6, styles.framePosition]}>
            <Text style={[styles.metal1, styles.metal1Typo]}>Metal</Text>
            <Image
              style={[styles.vectorIcon2, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/vector4.png")}
            />
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.paper,
            styles.metalLayout,
            isSelected("paper") ? selectionStyle : {},
          ]}
          onPress={() => setSelectedItem("paper")}
        >
          <View style={[styles.frame7, styles.frame7Position]}>
            <Image
              style={[styles.vectorIcon3, styles.frame7Position]}
              contentFit="cover"
              source={require("../assets/vector5.png")}
            />
            <Text style={[styles.paper1, styles.paper1Typo]}>Paper</Text>
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.plastic,
            styles.metalLayout,
            isSelected("plastic") ? selectionStyle : {},
          ]}
          onPress={() => setSelectedItem("plastic")}
        >
          <View style={styles.frame8}>
            <Text style={[styles.plastic1, styles.plastic1Typo]}>Plastic</Text>
            <Image
              style={[styles.vectorIcon4, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/vector6.png")}
            />
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.glass,
            styles.metalLayout,
            isSelected("glass") ? selectionStyle : {},
          ]}
          onPress={() => setSelectedItem("glass")}
        >
          <View style={[styles.frame9, styles.framePosition]}>
            <Text style={[styles.glass1, styles.metal1Typo]}>Glass</Text>
          </View>
          <Image
            style={[styles.vectorIcon5, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vector7.png")}
          />
        </Pressable>
      </View>
      <Text style={styles.chooseAnItemContainer}>
        <Text style={styles.chooseAnItem}>{`Choose an item
`}</Text>
        <Text style={styles.tellUsWhat}>
          Tell us what recyclables you'd like to have picked up, and we'll take
          care of the rest.
        </Text>
      </Text>
      <View style={styles.frame10}>
        <Pressable
          style={[styles.backButton, styles.vectorIconPosition]}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vector1.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout1: {
    width: 183,
    top: 0,
    height: 5,
    position: "absolute",
    overflow: "hidden",
  },
  frameLayout: {
    width: 89,
    top: 0,
    height: 5,
    position: "absolute",
  },
  boxLayout: {
    height: 86,
    left: 0,
    width: 370,
    position: "absolute",
  },
  metalLayout: {
    height: 65,
    left: 0,
    width: 370,
    position: "absolute",
    overflow: "hidden",
  },
  framePosition1: {
    left: 12,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  plastic1Typo: {
    height: 26,
    width: 307,
    textAlign: "left",
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  paper1Typo: {
    height: 27,
    top: 3,
    width: 307,
    textAlign: "left",
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    position: "absolute",
  },
  framePosition: {
    height: 34,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  metal1Typo: {
    top: 8,
    height: 26,
    width: 307,
    textAlign: "left",
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    position: "absolute",
  },
  frame7Position: {
    height: 32,
    top: 0,
    position: "absolute",
  },
  vectorIconPosition: {
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  frameChild: {
    backgroundColor: Color.color1,
    left: 0,
  },
  frameItem: {
    left: 94,
    backgroundColor: Color.color,
  },
  frame1: {
    left: 0,
  },
  rectangleView: {
    backgroundColor: Color.color,
    left: 0,
  },
  frame2: {
    left: 187,
  },
  frame: {
    top: 132,
    height: 5,
    width: 370,
    left: 30,
    position: "absolute",
    overflow: "hidden",
  },
  box: {
    top: -1,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
  },
  text: {
    top: 28,
    textAlign: "center",
    width: 268,
    height: 30,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
    left: 51,
    position: "absolute",
  },
  continueButton: {
    top: 590,
  },
  furniture1: {
    top: 5,
    left: 53,
  },
  vectorIcon: {
    height: "103.23%",
    width: "9.63%",
    right: "90.37%",
    bottom: "-3.23%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  frame4: {
    width: 360,
    height: 31,
  },
  furniture: {
    top: 475,
  },
  electronics1: {
    left: 51,
    top: 3,
  },
  vectorIcon1: {
    height: "106.67%",
    width: "9.43%",
    right: "90.57%",
    bottom: "-6.67%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  frame5: {
    width: 358,
    height: 30,
  },
  electronics: {
    top: 410,
  },
  metal1: {
    left: 50,
  },
  vectorIcon2: {
    height: "94.12%",
    width: "7.98%",
    right: "92.02%",
    bottom: "5.88%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  frame6: {
    width: 357,
    left: 15,
  },
  metal: {
    top: 345,
  },
  vectorIcon3: {
    width: 32,
    left: 0,
  },
  paper1: {
    left: 48,
  },
  frame7: {
    width: 355,
    left: 15,
    overflow: "hidden",
  },
  paper: {
    top: 280,
  },
  plastic1: {
    top: 7,
    left: 45,
  },
  vectorIcon4: {
    height: "96.97%",
    width: "6.36%",
    right: "93.64%",
    bottom: "3.03%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  frame8: {
    left: 18,
    width: 352,
    height: 33,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  plastic: {
    top: 215,
  },
  glass1: {
    left: 0,
  },
  frame9: {
    left: 63,
    width: 307,
    height: 34,
  },
  vectorIcon5: {
    height: "49.23%",
    width: "5.32%",
    right: "89.37%",
    bottom: "50.77%",
    left: "5.32%",
    top: "0%",
    maxWidth: "100%",
    position: "absolute",
  },
  glass: {
    top: 150,
  },
  frame3: {
    height: 676,
    top: 188,
    width: 370,
    left: 30,
    position: "absolute",
    overflow: "hidden",
  },
  chooseAnItem: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    fontSize: FontSize.size_5xl,
  },
  tellUsWhat: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_base,
  },
  chooseAnItemContainer: {
    textAlign: "left",
    color: Color.color1,
    top: 188,
    width: 370,
    left: 30,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  backButton: {
    right: "96.22%",
    bottom: "91.55%",
    width: "3.78%",
    height: "8.45%",
  },
  frame10: {
    top: 80,
    height: 284,
    width: 370,
    left: 30,
    position: "absolute",
    overflow: "hidden",
  },
  customeritemselection: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default CustomerItemSelection;
