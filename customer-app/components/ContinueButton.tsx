import React from "react";
import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { FontSize, Color, FontFamily, Border } from "./../GlobalStyles";

interface ContinueButtonProps {
  destination: string;
  buttonText?: string;
  textStyle?: Object;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  destination,
  buttonText = "Continue",
  textStyle,
}) => {
  return (
    <Link href={destination} style={styles.continueButton} asChild>
      <Text style={[styles.continueText, textStyle]}>{buttonText}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
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

export default ContinueButton;