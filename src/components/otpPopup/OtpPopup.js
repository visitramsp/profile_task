/* eslint-disable complexity */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { OtpSchema } from '../../schemas/OtpSchema';
import Modal from 'react-native-modal';
import OTPTextInput from 'react-native-otp-textinput';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants/AppConstant';
import Fonts from '../../theme/Fonts';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale
} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import CommonLoader from '../CommonLoader';
import { useIsFocused } from '@react-navigation/native';

const OtpPopup = ({
  type = 'mobile',
  openPopup,
  setOpenPopup,
  email,
  onPressSendOtp,
  setToggleBtn,
  toggleBtn,
  onPressOtpVerify,
  otpError = '',
  isPhone = false,
  onPressSendPhoneOtp,
  onPressPhoneOtpVerify
}) => {
  const { t } = useTranslation();
  const otpInputRef = useRef(null);
  const [isOtp, setIsOtp] = useState('');
  const initialValues = {
    otp: ''
  };

  let formik = useFormik({
    initialValues,
    validationSchema: OtpSchema,
    onSubmit: async (values, action) => {
      setToggleBtn(true);
      if (isPhone) {
        onPressPhoneOtpVerify(values?.otp);
      } else {
        onPressOtpVerify(values?.otp);
      }
    }
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  const handlePasteOtp = (otp) => {
    if (otp.length === 6) {
      otpInputRef.current.setValue(otp);
      formik.setFieldValue('otp', otp);
      setIsOtp(otp);
    }
  };
  const checkClipboardForOtp = async () => {
    const clipboardContent = await Clipboard.getString();
    if (clipboardContent && /^\d{6}$/.test(clipboardContent)) {
      handlePasteOtp(clipboardContent);
      clearInterval(timeRef.current);
    }
  };
  const timeRef = useRef(null);

  // useEffect(() => {
  //   checkClipboardForOtp();
  //   if (isOtp.length === 0) {
  //     const interval = setInterval(() => {
  //       checkClipboardForOtp();
  //     }, 1000);
  //     timeRef.current = interval;
  //     return () => clearInterval(interval);
  //   }
  // }, [useIsFocused(), isOtp, timeRef.current]);

  return (
    <Modal
      avoidKeyboard
      isVisible={openPopup}
      backdropColor={Colors.black}
      backdropOpacity={0.8}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.container}
      onBackdropPress={() => setOpenPopup(false)}
    >
      <View style={styles.mainView}>
        <View>
          <View style={styles.headingView}>
            <Text style={styles.enterCode}>
              {t(APP_LANGUAGE_CONSTANT.ENTER_CODE)}
            </Text>
            <Text style={styles.description}>
              {isPhone
                ? t(APP_LANGUAGE_CONSTANT.SENT_OTP_CODE)
                : t(APP_LANGUAGE_CONSTANT.SENT_EMAIL_OTP_CODE)}
            </Text>
          </View>

          <View style={styles.otpView}>
            <OTPTextInput
              autoFocus
              inputCount={6}
              ref={otpInputRef}
              handleTextChange={(text) => {
                formik.setFieldValue('otp', text);
                if (text?.length === 6) {
                  setToggleBtn(true);
                  isPhone
                    ? onPressPhoneOtpVerify(text)
                    : onPressOtpVerify(text);
                }
              }}
              tintColor={Colors.customRed}
              textInputStyle={styles.inputOTP}
              onBlur={handleBlur('otp')}
            />
            {errors?.otp && touched?.otp && (
              <Text style={styles.errorText}>{errors?.otp}</Text>
            )}
            {otpError && !errors?.otp && (
              <Text style={styles.otpTextError}>{otpError}</Text>
            )}
          </View>
          <View
            style={[
              ApplicationStyles.rowAlignCenterJustifyBetween,
              styles.resendView
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                isPhone ? onPressSendPhoneOtp() : onPressSendOtp(email)
              }
            >
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitButtonView}>
            <TouchableOpacity
              style={styles.btnShadow}
              onPress={toggleBtn ? null : handleSubmit}
            >
              <LinearGradient
                colors={[Colors.primary40, Colors.primary60]}
                style={styles.verifyBtn}
              >
                {toggleBtn ? (
                  <CommonLoader
                    isLoading={toggleBtn}
                    size="small"
                    color={Colors.white}
                  />
                ) : (
                  <Text style={styles.verifyText}>
                    {t(APP_LANGUAGE_CONSTANT.SUBMIT_SMALL)}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  submitButtonView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainView: {
    height: verticalScale(420),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 24
  },
  container: {
    justifyContent: 'flex-end',
    margin: 0
  },
  headingView: {
    marginTop: verticalScale(16)
  },

  enterCode: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.f25,
    fontWeight: Fonts.Weight.full,
    textAlign: 'center',
    color: Colors.blue30
  },
  description: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.white110,
    fontSize: Fonts.size.f25,
    fontWeight: Fonts.Weight.low,
    lineHeight: 29.3,
    textAlign: 'center',
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20)
  },
  otpView: { marginTop: verticalScale(30) },
  resendView: {
    paddingVertical: verticalScale(30),
    justifyContent: 'center'
  },

  inputOTP: {
    borderRadius: 15,
    borderWidth: 1,
    borderBottomWidth: 1,
    width: horizontalScale(42),
    height: verticalScale(52),
    textAlign: 'center'
  },
  verifyText: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.semi,
    color: Colors.secondary,
    textAlign: 'center'
  },
  verifyBtn: {
    height: verticalScale(45),
    width: horizontalScale(135),
    borderRadius: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resendText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.customOrange
  },
  errorText: {
    color: Colors.red,
    paddingLeft: horizontalScale(5),
    fontSize: Fonts.size.sminy
  },
  otpTextError: {
    color: Colors.red,
    paddingTop: horizontalScale(10),
    fontSize: Fonts.size.sminy,
    alignSelf: 'center'
  },
  btnShadow: {
    borderRadius: 15,
    shadowColor: Colors.primary30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5
  }
});

export default OtpPopup;
