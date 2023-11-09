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
            <View style={[styles.mainContent]}>
                <PageHeader
                    title={"Hi " + scrapDealer.firstName}
                    subtitle="Welcome to your Profile!"
                />
                <View></View> {/* For the Profile pic*/}

                <View style={[styles.PastOn]}>  {/* For Ongoing Orders and Past Orders*/}

                    <Pressable style={[styles.OngoingOrder]} onPress={() => navigation.navigate('ScrapDealerAvailableOrders')}>{/* For Ongoing Orders*/}
                            <Text>Hi </Text>
                            <Text>Ongoing Orders</Text>
                    </Pressable>

                    <Pressable style={[styles.PastOrder]} onPress={() => navigation.navigate('ScrapDealerAvailableOrders')}>{/* For Past Orders*/}
                            <Text> Hi</Text>
                            <Text>Ongoing Orders</Text>
                    </Pressable>

                </View>

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
                },
                OngoingOrder:{
                    marginTop: 10,
                    height: "10%",
                    borderRadius: Border.br_6xl,
                    backgroundColor: "#e3d7fc",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%",
                },
                PastOrder:{
                    marginTop: 10,
                    height: "10%",
                    borderRadius: Border.br_6xl,
                    backgroundColor: "#e3d7fc",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%",
                },
});