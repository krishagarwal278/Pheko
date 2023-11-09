import * as React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { FontSize, Color, FontFamily, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {  } from '@react-navigation/native';
import { Image } from "expo-image";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    ScrapDealerNumberVerification:undefined;
    ScrapdealerDashboard: undefined;
    ScrapDealerProfile: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapdealerDashboard'>;

const NavBar: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <View style={[styles.NavbarContainer]}>

            <Pressable onPress={() => navigation.navigate('ScrapdealerDashboard')}>
                <View style={styles.navbarButton}>
                    <Image style={[styles.image]} source={require('../assets/home-icon.png')}></Image>
                    <Text style={[styles.navbarText]}>Home</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ScrapdealerDashboard')}>
                <View style={[styles.navbarButton]}>
                    <Image style={[styles.image]} source={require('../assets/community-icon.png')}></Image>
                    <Text style={[styles.navbarText]}>Community</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ScrapDealerProfile')}>
                <View style={[styles.navbarButton]}>
                    <Image style={[styles.image]} source={require('../assets/profile-icon.png')}></Image>
                    <Text style={[styles.navbarText]}>Profile</Text>
                </View>
            </Pressable>
        </View>

    );
};

const styles = StyleSheet.create({
    NavbarContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: "5%", // Updated to paddingVertical for padding at the top and bottom
        paddingHorizontal: "5%", // Side padding remains percentage-based to maintain responsiveness
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: Color.colorWhite,
        position: 'absolute', // Position absolute to place it over other components
        bottom: 0, // Align it to the bottom of the screen
        left: 0, // Stretch from the left edge
        right: 0, // Stretch to the right edge
        width: '100%', // Ensure it fills the width of the screen
    },
    navbarText:{
        fontSize: FontSize.size_small,
        fontFamily: FontFamily.montserratMedium,
        color: Color.color1,
        justifyContent: "center",
    },
    navbarButton:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

    },
    image:{
        width:18,
        height: 20,
    },
});

export default NavBar;