import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { useUser } from "../UserContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StyleSheet } from 'react-native';

const CustomerAddressScreen: React.FC<{}> = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { user } = useUser();
  const [address, setAddress] = useState<string>('');

  const handleUseCurrentAddress = () => {
    const address = user.address;
    navigation.navigate('CustomerPickupDateTime', { address });
  };

  const handleUseNewAddress = () => {
    navigation.navigate('CustomerPickupDateTime', { address });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Address for Order</Text>
      <Text style={styles.currentAddress}>Current Address: {user.address}</Text>
      <Button title="Use Current Address" onPress={handleUseCurrentAddress} />
      <Text style={styles.subtitle}>Or enter a new address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter new address"
      />
      <Button title="Use New Address" onPress={handleUseNewAddress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default CustomerAddressScreen;