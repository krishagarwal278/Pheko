/*
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import FormFrame from '../components/FormFrame';
import { Color, Padding } from '../GlobalStyles';

const styles = StyleSheet.create({
  frameIcon: {
    width: '15%',         // 15% of parent container's width
    height: '15%',        // 15% of parent container's height
    marginTop: '30%',     // 30% of parent container's height
    overflow: 'hidden',
    alignSelf: 'center',  // center the icon horizontally
  },
  numberVerificationPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: '5%',   // 5% of parent container's width
    paddingTop: '10%',         // 10% of parent container's height
    paddingBottom: '40%',     // 40% of parent container's height
    overflow: 'hidden',
  },
});

const NumberVerificationPage = () => {
  return (
    <View style={styles.numberVerificationPage}>
      <FormFrame />
      <Image
        style={styles.frameIcon}
        contentFit="cover"
        source={require('../assets/frame.png')}
      />
    </View>
  );
};

export default NumberVerificationPage;*/