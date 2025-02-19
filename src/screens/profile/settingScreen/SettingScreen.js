import React from 'react';
import { Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  ChangePassKey,
  NotificationBing,
  ShieldSecurity
} from '../../../assets/icon';
import styles from './SettingScreen.styles';

export default function SettingScreen({ navigation }) {
  const { t } = useTranslation();
  const BUTTON_ARR = [
    {
      icons: ChangePassKey,
      title: t(APP_LANGUAGE_CONSTANT.CHANGE_PASSWORD_NEW),
      screen: SCREEN_NAME.CHANGE_PASSWORD_SCREEN
    },
    {
      icons: ShieldSecurity,
      title: t(APP_LANGUAGE_CONSTANT.PRIVACY_SECURITY),
      screen: SCREEN_NAME.PRIVACY_SECURITY_SCREEN
    },
    {
      icons: NotificationBing,
      title: t(APP_LANGUAGE_CONSTANT.NOTIFICATION_ALERT),
      screen: SCREEN_NAME.NOTIFICATION_AND_ALERT_SCREEN
    }
  ];

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.SETTINGS)}>
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
