import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";
import { FontSize, Color, FontFamily, Border, Padding } from "../GlobalStyles";
import { Order } from "../Types";
import {OrderContext, useOrder} from '../OrderContext';

const CustomerItemWeight: React.FC = () => {
  const [weight, setWeight] = React.useState("");

  const { order, setOrder } = useOrder();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
        <View style={styles.container}>
          <BackButton />

          <PageHeader
            title="Specify the weight"
            subtitle="Let us know the approximate weight of the items you'd like us to pick up."
          />

          <View style={styles.inputContainerWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={() => {
                  setWeight(weight);
                  setOrder((prevOrder: any) => ({
                    ...prevOrder,
                    weights: [weight]
                  }));
                }}
                keyboardType="numeric"
                textAlign="right"
                placeholder="0"
              />
              <Text style={styles.kg}>kg</Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <ContinueButton destination="CustomerPickupDateTime" />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
  },
  inputContainerWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Color.color,
    borderRadius: Border.br_6xl,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: FontSize.size_base * 1.5,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  kg: {
    marginLeft: 5,
    fontSize: FontSize.size_base * 1.5,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default CustomerItemWeight;
