import NetInfo from '@react-native-community/netinfo';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutAnimation,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Apple,
  AppLogoWhite,
  Google,
  LessArrowIcons,
  PasswordHide,
  PasswordShow,
  UAEPass
} from '../../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDraftData,
  setUserLoginInfo,
  updateDraftData
} from '../../../store/user/reducer';
import {
  ButtonComp,
  Header,
  OtpPopup,
  TextInputFieldPaper
} from '../../../components';
import { LoginSchema } from '../../../schemas/LoginSchema';
import {
  getUserInfo,
  userLoginRequestOtp,
  userLoginVerifyOtp
} from '../../../store/auth/action';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';
import { styles } from './Login.styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  APP_LANGUAGE_CONSTANT,
  ASYNC_KEY,
  SCREEN_NAME,
  SIGNUP_ARR,
  USER_TYPE
} from '../../../constants';
import { useIsFocused } from '@react-navigation/native';
import MainLayout from '../../../components/layout/Layout';
import Checkbox from '../../../components/Checkbox';
import { authRedirection, showError, showToastSuccess } from '../../../utils';
import { setInAsyncStorage } from '../../../services';
import { FirebaseStore } from '../../../staticStore/FirebaseStore';

const UserCard = (props) => {
  const { item, isOpen, setIsOpen } = props;
  const { t } = useTranslation();

  const REQ_DEC = [
    APP_LANGUAGE_CONSTANT.IBAN,
    APP_LANGUAGE_CONSTANT.EMIRATED_ID,
    APP_LANGUAGE_CONSTANT.TRADE_LIC,
    APP_LANGUAGE_CONSTANT.VAT_CERTIFICATE
  ];

  return (
    <Pressable
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(item?.id === isOpen ? null : item?.id);
      }}
    >
      <LinearGradient
        colors={
          isOpen !== item?.id
            ? [Colors.secondary, Colors.secondary]
            : [Colors.border1, Colors.border2, Colors.border3, Colors.border4]
        }
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.userCardContainer}
      >
        <View
          style={[
            styles.mainContainer,
            isOpen === item?.id && ApplicationStyles.borderTransparent
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.heading,
                isOpen === item?.id && {
                  color: Colors.white70,
                  fontWeight: Fonts.Weight.secondlast
                }
              ]}
            >
              {t(item?.heading)}
            </Text>
          </View>
          {isOpen === item?.id && (
            <View>
              <Text
                style={[
                  styles.reqDocTxt,
                  { paddingVertical: verticalScale(5) }
                ]}
              >
                {t(APP_LANGUAGE_CONSTANT.PREREQUISITES)}
              </Text>
              <View style={{ paddingLeft: horizontalScale(10) }}>
                {REQ_DEC.map((res, index) => {
                  return (
                    <View key={index} style={ApplicationStyles.rowAlignCenter}>
                      <Text style={styles.dot}>{'\u2B24'}</Text>
                      <Text style={styles.reqDocTxt}>{` ${t(res)}`}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

// eslint-disable-next-line complexity
const Login = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [auth, setAuth] = useState({});
  const userLoginInfo = useSelector((state) => state.user.userLoginInfo);

  const [rememberMe, setRememberMe] = useState(userLoginInfo?.rememberMe);

  const isFocused = useIsFocused();
  const routeIndex = route?.params?.index;

  const AUTH_ARR = [
    {
      title: APP_LANGUAGE_CONSTANT.LOGIN
    },
    {
      title: APP_LANGUAGE_CONSTANT.SIGNUP
    }
  ];

  const SOCIAL_BTN_COLOR = [
    [Colors.white70, Colors.white70],
    [Colors.black80, Colors.black80],
    [Colors.green30, Colors.green20]
  ];

  let LoginTypes = [
    {
      id: 1,
      type: 'GOOGLE',
      Icon: <Google />,
      title: t(APP_LANGUAGE_CONSTANT.SIGN_UP_WITH_GOOGLE)
    },
    {
      id: 2,
      type: 'APPLE',
      Icon: <Apple />,
      title: t(APP_LANGUAGE_CONSTANT.SIGN_UP_WITH_APPLE)
    },
    {
      id: 3,
      type: 'UAEPASS',
      Icon: <UAEPass />,
      title: t(APP_LANGUAGE_CONSTANT.SIGN_UP_WITH_UAE)
    }
  ];

  useEffect(() => {
    if (routeIndex === APP_LANGUAGE_CONSTANT.LOGIN) {
      setSelectedIndex(0);
    } else if (routeIndex === APP_LANGUAGE_CONSTANT.SIGNUP_NEW) {
      setSelectedIndex(1);
    }
  }, [isFocused, routeIndex]);

  const initialValues = {
    email: userLoginInfo?.email,
    password: userLoginInfo?.password
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        setAuth(values);
        NetInfo.fetch().then((state) => {
          state?.isConnected && handleOnlineLogin(values, action);
        });
      }
    });
  const handleOnlineLogin = async (values, action) => {
    setToggle(true);
    const obj = {
      email: values?.email || auth?.email,
      password: values?.password || auth?.password
    };
    userLoginRequestOtp(obj)
      .then((response) => {
        dispatch(deleteDraftData());
        // action.resetForm();
        showToastSuccess(response?.data?.message);
        setOpenPopup(true);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setToggle(false);
      });
  };

  const onPressOtpVerify = (otp) => {
    setToggle(true);
    const obj = {
      email: auth?.email,
      otp: otp,
      deviceToken: FirebaseStore.token
    };
    userLoginVerifyOtp(obj)
      .then(async (response) => {
        await setInAsyncStorage(ASYNC_KEY.TOKEN, response?.data?.data?.token);
        showToastSuccess(response?.data?.message);
        const userType = response?.data?.data?.user_type;

        if (userType !== USER_TYPE.REFERRAL_USER) {
          getUserInfo(true)
            .then((res) => {})
            .catch((err) => {
              showError(err);
            });
        }

        // // await removeToken();
        authRedirection(userType);

        // Check if "RememberMe Me" is selected and update Redux store

        if (rememberMe) {
          dispatch(
            setUserLoginInfo({
              email: values?.email,
              password: values?.password,
              rememberMe: true
            })
          );
        } else {
          dispatch(
            setUserLoginInfo({
              email: '',
              password: '',
              rememberMe: false
            })
          );
        }
      })
      .catch((error) => {
        setToggle(false);
        setToggleBtn(false);
        showError(error);
      })
      .finally(() => {
        setToggle(false);
        setToggleBtn(false);
        // setToggle(false);
        // setOpenPopup(false);
        // setToggleBtn(false);
      });
  };

  const validateDraftData = () => {
    dispatch(
      updateDraftData({
        screenName: SCREEN_NAME.SIGNUP_INFO_SCREEN,
        nextScreenProps: { title: SIGNUP_ARR[isOpen - 1]?.heading }
      })
    );
    navigation.navigate(SCREEN_NAME.SIGNUP_INFO_SCREEN, {
      title: SIGNUP_ARR[isOpen - 1]?.heading
    });
  };

  return (
    <MainLayout scrollable={false}>
      <Header
        leftIcon={
          <LessArrowIcons color={Colors.white70} width={24} height={24} />
        }
        customContainer={{
          backgroundColor: 'transparent'
        }}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ApplicationStyles.flex1}
      >
        {selectedIndex === 0 && (
          <View style={styles.welcomeView}>
            <AppLogoWhite
              width={horizontalScale(220)}
              height={verticalScale(120)}
              color={Colors.white}
            />
            {/* <Text style={styles.logoTitle}>
              {t(APP_LANGUAGE_CONSTANT.AQAD)}
            </Text> */}
          </View>
        )}
        <View style={styles.innerMainContainer}>
          <View style={styles.formView}>
            <View style={styles.loginSignView}>
              {AUTH_ARR?.map((res, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.loginButton,
                      selectedIndex === index && styles.btnShadow
                    ]}
                    onPress={() => {
                      setSelectedIndex(index);
                      setIsOpen(null);
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                    }}
                  >
                    <LinearGradient
                      colors={
                        selectedIndex === index
                          ? [Colors.primary40, Colors.primary60]
                          : ['transparent', 'transparent']
                      }
                      style={styles.gradient}
                    >
                      <Text
                        style={[
                          styles.loginText,
                          selectedIndex !== index && {
                            color: Colors.white90
                          }
                        ]}
                      >
                        {t(res?.title)}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedIndex === 0 ? (
              <>
                <TextInputFieldPaper
                  label={APP_LANGUAGE_CONSTANT.EMAIL_PHONE}
                  value={values.email}
                  errors={errors?.email}
                  touched={touched.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />

                <View style={{ paddingTop: verticalScale(15) }}>
                  <TextInputFieldPaper
                    label={APP_LANGUAGE_CONSTANT.ENTER_YOUR_PASSWORD}
                    secureTextEntry={checked ? true : false}
                    keyboardType="default"
                    value={values.password}
                    Icon={checked ? PasswordHide : PasswordShow}
                    errors={errors?.password}
                    touched={touched?.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onPressRight={() => setChecked(!checked)}
                  />
                </View>
                <Checkbox
                  label={t(APP_LANGUAGE_CONSTANT.REMEMBER_ME)}
                  checked={rememberMe}
                  onPress={() => setRememberMe((prev) => !prev)}
                />
              </>
            ) : (
              <View>
                <Text style={styles.signUpTitle}>Get Started As :</Text>
                <Text style={styles.signUpDesc}>
                  Select the account type that suits your business.
                </Text>
                <View style={{ paddingTop: verticalScale(25) }}>
                  {SIGNUP_ARR?.map((res) => {
                    return (
                      <UserCard
                        key={res?.id}
                        item={res}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </View>
          <View style={styles.buttonView}>
            <ButtonComp
              isLoading={toggle}
              disabled={selectedIndex === 1 && isOpen === null}
              btnTitle={t(
                selectedIndex === 0
                  ? APP_LANGUAGE_CONSTANT.LOGIN
                  : APP_LANGUAGE_CONSTANT.SIGNUP
              )}
              containerStyle={
                selectedIndex === 1 &&
                isOpen === null &&
                ApplicationStyles.disabled
              }
              onPress={() => {
                selectedIndex === 0 ? handleSubmit() : validateDraftData();
              }}
            />
          </View>
          {selectedIndex === 0 && (
            <>
              <View style={styles.forgetPassView}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate('Forgot');
                  }}
                >
                  <Text style={styles.forgetPassText}>
                    {t(APP_LANGUAGE_CONSTANT.FORGET_PASSWORD)}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.dashView}>
                <View style={styles.dash} />
                <Text style={styles.orText}>{t(APP_LANGUAGE_CONSTANT.OR)}</Text>
                <View style={styles.dash} />
              </View> */}
            </>
          )}

          {/* <View style={styles.socialLoginView}>
            {LoginTypes?.map((res, index) => {
              return (
                <TouchableOpacity key={res?.id}>
                  <LinearGradient
                    style={styles.socialBtn}
                    colors={SOCIAL_BTN_COLOR[index]}
                  >
                    {res?.Icon}
                    <Text
                      style={[
                        styles.socialText,
                        index === 0 && { color: Colors.blackOne }
                      ]}
                    >
                      {res?.title}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View> */}
        </View>
      </ScrollView>
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
    </MainLayout>
  );
};

export default Login;
