import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Border, Color, FontFamily, FontSize, Padding } from '../GlobalStyles';
import { useUser } from "../UserContext";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import PageHeader from "../components/PageHeader";

const CustomerAddressScreen: React.FC<{}> = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { user } = useUser();
  const [address, setAddress] = useState<string>('');
  const [useCurrentAddress, setUseCurrentAddress] = useState<boolean>(true);

  const handleConfirmAddress = () => {
    const selectedAddress = useCurrentAddress ? user.address : address;
    navigation.navigate('CustomerPickupDateTime', { address: selectedAddress });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <BackButton />

          <PageHeader
            title="Choose Address for Order"
            subtitle="Select your current address or enter a new one."
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Use Current Address</Text>
            <Switch
              trackColor={{ false: "#767577", true: Color.color }}
              thumbColor={useCurrentAddress ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setUseCurrentAddress(previousState => !previousState)}
              value={useCurrentAddress}
            />
          </View>

          {useCurrentAddress ? (
            <Text style={styles.currentAddress}>Current Address: {user.address}</Text>
          ) : (
            <>
              <Text style={styles.label}>Enter New Address:</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter new address"
              />
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <ContinueButton
          destination="CustomerPickupDateTime"
          buttonText="Continue"
          onPressAdditional={handleConfirmAddress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: Padding.p_11xl,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: FontSize.size_base,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  currentAddress: {
    fontSize: FontSize.size_base,
    marginBottom: 20,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
  },
  label: {
    fontSize: FontSize.size_base,
    marginBottom: 10,
    color: Color.color1,
    fontFamily: FontFamily.montserratMedium,
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
    padding: Padding.p_11xl,
  },
});

export default CustomerAddressScreen;
