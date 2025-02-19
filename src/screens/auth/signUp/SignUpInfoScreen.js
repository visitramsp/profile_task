/* eslint-disable react/jsx-sort-props */
import React, { useState } from 'react';
import { Keyboard, Share, Text, TextInput, View } from 'react-native';
import {
  ApplicationStyles,
  horizontalScale,
  verticalScale
} from '../../../theme';
import {
  ButtonComp,
  Container,
  OtpPopup,
  ScreenInfo,
  TextInputFieldPaper,
  VerifyButton
} from '../../../components';
import { UAELogo } from '../../../assets/icon';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant,
  SCREEN_NAME
} from '../../../constants';
import { useTranslation } from 'react-i18next';
import styles from './SignUp.styles';
import { useFormik } from 'formik';
import { VendorRegisterSchema } from '../../../schemas/VendorRegisterSchema';
import {
  postUserRegisterWithFormData,
  referAndEarn,
  referUser,
  userRegisterRequestOtp,
  userRegisterVerifyOtp,
  userPhoneRequestOtp,
  userPhoneVerifyOtp
} from '../../../store/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraftData } from '../../../store/user/reducer';
import {
  getUserType,
  showError,
  showToastSuccess,
  showToastError
} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from '../../../components/Checkbox';

// eslint-disable-next-line complexity
const SignUpInfoScreen = ({ navigation, route }) => {
  const screen = route?.params?.screen;
  const title = route?.params?.title;
  const referralCode = route?.params?.referralCode;

  const resetGoback = route?.params?.resetGoback || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userDraftData = useSelector((State) => State.user.userDraftData);

  const [visibleInputIndex, setVisibleInputIndex] = useState(
    userDraftData?.visibleInputIndex || 0
  );
  const [phoneData, setPhoneData] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isPhoneLoader, setIsPhoneLoader] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [verified, setVerified] = useState(
    userDraftData?.emailVerified || false
  );
  const [phoneVerified, setPhoneVerified] = useState(
    userDraftData?.phoneVerified || false
  );
  const [isPhone, setIsPhone] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [toggleBtn, setToggleBtn] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isWhatsapp, setIsWhatsapp] = useState(false);

  const { setFieldValue, values, errors, touched, handleSubmit } = useFormik({
    initialValues:
      screen === 'ReferAndEarn'
        ? {
            name: '',
            email: '',
            phone: '',
            emirateId: ''
          }
        : screen === 'StartRefer'
        ? {
            name: userDraftData?.data?.name,
            email: userDraftData?.data?.email,
            phone: userDraftData?.data?.phone
          }
        : {
            name: userDraftData?.data?.name,
            email: userDraftData?.data?.email,
            phone: userDraftData?.data?.phone,
            referralCode: userDraftData?.data?.referralCode
          },
    validationSchema: VendorRegisterSchema,
    onSubmit: (values) => {
      if (screen === 'ReferAndEarn') {
        const data = {
          phone: `${values?.phone}`,
          email: values.email,
          name: values.name,
          emirate_id: values.emirateId
        };
        referAndEarn(data)
          .then((response) => {
            AsyncStorage.setItem(
              'referralCode',
              response.data.data.referral_code
            );
            navigation.navigate('ReferAndEarnScreen', {
              referCode: response.data.data
            });
          })
          .catch((error) => {
            showError(error);
          });
      } else if (screen === 'StartRefer') {
        startReferSubmit(values);
      } else {
        if (verified) {
          setToggle(true);
          const formdata = new FormData();
          formdata.append('name', values.name);
          formdata.append('slide', '1');
          formdata.append('user_type', getUserType(title));
          formdata.append('email', values.email);
          formdata.append('phone', `${values?.phone}`);
          formdata.append('password', responseData?.name);
          formdata.append('doc_id', responseData?.doc_id);
          formdata.append('refer_code', values.referralCode);
          formdata.append('isWhatsapp', isWhatsapp ? '1' : '0');

          postUserRegisterWithFormData(formdata)
            .then((response) => {
              showToastSuccess(response?.data?.message);
              setToggle(false);
              dispatch(
                updateDraftData({
                  ...userDraftData,
                  screenName: SCREEN_NAME.SIGNUP_BUSSINESS_SCREEN,
                  visibleInputIndex: 0,
                  nextScreenProps: {
                    id: responseData?.doc_id,
                    title: title
                  }
                })
              );
              navigation.navigate(SCREEN_NAME.SIGNUP_BUSSINESS_SCREEN, {
                id: responseData?.doc_id,
                title: title,
                email: values.email
              });
            })
            .catch((error) => {
              setToggle(false);
              showError(error);
            });
        } else {
          showToastError(t(APP_LANGUAGE_CONSTANT.EMAIL_AND_PHONE));
          setToggle(false);
        }
      }
    }
  });
  const startReferSubmit = () => {
    const data = {
      phone: `${values?.phone}`,
      email: values.email,
      name: values.name,
      referred_code: referralCode
    };
    referUser(data)
      .then((response) => {
        onShare();
        showToastSuccess(response?.data?.message);
      })
      .catch((error) => {
        showError(error);
      });
  };

  const handleChange = (index, field, value) => {
    setFieldValue(field, value);
    dispatch(
      updateDraftData({
        ...userDraftData,
        screenName: SCREEN_NAME.SIGNUP_INFO_SCREEN,
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome referral code: XYZ123!'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          navigation.navigate('ReferAndEarnScreen');
        } else {
          navigation.navigate('ReferAndEarnScreen');
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      // console.error('Error while sharing:', error.message);
    }
  };

  const onPressSendOtp = async (id, value) => {
    if (value?.email) {
      setIsPhone(false);
      setIsLoader(true);
      const queryParams = `?email=${value.email}`;
      userRegisterRequestOtp(queryParams)
        .then((response) => {
          showToastSuccess(response?.data?.message);
          setIsLoader(false);
          if (response?.data?.message === AppConstant.EMAIL_VERIFIED) {
            setVerified(true);
          } else if (response?.data?.success) {
            setOpenPopup(true);
            setOtpError('');
            setResponseData(response?.data?.data);
            dispatch(
              updateDraftData({
                ...userDraftData,
                verifyAPIData: response?.data?.data
              })
            );
          } else {
            setOpenPopup(false);
          }
        })
        .catch((err) => {
          setIsLoader(false);
          showError(err);
        });
    } else {
      showToastError(`${t(APP_LANGUAGE_CONSTANT.ENTER_EMAIL)}`);
    }
  };

  const reSendPhoneOtp = async () => {
    if (values?.phone) {
      setIsPhoneLoader(true);
      const queryParams = `?email=${values.email}&phone=971${values?.phone}`;
      userPhoneRequestOtp(queryParams)
        .then((response) => {
          showToastSuccess(response?.data?.message);
          setIsPhoneLoader(false);
          setIsPhone(true);
          if (response?.data?.success) {
            setOpenPopup(true);
            dispatch(
              updateDraftData({
                ...userDraftData,
                verifyAPIData: response?.data?.data
              })
            );
          } else {
            setOpenPopup(false);
          }
        })
        .catch((err) => {
          setIsPhoneLoader(false);
          showError(err);
        });
    } else {
      showToastError(`${t(APP_LANGUAGE_CONSTANT.PHONE)}`);
    }
  };

  const onPressSendPhoneOtp = async () => {
    if (!phoneData) {
      if (values?.phone) {
        setIsPhoneLoader(true);
        const queryParams = `?email=${values.email}&phone=971${values?.phone}`;
        userPhoneRequestOtp(queryParams)
          .then((response) => {
            showToastSuccess(response?.data?.message);
            setIsPhoneLoader(false);
            setIsPhone(true);
            if (response?.data?.success) {
              setOpenPopup(true);
              dispatch(
                updateDraftData({
                  ...userDraftData,
                  verifyAPIData: response?.data?.data
                })
              );
            } else {
              setOpenPopup(false);
            }
          })
          .catch((err) => {
            setIsPhoneLoader(false);
            showError(err);
          });
      } else {
        showToastError(`${t(APP_LANGUAGE_CONSTANT.PHONE)}`);
      }
    } else {
      setOpenPopup(true);
    }
  };

  const onPressPhoneOtpVerify = (otp) => {
    const queryParams = `?email=${values?.email}&otp=${otp}&phone=971${values?.phone}`;
    userPhoneVerifyOtp(queryParams)
      .then((response) => {
        setPhoneVerified(true);
        dispatch(updateDraftData({ ...userDraftData, phoneVerified: true }));
        setOpenPopup(false);
      })
      .catch((error) => {
        showError(error);
        setOtpError(error?.response?.data?.message);
        setPhoneVerified(false);
      })
      .finally(() => {
        setToggleBtn(false);
        setIsPhone(false);
      });
  };

  const onPressOtpVerify = (otp) => {
    setOtpError('');
    const queryParams = `?email=${values?.email}&otp=${otp}&name=${responseData?.name}&docId=${responseData?.docId}`;
    userRegisterVerifyOtp(queryParams)
      .then((response) => {
        setToggleBtn(false);
        setVerified(true);
        dispatch(updateDraftData({ ...userDraftData, emailVerified: true }));
        setOpenPopup(false);
      })
      .catch((error) => {
        showError(error);
        setVerified(false);
        setOtpError(error?.response?.data?.message);
        setToggleBtn(false);
      });
  };

  const inputFields =
    screen === 'ReferAndEarn'
      ? [
          { id: 1, name: 'Full name', field: 'name' },
          { id: 2, name: 'Email', field: 'email' },
          { id: 3, name: AppConstant.PHONE_FORMAT, field: 'phone' },
          { id: 4, name: 'Emirate Id', field: 'emirateId' }
        ]
      : screen === 'StartRefer'
      ? [
          { id: 1, name: 'Full name', field: 'name' },
          { id: 2, name: 'Email', field: 'email' },
          { id: 3, name: AppConstant.PHONE_FORMAT, field: 'phone' }
        ]
      : [
          { id: 1, name: 'Full name', field: 'name' },
          { id: 2, name: 'Email', field: 'email' },
          { id: 3, name: AppConstant.PHONE_FORMAT, field: 'phone' },
          { id: 4, name: 'Referral Code (Optional)', field: 'referralCode' }
        ];

  return (
    <Container title={t(title)} resetGoback={resetGoback}>
      <ScreenInfo
        title={APP_LANGUAGE_CONSTANT.PERSONAL_INFORMATION}
        description={APP_LANGUAGE_CONSTANT.PROVIDE_DETAIL_PROCESS}
      />
      <View style={{ paddingTop: verticalScale(30) }}>
        {inputFields.map(
          // eslint-disable-next-line complexity
          (res, index) =>
            index <= visibleInputIndex && (
              <View
                key={res.id}
                style={[index === 2 ? styles.mainViewFirst : styles.inputView]}
              >
                {index === 2 ? (
                  <>
                    <View style={styles.countryInputContainer}>
                      <View style={styles.country}>
                        <UAELogo
                          width={horizontalScale(35)}
                          height={verticalScale(35)}
                        />
                        <Text style={styles.countryText}>
                          {AppConstant.UAE_CODE}
                        </Text>
                      </View>
                      <View style={styles.countryTextInputView}>
                        <TextInput
                          maxLength={9}
                          keyboardType="number-pad"
                          value={values[res.field]}
                          style={styles.countryTextInput}
                          placeholder={AppConstant.PHONE_FORMAT}
                          onChangeText={(text) =>
                            handleChange(index, res.field, text)
                          }
                        />
                        {screen === 'ReferAndEarn' ||
                        screen === 'StartRefer' ? null : (
                          <VerifyButton
                            btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
                            verified={phoneVerified}
                            isLoading={res.id === 3 ? isPhoneLoader : false}
                            onPress={() => {
                              switch (res.id) {
                                case 2:
                                  onPressSendOtp(res.id, values);
                                  break;

                                case 3:
                                  onPressSendPhoneOtp();
                                  break;

                                default:
                                  break;
                              }
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <View style={styles.whatsappView}>
                      <View style={styles.whatsappCheck}>
                        <Checkbox
                          checked={isWhatsapp}
                          onPress={() => setIsWhatsapp(!isWhatsapp)}
                        />
                      </View>
                      <Text style={styles.whatsappText}>
                        Receive communications via Whatsapp
                      </Text>
                    </View>
                  </>
                ) : (
                  <View style={[res.id === 3 ? styles.phoneNumberView : {}]}>
                    <TextInputFieldPaper
                      label={res?.name}
                      underlineStyle={ApplicationStyles.dNone}
                      value={values[res.field]}
                      errors={errors[res.field]}
                      touched={touched[res.field]}
                      Icon={
                        screen === 'ReferAndEarn' || screen === 'StartRefer'
                          ? null
                          : (res.id === 2 || res.id === 3) && (
                              <VerifyButton
                                btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
                                verified={
                                  res.id === 3 ? phoneVerified : verified
                                }
                                isLoading={res.id === 2 ? isLoader : false}
                                onPress={() => {
                                  switch (res.id) {
                                    case 2:
                                      onPressSendOtp(res.id, values);
                                      break;

                                    case 3:
                                      onPressSendPhoneOtp(), setPhoneData(true);
                                      break;

                                    default:
                                      break;
                                  }
                                }}
                              />
                            )
                      }
                      onChangeText={(text) =>
                        handleChange(index, res.field, text)
                      }
                    />
                  </View>
                )}
              </View>
            )
        )}
      </View>

      <View style={styles.button}>
        {visibleInputIndex >= 3 && (
          <ButtonComp
            isLoading={toggle}
            btnTitle={
              screen === 'StartRefer'
                ? 'Share'
                : t(APP_LANGUAGE_CONSTANT.PROCEED)
            }
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit();
            }}
          />
        )}
      </View>
      {openPopup && (
        <OtpPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          email={values?.email}
          phone={values?.phone}
          toggleBtn={toggleBtn}
          setToggleBtn={setToggleBtn}
          isPhone={isPhone}
          onPressOtpVerify={onPressOtpVerify}
          onPressSendOtp={onPressSendOtp}
          otpError={otpError}
          onPressSendPhoneOtp={reSendPhoneOtp}
          onPressPhoneOtpVerify={onPressPhoneOtpVerify}
        />
      )}
    </Container>
  );
};

export default SignUpInfoScreen;
