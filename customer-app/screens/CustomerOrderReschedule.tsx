import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import PageHeader from "../components/PageHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContinueButton from "../components/ContinueButton";
import React, { useState } from "react";
import { useOrder } from "../OrderContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const CustomerOrderReschedule: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { order, setOrder } = useOrder();

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      console.log("Selected date:", date);
    }
  };

  const confirmReschedule = async () => {
    if (order.id) {
      // Check that `order.id` is not undefined
      const orderDocRef = doc(db, "Orders", order.id);
      await updateDoc(orderDocRef, {
        DateLastUpdates: new Date(),
        ScheduledDateTime: date,
      });
      const userDocRef = doc(db, "ScrapDealers", order.scrapDealerId);
      const docSnap = await getDoc(userDocRef);
      const scrapDealerData = docSnap.data();
      const token = scrapDealerData?.pushToken;
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: token,
          title: "Customer Rescheduled Order",
          body:
            "The order of " +
            order.items +
            " has been rescheduled by the customer. You can view the new date and time in the app.",
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the response here
          console.log(responseData);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    } else {
      // Handle the case where `order.id` is undefined
      console.error("Order ID is undefined");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <View style={styles.container}>
        <BackButton />

        <PageHeader
          title="Reschedule Your Order"
          subtitle="Select a new date and time for the pickup"
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
          <ContinueButton
            destination="CustomerOngoingOrders"
            onPressAdditional={async () => {
              await confirmReschedule();
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

export default CustomerOrderReschedule;
