import React, { useState } from 'react';
import {
  ButtonComp,
  Container,
  TextInputFieldPaper
} from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import styles from './ChangePasswordScreen.styles';
import { ApplicationStyles, verticalScale } from '../../../theme';
import { useFormik } from 'formik';
import { SetNewPassSchema } from '../../../schemas/SetNewPassSchema';
import { putRequestchangePassword } from '../../../store/user/action';
import { showError, showToastSuccess } from '../../../utils';

// eslint-disable-next-line complexity
export default function ChangePasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        oldPassword: '',
        newPassword: '',
        confirmPAssword: ''
      },
      validationSchema: SetNewPassSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        const reqBody = {
          oldPassword: values?.oldPassword,
          newPassword: values?.newPassword
        };
        putRequestchangePassword(reqBody)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response?.data?.message);
            action.resetForm();
            navigation.goBack();
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });

        // navigation.navigate('warehouseScreen');
      }
    });

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

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.CHANGE_PASSWORD_NEW)}>
      <View>
        <Text style={styles.title}>
          {t(APP_LANGUAGE_CONSTANT.SET_NEW_PASSWORD)}
        </Text>
        <Text style={styles.desc}>
          {t(APP_LANGUAGE_CONSTANT.ENTER_NEW_PASSWORD_YOUR_ACCOUNT)}
        </Text>
      </View>
      <View style={{ marginTop: verticalScale(10) }}>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.OLD_PASSWORD)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.oldPassword}
            errors={errors.oldPassword}
            touched={touched.oldPassword}
            onChangeText={handleChange('oldPassword')}
            onBlur={handleBlur('oldPassword')}
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
            btnTitle={t(APP_LANGUAGE_CONSTANT.UPDATE_CHANGES)}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </Container>
  );
}
