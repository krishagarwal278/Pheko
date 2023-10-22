import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";

const CustomerItemSelection = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const items = [
    {
      key: "furniture",
      label: "Furniture",
      icon: require("../assets/vector2.png"),
    },
    {
      key: "electronics",
      label: "Electronics",
      icon: require("../assets/vector3.png"),
    },
    { key: "metal", label: "Metal", icon: require("../assets/vector4.png") },
    { key: "paper", label: "Paper", icon: require("../assets/vector5.png") },
    {
      key: "plastic",
      label: "Plastic",
      icon: require("../assets/vector6.png"),
    },
    { key: "glass", label: "Glass", icon: require("../assets/vector7.png") },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <View style={styles.container}>
        <BackButton />

        <PageHeader
          title="Choose an item"
          subtitle="Tell us what recyclables you'd like to have picked up, and we'll take care of the rest."
        />

        <ScrollView
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <Pressable
              key={item.key}
              style={[
                styles.itemButton,
                selectedItem === item.key ? styles.selectedItemStyle : null,
              ]}
              onPress={() => setSelectedItem(item.key)}
            >
              <Image style={styles.itemIcon} source={item.icon} />
              <Text style={styles.itemText}>{item.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <ContinueButton destination="CustomerItemWeight" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratRegular,
  },
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 15,
    borderRadius: Border.br_6xl,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Color.color,
  },
  selectedItemStyle: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  itemsContainer: {
    flexGrow: 1,
    marginBottom: 90, 
  },
  itemIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  itemText: {
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  continueButton: {
    height: 86,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  continueText: {
    color: Color.color1,
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
  },
});

export default CustomerItemSelection;