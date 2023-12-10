import React, {FunctionComponent, CSSProperties, useState, useEffect} from "react";
import { Text, Dimensions, StyleSheet, Pressable, View, ActivityIndicator, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {  } from '@react-navigation/native';
import PageHeader from "../components/PageHeader";
import NavBar from "../components/NavBar";
import {collection, doc, getDoc, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "../Firebase";
import { useUser } from "../UserContext";
import { useIsFocused } from "@react-navigation/native";
import {Order} from "../Types";
import {useOrder} from "../OrderContext";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    CustomerItemSelection: undefined;
    CustomerNumberVerification:undefined;
    CustomerDashboard: undefined;
    CustomerOngoingOrderDetails: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'CustomerDashboard'>;

type orderName = {
    id: string,
    name: string
}


const CustomerDashboard: React.FC = () => {

    const [loading, setLoading] = useState(true);

    const [weightCount, setWeightCount] = useState(0);

    const [acceptedOrders, setAcceptedOrders] = useState<Order[]>([]);

    const [acceptedOrderNames, setAcceptedOrderNames] = useState<orderName[]>([]);

    const { user, setUser } = useUser();

    const { order, setOrder } = useOrder();

    const navigation = useNavigation<NavigationProps>();

    const isFocused = useIsFocused();

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
                const currentDate = new Date();
                console.log(currentDate.toString());
                const scheduled_orders = filteredDocs.filter((doc) => {
                    if(doc.scheduledDateTime){
                        return doc.status === "SCHEDULED" /*&& doc.scheduledDateTime.getFullYear() == currentDate.getFullYear() && doc.scheduledDateTime.getMonth() == currentDate.getMonth() && doc.scheduledDateTime.getDate() == currentDate.getDate()*/;
                    }
                    return doc.status === "SCHEDULED";
                });
                setAcceptedOrders(scheduled_orders);
                fetchNames(scheduled_orders);
                setLoading(false);
            },
            (error) => {
                console.log('Error fetching Firestore available order data:', error);
                setLoading(false);
            }
        );

        const fetchNames = async (scheduledOrders: Order[]) => {
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
                setAcceptedOrderNames(orderNames);
            } catch (error) {
                console.error("Failed to fetch names", error);
                // Handle the error appropriately
            }
        }

        return () => unsubscribe();
    }, [isFocused]);

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
    };

    const sumWeights = (order: Order) => {
        return order.weights.reduce((innerSum: number, weight: number) => innerSum + weight, 0);
    };

    const orderSelected = (order: Order) => {

        setOrder(order);
        navigation.navigate("CustomerOngoingOrderDetails");

    };

    const getTime = (date: Date | undefined) => {
        if (date){
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${hours}:${minutes}`;
        }
        return '';
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
                <View style={[styles.mainContent]}>
                    <PageHeader
                        title={"Hi " + user.firstName}
                        subtitle="Welcome to your dashboard!"
                    />
                    <Pressable style={[styles.CreateOrder]} onPress={() => navigation.navigate('CustomerItemSelection')}>
                        <Image style={styles.image2} source={require('../assets/dashboard-icon.gif')}></Image>
                        <Text style={[styles.orderText]}>Schedule an Order!</Text>
                    </Pressable>

                    <ScrollView style={[styles.dataContainer]}>
                        {loading ? (
                            <ActivityIndicator size="large" color={Color.color1} />
                        ) : (
                            <>
                                <View style={[styles.textDataContainer]}>
                                    <Text style={styles.acceptedHeader}>Accepted</Text>
                                    <View style={styles.orderDivider}/>
                                    {acceptedOrders.map((order: Order) => (
                                            <Pressable key={order.id} style={[styles.orderCard]} onPress={() => orderSelected(order)}>
                                                <View style={[styles.orderAttributesContainer]}>
                                                    <View style={[styles.orderUpperContainer]}>
                                                        <Text style={styles.name}>{acceptedOrderNames.find(name => name.id === order.id)?.name || 'No Name'}</Text>
                                                        <Image style={[styles.image]} source={require('../assets/vector-forward.png')}></Image>
                                                    </View>
                                                    <View style={[styles.orderBottomContainer]}>
                                                        <View style={[styles.orderInfoContainer]}>
                                                            <Text style={[styles.orderInfo]} > {formatDate(order.scheduledDateTime)}</Text>
                                                            <Text style={[styles.orderInfo]} > {sumWeights(order)} kg</Text>
                                                            <Text style={[styles.orderInfo]} > {order.address}</Text>
                                                            <Text style={styles.eta}>Scrap dealer {acceptedOrderNames.find(name => name.id === order.id)?.name || 'No Name'} arriving by {getTime(order.scheduledDateTime)}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        ))}
                                </View>
                            </>
                        )}
                    </ScrollView>
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
    },
    mainContent:{
        flex:1,
    },
    CreateOrder: {
        marginTop: 25,
        height: "30%",
        borderRadius: Border.br_6xl,
        backgroundColor: Color.color,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    orderText:{
        fontSize: FontSize.size_5xl,
        fontFamily: FontFamily.montserratMedium,
        color: Color.color1,
        marginBottom: "10%",
    },
    dataContainer:{
        marginTop: 15,
        borderRadius: Border.br_6xl,
        backgroundColor: "#f0f0f0",
        width: "100%",
        padding: 10,
        marginBottom: "10%",
    },
    textDataContainer:{
        flexDirection: "column",
        flex: 1,
    },
    value:{
        fontSize: FontSize.size_5xl,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
        marginRight: 7,

    },
    metric:{
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
    },
    image:{
        height: "50%",
        width: "2%",
    },
    image2:{
        height: "80%",
        width: "60%",
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
    name: {
        color: Color.color1,
        fontFamily: FontFamily.montserratBold,
    },
    orderDivider: {
        height: 2,
        width: '90%', // You can adjust the width as you like
        alignSelf: 'center',
        backgroundColor: Color.color,
        marginTop: 10,
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
        paddingLeft: "1%",
    },
    orderInfo:{
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_small,
        color: Color.color1,
    },
    orderCard: {
        height: 130,
        backgroundColor: Color.color_light_gray,
        justifyContent: "center",
        alignItems: "center",
    },
    acceptedHeader: {
        marginLeft: "5%",
        marginTop: "5%",
        fontFamily: FontFamily.montserratBold,
        fontSize: FontSize.size_base,
        color: Color.color1,
    },
    eta: {
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_small,
        color: Color.color1,
    }
});


export default CustomerDashboard;