import React, { useState } from 'react';
import {
  ButtonComp,
  Container,
  TextInputFieldPaper,
  UploadFile,
  VerifyButton
} from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useFormik } from 'formik';
import { ApplicationStyles } from '../../../theme';
import ImageCropPicker from 'react-native-image-crop-picker';
import styles from './AddDriverScreen.styles';
import DocumentPicker from 'react-native-document-picker';
import AsssignVehicleInput from './AsssignVehicleInput';
import { AddDriverSchema } from '../../../schemas/AddDriverSchema';
import RNFetchBlob from 'rn-fetch-blob';
import { showError } from '../../../utils';

const dataOtion = [
  { label: '4517 Washington Ave. and, Kentucky 39495', value: '1' },
  { label: '4517 Washington Ave. and, Kentucky 39495', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
  { label: 'Item 9', value: '9' },
  { label: 'Item 10', value: '10' }
];
const AddDriverScreen = () => {
  const { t } = useTranslation();
  const [selectedDocuments, setSelectedDocuments] = useState({
    vat_certificate: null
  });

  const initialValues = {
    name: '',
    driverLicense: '',
    driverLicenseDocument: '',
    assignVehicle: '',
    profile: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AddDriverSchema,
    onSubmit: async (values, action) => {}
  });
  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = formik;

  const selectPhoto = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: false,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true
    }).then((image) => {
      setFieldValue('profile', image);
    });
  };

  // eslint-disable-next-line complexity
  const selectDocument = async (documentType, formikField) => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        allowMultiSelection: false
      }).catch(() => null);

      if (doc && doc?.length > 0) {
        const selectedDoc = doc[0];

        const uri =
          Platform.OS === 'android'
            ? selectedDoc?.uri
            : selectedDoc?.uri?.replace('file://', '');
        try {
          RNFetchBlob.fs
            .readFile(uri, 'base64')
            .then((files) => {
              const data = { ...selectedDoc, ...{ uri: files } };
              formik.setFieldValue(formikField, data);
              setSelectedDocuments((prev) => ({
                ...prev,
                [documentType]: data?.name
              }));
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

  const deleteDocument = (formikField) => {
    formik.setFieldValue(formikField, '');
  };
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.ADD_DRIVER)}>
      <Text style={styles.profileText}>
        {t(APP_LANGUAGE_CONSTANT.UPDATE_PROFILE)}
      </Text>
      <View style={styles.profileView}>
        <TouchableOpacity
          style={styles.profileShadow}
          onPress={() => selectPhoto()}
        >
          <Image
            source={{
              uri: values.profile?.path
                ? values.profile?.path
                : 'https://t2informatik.de/en/wp-content/uploads/sites/2/2022/01/user-smartpedia-t2informatik.png'
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <TextInputFieldPaper
          validationSymbol
          label={APP_LANGUAGE_CONSTANT.FULL_NAME}
          underlineStyle={ApplicationStyles.dNone}
          value={values.name}
          errors={errors.name}
          touched={touched.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
        />
      </View>
      <View style={styles.inputView}>
        <TextInputFieldPaper
          validationSymbol
          label={t(APP_LANGUAGE_CONSTANT.DRIVER_LICENSE)}
          underlineStyle={ApplicationStyles.dNone}
          value={values.driverLicense}
          errors={errors.driverLicense}
          touched={touched.driverLicense}
          Icon={
            <VerifyButton
              verified
              btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
              isLoading={false}
            />
          }
          onChangeText={handleChange('driverLicense')}
          onBlur={handleBlur('driverLicense')}
        />
      </View>
      <View style={styles.documentView}>
        <UploadFile
          value={formik?.values?.driverLicenseDocument}
          errors={errors.driverLicenseDocument}
          UploadTitle={APP_LANGUAGE_CONSTANT.UPLOAD_DRIVER_LICENSE}
          rightPress={() => deleteDocument('driverLicenseDocument', '')}
          onPress={() =>
            selectDocument('driverLicenseDocument', 'driverLicenseDocument')
          }
        />
      </View>
      <View style={styles.inputView}>
        <AsssignVehicleInput
          value={values.assignVehicle}
          placeholder={t(APP_LANGUAGE_CONSTANT.ASSIGN_VEHICLE)}
          data={dataOtion}
          errors={errors.assignVehicle}
          touched={touched.assignVehicle}
          onBlur={handleBlur('assignVehicle')}
          onChange={(item) =>
            formik.setFieldValue('assignVehicle', item?.value)
          }
        />
      </View>
      <View style={styles.button}>
        <ButtonComp
          // isLoading={toggle}
          btnTitle={t(APP_LANGUAGE_CONSTANT.UPDATE)}
          onPress={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default AddDriverScreen;
