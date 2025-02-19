import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ApplicationStyles, Colors, Fonts, horizontalScale } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import CommonLoader from './CommonLoader';

export default function ButtonComp({
  isLoading = false,
  btnTitle = '',
  disabled,
  containerStyle,
  onPress = () => {}
}) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={0.5}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        colors={[Colors.primary40, Colors.primary60]}
        style={[
          styles.button,
          { backgroundColor: isLoading ? Colors.primary70 : Colors.primary10 }
        ]}
      >
        {isLoading ? (
          <View style={{ paddingLeft: horizontalScale(8) }}>
            {/* <ActivityIndicator size="small" color={Colors.secondary} /> */}
            <CommonLoader
              size="small"
              color={Colors.secondary}
              isLoading={isLoading}
            />
          </View>
        ) : (
          <Text style={styles.title}>{btnTitle}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.customOrange,
    borderRadius: 20,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10
  },
  button: {
    height: horizontalScale(60),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Colors.white70,
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.semi
  }
});
