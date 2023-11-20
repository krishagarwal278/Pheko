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
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapDealerCommunity'>;

const CustomerWelcome = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
        <View style={styles.container}>
        <PageHeader
                        title={"Community"}
                        subtitle="See the latest stories from our community here!"/>

            <View style={[styles.cards]}>
                    <View style={[styles.cards]}>
                    <View style={[styles.textDataContainer]}>
                                    <Text style={[styles.value]}>{}</Text>
                                    <Text style={[styles.metric]}>kg</Text>
                                </View>
                                <Text>has been recycled</Text>
                    </View>
            
                    <View>

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
        backgroundColor: Color.colorWhite,
      },
      cards:{
        marginTop: 25,
        height: "30%",
        borderRadius: Border.br_6xl,
        backgroundColor: "#e3d7fc",
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

});

export default CustomerWelcome;
