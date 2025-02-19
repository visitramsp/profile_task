import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
} from '../../../../assets/icon';
import { Container } from '../../../../components';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant
} from '../../../../constants/AppConstant';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale
} from '../../../../theme';
import { styles } from './DriverAccount.styles';

const DriverAccount = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const FEATURE_ARR = [
    { title: t(APP_LANGUAGE_CONSTANT.COMPANY_DETAILS), icon: CompanyBag },
    { title: t(APP_LANGUAGE_CONSTANT.LANGUAGE), icon: LanguageCircle },
    { title: t(APP_LANGUAGE_CONSTANT.SETTINGS), icon: SettingUser },
    { title: t(APP_LANGUAGE_CONSTANT.SUPPORT), icon: SupportUser },
    { title: t(AppConstant.REVIEWS_AND_FEEDBACK), icon: ReviewUser },
    { title: t(APP_LANGUAGE_CONSTANT.TERMS_AND_CONDITION), icon: TandQ }
  ];

  const LANGUAGE = [
    { title: t(APP_LANGUAGE_CONSTANT.ENGLISH) },
    { title: t(APP_LANGUAGE_CONSTANT.URDU) }
  ];

  return (
    <Container title={'Account'}>
      <View style={styles.container}>
        <KeyboardAvoidingScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          // style={[ApplicationStyles.pageSpacing, styles.subContainer]}
        >
          <View style={ApplicationStyles.rowAlignCenterJustifyBetween}>
            <Image style={styles.icon} source={AppIcon.DummyImage1} />
            <View style={{ width: horizontalScale(180) }}>
              <Text numberOfLines={1} style={styles.userName}>
                Leslie Alexander
              </Text>
              <Text numberOfLines={1} style={styles.userPhone}>
                +91 98564376212
              </Text>
              <Text numberOfLines={1} style={styles.userEmail}>
                Janedoe123@email.com
              </Text>
            </View>
            <EditProfile />
          </View>

          <View style={{ marginTop: verticalScale(30) }}>
            {FEATURE_ARR?.map((item, _index) => (
              <TouchableOpacity
                key={_index}
                style={[
                  styles.rowView,
                  {
                    marginTop:
                      _index === 2 ? verticalScale(20) : verticalScale(0)
                  }
                ]}
              >
                <View style={styles.leftView}>
                  <item.icon />
                  <Text style={styles.rowTitle}>{t(item.title)}</Text>
                </View>
                {_index === 1 && (
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
                )}
              </TouchableOpacity>
            ))}
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </Container>
  );
};
export default DriverAccount;
