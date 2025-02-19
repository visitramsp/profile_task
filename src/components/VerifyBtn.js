import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, horizontalScale, verticalScale } from '../theme';
import { Successfully } from '../assets/icon';
import CommonLoader from './CommonLoader';

const VerifyButton = ({
  isLoading = false,
  btnTitle = '',
  onPress = () => {},
  verified = false,
  size = 'large'
}) => {
  return (
    <>
      {verified ? (
        <Successfully height={24} width={24} />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={[Colors.primary40, Colors.primary60]}
            style={[
              styles.verifyButton,
              {
                backgroundColor: isLoading ? Colors.primary70 : Colors.primary10
              }
            ]}
          >
            <Text style={styles.verifyText}>
              {isLoading ? (
                // <ActivityIndicator
                //   size={15}
                //   style={{ paddingTop: verticalScale(5) }}
                //   color={Colors.white}
                // />
                <CommonLoader
                  loaderStyle={styles.verifyLoader}
                  size={15}
                  isLoading={isLoading}
                  color={Colors.white}
                  // size={size}
                />
              ) : (
                btnTitle
              )}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  verifyText: {
    color: Colors.white70,
    fontSize: Fonts.size.sminy,
    alignSelf: 'center',
    fontWeight: Fonts.Weight.low
  },
  verifyButton: {
    height: verticalScale(25),
    width: horizontalScale(55),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  verifyLoader: {
    padding: 0,
    paddingTop: verticalScale(5)
  }
});

export default VerifyButton;
