import * as React from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Color, Border } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { firebaseConfig } from "../Firebase";
import {
  PhoneAuthProvider,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";
import { useRef, useState } from "react";

const { width, height } = Dimensions.get("window");

const ScrapDealerNumberVerification: React.FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    const applicationVerifier = recaptchaVerifier.current;
    if (applicationVerifier) {
      phoneProvider
        .verifyPhoneNumber(phoneNumber, applicationVerifier)
        .then((verificationId) => {
          setPhoneNumber("");
          navigation.navigate("ScrapDealerOTPVerification", { verificationId });
        });
    } else {
      console.error("RecaptchaVerifier is not initialized");
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
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

        <Text style={styles.header}>What's your number?</Text>

        <View style={styles.form}>
          <Text style={styles.label}>
            We'll text you a code to verify your mobile number
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Phone Number with Country Code"
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoComplete="tel"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={sendVerification}
          >
            <Text style={styles.submitButtonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% of screen width
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  vectorContainer: {
    width: width * 0.05,
    height: height * 0.025,
    marginBottom: height * 0.02,
    alignSelf: "flex-end",
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: Color.color,
    borderRadius: Border.br_6xl,
    padding: 20,
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  frameFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  frame: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
    width: 370,
    height: 86,
    justifyContent: "center",
    marginTop: 308,
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
    backgroundColor: Color.color_light_purple,
    padding: height * 0.02,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: Color.color1,
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default ScrapDealerNumberVerification;
