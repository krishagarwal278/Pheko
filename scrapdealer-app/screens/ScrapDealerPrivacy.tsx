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
    ScrapDealerPrivacy: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapDealerPrivacy'>;
type PageHeaderProps = {
    // ... other props ...
    subtitle: React.ReactNode;
};
const CustomerWelcome = () =>{


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
        <View style={styles.container}>
            <PageHeader
                title={"Privacy Policy"}
                subtitle={"Our Privacy Policy and Terms of Service are going to be mentioned on this page soon"} />
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
    subtext:{
        fontSize: FontSize.size_base,
        color: Color.color1,
        fontFamily: FontFamily.montserratRegular,
        lineHeight: 1.5 *FontSize.size_base,
    },
});

export default CustomerWelcome;
