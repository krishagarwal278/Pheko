import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { app, auth } from '../Firebase';
import { Border, Color, FontFamily, FontSize, Padding } from '../GlobalStyles';
import { useUser } from '../UserContext';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import PageHeader from '../components/PageHeader'; // Added for UI consistency

type VerificationRouteParams = {
  CustomerOTPVerification: {
    verificationId: string;
  };
};

const CustomerOTPVerification: React.FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<VerificationRouteParams, 'CustomerOTPVerification'>>();
  const { verificationId } = route.params;
  const [code, setCode] = useState('');
  const { setUser } = useUser();

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);
      const db = getFirestore(app);
      const userDocRef = doc(db, 'Users', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({ ...userData, id: userDoc.id });
        navigation.navigate('CustomerDashboard');
      } else {
        navigation.navigate('CustomerSignUp');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <BackButton />

        <PageHeader // Using PageHeader for consistency
          title="Verify Your Number"
          subtitle="Enter the OTP sent to your number"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        <View style={styles.bottomContainer}>
          <ContinueButton
            destination="CustomerDashboard" // Modify as needed
            buttonText="Confirm OTP"
            onPressAdditional={confirmCode}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_11xl,
  },
  input: {
    borderWidth: 2,
    borderColor: Color.color,
    borderRadius: Border.br_6xl,
    padding: 20,
    marginBottom: 20,
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default CustomerOTPVerification;