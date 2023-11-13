import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider } from "firebase/auth";
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { auth, firebaseConfig } from "../Firebase";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import PageHeader from "../components/PageHeader";

const CustomerNumberVerification: React.FunctionComponent = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    const applicationVerifier = recaptchaVerifier.current;
    if (applicationVerifier && phoneNumber) {
      try {
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, applicationVerifier);
        navigation.navigate("CustomerOTPVerification", { verificationId });
      } catch (error) {
        console.error("Failed to send verification code", error);
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

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number with Country Code"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoComplete="tel"
        />

        <View style={styles.bottomContainer}>
          <Pressable
            style={styles.continueButton}
            onPress={sendVerification}
          >
            <Text style={styles.continueText}>Send Verification Code</Text>
          </Pressable>
        </View>
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
