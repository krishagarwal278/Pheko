import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

type RootStackParamList = {
  CustomerWelcome: undefined;
  CustomerPickupConfirmed: undefined;
  CustomerItemWeight: undefined;
  CustomerItemSelection: undefined;
  CustomerPickupDateTime: undefined;
  NumberVerificationPage: undefined;
};

interface ContinueButtonProps {
  destination: keyof RootStackParamList;
  buttonText?: string;
  buttonStyle?: Object;
  textStyle?: Object;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  destination,
  buttonText = "Continue",
  buttonStyle,
  textStyle,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={[styles.continueButton, buttonStyle]}
      onPress={() => navigation.navigate(destination)}
    >
      <Text style={[styles.continueText, textStyle]}>{buttonText}</Text>
    </Pressable>
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
