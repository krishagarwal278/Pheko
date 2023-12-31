import * as React from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import { auth } from "../Firebase";
import { FunctionComponent, useEffect, useState } from "react";
import { useScrapDealer } from "../ScrapDealerContext";
import { ScrapDealer } from "../Types";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import * as Device from 'expo-device';

const { width, height } = Dimensions.get("window");

const ScrapDealerSignUp: FunctionComponent = () => {
  const currentUser = auth.currentUser;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

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
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setPushToken(token);
        } else {
            Alert.alert('Must use a physical device for Push Notifications');
        }
    }

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
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
        dateLastUpdated: new Date,
        pushToken: pushToken,
      }
      setScrapDealer(userInfo)
      await setDoc(userDoc, userInfo);
      navigation.navigate("ScrapdealerDashboard");
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

        <Text style={styles.header}>Sign up</Text>

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

          <View style={[styles.dateContainer, styles.pickerContainer]}>
            <Text style={styles.dateText}>Date of Birth:</Text>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              style={styles.dateTimePicker}
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

          <Pressable
            style={[styles.frame, styles.frameFlexBox]}
            onPress={registerAndSignIn}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  dateText: {
    fontSize: FontSize.size_base * 1.35,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    marginRight: 10,
  },
  dateTimePicker: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: Color.color1,
    borderRadius: Border.br_6xl,
    padding: 20,
    marginBottom: 20,
  },
  frameFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  frame: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color_light_purple,
    width: 370,
    height: 86,
    justifyContent: "center",
    marginTop: 20,
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

export default ScrapDealerSignUp;
