import React, {FunctionComponent, CSSProperties, useState, useEffect} from "react";
import { Text, Dimensions, StyleSheet, Pressable, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {  } from '@react-navigation/native';
import PageHeader from "../components/PageHeader";
import NavBar from "../components/NavBar";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../Firebase";
import { useScrapDealer } from "../ScrapDealerContext";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    ScrapDealerAvailableOrders: undefined;
    ScrapDealerNumberVerification:undefined;
    ScrapDealerDashboard: undefined;
    ScrapDealerProfile: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapDealerProfile'>;

const ScrapDealerProfile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [weightCount, setWeightCount] = useState(0);

    const { scrapDealer, setScrapDealer } = useScrapDealer();

    const navigation = useNavigation<NavigationProps>();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
                <View>
                    <PageHeader
                        title={scrapDealer.firstName + " "+scrapDealer.lastName}
                        subtitle="Welcome to your Profile!"/>
                    <View>
                    </View>
                </View>
                <View style={[styles.PastOn]}>
                    <Pressable style={[styles.OngoingOrder]} onPress={() => navigation.navigate('ScrapDealerAvailableOrders')}>
                        <Text>Number</Text>
                        <Text>Ongoing Orders</Text>
                    </Pressable>
                    <Pressable style={[styles.PastOrder]} onPress={() => navigation.navigate('ScrapDealerAvailableOrders')}>
                        <Text>Number</Text>
                        <Text> Past Orders</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable>
                        <View>
                            <Text>Manage Account</Text>
                            <Image></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable>
                        <View>
                            <Text>Address</Text>
                            <Image></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable>
                        <View>
                            <Text>Privacy</Text>
                            <Image></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable>
                        <View>
                            <Text>Notifications</Text>
                            <Image></Image>
                        </View>
                    </Pressable>
                    <View style={[styles.Separator]}></View>
                    <Pressable>
                        <View>
                            <Text>Support</Text>
                            <Image></Image>
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
    mainContent:{
        flex:1,
    },
    PastOn:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "center",
    },
    OngoingOrder:{
        marginTop: 10,
        height: "50%",
        borderRadius: Border.br_6xl,
        backgroundColor: "#e3d7fc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10%",
        width: "40%",
    },
    PastOrder:{
        marginTop: 10,
        height: "50%",
        borderRadius: Border.br_6xl,
        backgroundColor: Color.color_light_gray,
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
    },
    Separator:{
        height: "2px",
        backgroundColor: Color.color_light_purple,
    },
});