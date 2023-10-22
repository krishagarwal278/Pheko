import * as React from 'react';
import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { FontFamily, FontSize, Color, Border } from '../GlobalStyles';

const NumberVerificationPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.numberVerificationPage}>
      <View style={styles.frame}>
        <Pressable style={styles.vector} onPress={() => navigation.navigate('Otp')}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require('../assets/vector7.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.whatsYourNumberContainer}>
            <Text style={styles.whatsYourNumber}>What’s your number?</Text>
            <Text style={styles.wellTextA}>
              We’ll text a code to verify your phone
            </Text>
          </Text>
        </View>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          multiline={false}
        />
      </View>
      <Image
        style={styles.frameIcon}
        contentFit="cover"
        source={require('../assets/frame.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
  },
  vector: {
    width: '6%',   // Adjust according to design
    height: '6%',  // Adjust according to design
    alignSelf: 'flex-start',  // Align to start of parent container
  },
  whatsYourNumber: {
    fontSize: FontSize.size_xl,  // Use FontSize.size_xl instead
    fontWeight: '700',
    fontFamily: FontFamily.montserratBold,
  },
  wellTextA: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratRegular,
  },
  whatsYourNumberContainer: {
    color: Color.color1,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: '5%',  // 5% of parent container height
  },
  textInput: {
    borderRadius: Border.br_6xl,
    borderStyle: 'solid',
    borderColor: Color.color1,
    borderWidth: 2,
    height: '8%',   // 8% of parent container height
    marginTop: '2%',  // 2% of parent container height
    alignSelf: 'stretch',
  },
  frame: {
    marginTop: '10%',  // 10% of parent container height
    width: '95%',  // 95% of parent container width
    alignSelf: 'center',  // Center horizontally
    alignItems: 'flex-end',
  },
  frameIcon: {
    marginTop: '40%',  // 40% of parent container height
    alignSelf: 'center',  // Center horizontally
    width: '15%',  // 15% of parent container width
    height: '15%',  // 15% of parent container height
  },
  numberVerificationPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: '100%',
  },
});

export default Number
