import * as React from "react";
import {useContext, useState} from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { Order } from "../Types";
import {OrderContext, useOrder} from '../OrderContext';

const CustomerItemSelection = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { order, setOrder } = useOrder();

  const isSelected = (item: string) => selectedItem === item;

  const selectionStyle = {
    backgroundColor: "rgba(0,0,0,0.1)",
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image style={styles.icon} source={require("../assets/vector1.png")} />
      </Pressable>
      <Text style={styles.headerText}>
        Choose an item
        {"\n"}
        Tell us what recyclables you'd like to have picked up, and we'll take care of the rest.
      </Text>
      <View style={styles.itemsContainer}>
        <Pressable
          style={[styles.item, isSelected("furniture") ? selectionStyle : {}]}
          onPress={() => {
            setSelectedItem("furniture");
            setOrder((prevOrder: any) => ({
              ...prevOrder,
              items: ["furniture"]
            }));
          }}
        >
          <Text style={styles.itemText}>Furniture</Text>
          <Image style={styles.itemIcon} source={require("../assets/vector2@3x.png")} />
        </Pressable>
        <Pressable
          style={[styles.item, isSelected("electronics") ? selectionStyle : {}]}
          onPress={() => {
            setSelectedItem("electronics");
            setOrder((prevOrder: any) => ({
              ...prevOrder,
              items: ["electronics"]
            }));
          }}
        >
          <Text style={styles.itemText}>Electronics</Text>
          <Image style={styles.itemIcon} source={require("../assets/vector3@3x.png")} />
        </Pressable>
        <Pressable
          style={[styles.item, isSelected("metal") ? selectionStyle : {}]}
          onPress={() => {
            setSelectedItem("metal");
            setOrder((prevOrder: any) => ({
              ...prevOrder,
              items: ["metal"]
            }));
          }}
        >
          <Text style={styles.itemText}>Metal</Text>
          <Image style={styles.itemIcon} source={require("../assets/vector4@3x.png")} />
        </Pressable>
        <Pressable
          style={[styles.item, isSelected("paper") ? selectionStyle : {}]}
          onPress={() => {
            setSelectedItem("paper");
            setOrder((prevOrder: any) => ({
              ...prevOrder,
              items: ["paper"]
            }));
          }}
        >
          <Text style={styles.itemText}>Paper</Text>
          <Image style={styles.itemIcon} source={require("../assets/vector5@3x.png")} />
        </Pressable>
        <Pressable
          style={[styles.item, isSelected("plastic") ? selectionStyle : {}]}
          onPress={() => {
            setSelectedItem("plastic");
            setOrder((prevOrder: any) => ({
              ...prevOrder,
              items: ["plastic"]
            }));
          }}
        >
          <Text style={styles.itemText}>Plastic</Text>
          <Image style={styles.itemIcon} source={require("../assets/vector6@3x.png")} />
        </Pressable>
        <Pressable
          style={[styles.item, isSelected("glass") ? selectionStyle : {}]}
          onPress={() => {
            setSelectedItem("glass");
            setOrder((prevOrder: any) => ({
              ...prevOrder,
              items: ["glass"]
            }));
          }}
        >
          <Text style={styles.itemText}>Glass</Text>
          <Image style={styles.itemIcon} source={require("../assets/vector7@3x.png")} />
        </Pressable>
      </View>
      <Pressable style={styles.continueButton} onPress={() => navigation.navigate("CustomerNumberItems")}>
        <Text style={styles.continueText}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "10%",
    paddingTop: 20,
  },
  headerText: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_base,
    color: Color.color1,
    textAlign: "center",
    marginVertical: 20,
  },
  itemsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: Color.color1,
    borderRadius: 10,
  },
  itemText: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_base,
    color: Color.color1,
  },
  itemIcon: {
    width: 30,
    height: 30,
  },
  continueButton: {
    backgroundColor: Color.color,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  continueText: {
    fontFamily: FontFamily.montserratBold,
    fontSize: FontSize.size_5xl,
    color: Color.colorWhite,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CustomerItemSelection;
