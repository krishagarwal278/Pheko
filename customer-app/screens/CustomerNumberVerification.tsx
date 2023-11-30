import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import PageHeader from "../components/PageHeader";

const CustomerNumberVerification: React.FunctionComponent = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendVerification = async () => {
    if (phoneNumber) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // Pass the confirmation object to the next screen
        navigation.navigate("CustomerOTPVerification", { confirmation });
      } catch (error) {
        console.error("Failed to send verification code", error);
      }
    }
  };

  const confirmCode = async (code) => {
    if (confirm && code) {
      try {
        await confirm.confirm(code);
        // Handle successful confirmation here
        // navigation.navigate("SomeOtherScreen");
      } catch (error) {
        console.error("Invalid code.", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <BackButton />
        <PageHeader
          title="Number Verification"
          subtitle="We'll text you a code to verify your mobile number"
        />

        {!confirm ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Phone Number with Country Code"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            <Pressable style={styles.continueButton} onPress={sendVerification}>
              <Text style={styles.continueText}>Send Verification Code</Text>
            </Pressable>
          </>
        ) : (
          <>
            {/* Optionally, this part can be in a separate screen */}
            <TextInput
              style={styles.input}
              placeholder="Enter Verification Code"
              keyboardType="number-pad"
              // You can maintain a separate state for the OTP code or pass directly to confirmCode
              onChangeText={(code) => confirmCode(code)}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
  },
  input: {
    borderWidth: 2,
    borderColor: Color.color,
    borderRadius: Border.br_6xl,
    padding: 15,
    marginBottom: 20,
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
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
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default CustomerNumberVerification;
