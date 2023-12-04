import * as React from "react";
import {Text, StyleSheet, View, Image, SafeAreaView, Dimensions, Pressable} from "react-native";
import {Color, Padding, FontFamily, FontSize, Border} from "../GlobalStyles";
import ContinueButton from "../components/ContinueButton";
import {useOrder} from '../OrderContext';
import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../Firebase";
import {useScrapDealer} from "../ScrapDealerContext";
import PageHeader from "../components/PageHeader";
import {useEffect, useState} from "react";
import {Order} from "../Types";
import NavBar from "../components/NavBar";
import {ParamListBase, useIsFocused, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import BackButton from "../components/BackButton";

const windowHeight = Dimensions.get('window').height;

const ScrapDealerAcceptOrder = () => {

    const { order, setOrder } = useOrder();     //Use order attributes to display where appropriate

    const { scrapDealer, setScrapDealer } = useScrapDealer();

    const [orderName, setOrderName] = useState<String>("");

    const [items, setItems] = useState<String[]>([]);

    const [weights, setWeights] = useState<number[]>([]);

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    useEffect(() => {

        setItems(order.items);
        setWeights(order.weights);
        fetchName(order);

    });

    const fetchName = async (ord: Order) => {
        try {
            const docRef = doc(db, "Users", ord.userId);
            const docSnap = await getDoc(docRef);
            setOrderName(docSnap.data().firstName)
        } catch (error) {
            console.error("Failed to fetch name", error);
            // Handle the error appropriately
        }
    };

    const acceptOrder = async () => {
        const orderDocRef = doc(db, 'Orders', order.id);
        await updateDoc(orderDocRef, {
            ScrapDealerId: scrapDealer.id,
            DateLastUpdates: new Date(),
            Status: "SCHEDULED"
        });
        const userDocRef = doc(db, 'Users', order.userId);
        const docSnap = await getDoc(userDocRef);
        const token = docSnap.data().pushToken;
        fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            'host': 'exp.host',
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            to: token, 
            title: "Order Accepted",
            body: "Your order of " + order.items + " has been accepted. Your scrap dealer is: " + scrapDealer.firstName + " " + scrapDealer.lastName,
        }),
    })
    .then(response => response.json())
    .then(responseData => {
        // Handle the response here
        console.log(responseData);
    })
    .catch(error => {
        // Handle the error
        console.error(error);
    });
};


    const handleAcceptOrder = async () => {
        await acceptOrder();
        navigation.navigate("ScrapDealerAvailableOrders");
    };

    const formatDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${dayName} ${monthName} ${day < 10 ? `0${day}` : day} ${year} ${hours}:${minutes}`;
    };

    const ItemDetail = ({ itemName, itemWeight }) => (
        <View style={styles.itemDetailContainer}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemWeight}>{itemWeight} kg</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
                <BackButton/>
                <View style={styles.headerContainer}>
                    <PageHeader title={orderName.toString()} subtitle={formatDate(order.scheduledDateTime)}/>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.orderDetailsContainer}>
                    <Text style={styles.orderDetailsHeader}>Order Details</Text>
                    {items.map((item, index) => (
                        <ItemDetail key={index} itemName={item} itemWeight={weights[index]}/>
                    ))}
                </View>
                <View style={styles.separator}></View>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressHeader}>Address</Text>
                    <Text style={styles.addressText}>{order.address}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.acceptOrder} onPress={() => handleAcceptOrder()}>
                        <Text style={styles.acceptOrderText}>Accept</Text>
                    </Pressable>
                    <Pressable style={styles.saveForLater} onPress={() => navigation.navigate("ScrapDealerAvailableOrders")}>
                        <Text style={styles.saveForLaterText}>Save For Later</Text>
                    </Pressable>
                </View>
            </View>
            <NavBar/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Padding.p_11xl,
        backgroundColor: Color.colorWhite,
    },
    separator: {
        height: 2,
        backgroundColor: Color.color_light_purple,
    },
    headerContainer: {
        alignItems: "flex-start"
    },
    orderDetailsContainer: {
        width: "100%",
        marginBottom: "10%",
    },
    orderDetailsHeader: {
        marginTop: "5%",
        fontFamily: FontFamily.montserratBold,
        fontSize: FontSize.size_xl,
        color: Color.color1,
        marginBottom: "5%",
    },
    itemDetailContainer: {
        flexDirection: "row",
        borderRadius: Border.br_6xl,
        backgroundColor: Color.color_light_gray,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    itemName: {
        fontFamily: FontFamily.montserratMedium,
        color: Color.color1,
        fontSize: FontSize.size_base,
        marginLeft: 10,
    },
    itemWeight: {
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_base,
        color: Color.color1,
        paddingRight: 10,
    },
    addressContainer: {
        width: "100%",
    },
    addressHeader: {
        fontFamily: FontFamily.montserratBold,
        fontSize: FontSize.size_xl,
        color: Color.color1,
        paddingTop: "5%",
    },
    addressText: {
        fontFamily: FontFamily.montserratRegular,
        fontSize: FontSize.size_base,
        color: Color.color1,
        marginTop: "5%",
    },
    buttonContainer: {
        flex: 1, // Add this line
        justifyContent: 'flex-end', // Add this line
        paddingBottom: "20%", // Add padding to avoid buttons being too close to the edge
    },
    acceptOrder: {
        borderRadius: Border.br_6xl,
        backgroundColor: Color.color_light_purple,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
    saveForLater: {
        borderRadius: Border.br_6xl,
        backgroundColor: Color.color_light_gray,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: "5%",
    },
    acceptOrderText: {
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_base,
        color: Color.color1,
    },
    saveForLaterText: {
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_base,
        color: Color.color1,
    },
});

export default ScrapDealerAcceptOrder;
