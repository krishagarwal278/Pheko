import * as React from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Linking
} from 'react-native';
import { Border, Color, FontFamily, FontSize, Padding } from '../GlobalStyles';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import { StackNavigationProp } from '@react-navigation/stack';


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
};
type NavigationProps = StackNavigationProp <RootStackParamList, 'ScrapDealerGetSupport'>;

const CustomerWelcome = () => {
    // Function to handle email link press
    const handleEmailPress = () => {
        Linking.openURL('mailto:phekohelp@gmail.com');
    };
   
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
        <View style={styles.container}>
            <PageHeader
                title={"Get Support \n \n"}
                subtitle={"For more support and help, please email"}
                />
                <Text style={styles.subtext}>
                <Text style={styles.emailLink} onPress={handleEmailPress}>
                phekohelp@gmail.com
            </Text>
            {" and we'll get back to you right away!"}
            </Text>

            {/* Any other components or views you want to include */}
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
        fontFamily: FontFamily.montserratBold,
    },
    subtext: {
        fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratRegular,
    }
});

export default CustomerWelcome;
