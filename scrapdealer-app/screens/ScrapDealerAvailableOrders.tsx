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
                const docs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Order)  // Casting the data to the Order type here
                })).filter((doc: Order) => doc.status === "CREATED");  // Now TypeScript knows doc is of type Order
                setOrders(docs);
                setLoading(false);
            },
            (error) => {
                console.log('Error fetching Firestore available order data:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe(); // This unsubscribes from the listener when the component unmounts
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
                                <Pressable style={[styles.orderCard]} onPress={() => orderSelected(order)}>
                                    <View style={[styles.orderAttributesContainer]}>
                                        <View style={[styles.orderUpperContainer]}>
                                            <Text> Name </Text>
                                            <Image style={[styles.image]} source={require('../assets/vector-forward.png')}></Image>
                                        </View>
                                        {/*Line*/}
                                        <View style={[styles.orderBottomContainer]}>
                                            <View style={[styles.orderInfoContainer]}>
                                               <Text style={[styles.orderInfo]} > {order.scheduledDateTime.toString()}</Text>
                                               <Text style={[styles.orderInfo]} > {order.weights[0].toString()}</Text>
                                               <Text style={[styles.orderInfo]} > {order.address}</Text>
                                            </View>
                                            <View style={[styles.statusContainer]}>
                                                <Text>{order.status}</Text>
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
        marginBottom: 90,
    },
    orderCard: {
        marginTop: 15,
        height: 50,
        borderRadius: Border.br_6xl,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",

    },
    image:{
        width:24,
        height: 24,
    },
    orderAttributesContainer: {
        flexDirection: "column",

    },
    orderUpperContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    orderInfo:{
        fontFamily: FontFamily.montserratRegular,
        fontSize: FontSize.size_xl,
        color: Color.color1,


    },
    orderBottomContainer: {
        flexDirection: "row",

    },
    orderInfoContainer: {
        flexDirection: "column",
        

    },
    statusContainer: {


    }
});

export default ScrapDealerAvailableOrders;
