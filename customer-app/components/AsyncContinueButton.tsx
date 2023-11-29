import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { FontSize, Color, FontFamily, Border } from '../GlobalStyles';

interface AsyncContinueButtonProps {
  buttonText?: string;
  buttonStyle?: Object;
  textStyle?: Object;
  onPress?: () => void;
}

const AsyncContinueButton: React.FC<AsyncContinueButtonProps> = ({
  buttonText = 'Continue',
  buttonStyle,
  textStyle,
  onPress,
}) => {
  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 86,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.color,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: Color.color1,
    fontSize: FontSize.size_5xl,
    fontWeight: '500',
    fontFamily: FontFamily.montserratMedium,
  },
});

export default AsyncContinueButton;
