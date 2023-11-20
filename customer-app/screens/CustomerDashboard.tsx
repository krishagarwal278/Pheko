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
import { useUser } from "../UserContext";
import { useIsFocused } from "@react-navigation/native";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    CustomerItemSelection: undefined;
    CustomerNumberVerification:undefined;
    CustomerDashboard: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'CustomerDashboard'>;


const CustomerDashboard: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [weightCount, setWeightCount] = useState(0);

    const { user, setUser } = useUser();

    const navigation = useNavigation<NavigationProps>();

    const isFocused = useIsFocused();

    useEffect(() => {

        if (!isFocused) {
            // Exit early if the screen is not in focus
            return;
        }
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Orders"));
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as { id: string, [key: string]: any }));
                const filteredDocs = documents.filter(doc => doc.UserId === (user.id) && doc.Status === "COMPLETED");    //Set to user Id from state
                const totalWeight = filteredDocs.reduce((sum, doc) => {
                    return sum + doc.Weights.reduce((innerSum: number, weight: number) => innerSum + weight, 0);
                }, 0);
                setWeightCount(totalWeight);
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
                <View style={[styles.mainContent]}>
                    <PageHeader
                        title={"Hi " + user.firstName}
                        subtitle="Welcome to your dashboard!"
                    />
                    <Pressable style={[styles.CreateOrder]} onPress={() => navigation.navigate('CustomerItemSelection')}>
                        <Image style={styles.image} source={require('../assets/dashboard-icon.gif')}></Image>
                        <Text style={[styles.orderText]}>Schedule an Order!</Text>
                    </Pressable>

                    <View style={[styles.dataContainer]}>
                        {loading ? (
                            <ActivityIndicator size="large" color={Color.color1} />
                        ) : (
                            <>
                                <View style={[styles.textDataContainer]}>
                                    <Text style={[styles.value]}>{weightCount.toFixed(1)}</Text>
                                    <Text style={[styles.metric]}>kg</Text>
                                </View>
                                <Text style={[styles.Recycled]}>has been recycled</Text>
                            </>
                        )}
                    </View>
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
    },
    dataContainer:{
        marginTop: 15,
        height: "30%",
        borderRadius: Border.br_6xl,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    textDataContainer:{
        flexDirection: "row",
        alignItems: "baseline",
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
    Recycled:{
        marginTop: 10,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratMedium,
        color: Color.color1,
    },
    image:{
        height: "60%",
        width: "80%",
    }
});


export default CustomerDashboard;