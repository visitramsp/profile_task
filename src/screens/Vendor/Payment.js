/* eslint-disable complexity */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ItemCountText from '../../components/headers/ItemCountText';
import {
  verticalScale,
  Colors,
  Fonts,
  ApplicationStyles,
  horizontalScale
} from '../../theme';
import { PAYMENT_METHOD } from '../../constants';

const PaymentMethod = ({
  orderDetail,
  setOrderDetail,
  userType = false,
  setSelectedMethod,
  selectedMethod
}) => {
  const paymentMethods = [
    { title: PAYMENT_METHOD.ADVANCE_PAY },
    { title: PAYMENT_METHOD.PAY_AS_YOU_GO },
    { title: PAYMENT_METHOD.AGAINST_DELIVERY },
    { title: PAYMENT_METHOD.GOODS_ON_CREDIT }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ItemCountText title={'Payment Method'} isnumberPresent={false} />
      </View>
      {paymentMethods.map((method, index) => {
        const isSelected = userType
          ? selectedMethod === method?.title
          : orderDetail?.delivery === method?.title;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.methodContainer,
              isSelected && styles.selectedMethod
            ]}
            onPress={() => {
              userType
                ? setSelectedMethod(method?.title)
                : setOrderDetail((prevState, props) => ({
                    ...prevState,
                    delivery: method?.title
                  }));
            }}
          >
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </View>
            <View style={styles.methodTextContainer}>
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === method?.title && styles.selectedPaymentTxt
                ]}
              >
                {method?.title}
              </Text>
              <Text style={styles.trackingText}>
                Tracking details has been shared with you. Tracking details has
                been shared with you.
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(30)
  },
  methodContainer: {
    ...ApplicationStyles.rowAlignCenter,
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(30)
  },
  selectedMethod: {
    backgroundColor: Colors.primary80
  },
  radioContainer: {
    position: 'absolute',
    top: verticalScale(12),
    right: verticalScale(16)
  },
  radioOuter: {
    ...ApplicationStyles.centerView,
    height: verticalScale(16),
    width: verticalScale(16),
    borderRadius: verticalScale(8),
    borderWidth: 1,
    borderColor: Colors.black150
  },
  radioOuterSelected: {
    borderColor: Colors.primary
  },
  radioInner: {
    height: 6,
    width: 6,
    borderRadius: verticalScale(4),
    backgroundColor: Colors.primary
  },
  methodTextContainer: {
    flex: 1
  },
  methodText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.medium,
    marginBottom: 4,
    color: Colors.primary
  },
  trackingText: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.gray20
  },
  selectedPaymentTxt: {
    color: Colors.primary
  }
});
