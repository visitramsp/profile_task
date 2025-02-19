// StepIndicator.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, width } from '../../theme';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index > currentStep - 1;
        return (
          <View key={index} style={styles.stepContainer}>
            <View style={[styles.circle, isActive && styles.activeCircle]} />

            {index < steps.length - 1 && (
              <View
                style={
                  index < currentStep - 1
                    ? styles.activeline
                    : styles.inactiveline
                }
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeCircle: {
    backgroundColor: Colors.gray10
  },
  activeline: {
    width: width * 0.16,
    height: 2,
    backgroundColor: Colors.primary
  },
  inactiveline: {
    width: width * 0.16,
    height: 2,
    backgroundColor: Colors.gray10
  }
});

export default StepIndicator;
