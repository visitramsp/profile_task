import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SuccessTick, ErrorTick } from '../../assets/icon';
import { Colors, Fonts, horizontalScale, verticalScale } from '../../theme';
const windowWidth = Dimensions.get('window').width;

export const SuccessToast = ({ text1, text2, ...rest }) => {
  return (
    <View style={styles.successToastContainer}>
      <View style={styles.successImage}>
        <SuccessTick />
      </View>
      <View style={styles.successTxtContainer}>
        <Text style={styles.successText1}>{text1}</Text>
        {text2 ? <Text style={styles.successText2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

export const ErrorToast = ({ text1, text2, ...rest }) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.image}>
        <ErrorTick />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  successToastContainer: {
    height: 'auto',
    width: windowWidth,
    backgroundColor: Colors.green62,
    padding: verticalScale(10),
    borderBottomLeftRadius: verticalScale(30),
    borderBottomRightRadius: verticalScale(30),
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: horizontalScale(0), height: verticalScale(3) }
  },
  successTxtContainer: {
    marginTop: verticalScale(45)
  },
  successImage: {
    marginTop: verticalScale(25)
  },
  successText1: {
    fontSize: Fonts.size.h20,
    color: Colors.black70,
    fontWeight: 'bold',
    fontFamily: Fonts.type.robotoBold
  },
  successText2: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    fontSize: Fonts.size.medium,
    color: Colors.gray50,
    width: windowWidth - verticalScale(80),
    fontFamily: Fonts.type.robotoRegular
  },
  toastContainer: {
    height: 'auto',
    width: windowWidth,
    backgroundColor: Colors.red25,
    padding: verticalScale(10),
    borderBottomLeftRadius: verticalScale(30),
    borderBottomRightRadius: verticalScale(30),
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: horizontalScale(0), height: verticalScale(3) }
  },
  txtContainer: {
    marginTop: verticalScale(45),
    marginLeft: verticalScale(20)
  },
  image: {
    marginTop: verticalScale(45),
    marginLeft: verticalScale(20)
  },
  text1: {
    fontSize: Fonts.size.h20,
    color: Colors.black70,
    fontWeight: 'bold',
    fontFamily: Fonts.type.robotoBold
  },
  text2: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    fontSize: Fonts.size.medium,
    color: Colors.gray50,
    width: windowWidth - verticalScale(80),
    fontFamily: Fonts.type.robotoRegular
  }
});
