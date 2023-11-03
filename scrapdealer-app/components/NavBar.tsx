import * as React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { FontSize, Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {  } from '@react-navigation/native';
import { Image } from "expo-image";

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    ScrapDealerNumberVerification:undefined;
    ScrapdealerDashboard: undefined;
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
            <Pressable onPress={() => navigation.navigate('ScrapdealerDashboard')}>
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
    },
    navbarText:{
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratBold,
        color: Color.color1,
        justifyContent: "center",
    },
    navbarButton:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

    },
    image:{
        width:24,
        height: 24,
    },
});

export default NavBar;