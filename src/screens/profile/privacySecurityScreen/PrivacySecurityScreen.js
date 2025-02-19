import React from 'react';
import { Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { ShieldSecurity } from '../../../assets/icon';
import styles from '../settingScreen/SettingScreen.styles';

export default function PrivacySecurityScreen({ navigation }) {
  const { t } = useTranslation();
  const BUTTON_ARR = [
    // {
    //   icons: ChangePassKey,
    //   title: t(APP_LANGUAGE_CONSTANT.PRIVACY_SECURITY),
    //   screen: 'TermAndCondition'
    // },
    {
      icons: ShieldSecurity,
      title: t(APP_LANGUAGE_CONSTANT.DELETE_ACCOUNT),
      screen: SCREEN_NAME.DELETE_ACCOUNT
    }
  ];

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.PRIVACY_SECURITY)}>
      {BUTTON_ARR?.map((res, index) => (
        <TouchableOpacity
          style={styles.mainView}
          key={index}
          onPress={() => navigation.navigate(res?.screen)}
        >
          <View style={styles.iconsView}>
            <res.icons />
          </View>
          <Text style={styles.title}>{res.title}</Text>
        </TouchableOpacity>
      ))}
    </Container>
  );
}
