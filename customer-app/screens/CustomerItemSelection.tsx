import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { useOrder } from "../OrderContext";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";

interface SelectedItem {
  key: string;
  weight: string;
}

const CustomerItemSelection = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { setOrder } = useOrder();

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
    {
      key: "metal",
      label: "Metal",
      icon: require("../assets/vector4.png"),
    },
    {
      key: "paper",
      label: "Paper",
      icon: require("../assets/vector5.png"),
    },
    {
      key: "plastic",
      label: "Plastic",
      icon: require("../assets/vector6.png"),
    },
    {
      key: "glass",
      label: "Glass",
      icon: require("../assets/vector7.png"),
    },
  ];

  const handleSelectItem = (itemKey: string) => {
    setSelectedItems((prevItems) => {
      const foundItem = prevItems.find((item) => item.key === itemKey);
      if (foundItem) {
        return prevItems.filter((item) => item.key !== itemKey); // Deselect
      } else {
        return [...prevItems, { key: itemKey, weight: "0" }]; // Select new item
      }
    });
  };

  const handleWeightChange = (itemKey: string, weight: string) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.key === itemKey ? { ...item, weight } : item
      )
    );
  };

  const handleSubmit = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: selectedItems
        .filter((item) => parseFloat(item.weight) > 0)
        .map((item) => item.key),
      weights: selectedItems
        .filter((item) => parseFloat(item.weight) > 0)
        .map((item) => parseFloat(item.weight)),
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <View style={styles.container}>
        <BackButton />

        <PageHeader
          title="Select Items and Specify Weight"
          subtitle="Choose recyclable items and enter their approximate weight."
        />

        <ScrollView
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <View key={item.key} style={styles.itemRow}>
              <Pressable
                style={[
                  styles.itemButton,
                  selectedItems.find((i) => i.key === item.key)
                    ? styles.selectedItemStyle
                    : null,
                ]}
                onPress={() => handleSelectItem(item.key)}
              >
                <Image style={styles.itemIcon} source={item.icon} />
                <Text style={styles.itemText}>{item.label}</Text>
              </Pressable>
              {selectedItems.find((i) => i.key === item.key) && (
                <TextInput
                  style={styles.weightInput}
                  value={selectedItems
                    .find((i) => i.key === item.key)
                    ?.weight.toString()}
                  onChangeText={(text) => handleWeightChange(item.key, text)}
                  keyboardType="numeric"
                  placeholder="Weight (kg)"
                />
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <ContinueButton
            destination="CustomerAddressScreen"
            onPressAdditional={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: Padding.p_11xl,
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
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 15,
    borderRadius: Border.br_6xl,
    borderWidth: 2,
    borderColor: Color.color,
    flex: 1, // Make buttons stretch to fill row
    marginRight: 15, // Spacing between button and input
  },
  itemIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemText: {
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  itemsContainer: {
    flexGrow: 1,
    marginBottom: 90,
  },

  selectedItemStyle: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  weightInput: {
    borderWidth: 2,
    borderColor: Color.color,
    borderRadius: Border.br_6xl,
    padding: 10,
    width: 100, // Fixed width for consistency
    marginRight: 15,
    textAlign: "center",
  },
});

export default CustomerItemSelection;
