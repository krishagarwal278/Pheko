import React, {FunctionComponent, CSSProperties, useState, useEffect} from "react";
import { Text, Dimensions, StyleSheet, Pressable, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {  } from '@react-navigation/native';
import PageHeader from "../components/PageHeader";
import NavBar from "../components/NavBar";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../Firebase";
import {useUser} from "../UserContext";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    CustomerItemSelection: undefined;
    CustomerNumberVerification:undefined;
    CustomerDashboard: undefined;
    CustomerProfile: undefined;
    CustomerOngoingOrders: undefined;
    CustomerPastOrders: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'CustomerProfile'>;

const ScrapDealerProfile: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [ongoingOrders, setOngoingOrders] = useState(0);
    const [pastOrders, setPastOrders] = useState(0);
    const { user, setUser } = useUser();

    const isFocused = useIsFocused();

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        if (!isFocused) return;

        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Orders"));
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as { id: string, [key: string]: any }));
                const filteredDocs = documents.filter(doc => doc.UserId === user.id);    //Set to user Id from state
                console.log(filteredDocs);
                //Set past orders and ongoing orders
                const ongoing_orders = filteredDocs.filter((doc) => doc.Status === "SCHEDULED");
                console.log(ongoing_orders);
                setOngoingOrders(ongoing_orders.length);
                const past_orders = filteredDocs.filter((doc) => doc.Status === "COMPLETED");
                console.log(past_orders);
                setPastOrders(past_orders.length);
            } catch (error) {
                console.log('Error fetching Firestore data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
                <View style={[styles.topContainer]}>
                    <PageHeader
                        title={user.firstName + " "+ user.lastName.substring(0,1).toUpperCase() + "."}
                        subtitle=""/>
                    <Image style={styles.image} source={require('../assets/profile-pic.png')}></Image>
                </View>
                <View style={[styles.OrderStatsContainer]}>
                    <Pressable style={[styles.OngoingOrder]} onPress={() => navigation.navigate('CustomerOngoingOrders')}>
                        {loading ? (
                            <ActivityIndicator size="large" color={Color.color1} />
                        ) : (
                            <>
                                <View style={styles.ongoingOrdersContainer}>
                                    <Text style={[styles.NumOrders]} >{ongoingOrders}</Text>
                                    <Text style={[styles.OrderStatsText]} >Ongoing Orders</Text>
                                </View>
                            </>
                        )}
                    </Pressable>
                    <Pressable style={[styles.PastOrder]} onPress={() => navigation.navigate('CustomerPastOrders')}>
                        {loading ? (
                            <ActivityIndicator size="large" color={Color.color1} />
                        ) : (
                            <>
                                <View style={styles.pastOrdersContainer}>
                                    <Text style={[styles.NumOrders]} >{pastOrders}</Text>
                                    <Text style={[styles.OrderStatsText]} > Past Orders</Text>
                                </View>
                            </>
                        )}
                    </Pressable>
                </View>
                <View style={[styles.menuItems]}>
                    <Pressable style={[styles.menuItem]} >
                        <View style={[styles.menuItemContainer]} >
                            <Text style={[styles.menuItemText]} >Manage Account</Text>
                            <Image style={[styles.menuItemImage]} source={require('../assets/vector-forward.png')} ></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable style={[styles.menuItem]} >
                        <View style={[styles.menuItemContainer]} >
                            <Text style={[styles.menuItemText]} >Address</Text>
                            <Image style={[styles.menuItemImage]} source={require('../assets/vector-forward.png')} ></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable style={[styles.menuItem]} >
                        <View style={[styles.menuItemContainer]} >
                            <Text style={[styles.menuItemText]} >Privacy</Text>
                            <Image style={[styles.menuItemImage]} source={require('../assets/vector-forward.png')} ></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable style={[styles.menuItem]} >
                        <View style={[styles.menuItemContainer]} >
                            <Text style={[styles.menuItemText]} >Notifications</Text>
                            <Image style={[styles.menuItemImage]} source={require('../assets/vector-forward.png')} ></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable style={[styles.menuItem]} >
                        <View style={[styles.menuItemContainer]} >
                            <Text style={[styles.menuItemText]} >Support</Text>
                            <Image style={[styles.menuItemImage]} source={require('../assets/vector-forward.png')} ></Image>
                        </View>
                    </Pressable>
                </View>
            </View>
            <NavBar/>
        </SafeAreaView>
    );
}
export default ScrapDealerProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Padding.p_11xl,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    OrderStatsContainer:{
        flexDirection: "row",
        padding: Padding.p_11xl,
        alignItems: "center",
        justifyContent: "center",
    },
    ongoingOrdersContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    pastOrdersContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    OngoingOrder:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.color,
        padding: 20,
        borderRadius: 15,
        marginRight: "5%",
    },
    PastOrder:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.color,
        padding: 20,
        borderRadius: 15,
    },
    Separator:{
        height: 2,
        backgroundColor: Color.color,
    },
    OrderStatsText: {
        color: Color.color1,
        fontSize: FontSize.size_small,
        fontFamily: FontFamily.montserratRegular,
    },
    NumOrders: {
        color: Color.color1,
        fontSize: FontSize.size_5xl,
        fontFamily: FontFamily.montserratMedium,
    },
    image: {
        height: "100%",
        width: "30%"
    },
    menuItem: {
        height: "12%",
        justifyContent: "center",
    },
    menuItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    menuItemText: {
        fontFamily: FontFamily.montserratRegular,
        fontSize: FontSize.size_base,
        color: Color.color1,
        marginLeft: "5%",
    },
    menuItemImage: {
        height: "40%",
        width: "3%",
        marginRight: "5%",
    },
    menuItems: {

    },
});