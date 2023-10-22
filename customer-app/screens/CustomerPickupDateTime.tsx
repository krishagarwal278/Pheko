import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontSize, Color, FontFamily, Border, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";
import { Order } from "../Types";
import {OrderContext, useOrder} from '../OrderContext';

const CustomerPickupDateTime: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { order, setOrder } = useOrder();

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOrder((prevOrder) => ({
        ...prevOrder,
        scheduledDateTime: date,
      }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <View style={styles.container}>
        <BackButton />

        <PageHeader
          title="Pickup Date and Time"
          subtitle="When would you like us to pick up your recyclables?"
        />

        <View style={[styles.dateContainer, styles.pickerContainer]}>
          <Text style={styles.dateText}>Selected Date:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            style={styles.dateTimePicker}
          />
        </View>

        <View style={[styles.timeContainer, styles.pickerContainer]}>
          <Text style={styles.dateText}>Selected Time:</Text>
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChange}
            style={styles.dateTimePicker}
          />
        </View>

        <View style={styles.bottomContainer}>
          <ContinueButton destination="CustomerPickupConfirmed" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  dateText: {
    fontSize: FontSize.size_base * 1.5,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
    marginRight: 10,
  },
  dateTimePicker: {
    flex: 1,
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
});

export default CustomerPickupDateTime;
