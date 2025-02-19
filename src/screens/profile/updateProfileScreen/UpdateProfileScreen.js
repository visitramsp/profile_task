import React, { useState } from 'react';
import {
  ButtonComp,
  Container,
  TextInputFieldPaper,
  VerifyButton,
  OtpPopup
} from '../../../components';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from './UpdateProfileScreen.styles';
import { UAELogo } from '../../../assets/icon';
import { useFormik } from 'formik';
import {
  ApplicationStyles,
  horizontalScale,
  verticalScale
} from '../../../theme';
import ImageCropPicker from 'react-native-image-crop-picker';
import { putRequestUpdateProfile } from '../../../store/user/action';
import { useSelector } from 'react-redux';
import { VendorRegisterSchema } from '../../../schemas/VendorRegisterSchema';
import { showError, showToastSuccess, showToastError } from '../../../utils';
import {
  getUserInfo,
  userPhoneRequestOtp,
  userPhoneVerifyOtp
} from '../../../store/auth/action';

export default function UpdateProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const { userDetail } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneVerify, setPhoneVerify] = useState(true);
  const [isPhoneLoader, setIsPhoneLoader] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);

  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange
  } = useFormik({
    initialValues: {
      name: userDetail.name,
      phone: userDetail.phone,
      profile: ''
    },
    validationSchema: VendorRegisterSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isPhoneVerify) {
        const formdata = new FormData();
        formdata.append('name', values.name);
        formdata.append('phone', `${values?.phone}`);
        if (values?.profile) {
          formdata.append('profile_photo', {
            uri: values.profile.path,
            type: values.profile.mime,
            name: `profile.${values.profile.mime.split('/')[1]}`
          });
        }
        setIsLoading(true);
        putRequestUpdateProfile(formdata)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response?.data?.message);
            getUserInfo()
              .then((res) => {})
              .catch((err) => {
                showError(err);
              });
            navigation.goBack();
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });
      } else {
        showToastError(t(APP_LANGUAGE_CONSTANT.VERIFY_PHONE_NO));
      }
    }
  });

  const onPressSendPhoneOtp = async () => {
    if (values?.phone) {
      setIsPhoneLoader(true);
      const queryParams = `?email=${userDetail.email}&phone=971${values?.phone}`;
      userPhoneRequestOtp(queryParams)
        .then((response) => {
          showToastSuccess(response?.data?.message);
          if (response?.data?.success) {
            setOpenPopup(true);
          } else {
            setOpenPopup(false);
          }
        })
        .catch((err) => {
          showError(err);
        })
        .finally(() => {
          setIsPhoneLoader(false);
        });
    } else {
      return showToastError('Please enter your phone number');
    }
  };

  const onPressPhoneOtpVerify = (otp) => {
    const queryParams = `?email=${values?.email}&otp=${otp}&phone=971${values?.phone}`;
    userPhoneVerifyOtp(queryParams)
      .then((response) => {
        setOpenPopup(false);
        setPhoneVerify(true);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setToggleBtn(false);
      });
  };

  const onChangePhone = (txt) => {
    if (txt === userDetail?.phone) {
      setPhoneVerify(true);
    } else {
      setPhoneVerify(false);
    }
    setFieldValue('phone', txt);
  };

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
  return (
    <>
      <Container title={t(APP_LANGUAGE_CONSTANT.PERSONAL_INFO)}>
        <Text style={styles.profileText}>
          {t(APP_LANGUAGE_CONSTANT.UPDATE_PROFILE)}
        </Text>
        <View style={styles.profileView}>
          <TouchableOpacity
            style={styles.profileShadow}
            onPress={() => selectPhoto()}
          >
            {(userDetail?.profile_photo || values.profile?.path) && (
              <Image
                source={{
                  uri: values.profile?.path
                    ? values.profile?.path
                    : userDetail.profile_photo
                }}
                style={styles.profileImage}
              />
            )}
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
            label={t(APP_LANGUAGE_CONSTANT.EMAIL)}
            underlineStyle={ApplicationStyles.dNone}
            value={userDetail.email}
            editable={false}
            errors={errors.email}
            touched={touched.email}
            Icon={
              <VerifyButton
                verified
                btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
                isLoading={false}
              />
            }
          />
        </View>
        <View style={[styles.inputView, styles.countryInputContainer]}>
          <View style={styles.country}>
            <UAELogo width={horizontalScale(35)} height={verticalScale(35)} />
            <Text style={styles.countryText}>{AppConstant.UAE_CODE}</Text>
          </View>
          <View style={styles.countryTextInputView}>
            <TextInput
              maxLength={9}
              style={styles.countryTextInput}
              placeholder={AppConstant.PHONE_FORMAT}
              value={values.phone}
              errors={errors.phone}
              touched={touched.phone}
              onChangeText={(txt) => onChangePhone(txt)}
            />

            <VerifyButton
              verified={isPhoneVerify}
              btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
              isLoading={isPhoneLoader}
              onPress={onPressSendPhoneOtp}
            />
          </View>
        </View>
        <View style={styles.button}>
          <ButtonComp
            isLoading={isLoading}
            btnTitle={t(APP_LANGUAGE_CONSTANT.UPDATE_CHANGES)}
            onPress={handleSubmit}
          />
        </View>
      </Container>
      {openPopup && (
        <OtpPopup
          isPhone
          type="email"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          email={values?.email}
          toggleBtn={toggleBtn}
          setToggleBtn={setToggleBtn}
          onPressSendPhoneOtp={onPressSendPhoneOtp}
          onPressPhoneOtpVerify={onPressPhoneOtpVerify}
        />
      )}
    </>
  );
}
