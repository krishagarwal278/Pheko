import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Color, Border, FontSize, FontFamily, Padding } from "../GlobalStyles";
import { auth } from "../Firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useScrapDealer } from "../ScrapDealerContext";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";
import { ScrapDealer } from "../Types";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import * as Device from "expo-device";

const ScrapDealerSignUp = () => {
  const currentUser = auth.currentUser!;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [pushToken, setPushToken] = useState("");
  const { scrapDealer, setScrapDealer } = useScrapDealer();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setPushToken(token);
    } else {
      Alert.alert("Must use a physical device for Push Notifications");
    }
  }

  const onChange = (event: any, selectedDate?: Date) => {
    selectedDate && setDate(selectedDate);
  };

  const registerAndSignIn = async () => {
    const db = getFirestore();

    // Save user's details to Firestore
    if (currentUser) {
      const userDoc = doc(db, "ScrapDealers", currentUser.uid);
      const userInfo: ScrapDealer = {
        id: currentUser.uid,
        address: address,
        dateOfBirth: date,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: currentUser.phoneNumber,
        dateCreated: new Date(),
        dateLastUpdated: new Date(),
        pushToken: pushToken,
      };
      setScrapDealer(userInfo);
      await setDoc(userDoc, userInfo);
      navigation.navigate("ScrapdealerDashboard");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <BackButton />

        <ScrollView showsVerticalScrollIndicator={false}>
          <PageHeader title="Sign Up" subtitle="Create your account" />
          <View style={styles.form}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.dateText}>Date of Birth:</Text>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                style={styles.datePicker}
              />
            </View>

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              onChangeText={(text) => setAddress(text)}
              value={address}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <ContinueButton
            destination="ScrapDealerDashboard"
            onPressAdditional={registerAndSignIn}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
    backgroundColor: Color.colorWhite,
  },
  form: {
    flex: 1,
    justifyContent: "space-around",
  },
  label: {
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: Color.color_light_purple,
    borderRadius: Border.br_6xl,
    padding: 15,
    marginBottom: 20,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratMedium,
  },
  datePicker: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Color.color_light_purple,
    borderRadius: Border.br_6xl,
    padding: 15,
    marginBottom: 20,
  },
  dateText: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratMedium,
    marginRight: 10,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default ScrapDealerSignUp;
