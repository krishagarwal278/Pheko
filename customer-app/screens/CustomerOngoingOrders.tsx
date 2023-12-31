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
import { collection, getDoc, getDocs, onSnapshot, doc } from "firebase/firestore";
import { Order } from "../Types";
import { useOrder } from "../OrderContext";
import {StackNavigationProp} from "@react-navigation/stack";
import NavBar from "../components/NavBar";
import {useUser} from "../UserContext";

type orderName = {
    id: string,
    name: string
}
 
type orderStatus = {
    original: string,
    display: string,
}

const ScrapDealerOngoingOrders = () => {

    const isFocused = useIsFocused();

    const [scheduledOrders, setScheduledOrders] = useState<Order[]>([]);

    const [createdOrders, setCreatedOrders] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);

    const [scheduledOrderNames, setScheduledOrderNames] = useState<orderName[]>([]);

    const [createdOrderNames, setCreatedOrderNames] = useState<orderName[]>([]);

    const { order, setOrder } = useOrder();

    const { user, setUser } = useUser();

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
                const filteredDocs = mappedDocs.filter(doc => doc.userId === user.id);
                const scheduled_orders = filteredDocs.filter((doc) => doc.status === "SCHEDULED");
                const created_orders = filteredDocs.filter((doc) => doc.status === "CREATED");
                setScheduledOrders(scheduled_orders);
                setCreatedOrders(created_orders);
                fetchNames(scheduled_orders, created_orders);
                setLoading(false);
            },
            (error) => {
                console.log('Error fetching Firestore available order data:', error);
                setLoading(false);
            }
        );

        const fetchNames = async (scheduledOrders: Order[], createdOrders: Order[]) => {
            try {
                const orderNamesPromises = scheduledOrders.map(async (doc_i) => {
                    if(doc_i.status === 'CREATED'){
                        return { id: doc_i.id, name: ''} as orderName;
                    }
                    const docRef = doc(db, "ScrapDealers", doc_i.scrapDealerId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        // Use optional chaining to handle undefined `firstName`
                        const name = docSnap.data()?.firstName;
                        return { id: doc_i.id, name: name || '' } as orderName; // Default to '' if `firstName` is undefined
                    } else {
                        return { id: doc_i.id, name: '' } as orderName;
                    }
                });
                const orderNames = await Promise.all(orderNamesPromises);
                setScheduledOrderNames(orderNames);
                const orderNamesPromises2 = createdOrders.map(async (doc_i) => {
                    if(doc_i.status === 'CREATED'){
                        return { id: doc_i.id, name: ''} as orderName;
                    }
                    const docRef = doc(db, "ScrapDealers", doc_i.scrapDealerId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        // Use optional chaining to handle undefined `firstName`
                        const name = docSnap.data()?.firstName;
                        return { id: doc_i.id, name: name || '' } as orderName; // Default to '' if `firstName` is undefined
                    } else {
                        return { id: doc_i.id, name: '' } as orderName;
                    }
                });
                const orderNames2 = await Promise.all(orderNamesPromises2);
                setCreatedOrderNames(orderNames2);
            } catch (error) {
                console.error("Failed to fetch names", error);
                // Handle the error appropriately
            }
        }

        return () => unsubscribe();
    }, [isFocused]);

    const orderSelected = (order: Order) => {

        setOrder(order);
        navigation.navigate("CustomerOngoingOrderDetails");

    };

    const formatDate = (date: Date | undefined) => {
        if (date){
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const dayName = days[date.getDay()];
            const monthName = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${dayName} ${monthName} ${day < 10 ? `0${day}` : day} ${year} ${hours}:${minutes}`;
        }
        return '';
    }

    const sumWeights = (order: Order) => {
        return order.weights.reduce((innerSum: number, weight: number) => innerSum + weight, 0);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
                <BackButton/>

                <PageHeader
                    title="Ongoing Orders"
                    subtitle=""
                />
                <ScrollView style={styles.itemsContainer}
                            showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color={Color.color1} />
                    ) : (
                        <>
                            <Text style={styles.scheduledHeader}>Scheduled</Text>
                            {scheduledOrders.map((order: Order) => (
                                <Pressable key={order.id} style={[styles.orderCard]} onPress={() => orderSelected(order)}>
                                    <View style={[styles.orderAttributesContainer]}>
                                        <View style={[styles.orderUpperContainer]}>
                                            <Text style={styles.name}>{scheduledOrderNames.find(name => name.id === order.id)?.name || 'No Name'}</Text>
                                            <Image style={[styles.image]} source={require('../assets/vector-forward.png')}></Image>
                                        </View>
                                        <View style={styles.orderDivider} />
                                        <View style={[styles.orderBottomContainer]}>
                                            <View style={[styles.orderInfoContainer]}>
                                                <Text style={[styles.orderInfo]} > {formatDate(order.scheduledDateTime)}</Text>
                                                <Text style={[styles.orderInfo]} > {sumWeights(order)} kg</Text>
                                                <Text style={[styles.orderInfo]} > {order.address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                            <Text style={styles.createdHeader}>Created</Text>
                            {createdOrders.map((order: Order) => (
                                <Pressable key={order.id} style={[styles.orderCard]} onPress={() => orderSelected(order)}>
                                    <View style={[styles.orderAttributesContainer]}>
                                        <View style={[styles.orderUpperContainer]}>
                                            <Text style={styles.name}>{createdOrderNames.find(name => name.id === order.id)?.name || 'Order Not Yet Accepted'}</Text>
                                            <Image style={[styles.image]} source={require('../assets/vector-forward.png')}></Image>
                                        </View>
                                        <View style={styles.orderDivider} />
                                        <View style={[styles.orderBottomContainer]}>
                                            <View style={[styles.orderInfoContainer]}>
                                                <Text style={[styles.orderInfo]} > {formatDate(order.scheduledDateTime)}</Text>
                                                <Text style={[styles.orderInfo]} > {sumWeights(order)} kg</Text>
                                                <Text style={[styles.orderInfo]} > {order.address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>
            <NavBar/>
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
    },
    orderCard: {
        marginTop: 15,
        height: 130,
        borderRadius: Border.br_6xl,
        backgroundColor: Color.color_light_gray,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    image:{
        width:10,
        height: 15,
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
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_small,
        color: Color.color1,
    },
    orderBottomContainer: {
        flexDirection: "row",
        paddingRight: "3%",
        paddingLeft: "3%",
        marginTop: "2%",
    },
    orderInfoContainer: {
        flexDirection: "column",
        width: "60%",
        paddingLeft: "3%",
    },
    orderDivider: {
        height: 2,
        width: '90%', // You can adjust the width as you like
        alignSelf: 'center',
        backgroundColor: Color.color,
        marginVertical: 10,
    },
    name: {
        color: Color.color1,
        fontFamily: FontFamily.montserratBold,
    },
    scheduledHeader: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
    },
    createdHeader: {
        marginTop: "10%",
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
    },
});

export default ScrapDealerOngoingOrders;