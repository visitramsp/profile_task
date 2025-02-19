import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ApplicationStyles, Colors, Fonts, horizontalScale } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import CommonLoader from './CommonLoader';

// eslint-disable-next-line complexity
export default function CustSmallButton({
  isLoading = false,
  btnTitle = '',
  disabled,
  containerStyle,
  onPress = () => {},
  gradiantColor = false
}) {
  return (
    <TouchableOpacity
      style={[
        gradiantColor ? styles.container1 : styles.container,
        containerStyle
      ]}
      activeOpacity={0.5}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        colors={[
          gradiantColor ? Colors.transparent : Colors.primary40,
          gradiantColor ? Colors.transparent : Colors.primary60
        ]}
        style={[
          styles.button,
          {
            backgroundColor: isLoading
              ? Colors.primary70
              : gradiantColor
              ? Colors.white
              : Colors.primary10
          }
        ]}
      >
        <Text
          style={[
            styles.title,
            gradiantColor && { color: Colors.customOrange }
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
            btnTitle
          )}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.customOrange,
    borderRadius: 15,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10
  },
  container1: {
    borderWidth: 1,
    borderColor: Colors.customOrange,
    borderRadius: 15
  },
  button: {
    height: horizontalScale(50),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Colors.white70,
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.f20
  }
});

// borderTransparent
