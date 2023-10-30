import * as React from "react";
import { Text, StyleSheet, View, Image, SafeAreaView, Dimensions } from "react-native";
import { Color, Padding, FontFamily } from "../GlobalStyles";
import ContinueButton from "../components/ContinueButton";
import {useOrder} from '../OrderContext';

const windowHeight = Dimensions.get('window').height;

const CustomerPickupConfirmed = () => {

  const { order, setOrder } = useOrder();     //Use order attributes to display where appropriate

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <View style={styles.container}>

        <View style={styles.headerLayout}>
          <Text style={styles.headerText}>
            Your Pickup Order has been Requested!
          </Text>
        </View>

        <View style={styles.imageLayout}>
          <Image
            style={styles.backgroundImage}
            resizeMode="contain"
            source={require("../assets/signup1.png")}
          />
        </View>

        <View style={styles.bottomContainer}>
          <ContinueButton
            destination="CustomerItemSelection"
            buttonText="Make New Request"
            textStyle={{
              fontWeight: "700",
              fontFamily: FontFamily.montserratBold,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
    backgroundColor: Color.colorWhite,
  },
  headerLayout: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: windowHeight * 0.04, 
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    textAlign: "center",
  },
  imageLayout: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default CustomerPickupConfirmed;
