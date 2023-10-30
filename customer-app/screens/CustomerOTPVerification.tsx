import * as React from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Color } from "../GlobalStyles";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRoute, RouteProp } from "@react-navigation/native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { app, auth } from "../Firebase";
import { useState } from "react";
import { useUser } from "../UserContext";
import {User} from "../Types";

type VerificationRouteParams = {
  CustomerOTPVerification: {
    verificationId: string;
  };
};

const { width, height } = Dimensions.get("window");

const CustomerOTPVerification: React.FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route =
    useRoute<RouteProp<VerificationRouteParams, "CustomerOTPVerification">>();
  const { verificationId } = route.params;

  const [code, setCode] = useState("");

  const { user, setUser } = useUser();

  const confirmCode = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    try {
      const result = await signInWithCredential(auth, credential);
      const user = result.user;

      // Check if the user exists in Firestore
      const db = getFirestore(app);
      const userDocRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User already registered. Signed in successfully.");
        const userData = userDoc.data();
        const document: User = {
          id: userDoc.id,
          address: userData.Address,
          dateOfBirth: userData.DateOfBirth,
          firstName: userData.FirstName,
          lastName: userData.LastName,
          email: userData.email,
          phone: userData.phone,
          dateCreated: userData.DateCreated,
          dateLastUpdated: userData.DateLastUpdated
        }
        setUser(document);
        navigation.navigate("CustomerDashboard");
      } else {
        console.log("User not registered. Redirecting to sign up form.");
        navigation.navigate("CustomerSignUp");
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <View style={styles.container}>
        <View style={styles.vectorContainer}>
          <Image
            style={styles.vectorImage}
            resizeMode="contain"
            source={require("../assets/vector1.png")}
          />
        </View>

        <Text style={styles.header}>What's the OTP?</Text>

        <View style={styles.form}>
          <Text style={styles.label}>
            Enter the OTP sent to your mobile number
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your OTP"
            onChangeText={setCode}
            keyboardType="number-pad"
            autoComplete="tel"
          />
          <TouchableOpacity style={styles.submitButton} onPress={confirmCode}>
            <Text style={styles.submitButtonText}>Confirm verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  vectorContainer: {
    width: width * 0.05,
    height: height * 0.025,
    marginBottom: height * 0.02,
    alignSelf: "flex-end",
  },
  vectorImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  form: {
    flex: 1,
  },
  label: {
    fontWeight: "500",
    marginBottom: height * 0.005,
    fontSize: width * 0.04,
  },
  input: {
    borderWidth: 2,
    borderColor: "#0f5b28",
    borderRadius: 25,
    padding: width * 0.02,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },
  submitButton: {
    backgroundColor: "#bffa01",
    padding: height * 0.02,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default CustomerOTPVerification;
