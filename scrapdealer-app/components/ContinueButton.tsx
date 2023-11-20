import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

type RootStackParamList = {
  ScrapDealerWelcome: undefined;
  ScrapDealerNumberVerification: undefined;
  ScrapDealerOTPVerification: undefined;
  ScrapDealerSignUp: undefined;
  ScrapDealerOngoingOrders: undefined;
};

interface ContinueButtonProps {
  destination: keyof RootStackParamList;
  buttonText?: string;
  buttonStyle?: Object;
  textStyle?: Object;
  onPressAdditional?: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  destination,
  buttonText = "Continue",
  buttonStyle,
  textStyle,
                                                         onPressAdditional
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={[styles.continueButton, buttonStyle]}
      onPress={() => {
        navigation.navigate(destination);
        onPressAdditional && onPressAdditional();
      }}
    >
      <Text style={[styles.continueText, textStyle]}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    height: 86,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color_light_purple,
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
