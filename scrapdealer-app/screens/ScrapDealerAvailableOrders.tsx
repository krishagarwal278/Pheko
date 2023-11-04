import * as React from "react";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";
import {ParamListBase, useIsFocused, useNavigation} from "@react-navigation/native";
import { db } from "../Firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Order } from "../Types";
import { useOrder } from "../OrderContext";
import {StackNavigationProp} from "@react-navigation/stack";

const ScrapDealerAvailableOrders = () => {

    const isFocused = useIsFocused();

    const [orders, setOrders] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);

    const { order, setOrder } = useOrder();

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    useEffect(() => {
        if (!isFocused) return;

        const unsubscribe = onSnapshot(
            collection(db, "Orders"),
            (querySnapshot) => {
                const mappedDocs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    dateCreated: doc.data().DateCreated.toDate(),
                    dateLastUpdated: doc.data().DateLastUpdates.toDate(),
                    items: doc.data().Items,
                    orderNumber: doc.data().OrderNumber,
                    price: doc.data().Price,
                    scheduledDateTime: doc.data().ScheduledDateTime.toDate(),
                    scrapDealerId: doc.data().ScrapDealerId,
                    status: doc.data().Status,
                    userId: doc.data().UserId,
                    weights: doc.data().Weights,
                    address: doc.data().Address,
                    notes: doc.data().Notes
                }) as Order);
                const filteredDocs = mappedDocs.filter((doc) => doc.status === "CREATED");
                setOrders(filteredDocs);
                setLoading(false);
            },
            (error) => {
                console.log('Error fetching Firestore available order data:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [isFocused]);

    const orderSelected = (order: Order) => {

        setOrder(order);
        navigation.navigate("");

    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
                <BackButton/>

                <PageHeader
                    title="Available Orders"
                    subtitle=""
                />
                <ScrollView style={styles.itemsContainer}
                            showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color={Color.color1} />
                    ) : (
                        <>
                            {orders.map((order: Order) => (
                                <Pressable key={order.id} style={[styles.orderCard]} onPress={() => orderSelected(order)}>
                                    <View style={[styles.orderAttributesContainer]}>
                                        <View style={[styles.orderUpperContainer]}>
                                            <Text> Name </Text>
                                            <Image style={[styles.image]} source={require('../assets/vector-forward.png')}></Image>
                                        </View>
                                        <View style={styles.orderDivider} />
                                        <View style={[styles.orderBottomContainer]}>
                                            <View style={[styles.orderInfoContainer]}>
                                               <Text style={[styles.orderInfo]} > {order.scheduledDateTime.toString()}</Text>
                                               <Text style={[styles.orderInfo]} > {order.weights[0].toString()} kg</Text>
                                               <Text style={[styles.orderInfo]} > {order.address}</Text>
                                            </View>
                                            <View style={[styles.statusContainer]}>
                                                <Text style={styles.status}>{order.status}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Padding.p_11xl,
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: FontSize.size_base,
        color: Color.color1,
        fontFamily: FontFamily.montserratRegular,
    },
    itemsContainer: {
        flexGrow: 1,
        marginBottom: 30,
    },
    orderCard: {
        marginTop: 15,
        height: 130,
        borderRadius: Border.br_6xl,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",

    },
    image:{
        width:10,
        height: 10,
    },
    orderAttributesContainer: {
        flexDirection: "column",
        width: "100%",
    },
    orderUpperContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "5%",
        paddingLeft: "5%",
        paddingTop: "1%",
    },
    orderInfo:{
        fontFamily: FontFamily.montserratRegular,
        fontSize: FontSize.size_small,
        color: Color.color1,


    },
    orderBottomContainer: {
        flexDirection: "row",
        paddingRight: "3%",
        paddingLeft: "3%",
    },
    orderInfoContainer: {
        flexDirection: "column",
        width: "60%",
        paddingLeft: "3%",
    },
    statusContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: "40%",
        paddingRight: "4%",
    },
    orderDivider: {
        height: 2,
        width: '90%', // You can adjust the width as you like
        alignSelf: 'center',
        backgroundColor: Color.color,
        marginVertical: 10,
    },
    status: {
        color: Color.color1,

    },
});

export default ScrapDealerAvailableOrders;
