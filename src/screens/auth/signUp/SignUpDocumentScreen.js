/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import {
  ButtonComp,
  Container,
  ScreenInfo,
  TextInputFieldPaper,
  UploadFile
} from '../../../components';
import {
  APP_LANGUAGE_CONSTANT,
  SCREEN_NAME,
  USER_TYPE
} from '../../../constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationStyles, Colors, verticalScale } from '../../../theme';
import { Text, View, Platform, StyleSheet } from 'react-native';
import styles from './SignUp.styles';
import { useFormik } from 'formik';
import Checkbox from '../../../components/Checkbox';
import TermCondition from '../../termConditionModal/TermConditionModal';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { postWithOutToken, postDocsAPI } from '../../../services/ApiServices';
import { API_CONSTANT } from '../../../services/ApiConstant';
import { VendorRegisterSchema3 } from '../../../schemas/VendorRegisterSchema3';
import { deleteDraftData, updateDraftData } from '../../../store/user/reducer';
import { showError, showToastError, showToastSuccess } from '../../../utils';
import CommonLoader from '../../../components/CommonLoader';

// eslint-disable-next-line complexity
const SignUpDocumentScreen = ({ route, navigation }) => {
  const title = route?.params?.title;
  const mainId = route?.params?.id;
  const email = route?.params?.email;
  const resetGoback = route?.params?.resetGoback || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userDraftData = useSelector((State) => State.user.userDraftData);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState({
    vat_certificate: null
  });
  const [termAndCondition, setTermAndCondition] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = (val) => {
    if (checked) {
      setChecked(!checked);
    } else {
      val && setChecked(val);
      setTermAndCondition(true);
    }
  };

  const initialValues = {
    tradeLicense: userDraftData?.data?.tradeLicense || '',
    iban: userDraftData?.data?.iban || '',
    vatNumber: userDraftData?.data?.vatNumber || '',
    emirate: userDraftData?.data?.emirate || '',
    residenceVisa: userDraftData?.data?.residenceVisa || '',
    trade_license: '',
    cheque_scan: '',
    vat_certificate: '',
    emirate_id_pic: '',
    residence_visa: ''
  };

  let formik = useFormik({
    initialValues,
    validationSchema: VendorRegisterSchema3,
    onSubmit: async (values, action) => {
      if (values) {
        handleCheck();
      }
    }
  });

  const postDocumentSubmit = () => {
    if (!checked) {
      showToastError(t(APP_LANGUAGE_CONSTANT.TERMS_AND_CONDITION_ERROR));
      return;
    }

    setToggle(true);

    const formdata = {
      slide: '3',
      user_type: USER_TYPE.VENDOR,
      doc_id: mainId,
      term_and_condition: checked ? 'active' : null,
      residence_visa_number: values?.residenceVisa,
      trade_license_number: values?.tradeLicense,
      iban: values?.iban,
      vat_certificate_number: values?.vatNumber,
      emirates_id: values?.emirate,
      email: email
    };

    Object.keys(values).forEach((key) => {
      if (values[key] && typeof values[key] === 'object') {
        formdata[key] = {
          uri: values[key]?.uri,
          type: values[key]?.type,
          name: values[key]?.name
        };
      }
    });

    postWithOutToken(API_CONSTANT.USER_REGISTER_BASE64, formdata)
      .then((response) => {
        showToastSuccess(response?.data?.message);
        dispatch(deleteDraftData());
        navigation.navigate(SCREEN_NAME.LOGIN, {
          index: APP_LANGUAGE_CONSTANT.LOGIN
        });
      })
      .catch((error) => {
        setToggle(false);
        showError(error);
      })
      .finally(() => {
        setToggle(false);
      });
  };

  const postDocumentUpload = (endPointType, data, formikField) => {
    setLoader(true);
    let fieldName;
    let endPoint;
    switch (endPointType) {
      case 'emirate_id_pic':
        fieldName = 'emirate';
        endPoint = API_CONSTANT.USER_EMIRATES_DOCS;
        break;
      case 'trade_license':
        fieldName = 'tradeLicense';
        endPoint = API_CONSTANT.USER_TRADE_LICENSE;
        break;
      case 'cheque_scan':
        fieldName = 'iban';
        endPoint = API_CONSTANT.USER_IBAN_DOCS;
        break;
      case 'vat_certificate':
        fieldName = 'vatNumber';
        endPoint = API_CONSTANT.USER_TRN_NUMBER_VERIFY;
        break;
      case 'residence_visa':
        fieldName = 'residenceVisa';
        endPoint = API_CONSTANT.USER_RESIDENCE_VISA;
        break;

      default:
        break;
    }
    if (endPoint) {
      postDocsAPI(endPoint, data)
        .then((res) => {
          if (res?.data?.data?.number && fieldName) {
            handleChangeEvent(fieldName, res?.data?.data?.number);
          }
          formik.setFieldValue(formikField, data);
          setSelectedDocuments((prev) => ({
            ...prev,
            [endPointType]: data?.name
          }));
        })
        .catch((e) => {})
        .finally(() => {
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  const selectDocument = async (documentType, formikField) => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        allowMultiSelection: false
      }).catch(() => null);

      if (doc && doc?.uri) {
        const selectedDoc = doc;
        const uri =
          Platform.OS === 'android'
            ? selectedDoc?.uri
            : selectedDoc?.uri?.replace('file://', '');

        try {
          RNFetchBlob.fs
            .readFile(uri, 'base64')
            .then((files) => {
              const data = { ...selectedDoc, ...{ uri: files } };
              postDocumentUpload(documentType, data, formikField);
            })
            .catch((_err) => {});
        } catch (err) {
          showError(err);
        }
      }
    } catch (err) {
      showError(err);
    }
  };

  const { values, errors, touched, handleBlur, setFieldValue } = formik;

  const handleChangeEvent = (field, value) => {
    setFieldValue(field, value);
    dispatch(
      updateDraftData({
        ...userDraftData,
        screenName: SCREEN_NAME.SIGNUP_DOCUMENT_SCREEN,
        data: userDraftData?.data
          ? { ...userDraftData?.data, [field]: value }
          : { [field]: value }
      })
    );
  };

  const deleteDocument = (formikField) => {
    formik.setFieldValue(formikField, '');
  };

  return (
    <>
      <Container title={t(title)} resetGoback={resetGoback}>
        <ScreenInfo
          title={APP_LANGUAGE_CONSTANT.DOCUMENT_VERIFICATION}
          description={APP_LANGUAGE_CONSTANT.DOCUMENT_DESC}
        />
        <View style={{ marginTop: verticalScale(10) }}>
          <View>
            <View>
              <UploadFile
                value={formik?.values?.trade_license}
                // errors={errors.trade_license}
                UploadTitle={APP_LANGUAGE_CONSTANT.UPLOAD_TRADE_LICENSE}
                rightPress={() => deleteDocument('trade_license', '')}
                onPress={() => selectDocument('trade_license', 'trade_license')}
              />
              <TextInputFieldPaper
                style={styles.test}
                label={APP_LANGUAGE_CONSTANT.TRADE_LICENSE}
                underlineStyle={ApplicationStyles.dNone}
                value={values.tradeLicense}
                errors={errors?.tradeLicense}
                touched={touched.tradeLicense}
                onChangeText={(val) => handleChangeEvent('tradeLicense', val)}
                onBlur={handleBlur('tradeLicense')}
              />
            </View>
            <View style={styles.inputView}>
              <UploadFile
                value={formik?.values?.cheque_scan}
                // errors={errors.cheque_scan}
                UploadTitle={APP_LANGUAGE_CONSTANT.UPLOAD_CANCELLED_CHEQUE}
                rightPress={() => deleteDocument('cheque_scan', '')}
                onPress={() => selectDocument('cheque_scan', 'cheque_scan')}
              />
              <TextInputFieldPaper
                style={styles.test}
                label={APP_LANGUAGE_CONSTANT.IBAN}
                underlineStyle={ApplicationStyles.dNone}
                value={values.iban}
                errors={errors?.iban}
                touched={touched.iban}
                onChangeText={(val) => handleChangeEvent('iban', val)}
                onBlur={handleBlur('iban')}
              />
            </View>
            <View style={styles.inputView}>
              <UploadFile
                value={formik?.values?.vat_certificate}
                // errors={errors.vat_certificate}
                UploadTitle={APP_LANGUAGE_CONSTANT.UPLOAD_VAT_CERTIFICATE}
                rightPress={() => deleteDocument('vat_certificate', '')}
                onPress={() =>
                  selectDocument('vat_certificate', 'vat_certificate')
                }
              />
              <TextInputFieldPaper
                style={styles.test}
                label={APP_LANGUAGE_CONSTANT.VAT_NUMBER}
                underlineStyle={ApplicationStyles.dNone}
                value={values.vatNumber}
                errors={errors?.vatNumber}
                touched={touched.vatNumber}
                onChangeText={(val) => handleChangeEvent('vatNumber', val)}
                onBlur={handleBlur('vatNumber')}
              />
            </View>
            <View style={styles.inputView}>
              <UploadFile
                value={formik?.values?.residence_visa}
                // errors={errors.residence_visa}
                UploadTitle={
                  APP_LANGUAGE_CONSTANT.UPLOAD_RESIDENT_VISA_CERTIFICATE
                }
                rightPress={() => deleteDocument('residence_visa', '')}
                onPress={() =>
                  selectDocument('residence_visa', 'residence_visa')
                }
              />
              <TextInputFieldPaper
                style={styles.test}
                label={APP_LANGUAGE_CONSTANT.RESIDENT_VISA}
                underlineStyle={ApplicationStyles.dNone}
                value={values.residenceVisa}
                errors={errors?.residenceVisa}
                touched={touched.residenceVisa}
                onChangeText={(val) => handleChangeEvent('residenceVisa', val)}
                onBlur={handleBlur('residenceVisa')}
              />
            </View>
            {/* <View> */}
            <View style={styles.inputView}>
              <UploadFile
                value={formik?.values?.emirate_id_pic}
                // errors={errors.emirate_id_pic}
                UploadTitle={APP_LANGUAGE_CONSTANT.UPLOAD_EMIRATES_ID}
                rightPress={() => deleteDocument('emirate_id_pic', '')}
                onPress={() =>
                  selectDocument('emirate_id_pic', 'emirate_id_pic')
                }
              />
              <TextInputFieldPaper
                style={styles.test}
                label={APP_LANGUAGE_CONSTANT.EMIRATES_ID_NUMBER}
                underlineStyle={ApplicationStyles.dNone}
                value={values.emirate}
                errors={errors?.emirate}
                touched={touched.emirate}
                onChangeText={(val) => handleChangeEvent('emirate', val)}
                onBlur={handleBlur('emirate')}
              />
            </View>
          </View>
        </View>

        <View style={styles.termsView}>
          <Checkbox
            checked={checked}
            onPress={() => {
              if (Object.values(formik?.errors)?.length > 0) {
                let errorValues = Object.values(formik?.errors)?.join('\n');
                showToastError(errorValues);
              }
              formik.handleSubmit();
            }}
          />
          <Text style={[styles.aqadText, { marginTop: verticalScale(15) }]}>
            {t(APP_LANGUAGE_CONSTANT.AQAD_AGREE)}{' '}
          </Text>
          <Text style={[styles.termsText, { marginTop: verticalScale(15) }]}>
            {t(APP_LANGUAGE_CONSTANT.TERMS_AND_CONDITION)}
          </Text>
        </View>
        <TermCondition
          termAndCondition={termAndCondition}
          handleCheck={handleCheck}
          setTermAndCondition={setTermAndCondition}
        />
        <View style={[styles.button]}>
          <ButtonComp
            isLoading={toggle}
            btnTitle={t(APP_LANGUAGE_CONSTANT.PROCEED)}
            onPress={postDocumentSubmit}
          />
        </View>
      </Container>
      {loader && (
        <View style={customeStyles.loaderCTN}>
          <CommonLoader isLoading={loader} />
        </View>
      )}
    </>
  );
};

const customeStyles = StyleSheet.create({
  loaderCTN: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.black40,
    left: 0
  }
});

export default SignUpDocumentScreen;
