import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Border, Color, FontFamily, FontSize, Padding} from "../GlobalStyles";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";
import {useOrder} from '../OrderContext';
import {db} from '../Firebase';
import {addDoc, collection, getDocs} from "firebase/firestore";
import { useUser } from "../UserContext";
import { useNavigation, ParamListBase, RouteProp } from "@react-navigation/native";

type RouteParams = {
  address: string;
};

type CustomerPickupDateTimeRouteProp = RouteProp<ParamListBase, 'CustomerPickupDateTime'> & {
  params: RouteParams;
};

type Props = {
  route: CustomerPickupDateTimeRouteProp;
};

const CustomerPickupDateTime: React.FC<Props> = ({ route }) => {
  const address = route.params.address;

  const [date, setDate] = useState<Date>(new Date());

  const { order, setOrder } = useOrder();

  const { user, setUser } = useUser();

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      console.log("Selected date:", date);
      setOrder((prevOrder) => ({
        ...prevOrder,
        scheduledDateTime: date,
      }));
    }
  };

  const calculatePrice = async () => {
  console.log("Order before calculate price", order);
  try {
    const querySnapshot = await getDocs(collection(db, 'Rates'));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as { id: string, [key: string]: any }));

    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
      const rate = documents.find(doc => doc.Name === order.items[i]);
      if (rate) {
        total += rate.PricePerKg * order.weights[i];
      }
    }

    return total;
  }
  catch (e: any) {
    console.error("Error with Firestore:", e.message);
  }
};

  const getOrderNumber = async () => {
    console.log("Order before getOrderNumber", order);
    try{
      const querySnapshot = await getDocs(collection(db, 'Orders'));
      const documents = querySnapshot.docs.map(doc => doc.data());
      const latestOrder = documents.reduce((latest, current) => {
        return new Date(current.DateCreated) > new Date(latest.DateCreated) ? current : latest;
      });
      return latestOrder.OrderNumber + 1;
    }
    catch (e: any)
    {
      console.error("Error with Firestore:", e.message);
    }
  }

  const submitOrder = async () => {
  try {
    console.log("Order at start of submitOrder", order);
    const total = await calculatePrice();
    console.log("Total price:", total);
    if (total === undefined) {
      console.error("Failed to calculate total price.");
      return;
    }
    const orderNum = await getOrderNumber();
    const updatedOrder = {
      ...order,
      price: total,
      orderNumber: orderNum,
      dateCreated: new Date(),
      dateLastUpdated: new Date(),
      status: "CREATED",
      userId: user.id,
      address: address,
    };
    console.log("Order after submitOrder", updatedOrder)
    setOrder(updatedOrder);

    console.log("Order before sending to DB", updatedOrder);

    const docRef = await addDoc(collection(db, "Orders"), {
      DateCreated: updatedOrder.dateCreated,
      DateLastUpdates: updatedOrder.dateLastUpdated,
      Items: updatedOrder.items,
      OrderNumber: updatedOrder.orderNumber,
      Price: updatedOrder.price,
      ScheduledDateTime: updatedOrder.scheduledDateTime,
      Status: updatedOrder.status,
      UserId: updatedOrder.userId,
      Weights: updatedOrder.weights,
      Address: updatedOrder.address,
      Notes: updatedOrder.notes
    });
    console.log("Document written with ID: ", docRef.id);
  }
  catch (e: any) {
    console.error("Error with Firestore:", e.message);
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
          <ContinueButton
              destination="CustomerPickupConfirmed"
              onPressAdditional={async () => {
                await submitOrder();
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

export default CustomerPickupDateTime;
