import * as React from "react";
import { Text, StyleSheet, View, Image, SafeAreaView, Dimensions } from "react-native";
import { Color, Padding, FontFamily } from "../GlobalStyles";
import ContinueButton from "../components/ContinueButton";
import {useOrder} from '../OrderContext';

const windowHeight = Dimensions.get('window').height;

const ScrapDealerAcceptOrder = () => {

    const { order, setOrder } = useOrder();     //Use order attributes to display where appropriate

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
            <View style={styles.container}>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Padding.p_11xl,
        backgroundColor: Color.colorWhite,
    },
});

export default ScrapDealerAcceptOrder;
