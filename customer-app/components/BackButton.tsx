import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.vector}>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require("../assets/vector1.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  vector: {
    padding: 15,
    marginLeft: -20,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default BackButton;
