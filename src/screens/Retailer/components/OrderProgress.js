import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApplicationStyles, Colors, verticalScale } from '../../../theme';

const steps = [{ step: 1 }, { step: 2 }, { step: 3 }, { step: 4 }];

const Dot = ({ isSelected = false }) => {
  return (
    <View
      style={[styles.dot, isSelected && { backgroundColor: Colors.orange10 }]}
    />
  );
};

const Line = ({ isSelected = false }) => {
  return (
    <View
      style={[styles.line, isSelected && { backgroundColor: Colors.orange10 }]}
    />
  );
};

const OrderProgress = ({ step = 1 }) => {
  return (
    <View style={styles.container}>
      {steps.map((_, index) => {
        const isSelected = index <= step - 1;
        return (
          <View
            key={index}
            style={[ApplicationStyles.flex1, ApplicationStyles.rowAlignCenter]}
          >
            {index === 0 && <Dot isSelected />}
            <Line isSelected={isSelected} />
            <Dot isSelected={isSelected} />
          </View>
        );
      })}
    </View>
  );
};

export default OrderProgress;

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    marginTop: verticalScale(18),
    marginBottom: verticalScale(15)
  },
  dot: {
    width: verticalScale(8),
    height: verticalScale(8),
    borderRadius: 5,
    backgroundColor: Colors.gray10
  },
  line: {
    flex: 1,
    height: verticalScale(2),
    backgroundColor: Colors.gray10
  }
});
