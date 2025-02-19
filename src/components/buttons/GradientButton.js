import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { ApplicationStyles, Colors, verticalScale } from '../../theme';

const GradientButton = ({
  title,
  style,
  icon,
  rightIcon,
  textStyle,
  onPress,
  gradientStyle,
  gradientColors = [Colors.white, Colors.white]
}) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <LinearGradient
        colors={[Colors.orange10, Colors.orange30]}
        style={[styles.gradient, gradientStyle]}
      >
        {icon}
        <Text style={[styles.btnTxt, textStyle]}>{title}</Text>
        {rightIcon}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {},
  gradient: {
    width: '100%',
    height: verticalScale(45),
    borderRadius: verticalScale(10),
    shadowColor: Colors.primary10 + 30,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btnTxt: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.white
  }
});

export default GradientButton;
