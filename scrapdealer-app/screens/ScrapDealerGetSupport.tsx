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
    Linking,
} from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";
import {ParamListBase, useIsFocused, useNavigation} from "@react-navigation/native";
// import { db } from "../Firebase";
// import { collection, getDoc, getDocs, onSnapshot, doc } from "firebase/firestore";
// import { Order } from "../Types";
// import { useOrder } from "../OrderContext";
import {StackNavigationProp} from "@react-navigation/stack";
import NavBar from "../components/NavBar";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    ScrapDealerAvailableOrders: undefined;
    ScrapDealerNumberVerification:undefined;
    ScrapDealerDashboard: undefined;
    ScrapDealerOngoingOrders: undefined;
    ScrapDealerCommunity: undefined;
    ScrapDealerGetSupport: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapDealerGetSupport'>;
type PageHeaderProps = {
    // ... other props ...
    subtitle: React.ReactNode;
};
const CustomerWelcome = () => {
    // Function to handle email link press
    const handleEmailPress = () => {
        Linking.openURL('mailto:phekohelp@gmail.com');
    };
    

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
        <View style={styles.container}>
            <PageHeader
                title={"Get Support"}
                subtitle={"For more support and help, please email "} />
                    <Text style={styles.subtext}>
                        <Text style={styles.emailLink} onPress={handleEmailPress}>
                            phekohelp@gmail.com
                        </Text> <Text> </Text>
                        and we'll get back to you right away!
                    </Text>
               
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
    cards: {
        marginTop: 25,
        height: "30%",
        borderRadius: Border.br_6xl,
        backgroundColor: "#e3d7fc",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    textDataContainer: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    value: {
        fontSize: FontSize.size_5xl,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
        marginRight: 7,
    },
    metric: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
    },
    emailLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    subtext:{
        fontSize: FontSize.size_base,
        color: Color.color1,
        fontFamily: FontFamily.montserratRegular,
        lineHeight: 1.5 *FontSize.size_base,
    },
});

export default CustomerWelcome;
