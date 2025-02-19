import React, { useEffect, useState } from 'react';
import { ButtonComp, Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import { ApplicationStyles, Colors } from '../../../theme';
import { ReferBanner } from '../../../assets/icon';
import { styles } from './ReferAndEarnScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

// eslint-disable-next-line complexity
export default function ReferAndEarnScreen({ navigation, route }) {
  const { t } = useTranslation();
  const [referralCode, setReferralCode] = useState(null);
  const loginReferralCode = useSelector(
    (state) => state?.user?.userDetail?.referral_code
  );

  useEffect(() => {
    AsyncStorage.getItem('referralCode').then((res) => {
      setReferralCode(res);
    });
  }, [route]);

  const generateCode = () => {
    navigation.navigate(SCREEN_NAME.AUTH_STACK, {
      screen: SCREEN_NAME.SIGNUP_INFO_SCREEN,
      params: { index: '1', screen: 'ReferAndEarn' }
    });
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.REFERRAL)}>
      <View style={{ paddingBottom: 15, width: '85%' }}>
        <Text style={styles.referRetailer}>
          {t(APP_LANGUAGE_CONSTANT.REFER_RETAILER)}
        </Text>
      </View>
      <Text style={styles.referDescription}>
        {t(APP_LANGUAGE_CONSTANT.REFER_DESCRIPTION)}
      </Text>
      <View style={styles.banner}>
        <ReferBanner
          style={styles.referBanner}
          width={'100%'}
          height={'100%'}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.stepWrapper}>
          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>1</Text>
            </View>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.stepTitle}>
              {t(APP_LANGUAGE_CONSTANT.SUBMIT_REFERAL)}
            </Text>
            <Text style={styles.stepDescription}>
              {t(APP_LANGUAGE_CONSTANT.SUBMIT_DESCRIPTION)}
            </Text>
          </View>
        </View>

        <View style={styles.stepWrapper}>
          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>2</Text>
            </View>
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.stepTitle}>
              {t(APP_LANGUAGE_CONSTANT.WE_VERIFY)}
            </Text>
            <Text style={styles.stepDescription}>
              {t(APP_LANGUAGE_CONSTANT.VERIFY_DESCRIPTION)}
            </Text>
          </View>
        </View>

        <View style={styles.stepWrapper}>
          <View style={styles.circleWrapper}>
            <View style={[styles.circle, styles.orangeCircle]}>
              <Text style={[styles.circleText, styles.whiteText]}>3</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.stepTitle, styles.orangeText]}>
              {t(APP_LANGUAGE_CONSTANT.MAKE_SAVING)}
            </Text>
            <Text style={styles.stepDescription}>
              {t(APP_LANGUAGE_CONSTANT.SAVING_DESCRIPTION)}
              {}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>
          {t(APP_LANGUAGE_CONSTANT.REFERRAL_CODE)}
        </Text>

        <TouchableOpacity
          disabled={referralCode ? true : false}
          style={styles.codeContainer}
          onPress={generateCode}
        >
          <Text style={styles.codeText}>
            {loginReferralCode
              ? loginReferralCode
              : referralCode
              ? referralCode
              : '*******'}
          </Text>
          {referralCode ? null : (
            <Text style={styles.generateText}>
              {t(APP_LANGUAGE_CONSTANT.TAP_GENERATE)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={ApplicationStyles.pageSpacing}>
        <ButtonComp
          disabled={referralCode ? false : true}
          btnTitle={t(APP_LANGUAGE_CONSTANT.START_REFERRING)}
          containerStyle={[styles.btn, { opacity: referralCode ? 1 : 0.5 }]}
          onPress={() =>
            navigation.navigate(SCREEN_NAME.AUTH_STACK, {
              screen: SCREEN_NAME.SIGNUP_INFO_SCREEN,
              params: {
                index: '1',
                screen: 'StartRefer',
                referralCode: loginReferralCode
                  ? loginReferralCode
                  : referralCode
              }
            })
          }
        />
      </View>
    </Container>
  );
}
