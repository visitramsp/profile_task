import React, { useState } from 'react';
import {
  ButtonComp,
  Container,
  OtpPopup,
  TextInputFieldPaper,
  VerifyButton
} from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import styles from './ForgotScreen.styles';
import { ApplicationStyles, verticalScale } from '../../../theme';
import { useFormik } from 'formik';
import { showError, showToastSuccess } from '../../../utils';
import {
  userForgetRequestChangePassword,
  userForgetRequestSendOtp,
  userForgetRequestVerifyOtp
} from '../../../store/auth/action';
import { ForgotSchema } from '../../../schemas/LoginSchema';

export default function ForgotScreen({ navigation }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [verified, setVerified] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        newPassword: '',
        confirmPAssword: ''
      },
      validationSchema: ForgotSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        const reqBody = {
          email: values.email,
          newPassword: values.newPassword
        };
        userForgetRequestChangePassword(reqBody)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response?.data?.message);
            navigation.navigate('Login');
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });
      }
    });

  const onOtpVerify = () => {
    const reqBody = {
      email: values.email
    };
    userForgetRequestSendOtp(reqBody)
      .then((response) => {
        setIsLoading(false);
        showToastSuccess(response?.data?.message);
        setOpenPopup(true);
      })
      .catch((error) => {
        setIsLoading(false);
        showError(error);
      });
  };

  const onPressOtpVerify = (otp) => {
    setToggle(true);
    const obj = {
      email: values?.email,
      otp_code: otp
    };
    userForgetRequestVerifyOtp(obj)
      .then(async (response) => {
        showToastSuccess(response?.data?.message);
        setOpenPopup(false);
        setToggle(false);
        setToggleBtn(false);
        setVerified(true);
      })
      .catch((error) => {
        setToggle(false);
        setToggleBtn(false);
        showError(error);
      })
      .finally(() => {
        setToggle(false);
        setToggleBtn(false);
      });
  };

  const validatePassword = (newPassword) => {
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);
    const hasSpecialChar = /[@$!%*?&#]/.test(newPassword);
    const minLength = newPassword?.length >= 12;

    const validationResult = {
      hasUpperCase,
      hasLowerCase,
      hasDigit,
      hasSpecialChar,
      minLength,
      isValid:
        hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && minLength
    };

    return validationResult;
  };
  const result = validatePassword(values?.newPassword);
  const allCheckCondition =
    result?.hasUpperCase &&
    result?.hasLowerCase &&
    result?.hasSpecialChar &&
    result?.hasDigit &&
    result?.minLength;

  const handleOnlineLogin = async (values, action) => {
    setToggle(true);
    const reqBody = {
      email: values
    };
    userForgetRequestSendOtp(reqBody)
      .then((response) => {
        setIsLoading(false);
        showToastSuccess(response?.data?.message);
        setOpenPopup(true);
      })
      .catch((error) => {
        setIsLoading(false);
        showError(error);
      })
      .finally(() => {
        setToggle(false);
      });
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.FORGET_PASSWORD_SCREEN)}>
      <View style={{ marginTop: verticalScale(10) }}>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            label={APP_LANGUAGE_CONSTANT.EMAIL_PHONE}
            value={values.email}
            errors={errors?.email}
            touched={touched.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            Icon={
              <VerifyButton
                btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
                verified={verified}
                onPress={() => onOtpVerify()}
              />
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.NEW_PASSWORD)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.newPassword}
            errors={errors.newPassword}
            touched={touched.newPassword}
            Icon={
              <View
                style={[
                  styles.verifyView,
                  allCheckCondition && styles.verifiedView
                ]}
              >
                <Text
                  style={[
                    styles.weakText,
                    allCheckCondition && styles.verifiedText
                  ]}
                >
                  {allCheckCondition
                    ? t(APP_LANGUAGE_CONSTANT.VERIFY)
                    : t(APP_LANGUAGE_CONSTANT.WEAK)}
                </Text>
              </View>
            }
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.CONFIRM_PASSWORD)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.confirmPAssword}
            errors={errors.confirmPAssword}
            touched={touched.confirmPAssword}
            Icon={
              values.newPassword === values.confirmPAssword &&
              values.confirmPAssword?.length > 0 && (
                <View style={[styles.verifyView, styles.verifiedView]}>
                  <Text style={[styles.weakText, styles.verifiedText]}>
                    {t(APP_LANGUAGE_CONSTANT.VERIFY)}
                  </Text>
                </View>
              )
            }
            onChangeText={handleChange('confirmPAssword')}
            onBlur={handleBlur('confirmPAssword')}
          />
        </View>

        <View style={styles.buttonView}>
          <ButtonComp
            isLoading={isLoading}
            btnTitle={t(APP_LANGUAGE_CONSTANT.SUBMIT)}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
      {openPopup && (
        <OtpPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          email={values?.email}
          toggleBtn={toggleBtn}
          setToggleBtn={setToggleBtn}
          onPressOtpVerify={onPressOtpVerify}
          onPressSendOtp={handleOnlineLogin}
        />
      )}
    </Container>
  );
}
