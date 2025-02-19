import React, { useState } from 'react';
import {
  ButtonComp,
  Container,
  ScreenInfo,
  TextInputFieldPaper
} from '../../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { VendorRegisterSchema2 } from '../../../schemas/VendorRegisterSchema2';
import { ApplicationStyles, verticalScale } from '../../../theme';
import { Text, View } from 'react-native';
import { postUserRegister } from '../../../store/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraftData } from '../../../store/user/reducer';
import styles from './SignUp.styles';
import { getUserType, showError, showToastSuccess } from '../../../utils';
// import { showError,showToastSuccess } from '../../../utils';

// eslint-disable-next-line complexity
const SignUpBusinessScreen = ({ navigation, route }) => {
  const title = route?.params?.title;
  const docId = route?.params?.id;
  const email = route?.params?.email;
  const resetGoback = route?.params?.resetGoback || false;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userDraftData = useSelector((State) => State.user.userDraftData);

  const [visibleInputIndex, setVisibleInputIndex] = useState(
    userDraftData?.visibleInputIndex || 0
  );
  const [isLoader, setIsLoader] = useState(false);

  const initialValues = {
    companyName: userDraftData?.data?.companyName || '',
    brandName: userDraftData?.data?.brandName || '',
    designation: userDraftData?.data?.designation || '',
    companyAddress: userDraftData?.data?.companyAddress || '',
    poBox: userDraftData?.data?.poBox || ''
  };

  let formik = useFormik({
    initialValues,
    validationSchema: VendorRegisterSchema2,
    onSubmit: async (values, action) => {
      setIsLoader(true);
      const formdata = {
        company_name: values?.companyName,
        slide: '2',
        user_type: getUserType(title),
        designation: values?.designation,
        company_address: values?.companyAddress,
        po_box: values?.poBox,
        doc_id: docId,
        email: email
      };

      postUserRegister(formdata)
        .then((response) => {
          showToastSuccess(response?.data?.message);
          dispatch(
            updateDraftData({
              ...userDraftData,
              screenName: SCREEN_NAME.SIGNUP_DOCUMENT_SCREEN,
              nextScreenProps: {
                id: docId,
                title: title
              }
            })
          );
          navigation.navigate(SCREEN_NAME.SIGNUP_DOCUMENT_SCREEN, {
            id: docId,
            title: title,
            email: email
          });
        })
        .catch((error) => {
          setIsLoader(false);
          showError(error);
        })
        .finally(() => setIsLoader(false));
    }
  });

  const inputFields = [
    { id: 1, name: 'Company Name', field: 'companyName' },
    { id: 2, name: 'Brand Name', field: 'brandName' },
    { id: 3, name: 'Designation', field: 'designation' },
    { id: 4, name: 'Company Address', field: 'companyAddress' },
    { id: 5, name: 'PO Box', field: 'poBox' }
  ];

  const handleChange = (index, field, value) => {
    formik.setFieldValue(field, value);
    dispatch(
      updateDraftData({
        ...userDraftData,
        screenName: SCREEN_NAME.SIGNUP_BUSSINESS_SCREEN,
        data: userDraftData?.data
          ? { ...userDraftData?.data, [field]: value }
          : { [field]: value }
      })
    );
    if (value !== '' && index === visibleInputIndex) {
      setVisibleInputIndex(visibleInputIndex + 1);
      dispatch(
        updateDraftData({
          ...userDraftData,
          visibleInputIndex: visibleInputIndex + 1
        })
      );
    }
  };

  return (
    <Container title={t(title)} resetGoback={resetGoback}>
      <ScreenInfo
        title={APP_LANGUAGE_CONSTANT.BUSINESS_INFO}
        description={APP_LANGUAGE_CONSTANT.BUSINESS_DESC}
      />
      <View style={{ marginTop: verticalScale(20) }}>
        {inputFields.map(
          (res, index) =>
            index <= visibleInputIndex && (
              <View
                key={res.id}
                style={[index === 4 ? styles.mainViewFirst : styles.inputView]}
              >
                {index === 4 && (
                  <View style={styles.countryCodePhone}>
                    <Text style={styles.countryNameTitle}>Country Name</Text>
                    <Text style={styles.countryNameDesc}>UAE</Text>
                  </View>
                )}
                <View style={[res.id === 5 ? styles.phoneNumberView : {}]}>
                  <TextInputFieldPaper
                    label={res.name}
                    underlineStyle={ApplicationStyles.dNone}
                    value={formik.values[res.field]}
                    errors={formik.errors[res.field]}
                    touched={formik.touched[res.field]}
                    onChangeText={(text) =>
                      handleChange(index, res.field, text)
                    }
                  />
                </View>
              </View>
            )
        )}
        <View style={styles.button}>
          {visibleInputIndex === 5 && (
            <ButtonComp
              isLoading={isLoader}
              btnTitle={t(APP_LANGUAGE_CONSTANT.PROCEED)}
              onPress={formik.handleSubmit}
            />
          )}
        </View>
      </View>
    </Container>
  );
};

export default SignUpBusinessScreen;
