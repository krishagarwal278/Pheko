import React, {FunctionComponent, CSSProperties, useState, useEffect} from "react";
import {Text, Dimensions, StyleSheet, Pressable, View, ActivityIndicator, TextInput} from "react-native";
import { Image } from "expo-image";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {  } from '@react-navigation/native';
import PageHeader from "../components/PageHeader";
import NavBar from "../components/NavBar";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../Firebase";
import {useScrapDealer} from "../ScrapDealerContext";
import BackButton from "../components/BackButton";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    ScrapDealerAvailableOrders: undefined;
    ScrapDealerNumberVerification:undefined;
    ScrapDealerDashboard: undefined;
    ScrapDealerProfile: undefined;
    ScrapDealerOngoingOrders: undefined;
    ScrapDealerPastOrders: undefined;
    ScrapDealerGetSupport: undefined;
    ScrapDealerManageAccount: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapDealerManageAccount'>;

const ScrapDealerManageAccount: React.FC = () => {

    const { scrapDealer, setScrapDealer } = useScrapDealer();

    const [address, setAddress] = useState("");

    const navigation = useNavigation<NavigationProps>();

    const changeAddress = async () => {
        // change address in database
        if(address != scrapDealer.address) {
            const userDocRef = doc(db, "ScrapDealers", scrapDealer.id);
            await updateDoc(userDocRef, {
                dateLastUpdated: new Date(),
                address: address,
            });
            setScrapDealer((prevUser) => ({
                ...prevUser,
                address: address,
            }));
        }
        navigation.navigate("ScrapDealerProfile");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container} >
                <View style={styles.topContainer}>
                    <BackButton/>
                    <Pressable style={styles.saveButton} onPress={changeAddress}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                </View>
                <View style={styles.phoneContainer}>
                    <Text style={styles.textBoxLabel}>Phone Number</Text>
                    <View style={styles.phoneNumberContainer}>
                        <Text style={styles.phoneNumberText}>{scrapDealer.phone}</Text>
                    </View>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={styles.textBoxLabel}>Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={scrapDealer.address}
                        onChangeText={(text) => setAddress(text)}
                        autoComplete="street-address"/>
                </View>
            </View>
            <NavBar/>
        </SafeAreaView>
    );
}
export default ScrapDealerManageAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Padding.p_11xl,
    },
    input: {
        borderWidth: 2,
        borderColor: Color.color_light_purple,
        borderRadius: Border.br_6xl,
        padding: 15,
        marginBottom: 20,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratMedium,
    },
    phoneNumberContainer: {
        borderWidth: 2,
        borderColor: Color.color_light_purple,
        borderRadius: Border.br_6xl,
        padding: 15,
        marginBottom: 20,
    },
    phoneNumberText: {
        fontFamily: FontFamily.montserratMedium,
        opacity: 0.5,
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontFamily: FontFamily.montserratMedium,
        fontSize: FontSize.size_xl,
        color: Color.color1,
    },
    textBoxLabel: {
        fontFamily: FontFamily.montserratBold,
        fontSize: FontSize.size_xl,
        color: Color.color1,
        marginBottom: "2%",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10%",
        paddingRight: 10,
    },
    phoneContainer: {
        marginTop: 20,
    },
    addressContainer: {
        marginTop: 20,
    },
});