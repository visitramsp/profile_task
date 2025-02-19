import React, { useState } from 'react';
import {
  ButtonComp,
  Container,
  SelectDropdown,
  TextInputFieldPaper
} from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { ApplicationStyles, verticalScale } from '../../../theme';
import { useFormik } from 'formik';
import styles from './EmailUsScreen.styles';
import { EmailUsSchema } from '../../../schemas/EmailUsSchema';
import { supportEmail } from '../../../store/vendor/action';
import { showError, showToastSuccess } from '../../../utils';
export default function EmailUsScreen({ navigation }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  let formik = useFormik({
    initialValues: {
      fullName: '',
      account: '',
      subject: '',
      message: ''
    },
    validationSchema: EmailUsSchema,
    onSubmit: (values, action) => {
      setIsLoading(true);
      const reqBody = {
        fullName: values?.fullName,
        account: values?.account,
        subject: values?.subject,
        message: values?.message
      };
      supportEmail(reqBody)
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
    }
  });

  const BUTTON_ARR = [
    // {
    //   btnName: t(APP_LANGUAGE_CONSTANT.VIEW_HISTORY),
    //   gradiantColor: true,
    //   loading: false
    // },
    {
      btnName: t(APP_LANGUAGE_CONSTANT.SEND_EMAIL),
      gradiantColor: false,
      loading: isLoading
    }
  ];

  const ACCOUNT_ENTERY_ARR = [
    { id: 1, title: 'Supplier', value: 'Supplier' },
    { id: 1, title: 'Retailer', value: 'Retailer' },
    { id: 1, title: 'Employee', value: 'Employee' },
    { id: 1, title: 'Other', value: 'Other' }
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.EMAIL_US)}>
      <Text style={styles.title}>{t(APP_LANGUAGE_CONSTANT.EMAIL_REQUEST)}</Text>
      <Text style={styles.desc}>
        {t(APP_LANGUAGE_CONSTANT.EMAIL_REQUEST_DETAILS)}
      </Text>
      <View style={{ marginTop: verticalScale(10) }}>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.FULL_NAME_NEW)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.fullName}
            errors={errors.fullName}
            touched={touched.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
          />
        </View>
        <View style={styles.inputView}>
          {/* <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.ACCOUNT_ENTERY)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.account}
            errors={errors.account}
            touched={touched.account}
            onChangeText={handleChange('account')}
            onBlur={handleBlur('account')}
          /> */}
          <SelectDropdown
            style={styles.selectAccount}
            errors={errors.account}
            touched={touched.account}
            value={values.account}
            placeholderStyle={styles.dropDownStyle}
            placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_ACCOUNT_TYPE)}
            data={ACCOUNT_ENTERY_ARR}
            onChange={(item) => {
              formik.setFieldValue('account', item?.value);
            }}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.SUBJECT)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.subject}
            errors={errors.subject}
            touched={touched.subject}
            onChangeText={handleChange('subject')}
            onBlur={handleBlur('subject')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputFieldPaper
            multiline
            label={t(APP_LANGUAGE_CONSTANT.MESSAGE)}
            underlineStyle={ApplicationStyles.dNone}
            value={values.message}
            errors={errors.message}
            touched={touched.message}
            numberOfLines={5}
            containerStyle={styles.multiLineInput}
            onChangeText={handleChange('message')}
            onBlur={handleBlur('message')}
          />
        </View>
        <View style={styles.buttonView}>
          {BUTTON_ARR?.map((item, index) => (
            <View key={index} style={styles.btnView}>
              {/* <CustSmallButton
                isLoading={item.loading}
                btnTitle={item.btnName}
                gradiantColor={item.gradiantColor}
                onPress={() => handleSubmit()}
              /> */}
              <ButtonComp
                isLoading={item.loading}
                btnTitle={item.btnName}
                onPress={() => handleSubmit()}
              />
            </View>
          ))}
        </View>
      </View>
    </Container>
  );
}
