import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { APP_LANGUAGE_CONSTANT } from '../../../constants/AppConstant';
import { styles } from './UniversalAccountScreen.styles';
import { ExplanationMark, LanguageCircle, Support } from '../../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale
} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { MainLayout } from '../../../components';
import { SCREEN_NAME } from '../../../constants';

const UniversalAccountScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const AUTH_ARR = [
    { title: APP_LANGUAGE_CONSTANT.LOGIN },
    { title: APP_LANGUAGE_CONSTANT.SIGNUP_NEW }
  ];

  const FEATURE_ARR = [
    // { title: APP_LANGUAGE_CONSTANT.LANGUAGE, icon: LanguageCircle },
    {
      title: APP_LANGUAGE_CONSTANT.SUPPORT,
      icon: Support,
      screenName: SCREEN_NAME.SUPPORT_SCREEN
    },
    {
      title: APP_LANGUAGE_CONSTANT.FAQS,
      icon: ExplanationMark,
      screenName: SCREEN_NAME.FAQ_SCREEN
    },
    {
      title: APP_LANGUAGE_CONSTANT.ABOUT_US,
      icon: ExplanationMark,
      screenName: ''
    }
  ];

  const LANGUAGE = [
    { title: APP_LANGUAGE_CONSTANT.ENGLISH },
    { title: APP_LANGUAGE_CONSTANT.URDU }
  ];

  const onPressBtn = (item, _index) => {
    _index === 2
      ? navigation.navigate('aboutUsScreen')
      : navigation.navigate(item?.screenName);
  };

  return (
    <MainLayout scrollable={false}>
      {/* <Header
        isLeft={false}
        headerTitle={t(APP_LANGUAGE_CONSTANT.ACCOUNT)}
        headerType={HEADER_TYPE.ONLY_TITLE}
        customContainer={{ backgroundColor: Colors.transparent }}
      /> */}

      <View style={styles.keyPointCard}>
        <Text style={styles.accountDesc}>
          {t(APP_LANGUAGE_CONSTANT.ACCOUNT_DESC)}
        </Text>

        <View style={styles.actionView}>
          {AUTH_ARR?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.loginButton, index === 0 && styles.btnShadow]}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.AUTH_STACK, {
                  screen: SCREEN_NAME.LOGIN,
                  params: { index: item?.title }
                });
              }}
            >
              <LinearGradient
                colors={
                  index === 0
                    ? [Colors.primary40, Colors.primary60]
                    : [Colors.transparent, Colors.transparent]
                }
                style={[styles.gradient, index === 1 && styles.signUpBtn]}
              >
                <Text style={styles.loginText}>{t(item?.title)}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.container}>
        <KeyboardAvoidingScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={[ApplicationStyles.pageSpacing, styles.subContainer]}
        >
          <View style={{ marginTop: verticalScale(30) }}>
            {FEATURE_ARR?.map((item, _index) => (
              <TouchableOpacity
                key={_index}
                style={styles.rowView}
                onPress={() => onPressBtn(item, _index)}
              >
                <View style={styles.leftView}>
                  {_index === 0 ? (
                    <View style={styles.iconOuterView}>
                      <View style={styles.iconInnerView}>
                        <item.icon
                          height={verticalScale(14)}
                          widt={horizontalScale(14)}
                        />
                      </View>
                    </View>
                  ) : (
                    <item.icon />
                  )}
                  <Text style={styles.rowTitle}>{t(item.title)}</Text>
                </View>
                {/* {_index === 0 && (
                  <View style={styles.languageView}>
                    {LANGUAGE?.map((res, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.selectedButton,
                          selectedIndex === index && styles.btnShadow
                        ]}
                        onPress={() => {
                          setSelectedIndex(index);
                        }}
                      >
                        <LinearGradient
                          colors={
                            selectedIndex === index
                              ? [Colors.primary40, Colors.primary60]
                              : [Colors.transparent, Colors.transparent]
                          }
                          style={styles.featureView}
                        >
                          <Text
                            style={[
                              styles.languageText,
                              selectedIndex === index && {
                                color: Colors.white
                              }
                            ]}
                          >
                            {t(res?.title)}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    ))}
                  </View>
                )} */}
              </TouchableOpacity>
            ))}
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </MainLayout>
  );
};

export default UniversalAccountScreen;
