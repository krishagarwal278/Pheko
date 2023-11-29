import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Color, FontFamily, FontSize } from '../GlobalStyles';

const LoadingPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Color.color} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
  },
  loadingText: {
    marginTop: 20,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.montserratMedium,
    color: Color.color1,
  },
});

export default LoadingPage;
