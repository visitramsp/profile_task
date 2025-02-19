import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppIcon,
  CompanyBag,
  EditProfile,
  LanguageCircle,
  ReviewUser,
  SettingUser,
  SupportUser,
  TandQ
} from '../../../assets/icon';
import { Container } from '../../../components';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant,
  SCREEN_NAME,
  USER_TYPE
} from '../../../constants';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale
} from '../../../theme';
import { styles } from './ProfileScreen.styles';
import RattingFeedbackScreen from '../rattingFeedbackScreen/RattingFeedbackScreen';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const { userDetail } = useSelector((state) => state.user);

  const FEATURE_ARR = [
    {
      title:
        userDetail?.user_type === USER_TYPE?.VENDOR
          ? t(APP_LANGUAGE_CONSTANT.WAREHOUSE_DETAILS)
          : t(APP_LANGUAGE_CONSTANT.OUTLET_DETAILS),
      icon: CompanyBag,
      screen: SCREEN_NAME.WAREHOUSE_SCREEN
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.COMPANY_DETAILS),
      icon: CompanyBag,
      screen: SCREEN_NAME.COMPANY_DETAILS_SCREEN
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.PAYMENT),
      icon: CompanyBag,
      screen: SCREEN_NAME.COMING_SOON_SCREEN
    },
    // { title: t(APP_LANGUAGE_CONSTANT.LANGUAGE), icon: LanguageCircle },
    {
      title: t(APP_LANGUAGE_CONSTANT.SETTINGS),
      icon: SettingUser,
      screen: SCREEN_NAME.SETTING_SCREEN
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.SUPPORT),
      icon: SupportUser,
      screen: SCREEN_NAME.SUPPORT_SCREEN
    },
    {
      title: t(AppConstant.REVIEWS_AND_FEEDBACK),
      icon: ReviewUser,
      screen: SCREEN_NAME.REVIEW_AND_FEEDBACK
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.TERMS_AND_CONDITION),
      icon: TandQ,
      screen: SCREEN_NAME.TERMS_AND_CONDITION_SCREEN
    }
  ];

  // TERMS_AND_CONDITION_SCREEN
  const LANGUAGE = [
    { title: t(APP_LANGUAGE_CONSTANT.ENGLISH) },
    { title: t(APP_LANGUAGE_CONSTANT.URDU) }
  ];

  const onPressItem = (item) => {
    if (item?.screen) {
      navigation.navigate(item?.screen);
    } else {
      item?.title === t(AppConstant.REVIEWS_AND_FEEDBACK)
        ? setIsOpenReviewModal(true)
        : null;
    }
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.ACCOUNT_SMALL)}>
      <View style={styles.container}>
        <KeyboardAvoidingScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={ApplicationStyles.rowAlignCenter}>
            <FastImage
              style={styles.profileImg}
              source={
                userDetail?.profile_photo?.length === 0
                  ? AppIcon.DummyImage1
                  : { uri: userDetail?.profile_photo }
              }
            />
            <View
              style={[
                ApplicationStyles.flex1,
                { paddingLeft: horizontalScale(15) }
              ]}
            >
              <Text numberOfLines={1} style={styles.userName}>
                {userDetail?.name}
              </Text>
              <Text numberOfLines={1} style={styles.userPhone}>
                {`+971 ${userDetail?.phone}`}
              </Text>
              <Text numberOfLines={1} style={styles.userEmail}>
                {userDetail?.email}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate(SCREEN_NAME.UPDATE_PROFILE_SCREEN)
              }
            >
              <EditProfile />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: verticalScale(30) }}>
            {FEATURE_ARR?.map((item, _index) => (
              <TouchableOpacity
                key={_index}
                style={[
                  styles.rowView,
                  {
                    marginTop:
                      _index === 4 ? verticalScale(20) : verticalScale(0)
                  }
                ]}
                onPress={() => onPressItem(item)}
              >
                <View style={styles.leftView}>
                  <item.icon />
                  <Text style={styles.rowTitle}>{t(item.title)}</Text>
                </View>
                {/* {_index === 3 && (
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
            <View style={{ height: verticalScale(100) }} />
          </View>
        </KeyboardAvoidingScrollView>
      </View>
      {isOpenReviewModal && (
        <RattingFeedbackScreen
          openPopup={isOpenReviewModal}
          setOpenPopup={setIsOpenReviewModal}
        />
      )}
    </Container>
  );
};

export default ProfileScreen;
