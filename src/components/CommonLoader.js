import { StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors, verticalScale } from '../theme';
const CommonLoader = ({
  size = 'large',
  color = Colors?.orange10,
  loaderStyle,
  isLoading = false
}) => {
  return (
    <ActivityIndicator
      size={size}
      animating={isLoading}
      color={color}
      style={[styles.loader, { ...loaderStyle }]}
    />
  );
};

export default CommonLoader;

const styles = StyleSheet.create({
  loader: {
    // padding: verticalScale(50),
    alignSelf: 'center'
  }
});
