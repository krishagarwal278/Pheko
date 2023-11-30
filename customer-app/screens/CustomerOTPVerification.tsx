import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { app, auth } from "../Firebase";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { useUser } from "../UserContext";
import BackButton from "../components/BackButton";
import AsyncContinueButton from "../components/AsyncContinueButton";
import PageHeader from "../components/PageHeader"; 
import LoadingPage from "../components/LoadingPage";
import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type VerificationRouteParams = {
  CustomerOTPVerification: {
    confirmation: FirebaseAuthTypes.ConfirmationResult;
  };
};

const CustomerOTPVerification: React.FunctionComponent = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<VerificationRouteParams, "CustomerOTPVerification">>();
  const { confirmation } = route.params;
  const [code, setCode] = useState("");
  const { setUser } = useUser(); 
  const [loading, setLoading] = useState(false);

  const confirmCode = async () => {
    setLoading(true);
    try {
      const result = await confirmation.confirm(code);
      const userDocRef = firestore().collection('Users').doc(result.user.uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUser({ ...userData, id: userDoc.id });
        navigation.navigate("CustomerDashboard");
      } else {
        navigation.navigate("CustomerSignUp");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />; 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <BackButton />

        <PageHeader // Using PageHeader for consistency
          title="Verify Your Number"
          subtitle="Enter the OTP sent to your number"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        <View style={styles.bottomContainer}>
          <AsyncContinueButton buttonText="Confirm OTP" onPress={confirmCode} />
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
    padding: 20,
    marginBottom: 20,
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default CustomerOTPVerification;
