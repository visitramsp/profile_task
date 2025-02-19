import React from 'react';
// import PropTypes from 'prop-types';
import { Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { verticalScale } from '../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { height, isLowerDevice } from '../theme/Matrics';

const KeyboardAvoidingViewWrapper = ({ children }) => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          behavior={'padding'}
          keyboardVerticalOffset={
            isLowerDevice ? verticalScale(90) : height * 0.14
          }
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={verticalScale(60)}
        >
          {children}
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1
  }
});

// KeyboardAvoidingViewWrapper.propTypes = {
//   children: PropTypes.any
// };

export default KeyboardAvoidingViewWrapper;
